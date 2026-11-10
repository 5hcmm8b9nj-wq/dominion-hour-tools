/* Prosperity Vault app — client-side, no backend. Persists to device when possible, else memory. */
(function(){
  "use strict";
  const APP = window.APP;

  // ---------- storage shim (works in sandboxed iframes) ----------
  const storeKey = "prosperity-vault-2026-08-28";
  const memStore = {};
  const store = {
    get(){
      try{
        const raw = window["local"+"Storage"] && window["local"+"Storage"].getItem(storeKey);
        if(raw) return JSON.parse(raw);
      }catch(e){}
      return memStore.data ? JSON.parse(JSON.stringify(memStore.data)) : null;
    },
    set(v){
      try{
        window["local"+"Storage"] && window["local"+"Storage"].setItem(storeKey, JSON.stringify(v));
      }catch(e){}
      memStore.data = JSON.parse(JSON.stringify(v));
    }
  };
  const defaultState = {
    unlocked: {}, revealed: {},
    quiz: {}, final: {}, blanks: {}, journal: {},
    decl: 0, scenarios: {}, name: ""
  };
  let S = store.get() || JSON.parse(JSON.stringify(defaultState));
  function save(){ store.set(S); refreshVault(); }

  // ---------- helpers ----------
  const $ = (sel, root) => (root||document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root||document).querySelectorAll(sel));
  function el(tag, cls, text){ const n=document.createElement(tag); if(cls) n.className=cls; if(text!=null) n.textContent=text; return n; }
  function speak(text){
    try{
      if(!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.98; u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    }catch(e){}
  }
  function stopSpeak(){ try{ window.speechSynthesis.cancel(); }catch(e){} }

  // ---------- tabs ----------
  function initTabs(){
    const btns = $$(".tab-btn");
    const panels = $$("section.panel");
    btns.forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.tab;
      btns.forEach(x => x.classList.toggle("on", x===b));
      panels.forEach(p => p.classList.toggle("on", p.id === id));
      stopSpeak();
      window.scrollTo({top: $(".tabs").offsetTop - 4, behavior:"smooth"});
    }));
    // hero CTAs
    $$("[data-goto]").forEach(a => a.addEventListener("click", (e)=>{
      e.preventDefault();
      const id = a.dataset.goto;
      const btn = btns.find(x => x.dataset.tab === id);
      if(btn) btn.click();
    }));
  }

  // ---------- Vault progress ----------
  function keyCount(){ return APP.keys.filter(k => S.unlocked[k.id]).length; }
  function refreshVault(){
    const c = keyCount();
    const total = APP.keys.length;
    const pct = Math.round(c/total*100);
    $$("#vault-count").forEach(n => n.textContent = c + " of " + total + " keys unlocked");
    $$("#vault-bar > span").forEach(n => n.style.width = pct + "%");
    const cert = $("#cert");
    if(cert) cert.classList.toggle("on", c === total);
    if(c === total){
      const nm = (S.name || "Beloved").trim() || "Beloved";
      const who = $("#cert-name"); if(who) who.textContent = nm;
    }
  }

  // ---------- Keys ----------
  function renderKeys(){
    const wrap = $("#keys-grid");
    wrap.innerHTML = "";
    APP.keys.forEach(k => {
      const card = el("div", "key");
      const unlocked = !!S.unlocked[k.id];
      card.classList.toggle("unlocked", unlocked);
      card.classList.toggle("locked", !unlocked);

      const head = el("div", "row");
      const num = el("div","num", (unlocked ? "" : "🔒 ") + String(k.num).padStart(2,"0"));
      const icon = el("div","icon", unlocked ? k.icon : "🔒");
      head.appendChild(num);
      head.appendChild(icon);
      card.appendChild(head);

      card.appendChild(el("h3", null, k.title));
      card.appendChild(el("p", "idea", k.idea));

      const note = el("p","locked-note","Tap 'Reveal Scripture' and 'Unlock this key' to add it to your vault.");
      card.appendChild(note);

      const refs = el("div","refs");
      k.refs.forEach(r => {
        const chip = el("button","chip",r);
        chip.addEventListener("click", ()=> revealScripture(card, r));
        refs.appendChild(chip);
      });
      card.appendChild(refs);

      const reveal = el("div","reveal");
      reveal.dataset.slot = "reveal";
      card.appendChild(reveal);

      const unlockLine = el("p","unlock-line", "“" + k.unlock + "”");
      card.appendChild(unlockLine);

      const actions = el("div","actions");
      const listen = el("button","mini ghost","🎧 Listen");
      listen.addEventListener("click", ()=> speak(k.title + ". " + k.idea + " Declaration: " + k.unlock));
      actions.appendChild(listen);

      const unlockBtn = el("button","mini", unlocked ? "✓ Unlocked" : "🔓 Unlock this key");
      if(unlocked) unlockBtn.classList.add("on");
      unlockBtn.addEventListener("click", ()=>{
        S.unlocked[k.id] = !S.unlocked[k.id];
        save(); renderKeys();
      });
      actions.appendChild(unlockBtn);
      card.appendChild(actions);

      wrap.appendChild(card);
    });
    refreshVault();
  }
  function revealScripture(card, ref){
    const s = APP.scriptures.find(x => x.ref === ref);
    const slot = card.querySelector('[data-slot="reveal"]');
    if(!s || !slot) return;
    if(slot.classList.contains("on") && slot.dataset.ref === ref){
      slot.classList.remove("on"); return;
    }
    slot.textContent = s.ref + "\n\n" + s.text;
    slot.dataset.ref = ref;
    slot.classList.add("on");
    S.revealed[ref] = true; save();
  }

  // ---------- Scriptures tab (tap to reveal) ----------
  function renderScriptures(){
    const wrap = $("#scrip-list");
    wrap.innerHTML = "";
    APP.scriptures.forEach(s => {
      const d = el("details", "scrip");
      const sum = el("summary");
      sum.appendChild(el("span", null, s.ref));
      sum.appendChild(el("span","hint","Tap to reveal · KJV"));
      d.appendChild(sum);
      const body = el("div","body", s.text);
      d.appendChild(body);
      const row = el("div","row"); row.style.padding="0 14px 12px";
      const listen = el("button","mini ghost","🎧 Listen");
      listen.addEventListener("click", ()=> speak(s.ref + ". " + s.text));
      row.appendChild(listen);
      d.appendChild(row);
      wrap.appendChild(d);
    });
  }

  // ---------- Declarations deck (swipe) ----------
  function renderDeck(){
    const deck = $("#deck");
    const declEl = $("#decl-text");
    const countEl = $("#decl-count");
    const dots = $("#decl-dots");
    const total = APP.declarations.length;
    if(S.decl >= total) S.decl = 0;

    function paint(){
      const i = S.decl;
      countEl.textContent = "Declaration " + (i+1) + " of " + total;
      declEl.textContent = APP.declarations[i];
      dots.innerHTML = "";
      APP.declarations.forEach((_,idx)=>{
        const d = el("span","dot" + (idx===i ? " on":""));
        dots.appendChild(d);
      });
    }
    paint();

    $("#decl-prev").onclick = () => { S.decl = (S.decl - 1 + total) % total; save(); paint(); };
    $("#decl-next").onclick = () => { S.decl = (S.decl + 1) % total; save(); paint(); };
    $("#decl-speak").onclick = () => speak(APP.declarations[S.decl]);
    $("#decl-speak-all").onclick = () => speak("Repeat after me. " + APP.declarations.join(". "));

    // swipe
    let x0=null;
    deck.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, {passive:true});
    deck.addEventListener("touchend", e => {
      if(x0==null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if(Math.abs(dx) > 40){ dx < 0 ? $("#decl-next").click() : $("#decl-prev").click(); }
      x0 = null;
    });
    // keyboard
    document.addEventListener("keydown", e => {
      if(!$("#tab-declarations").classList.contains("on")) return;
      if(e.key === "ArrowRight") $("#decl-next").click();
      if(e.key === "ArrowLeft")  $("#decl-prev").click();
    });
  }

  // ---------- Scenarios ----------
  function renderScenarios(){
    const wrap = $("#scenarios");
    wrap.innerHTML = "";
    APP.scenarios.forEach((sc, idx) => {
      const box = el("div","scenario");
      box.appendChild(el("h3", null, "💰 " + sc.title));
      box.appendChild(el("p", null, sc.situation));
      const opts = el("div","options");
      sc.options.forEach((o, oi) => {
        const b = el("button","opt");
        b.appendChild(el("div", null, o.label));
        const why = el("div","why", o.why);
        b.appendChild(why);
        b.addEventListener("click", () => {
          $$(".opt", box).forEach(x => x.classList.remove("pick-ok","pick-no","show"));
          b.classList.add(o.ok ? "pick-ok" : "pick-no", "show");
          S.scenarios[idx] = { pick: oi, ok: !!o.ok };
          save();
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      wrap.appendChild(box);
    });
  }

  // ---------- Compare Kingdom vs World ----------
  function renderCompare(){
    const wrap = $("#compare");
    wrap.innerHTML = "";
    const head = el("div","head");
    const kh = el("div","kh","Kingdom Prosperity"); const wh = el("div","wh","Worldly Prosperity");
    head.appendChild(kh); head.appendChild(wh);
    wrap.appendChild(head);
    APP.compare.forEach(c => {
      const row = el("div","row");
      row.appendChild(el("div","col k", c.kingdom));
      row.appendChild(el("div","col w", c.worldly));
      wrap.appendChild(row);
    });
  }

  // ---------- Quick quiz ----------
  function renderQuiz(){
    const wrap = $("#quiz");
    wrap.innerHTML = "";
    APP.quiz.forEach((q, qi) => {
      const box = el("div","q");
      box.appendChild(el("div","prompt", (qi+1) + ". " + q.q));
      const opts = el("div","opts");
      q.a.forEach((label, ai) => {
        const b = el("button", null, label);
        b.addEventListener("click", () => {
          if(box.classList.contains("answered")) return;
          const ok = (ai === q.correct);
          b.classList.add(ok ? "ok" : "no");
          if(!ok){
            // highlight correct too
            $$("button", opts)[q.correct].classList.add("ok");
          }
          box.classList.add("answered");
          S.quiz[qi] = { pick: ai, ok };
          save();
          scoreQuiz();
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      const why = el("div","why","Why: " + q.why);
      box.appendChild(why);
      wrap.appendChild(box);
    });
    scoreQuiz();
  }
  function scoreQuiz(){
    const total = APP.quiz.length;
    const got = Object.values(S.quiz).filter(x => x && x.ok).length;
    const pill = $("#quiz-score");
    if(pill) pill.textContent = "Score: " + got + " of " + total;
  }

  // ---------- Fill in the blank ----------
  function renderFill(){
    const wrap = $("#fill");
    wrap.innerHTML = "";
    APP.fill.forEach((f, idx) => {
      const row = el("div","fill-row");
      row.appendChild(el("div","txt", f.text));
      const inp = el("input"); inp.type="text"; inp.placeholder="type the word";
      inp.value = (S.blanks[idx]||"");
      inp.addEventListener("input", () => { S.blanks[idx] = inp.value; save(); });
      row.appendChild(inp);
      row.appendChild(el("div","ref", f.ref));
      const mark = el("div","mark","");
      row.appendChild(mark);
      row._check = () => {
        const val = (inp.value||"").trim().toLowerCase().replace(/[.,;:!?]/g,"");
        const ans = f.answer.toLowerCase();
        if(!val){ mark.textContent = ""; mark.className="mark"; return; }
        if(val === ans){ mark.textContent = "Correct"; mark.className="mark ok"; }
        else { mark.textContent = "Answer: " + f.answer; mark.className="mark no"; }
      };
      wrap.appendChild(row);
    });
    $("#fill-check").onclick = () => $$("#fill .fill-row").forEach(r => r._check && r._check());
    $("#fill-reset").onclick = () => {
      $$("#fill .fill-row").forEach(r => { const i = r.querySelector("input"); if(i) i.value=""; });
      S.blanks = {}; save();
      $$("#fill .fill-row .mark").forEach(m => { m.textContent=""; m.className="mark"; });
    };
  }

  // ---------- Journal + application ----------
  function renderJournal(){
    const wrap = $("#journal");
    wrap.innerHTML = "";
    APP.application.forEach((qtext, idx) => {
      const box = el("div","journal-q");
      const lbl = el("label", null, (idx+1) + ". " + qtext);
      lbl.setAttribute("for","j-"+idx);
      box.appendChild(lbl);
      const ta = el("textarea"); ta.id = "j-"+idx; ta.value = (S.journal[idx] || "");
      const note = el("div","saved-note","Saved on this device");
      let t=null;
      ta.addEventListener("input", () => {
        S.journal[idx] = ta.value; save();
        note.classList.add("on");
        clearTimeout(t); t = setTimeout(()=> note.classList.remove("on"), 900);
      });
      box.appendChild(ta);
      box.appendChild(note);
      wrap.appendChild(box);
    });
  }

  // ---------- Audio clips ----------
  function renderClips(){
    const wrap = $("#clips");
    wrap.innerHTML = "";
    APP.clips.forEach(c => {
      const box = el("div","clip");
      box.appendChild(el("div","title","🎧 " + c.title));
      box.appendChild(el("div","body", c.body));
      const row = el("div","row");
      const play = el("button","mini","▶ Play clip");
      play.addEventListener("click", ()=> speak(c.body));
      const stop = el("button","mini ghost","■ Stop");
      stop.addEventListener("click", stopSpeak);
      const est = el("div","small","≈ " + c.sec + "s spoken");
      row.appendChild(play); row.appendChild(stop); row.appendChild(est);
      box.appendChild(row);
      wrap.appendChild(box);
    });
  }

  // ---------- Share cards ----------
  function renderCards(){
    const wrap = $("#card-grid");
    wrap.innerHTML = "";
    APP.cards.forEach((c, idx) => {
      const cc = el("div","share-card");
      cc.appendChild(el("div","line", "“" + c.line + "”"));
      if(c.ref) cc.appendChild(el("div","ref", c.ref + " · KJV"));
      const row = el("div","row");
      const copy = el("button", null, "Copy for WhatsApp");
      copy.addEventListener("click", () => {
        const text = "“" + c.line + "”" + (c.ref ? "\n— " + c.ref + " (KJV)" : "")
                    + "\n\nAnointing of Prosperity · Prophet Prince Amo David · Dominion Hour";
        try{ navigator.clipboard && navigator.clipboard.writeText(text); }catch(e){}
        copy.textContent = "Copied";
        setTimeout(()=> copy.textContent = "Copy for WhatsApp", 1200);
      });
      const download = el("button", null, "Save as image");
      download.addEventListener("click", () => downloadCard(c, idx));
      const listen = el("button", null, "Listen");
      listen.addEventListener("click", () => speak(c.line + (c.ref ? ". " + c.ref : "")));
      row.appendChild(copy); row.appendChild(download); row.appendChild(listen);
      cc.appendChild(row);
      wrap.appendChild(cc);
    });
  }
  function downloadCard(c, idx){
    // Draw a 1080x1350 WhatsApp-friendly image
    const W = 1080, H = 1350;
    const cvs = document.createElement("canvas");
    cvs.width = W; cvs.height = H;
    const ctx = cvs.getContext("2d");
    const palettes = [
      ["#0e7d5a","#06423a","#f2c94c"],
      ["#5b46b5","#1c1148","#f2c94c"],
      ["#c78a1a","#7a4c00","#fff8e0"],
      ["#c74a1a","#6a1f0a","#f2c94c"]
    ];
    const p = palettes[idx % palettes.length];
    const g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0, p[0]); g.addColorStop(1, p[1]);
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    // border
    ctx.strokeStyle = p[2]; ctx.lineWidth = 6; ctx.strokeRect(24,24,W-48,H-48);
    // eyebrow
    ctx.fillStyle = p[2];
    ctx.font = "700 30px DM Sans, Arial";
    ctx.fillText("PROSPERITY VAULT · DOMINION HOUR", 80, 130);
    // line
    ctx.fillStyle = "#fff8e0";
    ctx.font = "600 62px 'Source Serif 4', Georgia, serif";
    wrapText(ctx, "“" + c.line + "”", 80, 260, W-160, 78);
    // ref
    if(c.ref){
      ctx.fillStyle = p[2];
      ctx.font = "700 34px DM Sans, Arial";
      ctx.fillText("— " + c.ref + " (KJV)", 80, H - 220);
    }
    // footer
    ctx.fillStyle = "#fff8e0";
    ctx.font = "500 28px DM Sans, Arial";
    ctx.fillText("Anointing of Prosperity · Prophet Prince Amo David", 80, H - 120);
    ctx.fillStyle = p[2];
    ctx.font = "700 24px DM Sans, Arial";
    ctx.fillText("Aug 28, 2026 · Clubhouse", 80, H - 80);

    const url = cvs.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "prosperity-card-" + (idx+1) + ".png";
    document.body.appendChild(a); a.click(); a.remove();
  }
  function wrapText(ctx, text, x, y, maxW, lineH){
    const words = text.split(" ");
    let line = "";
    for(let i=0;i<words.length;i++){
      const test = line + words[i] + " ";
      if(ctx.measureText(test).width > maxW && line){
        ctx.fillText(line.trim(), x, y);
        line = words[i] + " "; y += lineH;
      } else line = test;
    }
    if(line) ctx.fillText(line.trim(), x, y);
  }

  // ---------- Final challenge ----------
  function renderFinal(){
    const wrap = $("#final");
    wrap.innerHTML = "";
    APP.finalChallenge.forEach((q, qi) => {
      const box = el("div","q");
      box.appendChild(el("div","prompt", "🏆 " + (qi+1) + ". " + q.q));
      const opts = el("div","opts");
      q.a.forEach((label, ai) => {
        const b = el("button", null, label);
        b.addEventListener("click", () => {
          if(box.classList.contains("answered")) return;
          const ok = (ai === q.correct);
          b.classList.add(ok ? "ok" : "no");
          if(!ok) $$("button", opts)[q.correct].classList.add("ok");
          box.classList.add("answered");
          S.final[qi] = { pick: ai, ok };
          save(); scoreFinal();
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      box.appendChild(el("div","why","Why: " + q.why));
      wrap.appendChild(box);
    });
    scoreFinal();
  }
  function scoreFinal(){
    const total = APP.finalChallenge.length;
    const got = Object.values(S.final).filter(x => x && x.ok).length;
    const pill = $("#final-score");
    if(pill) pill.textContent = "Score: " + got + " of " + total;
  }

  // ---------- Certificate name ----------
  function initCert(){
    const inp = $("#cert-input");
    if(!inp) return;
    inp.value = S.name || "";
    inp.addEventListener("input", () => { S.name = inp.value; save(); refreshVault(); });
    const print = $("#cert-print");
    if(print) print.addEventListener("click", () => window.print());
  }

  // ---------- Transcript ----------
  function initTranscript(){
    const btn = $("#tx-toggle");
    const box = $("#tx-box");
    if(!btn || !box) return;
    btn.addEventListener("click", () => {
      const on = box.classList.toggle("on");
      btn.textContent = on ? "Hide the transcript" : "Show the transcript";
      if(on && window.TRANSCRIPT) box.textContent = window.TRANSCRIPT;
    });
  }

  // ---------- Global controls ----------
  function initGlobal(){
    $("#stop-audio").addEventListener("click", stopSpeak);
    $("#clear-save").addEventListener("click", () => {
      if(!confirm("This will clear your progress on this device. Continue?")) return;
      S = JSON.parse(JSON.stringify(defaultState));
      save();
      renderKeys(); renderQuiz(); renderFill(); renderJournal(); renderDeck(); renderScenarios(); renderFinal();
      const inp = $("#cert-input"); if(inp) inp.value = "";
    });
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", function(){
    initTabs();
    renderKeys();
    renderScriptures();
    renderDeck();
    renderScenarios();
    renderCompare();
    renderQuiz();
    renderFill();
    renderJournal();
    renderClips();
    renderCards();
    renderFinal();
    initCert();
    initTranscript();
    initGlobal();
    refreshVault();
  });
})();
