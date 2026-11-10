(function(){
"use strict";
const K = window.KJV, C = window.CONTENT;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const label = r => r.replace("-", "–");
const N = C.steps.length;

/* ---------- in-session store (preview host does not allow device storage) ---------- */
const mem = {};
const store = {
  get(k, d){ return k in mem ? JSON.parse(mem[k]) : d; },
  set(k, v){ mem[k] = JSON.stringify(v); }
};
const KEY = { prog:"rt.progress", mine:"rt.mine", log:"rt.log", check:"rt.check", decl:"rt.declared" };
const todayKey = () => { const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
const prettyDate = d => new Date(d+"T12:00:00").toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"});

function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2400); }

/* ---------- day / night ---------- */
const themes = ["day","night","auto"];
let themeMode = "day";
function isNightHour(){ const h = new Date().getHours(); return h >= 19 || h < 6; }
function applyTheme(){
  const t = themeMode==="auto" ? (isNightHour() ? "night" : "day") : themeMode;
  document.documentElement.dataset.theme = t;
  const b = $("#themeBtn");
  b.querySelector(".t-label").textContent = themeMode==="auto" ? "Auto" : themeMode==="day" ? "Day" : "Night";
  b.querySelector(".ico-sun").style.display = t==="day" ? "" : "none";
  b.querySelector(".ico-moon").style.display = t==="night" ? "" : "none";
  b.setAttribute("aria-label", "Theme: " + b.querySelector(".t-label").textContent + ". Tap to change.");
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t==="night" ? "#101718" : "#FAF7EF";
}
$("#themeBtn").onclick = () => {
  themeMode = themes[(themes.indexOf(themeMode)+1)%themes.length]; applyTheme();
  toast(themeMode==="auto" ? "Auto: night from 7 pm to 6 am" : themeMode==="day" ? "Day mode" : "Night mode");
};
setInterval(() => { if (themeMode==="auto") applyTheme(); }, 60000);

/* ---------- navigation ---------- */
const views = ["home","pray","service","scripture","mine","log"];
let view = "home";
function go(v){
  if (!views.includes(v)) v = "home";
  if (v !== view) player.stop();
  view = v;
  views.forEach(x => $("#v-"+x).classList.toggle("on", x===v));
  document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.go===v));
  if (location.hash !== "#"+v) history.replaceState(null,"","#"+v);
  window.scrollTo({top:0});
  if (v==="service") requestWake(); else releaseWake();
  if (v==="pray") renderStep();
  if (v==="home") renderToday();
  player.setContext(v);
}
document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]");
  if (g){ e.preventDefault(); go(g.dataset.go); }
  const r = e.target.closest("[data-ref]");
  if (r){ e.preventDefault(); showVerse(r.dataset.ref); }
});
window.addEventListener("hashchange", () => go(location.hash.slice(1)));

/* ---------- verse dialog ---------- */
const dlg = document.createElement("dialog");
dlg.innerHTML = '<div class="dlg"><h3></h3><p class="kjv"></p><button class="btn btn-primary sm">Close</button></div>';
document.body.appendChild(dlg);
dlg.querySelector("button").onclick = () => dlg.close();
dlg.addEventListener("click", e => { if (e.target===dlg) dlg.close(); });
function showVerse(ref){
  dlg.querySelector("h3").textContent = label(ref) + " (KJV)";
  dlg.querySelector("p").textContent = K[ref] || "";
  if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open","");
}
const verseBlock = (ref, lab) => `<div class="verse"><b>${esc(lab||label(ref))} · KJV</b>${esc(K[ref])}</div>`;

/* ---------- voice player (studio recordings in the Charon voice, device voice as fallback) ---------- */
const synth = window.speechSynthesis;
const AUDIO = window.AUDIO || {};
const sayRef = r => label(r).replace("–"," to ").replace(":", ", verse ").replace(/^(\d) /, (m,n)=>["","First","Second","Third"][+n]+" ");
const sayVerse = r => (K[r]||"").replace(/(^|\s)\d{1,3}\s(?=[A-Za-z])/g, "$1");
const verseSpeech = r => sayRef(r) + ". " + sayVerse(r);
const speechText = t => String(t).replace(/\bPs\b/g, "Pastor");
function fnv(s){ let h = 0x811c9dc5; for (let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return ("0000000"+h.toString(16)).slice(-8); }
const clipFor = t => AUDIO[fnv(speechText(t))] || null;
window.__fnv = fnv; window.__speechText = speechText;

function deviceSpeak(text, rate, onend){
  if (!synth){ onend && onend(); return null; }
  const u = new SpeechSynthesisUtterance(speechText(text)); u.rate = rate || 1;
  const v = (synth.getVoices()||[]).find(v=>/^en/i.test(v.lang)); if (v) u.voice = v;
  u.onend = () => onend && onend();
  u.onerror = e => { if (e.error!=="interrupted" && e.error!=="canceled") onend && onend(); };
  synth.speak(u); return u;
}

const player = (() => {
  let q = [], i = 0, state = "idle", token = 0, ctx = null, loaded = -1;
  const audio = new Audio(); audio.preload = "auto";
  const el = $("#player"), now = $("#plNow"), pos = $("#plPos"), playBtn = $("#plPlay");
  function rate(){ return +$("#plRate").value || 1; }
  function ui(){
    playBtn.setAttribute("aria-label", state==="playing" ? "Pause" : "Play");
    playBtn.classList.toggle("is-playing", state==="playing");
    $("#plStop").disabled = $("#plPrev").disabled = $("#plNext").disabled = !q.length;
    if (!q.length){ now.textContent = ctx==="service" ? "Tap play to hear the short prayers aloud." : "Tap play to hear this step read aloud."; pos.textContent = ""; return; }
    const it = q[Math.min(i, q.length-1)];
    now.textContent = it.text;
    pos.textContent = `${Math.min(i+1,q.length)} / ${q.length}`;
  }
  function highlight(){
    document.querySelectorAll(".reading").forEach(x => x.classList.remove("reading"));
    const it = q[i]; if (!it) return;
    if (it.onStart) it.onStart();
    if (it.block){ const b = document.getElementById(it.block); if (b){ b.classList.add("reading"); const r=b.getBoundingClientRect(); if (r.top < 70 || r.bottom > innerHeight-140) b.scrollIntoView({behavior:"smooth",block:"center"}); } }
  }
  function halt(){ token++; audio.pause(); if (synth) synth.cancel(); }
  function advance(my){ if (my!==token || state!=="playing") return; i++; speakCurrent(); }
  function speakCurrent(){
    halt(); const my = token;
    if (i >= q.length){ finish(); return; }
    highlight(); ui();
    const clip = clipFor(q[i].text);
    if (clip){
      loaded = i;
      audio.src = "audio/" + clip; audio.playbackRate = rate();
      audio.onended = () => advance(my);
      audio.onerror = () => { if (my!==token) return; deviceSpeak(q[i].text, rate(), () => advance(my)); };
      audio.play().catch(() => { if (my===token){ state="paused"; ui(); toast("Tap play again to start the audio"); } });
    } else {
      loaded = -1;
      deviceSpeak(q[i].text, rate(), () => advance(my));
    }
  }
  function finish(){
    const cont = $("#plCont").checked;
    state = "idle"; loaded = -1; document.querySelectorAll(".reading").forEach(x=>x.classList.remove("reading"));
    if (ctx==="pray" && cont && cur < N-1){ markDone(cur); cur++; renderStep(); window.scrollTo({top:0}); state="playing"; i=0; setTimeout(speakCurrent, 700); return; }
    if (ctx==="pray" && cont && cur === N-1){ markDone(cur); renderStepper(); toast("Every step prayed aloud. Amen."); }
    i = 0; ui();
  }
  return {
    load(items, c){ halt(); q = items; window.__lastQ = items; i = 0; state = "idle"; loaded = -1; ctx = c || ctx; document.querySelectorAll(".reading").forEach(x=>x.classList.remove("reading")); ui(); },
    play(){
      if (!q.length) return;
      if (state==="playing"){ state="paused"; if (loaded===i) audio.pause(); else halt(); ui(); return; }
      state = "playing";
      if (loaded===i && audio.src && audio.currentTime > 0 && !audio.ended){ audio.playbackRate = rate(); audio.play().catch(()=>{}); ui(); }
      else speakCurrent();
    },
    stop(){ halt(); state="idle"; i=0; loaded=-1; try{ audio.currentTime = 0; }catch(e){} document.querySelectorAll(".reading").forEach(x=>x.classList.remove("reading")); ui(); },
    next(){ if (!q.length) return; i = Math.min(i+1, q.length-1); if (state==="playing") speakCurrent(); else { halt(); loaded=-1; highlight(); ui(); } },
    prev(){ if (!q.length) return;
      if (state==="playing" && loaded===i && audio.currentTime > 2.5){ audio.currentTime = 0; return; }
      i = Math.max(i-1, 0); if (state==="playing") speakCurrent(); else { halt(); loaded=-1; highlight(); ui(); } },
    setRate(){ audio.playbackRate = rate(); },
    setContext(c){ ctx = c; el.hidden = !(c==="pray" || c==="service"); document.body.classList.toggle("has-player", !el.hidden); if (c==="service") loadService(); },
    get state(){ return state; }, set index(n){ i=n; }
  };
})();

/* one-off playback (scripture library, refocus panel) */
const oneShot = (() => {
  const audio = new Audio(); let tok = 0;
  function play(texts, onDone){
    const my = ++tok; audio.pause(); if (synth) synth.cancel();
    let k = 0;
    const nextOne = () => {
      if (my!==tok) return;
      if (k >= texts.length){ onDone && onDone(); return; }
      const t = texts[k++], clip = clipFor(t);
      if (clip){ audio.src = "audio/"+clip; audio.playbackRate = +$("#plRate").value || 1; audio.onended = nextOne; audio.onerror = () => deviceSpeak(t, 1, nextOne); audio.play().catch(()=>deviceSpeak(t,1,nextOne)); }
      else deviceSpeak(t, 1, nextOne);
    };
    nextOne();
  }
  function stop(){ tok++; audio.pause(); if (synth) synth.cancel(); }
  return { play, stop };
})();

$("#plPlay").onclick = () => { oneShot.stop(); player.play(); };
$("#plStop").onclick = () => player.stop();
$("#plNext").onclick = () => player.next();
$("#plPrev").onclick = () => player.prev();
$("#plRate").onchange = () => player.setRate();
$("#plScr").onchange = () => { if (view==="pray") renderStep(); else if (view==="service") loadService(); };
$("#plMore").onclick = () => { const o = $("#plOpts"); o.hidden = !o.hidden; $("#plMore").setAttribute("aria-expanded", !o.hidden); };
document.addEventListener("keydown", e => {
  if ($("#player").hidden || /input|textarea|select/i.test(e.target.tagName) || dlg.open) return;
  if (e.key===" " || e.key==="k"){ e.preventDefault(); player.play(); }
  else if (e.key==="ArrowRight" || e.key==="l"){ e.preventDefault(); view==="service" && player.state==="idle" ? $("#svcNext").click() : player.next(); }
  else if (e.key==="ArrowLeft" || e.key==="j"){ e.preventDefault(); view==="service" && player.state==="idle" ? $("#svcPrev").click() : player.prev(); }
  else if (e.key==="Escape" || e.key==="s"){ player.stop(); }
});

/* ---------- home ---------- */
$(".letter-greet").textContent = C.letter.greeting;
$(".letter-body").textContent = C.letter.body;
$("#copyLetter").onclick = async () => {
  const txt = C.letter.greeting + "\n\n" + C.letter.body + "\n\n" + fullText();
  try { await navigator.clipboard.writeText(txt); toast("Letter and prayers copied"); }
  catch(e){ toast("Copy is blocked here — use Print instead"); }
};
$("#playAll").onclick = () => { cur = 0; $("#plCont").checked = true; go("pray"); setTimeout(() => player.play(), 150); };
function renderToday(){
  const p = store.get(KEY.prog, {});
  const done = (p[todayKey()]||[]).length;
  $("#todayDate").textContent = prettyDate(todayKey());
  const logged = store.get(KEY.log, []).some(l => l.date===todayKey());
  $("#todayStatus").textContent = logged ? "Prayed and logged today. Thank you for serving." : done ? `${done} of ${N} steps prayed — keep going.` : "Not yet prayed.";
  $("#ringTxt").textContent = `${done}/${N}`;
  $("#ringFg").style.strokeDashoffset = 119.4 * (1 - done/N);
}
document.querySelectorAll("[data-stepcount]").forEach(x => x.textContent = ["","one","two","three","four","five","six","seven","eight","nine","ten"][N] || N);

/* ---------- guided prayer ---------- */
let cur = 0;
function markDone(i){
  const p = store.get(KEY.prog, {}); const d = todayKey();
  p[d] = Array.from(new Set([...(p[d]||[]), C.steps[i].id])); store.set(KEY.prog, p);
}
function doneSet(){ return new Set(store.get(KEY.prog, {})[todayKey()]||[]); }
const shortTitle = t => ({"Prayer for Ps Kiky and Prophet Prince":"For our leaders","Like Those Who Served the Prophets":"Servants of the prophets","Short Prayers During the Service":"During the service","Declarations Over My Service":"Declarations","When My Mind Strays":"Mind strays","My Personal Declarations":"My declarations"})[t] || t;

function renderStepper(){
  const ds = doneSet();
  $("#stepper").innerHTML = C.steps.map((s,i)=>`<button role="tab" aria-selected="${i===cur}" class="${i===cur?"on":""} ${ds.has(s.id)?"done":""}" data-step="${i}"><span class="n">${ds.has(s.id)?"✓":i+1}</span>${esc(shortTitle(s.title))}</button>`).join("");
  $("#stepper").querySelectorAll("button").forEach(b => b.onclick = () => { cur = +b.dataset.step; player.stop(); renderStep(); });
  $("#stepBar").style.width = (ds.size / N * 100) + "%";
  const on = $("#stepper .on"); if (on && on.scrollIntoView) on.scrollIntoView({block:"nearest",inline:"center"});
}

function declKey(s,i){ return s.id+":"+i; }

function renderStep(){
  const s = C.steps[cur];
  const withScr = $("#plScr").checked;
  const Q = []; let bid = 0;
  const say = (text, block, extra) => Q.push(Object.assign({text, block}, extra||{}));
  const sayV = (ref, block) => { if (withScr) Q.push({text: verseSpeech(ref), block}); };
  const nb = () => "blk-" + (bid++);

  let h = `<div class="step-head"><div><p class="eyebrow">Step ${cur+1} of ${N}</p><h2 class="h2" id="blk-title">${esc(s.title)}</h2><span class="cue">${esc(s.cue)}</span></div>
    <button class="listen" id="listenBtn" aria-label="Listen and pray aloud"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg> LISTEN &amp; PRAY ALOUD</button></div>`;
  Q.push({text: `Step ${cur+1}. ${s.title}.`, block:"blk-title"});
  if (s.intro){ const b=nb(); h += `<p class="muted" id="${b}">${esc(s.intro)}</p>`; say(s.intro, b); }

  if (s.paragraphs){
    h += `<div class="prayer">`;
    const verses = [];
    s.paragraphs.forEach(p => {
      const b = nb();
      if (typeof p === "string"){ h += `<p id="${b}">${esc(p)}</p>`; say(p, b); return; }
      h += `<p id="${b}">${esc(p.text)} <button class="refbtn" data-ref="${esc(p.ref)}">— ${esc(p.label||label(p.ref))}</button>${p.also?` <button class="refbtn" data-ref="${esc(p.also)}">${esc(label(p.also))}</button>`:""}</p>`;
      say(p.text, b); verses.push([p.ref, p.label]); if (p.also) verses.push([p.also]);
    });
    h += `</div>`;
    verses.forEach(([r,l]) => { const b=nb(); h += `<div id="${b}">${verseBlock(r, l ? `${label(r)} (prayed from ${l})` : null)}</div>`; sayV(r, b); });
  }

  if (s.checklist){
    const ck = store.get(KEY.check, {}); const today = ck[todayKey()]||[];
    h += `<div class="check">` + s.checklist.map((c,i)=>{ const b=nb(); say(c+".", b); return `<label id="${b}" class="${today.includes(i)?"ok":""}"><input type="checkbox" data-ck="${i}" ${today.includes(i)?"checked":""}><span>${esc(c)}</span></label>`; }).join("") + `</div>`;
  }

  if (s.declarations){
    const dc = (store.get(KEY.decl, {})[todayKey()])||[];
    if (s.paragraphs) h += `<h3 class="h3">Declare it</h3>`;
    h += s.declarations.map((d,i)=>{
      const b = nb(), on = dc.includes(declKey(s,i));
      say((d.who ? d.who + ". " : "") + d.text, b); sayV(d.ref, b); if (d.also) sayV(d.also, b);
      return `<div class="decl" id="${b}">${d.who?`<p class="who">${esc(d.who)}</p>`:""}<div class="decl-top"><p class="decl-text">${esc(d.text)}</p><button class="declare-btn" data-dc="${i}" aria-pressed="${on}">${on?"Declared":"I declare it"}</button></div>
      <details><summary>${esc(d.label||label(d.ref))}${d.also?" · "+esc(label(d.also)):""} — read in full</summary>${verseBlock(d.ref, d.label?`${label(d.ref)} (declared from ${d.label})`:null)}${d.also?verseBlock(d.also):""}</details></div>`;
    }).join("");
  }

  if (s.id==="personal"){
    const mine = store.get(KEY.mine, []);
    if (mine.length) h += mine.map(d=>{ const b=nb(); say(d.text, b); if (d.ref) sayV(d.ref, b); return `<div class="decl" id="${b}"><div class="decl-top"><p class="decl-text">${esc(d.text)}</p></div>${d.ref?`<details><summary>${esc(label(d.ref))} — read in full</summary>${verseBlock(d.ref)}</details>`:""}</div>`; }).join("");
    else { h += `<div class="empty"><p>You have not written any personal declarations yet.</p><button class="btn btn-ghost sm" data-go="mine">Write my first declaration</button></div>`; Q.push({text:"You have not written any personal declarations yet.", block:null}); }
  }

  if (s.short){
    h += `<div class="short">` + s.short.map((t,i)=>{ const b=nb(); say(t, b); return `<div id="${b}">“${esc(t)}” <button class="refbtn" data-ref="${esc(s.shortRefs[i])}">${esc(label(s.shortRefs[i]))}</button></div>`; }).join("") + `</div>
      <button class="btn btn-ghost" data-go="service">Open Service Mode</button>`;
  }

  if (s.more && s.more.length){
    h += `<details class="more"><summary>More scripture for this step (${s.more.length})</summary>${s.more.map(r=>verseBlock(r)).join("")}</details>`;
  }

  $("#stepBody").innerHTML = h;
  const wasPlaying = player.state === "playing";
  player.load(Q, "pray");
  if (wasPlaying) player.play();
  $("#listenBtn").onclick = () => { player.stop(); player.play(); };
  $("#stepBody").querySelectorAll("[data-ck]").forEach(cb => cb.onchange = () => {
    const ck = store.get(KEY.check, {}); const d=todayKey(); let a = ck[d]||[]; const i=+cb.dataset.ck;
    a = cb.checked ? Array.from(new Set([...a,i])) : a.filter(x=>x!==i); ck[d]=a; store.set(KEY.check, ck);
    cb.closest("label").classList.toggle("ok", cb.checked);
  });
  $("#stepBody").querySelectorAll("[data-dc]").forEach(b => b.onclick = () => {
    const all = store.get(KEY.decl, {}); const d=todayKey(); let a = all[d]||[]; const k=declKey(s, +b.dataset.dc);
    const on = !a.includes(k); a = on ? [...a,k] : a.filter(x=>x!==k); all[d]=a; store.set(KEY.decl, all);
    b.setAttribute("aria-pressed", on); b.textContent = on ? "Declared" : "I declare it";
  });

  $("#prevStep").disabled = cur===0;
  $("#nextStep").textContent = cur===N-1 ? "Amen · Finish" : "Amen · Next";
  renderStepper();
}
$("#prevStep").onclick = () => { if (cur>0){ player.stop(); cur--; renderStep(); window.scrollTo({top:0}); } };
$("#nextStep").onclick = () => {
  player.stop(); markDone(cur);
  if (cur < N-1){ cur++; renderStep(); window.scrollTo({top:0}); }
  else { renderStepper(); toast(`All ${N} steps prayed. Go and serve well.`); go("log"); }
};

/* ---------- service mode ---------- */
const during = C.steps.find(s=>s.id==="during");
let si = 0, timer = null;
function renderSvc(pulse){
  $("#svcCount").textContent = `PRAYER ${si+1} OF ${during.short.length}`;
  $("#svcText").textContent = "“" + during.short[si] + "”";
  const r = during.shortRefs[si];
  $("#svcRef").textContent = label(r) + " (KJV) — tap to read";
  $("#svcVerse").textContent = K[r];
  if (pulse){ const c=$("#svcCard"); c.classList.remove("pulse"); void c.offsetWidth; c.classList.add("pulse"); }
}
function loadService(){
  const withScr = $("#plScr").checked, Q = [];
  during.short.forEach((t,k) => {
    const onStart = () => { if (si!==k){ si=k; renderSvc(true); } $(".svc-ref").open = withScr; };
    Q.push({text:t, block:"svcCard", onStart});
    if (withScr) Q.push({text: verseSpeech(during.shortRefs[k]), block:"svcCard", onStart});
  });
  player.load(Q, "service");
  const idx = Q.findIndex(x => x.text === during.short[si]);
  if (idx > 0) player.index = idx;
}
$("#svcNext").onclick = () => { si=(si+1)%during.short.length; $(".svc-ref").open=false; renderSvc(true); if (player.state!=="playing") loadService(); };
$("#svcPrev").onclick = () => { si=(si-1+during.short.length)%during.short.length; $(".svc-ref").open=false; renderSvc(true); if (player.state!=="playing") loadService(); };
$("#svcTimer").onchange = e => {
  clearInterval(timer); const m=+e.target.value;
  if (m){ timer=setInterval(()=>{ if (player.state!=="playing") $("#svcNext").click(); }, m*60000); toast(`Rotating every ${m} minutes`); }
};
let wake = null;
async function requestWake(){
  try { if ("wakeLock" in navigator){ wake = await navigator.wakeLock.request("screen"); $("#wakeNote").textContent = "Screen will stay awake."; } else $("#wakeNote").textContent = ""; }
  catch(e){ $("#wakeNote").textContent = ""; }
}
function releaseWake(){ if (wake){ wake.release().catch(()=>{}); wake=null; } }

/* ---------- refocus when the mind strays ---------- */
const focusStep = C.steps.find(s=>s.id==="focus");
const strayChecks = ["Is the recording still running?", "Are the audio levels still healthy?", "Is the backup still recording?", "Have you noted the time of anything to review later?", "Is the teaching being captured clearly right now?"];
let fi = -1;
function nextStray(){
  const d = focusStep.declarations; let n; do { n = Math.floor(Math.random()*d.length); } while (d.length>1 && n===fi); fi = n;
  $("#strayDecl").textContent = d[fi].text;
  $("#strayRef").textContent = label(d[fi].ref) + " (KJV) — tap to read";
  $("#strayVerse").textContent = K[d[fi].ref];
  $("#strayCheck").textContent = strayChecks[Math.floor(Math.random()*strayChecks.length)];
  $("#strayPanel .svc-ref").open = false;
}
$("#strayBtn").onclick = () => {
  const p = $("#strayPanel"), open = p.hidden; p.hidden = !open; $("#strayBtn").setAttribute("aria-expanded", open);
  if (open){ nextStray(); p.scrollIntoView({behavior:"smooth", block:"nearest"}); }
};
$("#strayNext").onclick = nextStray;
$("#strayDone").onclick = () => { $("#strayPanel").hidden = true; $("#strayBtn").setAttribute("aria-expanded", false); toast("Welcome back. Keep going faithfully."); };
const STRAY_LINE = "Lord, unite my heart and bring me back to the assignment.";
$("#straySay").onclick = () => {
  player.stop();
  const d = focusStep.declarations[fi];
  oneShot.play([STRAY_LINE, d.text, verseSpeech(d.ref)]);
};

/* ---------- scripture library ---------- */
let catFilter = "all";
$("#chips").innerHTML = [`<button class="chip on" data-cat="all">All</button>`, ...C.categories.map(c=>`<button class="chip" data-cat="${c.id}">${esc(c.name)}</button>`)].join("");
$("#chips").querySelectorAll(".chip").forEach(b => b.onclick = () => {
  catFilter = b.dataset.cat; $("#chips").querySelectorAll(".chip").forEach(x=>x.classList.toggle("on", x===b)); renderScripture();
});
$("#scrSearch").oninput = renderScripture;
function hl(text, q){ if (!q) return esc(text); const re = new RegExp("("+q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","gi"); return esc(text).replace(re,"<mark>$1</mark>"); }
let libSpeaking = null;
function renderScripture(){
  const q = $("#scrSearch").value.trim();
  let out = "";
  C.categories.filter(c => catFilter==="all" || c.id===catFilter).forEach(c => {
    const refs = c.refs.filter(r => !q || (r+" "+K[r]).toLowerCase().includes(q.toLowerCase()));
    if (!refs.length) return;
    out += `<section class="cat"><div class="cat-head"><h3>${esc(c.name)}</h3><p>${esc(c.note)}</p></div>
      <div class="prompt-box"><p><b>Declaration prompt:</b> ${esc(c.prompt)}</p><button class="btn btn-ghost sm" data-write="${esc(c.promptRef)}" data-prompt="${esc(c.prompt)}">Write it</button></div>
      <div class="grid">${refs.map(r=>`<article class="vcard"><h4>${esc(label(r))}</h4><p class="kjv">${hl(K[r], q)}</p><div class="row"><button class="link-btn" data-say="${esc(r)}" aria-pressed="false">Listen</button><button class="link-btn" data-write="${esc(r)}">Write a declaration</button><button class="link-btn" data-copy="${esc(r)}">Copy</button></div></article>`).join("")}</div></section>`;
  });
  $("#scrList").innerHTML = out || `<div class="empty">No verses match “${esc(q)}”.</div>`;
  $("#scrList").querySelectorAll("[data-write]").forEach(b => b.onclick = () => startWrite(b.dataset.write, b.dataset.prompt));
  $("#scrList").querySelectorAll("[data-say]").forEach(b => b.onclick = () => {
    const reset = x => { x.textContent="Listen"; x.setAttribute("aria-pressed","false"); };
    if (libSpeaking === b){ oneShot.stop(); reset(b); libSpeaking=null; return; }
    if (libSpeaking) reset(libSpeaking);
    libSpeaking = b; b.textContent="Stop"; b.setAttribute("aria-pressed","true");
    oneShot.play([verseSpeech(b.dataset.say)], () => { if (libSpeaking===b){ reset(b); libSpeaking=null; } });
  });
  $("#scrList").querySelectorAll("[data-copy]").forEach(b => b.onclick = async () => {
    const r=b.dataset.copy; try { await navigator.clipboard.writeText(`${label(r)} (KJV)\n${K[r]}`); toast("Verse copied"); } catch(e){ toast("Copy is blocked here"); }
  });
}

/* ---------- my declarations ---------- */
$("#decRef").innerHTML = `<option value="">— None —</option>` + C.categories.map(c=>`<optgroup label="${esc(c.name)}">${c.refs.map(r=>`<option value="${esc(r)}">${esc(label(r))}</option>`).join("")}</optgroup>`).join("");
$("#decRef").onchange = () => { const r=$("#decRef").value; $("#decRefPreview").textContent = r ? K[r] : ""; };
let editing = null;
function startWrite(ref, prompt){
  go("mine");
  $("#decRef").value = ref || ""; $("#decRef").onchange();
  $("#decText").placeholder = prompt ? prompt + " — I declare that…" : "I declare that…";
  $("#decText").focus();
}
$("#decForm").onsubmit = e => {
  e.preventDefault();
  const text = $("#decText").value.trim(); if (!text) return;
  const list = store.get(KEY.mine, []);
  const item = { id: editing || Date.now().toString(36), text, ref: $("#decRef").value };
  const i = list.findIndex(x=>x.id===item.id); if (i>-1) list[i]=item; else list.push(item);
  store.set(KEY.mine, list); resetForm(); renderMine(); toast(i>-1?"Declaration updated":"Declaration saved");
};
function resetForm(){ editing=null; $("#decText").value=""; $("#decRef").value=""; $("#decRefPreview").textContent=""; $("#decCancel").hidden=true; $("#decSave").textContent="Save declaration"; $("#decText").placeholder="I declare that…"; }
$("#decCancel").onclick = resetForm;
function renderMine(){
  const list = store.get(KEY.mine, []);
  $("#decList").innerHTML = list.length ? list.map(d=>`<div class="dec-item"><p>${esc(d.text)}</p>${d.ref?`<button class="link-btn ref" data-ref="${esc(d.ref)}">${esc(label(d.ref))} · read verse</button>`:""}<div class="row"><button class="link-btn" data-edit="${esc(d.id)}">Edit</button><button class="link-btn danger" data-del="${esc(d.id)}">Delete</button></div></div>`).join("")
    : `<div class="empty">Your declarations will appear here, and in the “My Personal Declarations” step of the guided prayer.</div>`;
  $("#decList").querySelectorAll("[data-edit]").forEach(b => b.onclick = () => {
    const d = store.get(KEY.mine,[]).find(x=>x.id===b.dataset.edit); if(!d) return;
    editing=d.id; $("#decText").value=d.text; $("#decRef").value=d.ref||""; $("#decRef").onchange();
    $("#decCancel").hidden=false; $("#decSave").textContent="Update declaration"; $("#decText").focus();
  });
  $("#decList").querySelectorAll("[data-del]").forEach(b => b.onclick = () => {
    if (!confirm("Delete this declaration?")) return;
    store.set(KEY.mine, store.get(KEY.mine,[]).filter(x=>x.id!==b.dataset.del)); renderMine(); toast("Declaration deleted");
  });
}
$("#promptList").innerHTML = C.categories.map(c=>`<button data-p="${c.id}"><b>${esc(c.name)}</b>${esc(c.prompt)}</button>`).join("");
$("#promptList").querySelectorAll("button").forEach(b => b.onclick = () => { const c=C.categories.find(x=>x.id===b.dataset.p); startWrite(c.promptRef, c.prompt); window.scrollTo({top:0}); });

$("#decExport").onclick = () => {
  const list = store.get(KEY.mine, []);
  if (!list.length){ toast("No declarations to export yet"); return; }
  const blob = new Blob([JSON.stringify(list,null,1)], {type:"application/json"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "my-declarations.json"; document.body.appendChild(a); a.click(); a.remove();
  toast("Exported — keep the file to import next time");
};
$("#decImport").onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  f.text().then(t => { const arr = JSON.parse(t); if (!Array.isArray(arr)) throw 0;
    const list = store.get(KEY.mine, []); arr.forEach(d => { if (d && d.text && !list.some(x=>x.id===d.id)) list.push({id:(typeof d.id==="string"&&/^[a-z0-9]{1,20}$/i.test(d.id))?d.id:Date.now().toString(36)+Math.floor(Math.random()*1e6).toString(36), text:String(d.text), ref: Object.prototype.hasOwnProperty.call(K,d.ref)?d.ref:""}); });
    store.set(KEY.mine, list); renderMine(); toast("Declarations imported"); }).catch(()=>toast("That file could not be read"));
  e.target.value = "";
};

/* ---------- log ---------- */
$("#logForm").onsubmit = e => {
  e.preventDefault();
  const log = store.get(KEY.log, []); const d = todayKey(); const note = $("#logNote").value.trim();
  const ex = log.find(l=>l.date===d); if (ex) ex.note = note || ex.note; else log.unshift({date:d, note});
  store.set(KEY.log, log); $("#logNote").value=""; renderLog(); toast("Logged. May the Lord establish the work of your hands.");
};
function renderLog(){
  const log = store.get(KEY.log, []);
  $("#logList").innerHTML = log.length ? log.map(l=>`<div class="log-item"><div><b>${esc(prettyDate(l.date))}</b>${l.note?`<div class="muted small">${esc(l.note)}</div>`:""}</div><span class="cue">PRAYED</span></div>`).join("")
    : `<div class="empty">No services logged yet.</div>`;
  $("#storeNote").textContent = "Entries last until this page is closed. Use Export on My Declarations to keep your declarations.";
}

/* ---------- print sheet ---------- */
function fullText(){
  return C.steps.filter(s=>s.id!=="personal" && s.id!=="ready").map(s=>{
    let t = s.title + "\n\n";
    (s.paragraphs||[]).forEach(p => t += (typeof p==="string"? p : p.text+" — "+(p.label||label(p.ref))) + "\n\n");
    (s.declarations||[]).forEach(d => t += "- " + (d.who ? d.who + ": " : "") + d.text + " — " + (d.label||label(d.ref)) + "\n");
    (s.short||[]).forEach(x => t += "“" + x + "”\n");
    return t.trim();
  }).join("\n\n");
}
function buildPrint(){
  let h = `<h1>Prayers and Declarations for the Ministry and Recording Team</h1><p><b>${esc(C.letter.greeting)}</b></p><p>${esc(C.letter.body)}</p>`;
  C.steps.forEach(s=>{
    if (s.id==="personal"){ const m=store.get(KEY.mine,[]); if(!m.length) return; h+=`<h2>${esc(s.title)}</h2>`+m.map(d=>`<p>› ${esc(d.text)}${d.ref?" — "+esc(label(d.ref)):""}</p>`).join(""); return; }
    h += `<h2>${esc(s.title)}</h2>`;
    if (s.intro) h += `<p>${esc(s.intro)}</p>`;
    (s.paragraphs||[]).forEach(p => { h += `<p>${esc(typeof p==="string"?p:p.text+" — "+(p.label||label(p.ref)))}</p>`; });
    (s.paragraphs||[]).filter(p=>typeof p!=="string").forEach(p=> { h += verseBlock(p.ref); if (p.also) h += verseBlock(p.also); });
    (s.checklist||[]).forEach(c=> h += `<p>[  ] ${esc(c)}</p>`);
    (s.declarations||[]).forEach(d=> { h += `<p>› ${d.who?"<b>"+esc(d.who)+":</b> ":""}${esc(d.text)} — ${esc(d.label||label(d.ref))}</p>` + verseBlock(d.ref) + (d.also?verseBlock(d.also):""); });
    (s.short||[]).forEach((x,i)=> h += `<p>“${esc(x)}” — ${esc(label(s.shortRefs[i]))}</p>`);
    (s.more||[]).forEach(r=> h += verseBlock(r));
  });
  $("#printSheet").innerHTML = `<div class="wrap">${h}</div>`;
}
window.addEventListener("beforeprint", buildPrint);

/* ---------- speech inventory (used to build the studio recordings) ---------- */
window.__speechInventory = () => {
  const set = new Set(), keep = cur; $("#plScr").checked = true;
  for (let k=0;k<N;k++){ cur=k; renderStep(); window.__lastQ.forEach(x=>set.add(x.text)); }
  cur = keep; loadService(); window.__lastQ.forEach(x=>set.add(x.text));
  C.categories.forEach(c=>c.refs.forEach(r=>set.add(verseSpeech(r))));
  set.add(STRAY_LINE);
  focusStep.declarations.forEach(d=>{ set.add(d.text); set.add(verseSpeech(d.ref)); });
  return [...set].map(t => ({ key: fnv(speechText(t)), speech: speechText(t) }));
};

/* ---------- init ---------- */
applyTheme();
renderSvc(false); renderScripture(); renderMine(); renderLog(); buildPrint();
go(location.hash.slice(1) || "home");
})();
