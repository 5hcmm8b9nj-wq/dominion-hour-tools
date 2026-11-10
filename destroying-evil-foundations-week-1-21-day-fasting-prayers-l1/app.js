/* Destroying Evil Foundations — Week 1 of the 21 Days of Fasting and Prayer.
   L137 Deliverance Ministry with Pastor Kiky Ocansey and Dominion Hour with Prophet Prince Amo David.
   All progress is stored in localStorage on the member's own device only. */

const KEY = "dh21_v1";
const DEFAULT_STATE = { seen: [], fills: [], quiz: {}, prayed: [], fast: [], size: "md" };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return Object.assign({ ...DEFAULT_STATE }, JSON.parse(raw));
  } catch (e) { return { ...DEFAULT_STATE }; }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
let S = load();

const $ = (s, r) => (r || document).querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function addOnce(arr, v) { if (!arr.includes(v)) { arr.push(v); save(); renderHome(); } }

function verseHTML(ref, note) {
  const t = VERSES[ref] || "";
  return `<div class="verse"><span class="ref">${esc(ref)} (KJV)</span>
    <div class="txt">${esc(t)}</div>${note ? `<span class="note">${esc(note)}</span>` : ""}</div>`;
}

/* ---------------- text size ---------------- */
document.querySelectorAll(".sizebtn").forEach(b => {
  b.addEventListener("click", () => {
    S.size = b.dataset.size; save(); applySize();
  });
});
function applySize() {
  document.documentElement.setAttribute("data-size", S.size || "md");
  document.querySelectorAll(".sizebtn").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.size === (S.size || "md") ? "true" : "false"));
}

/* ---------------- navigation ---------------- */
const SECTIONS = ["home", "word", "memory", "quiz", "prayer", "visuals"];
function go(id) {
  SECTIONS.forEach(s => { $("#" + s).hidden = (s !== id); });
  document.querySelectorAll("nav.bottom button").forEach(b => {
    if (b.dataset.go === id) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
}
document.querySelectorAll("nav.bottom button").forEach(b =>
  b.addEventListener("click", () => go(b.dataset.go)));

/* ---------------- progress ---------------- */
function totals() {
  const total = FLASHCARD_REFS.length + FILL_INS.length + QUIZ.length + (MERCY_PRAYERS.length + FRIDAY_PRAYERS.length) + 21;
  const done = S.seen.length + S.fills.length + Object.keys(S.quiz).length + S.prayed.length + S.fast.length;
  return { total, done: Math.min(done, total) };
}
function ringSVG() {
  const { total, done } = totals();
  const pct = total ? done / total : 0;
  const r = 42, c = 2 * Math.PI * r;
  return `<svg width="110" height="110" viewBox="0 0 100 100" role="img" aria-label="${done} of ${total} activities completed">
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="#E0D8C2" stroke-width="12"/>
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="#C9A227" stroke-width="12" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - pct)).toFixed(1)}"
      transform="rotate(-90 50 50)"/>
    <text x="50" y="56" text-anchor="middle" font-size="24" font-weight="800" fill="#12234A"
      font-family="Inter, sans-serif">${Math.round(pct * 100)}%</text>
  </svg>`;
}

/* ---------------- read aloud ---------------- */
let speaking = null;
function speak(text, btn) {
  if (!("speechSynthesis" in window)) { btn.textContent = "Read aloud is not available on this phone"; return; }
  if (speaking === btn) { window.speechSynthesis.cancel(); speaking = null; resetSpeakBtns(); return; }
  window.speechSynthesis.cancel();
  resetSpeakBtns();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92; u.pitch = 1;
  u.onend = () => { speaking = null; resetSpeakBtns(); };
  speaking = btn;
  btn.innerHTML = "&#9632; Stop listening";
  window.speechSynthesis.speak(u);
}
function resetSpeakBtns() {
  document.querySelectorAll(".speakbtn").forEach(b => {
    if (b !== speaking) b.innerHTML = "&#9658; Listen to this word";
  });
}

/* ---------------- HOME ---------------- */
function renderHome() {
  const { total, done } = totals();
  const el = $("#home");
  el.innerHTML = `
    <div class="hero">
      <h1>${esc(SERIES.title)}</h1>
      <p class="topic">Topic: ${esc(SERIES.topic)}</p>
      <p class="dates">${esc(SERIES.dates)}<br>${esc(SERIES.fastdates)}</p>
      <div class="minhero">
        <div class="mh">
          <span class="mhname">L137 Deliverance Ministry</span>
          <span class="mhwith">with Pastor Kiky Ocansey</span>
          <span class="mhtag">Luke 1:37 &mdash; For with God nothing shall be impossible.</span>
        </div>
        <div class="mh">
          <span class="mhname">Dominion Hour</span>
          <span class="mhwith">with Prophet Prince Amo David</span>
          <span class="mhtag">Breaking Yokes. Restoring Destinies. Establishing Dominion.</span>
        </div>
      </div>
      <svg class="rays" width="120" height="60" viewBox="0 0 120 60" aria-hidden="true">
        <g stroke="#C9A227" stroke-width="3" stroke-linecap="round">
          <path d="M60 8 v14"/><path d="M36 16 l8 12"/><path d="M84 16 l-8 12"/>
          <path d="M18 34 l14 6"/><path d="M102 34 l-14 6"/>
        </g>
        <path d="M20 52 H100" stroke="#12234A" stroke-width="4" stroke-linecap="round"/>
      </svg>
      <div class="verse"><span class="ref">Matthew 17:21 (AMPC)</span>
        <div class="txt">${esc(SERIES.ampc)}</div></div>
      ${verseHTML("Matthew 17:21")}
      <p>${esc(SERIES.note)}</p>
    </div>

    <div class="card">
      <p class="eyebrow">Your progress</p>
      <div class="progwrap">
        ${ringSVG()}
        <div class="meta"><strong>${done} of ${total} activities</strong>
        Flashcards seen, fill-ins revealed, quiz questions answered, prayers prayed and fast days marked.</div>
      </div>
      <p style="margin-top:14px;font-size:.92rem;color:#3A4152;">Saved privately on this phone only. No sign-in.</p>
    </div>

    <div class="card">
      <p class="eyebrow">From the Series Opener</p>
      <h2 class="sec">EXCEPT BY FASTING AND PRAYER.</h2>
      ${SERIES.teaching.map(t => `<div class="teachpt"><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>`).join("")}
    </div>

    <div class="card">
      <p class="eyebrow">Start here</p>
      <button class="btn" data-goto="word">Read today's word</button>
      <button class="btn ghost" data-goto="memory">Practise the memory verses</button>
      <button class="btn ghost" data-goto="prayer">Pray the prayer points</button>
    </div>`;
  el.querySelectorAll("[data-goto]").forEach(b => b.addEventListener("click", () => go(b.dataset.goto)));
}

/* ---------------- DAILY WORD ---------------- */
function blockHTML(b) {
  switch (b.t) {
    case "verse": return verseHTML(b.ref);
    case "ampc": return `<div class="verse"><span class="ref">${esc(b.ref)}</span><div class="txt">${esc(b.text)}</div><span class="note">${esc(b.note)}</span></div>`;
    case "h": return `<h4>${esc(b.text)}</h4>`;
    case "p": return `<p>${esc(b.text)}</p>`;
    case "strong": return `<p><strong>${esc(b.text)}</strong></p>`;
    case "lead": return `<p><span class="lead-h">${esc(b.h)}</span> ${esc(b.text)}</p>`;
    case "ol": return `<ol class="prayers">${b.items.map(i => `<li>${esc(i)}</li>`).join("")}</ol>`;
    case "numprayer": return `<p class="numprayer"><span class="n">${esc(b.n)}</span> ${esc(b.text)}<br><span class="cite">${esc(b.cite)}</span></p>`;
    default: return "";
  }
}
function dayPlainText(d) {
  const parts = [d.title];
  d.blocks.forEach(b => {
    if (b.t === "verse") parts.push(b.ref + ". " + (VERSES[b.ref] || ""));
    else if (b.t === "ampc") parts.push(b.ref + ". " + b.text);
    else if (b.t === "lead") parts.push(b.h + " " + b.text);
    else if (b.t === "ol") b.items.forEach((i, n) => parts.push((n + 1) + ". " + i));
    else if (b.t === "numprayer") parts.push(b.n + " " + b.text + " " + b.cite);
    else if (b.text) parts.push(b.text);
  });
  if (d.signoff) parts.push(d.signoff.join(" "));
  return parts.join("\n");
}
function renderWord() {
  const el = $("#word");
  el.innerHTML = `<h2 class="sec">Daily Word</h2>
    <p class="seclead">Tap a day to open it. Each entry shows the day of the fast, the weekday and date, and exactly what was posted \u2014 word for word.</p>
    <div id="daylist"></div>`;
  const list = $("#daylist");
  DAYS.forEach((d, i) => {
    const wrap = document.createElement("details");
    wrap.className = "day";
    if (i === DAYS.length - 1) wrap.open = true;
    wrap.innerHTML = `
      <summary class="dhead">
        <span>
          <span class="dlab">${esc(d.daymark)}</span><br>
          <span class="dposted">Posted:</span>
          <span class="dtitle">${esc(d.title)}</span>
        </span>
        <svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </summary>
      <div class="dbody">
        <button class="btn gold speakbtn">&#9658; Listen to this word</button>
        ${d.blocks.map(blockHTML).join("")}
        ${d.signoff ? `<div class="signoff">${d.signoff.map(s => `<div>${esc(s)}</div>`).join("")}</div>` : ""}
      </div>`;
    wrap.querySelector(".speakbtn").addEventListener("click", e => speak(dayPlainText(d), e.currentTarget));
    list.appendChild(wrap);
  });
}

/* ---------------- MEMORY VERSES ---------------- */
let memMode = "ref";  // "ref" = show reference first, "text" = show verse first
let memIdx = 0, memFlipped = false;

function renderMemory() {
  const el = $("#memory");
  el.innerHTML = `<h2 class="sec">Memory Verses</h2>
    <p class="seclead">Tap the card to see the other side. There is no score and no time limit &mdash; go at your own pace.</p>
    <div class="tabs">
      <button class="tab" data-mode="ref">Show reference first</button>
      <button class="tab" data-mode="text">Show verse first</button>
    </div>
    <div id="flashhost"></div>
    <h3 style="margin-top:34px;">Fill in the missing word</h3>
    <p class="seclead">Say the verse in your heart, then tap the gold line to see the word.</p>
    <div id="fillhost"></div>`;
  el.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
    memMode = t.dataset.mode; memFlipped = false; drawFlash();
  }));
  drawFlash();
  drawFills();
}
function drawFlash() {
  document.querySelectorAll("#memory .tab").forEach(t =>
    t.setAttribute("aria-pressed", t.dataset.mode === memMode ? "true" : "false"));
  const ref = FLASHCARD_REFS[memIdx];
  const txt = VERSES[ref] || "";
  const front = memMode === "ref"
    ? `<div class="side">Reference</div><div class="big">${esc(ref)}</div><div class="hint">Tap to see the full verse</div>`
    : `<div class="side">Verse (KJV)</div><div class="vtext">${esc(txt)}</div><div class="hint">Tap to see the reference</div>`;
  const back = memMode === "ref"
    ? `<div class="side">${esc(ref)} (KJV)</div><div class="vtext">${esc(txt)}</div><div class="hint">Tap to go back</div>`
    : `<div class="side">Reference</div><div class="big">${esc(ref)}</div><div class="hint">Tap to go back</div>`;
  $("#flashhost").innerHTML = `
    <button class="flash" id="flashcard">${memFlipped ? back : front}</button>
    <div class="cardnav">
      <button class="btn ghost" id="prevcard">&#8592; Back</button>
      <button class="btn" id="nextcard">Next &#8594;</button>
    </div>
    <p class="counter">Card ${memIdx + 1} of ${FLASHCARD_REFS.length} &middot; ${S.seen.length} seen so far</p>`;
  $("#flashcard").addEventListener("click", () => {
    memFlipped = !memFlipped;
    if (memFlipped) addOnce(S.seen, ref);
    drawFlash();
  });
  $("#prevcard").addEventListener("click", () => {
    memIdx = (memIdx - 1 + FLASHCARD_REFS.length) % FLASHCARD_REFS.length; memFlipped = false; drawFlash();
  });
  $("#nextcard").addEventListener("click", () => {
    memIdx = (memIdx + 1) % FLASHCARD_REFS.length; memFlipped = false; drawFlash();
  });
}
function drawFills() {
  const host = $("#fillhost");
  host.innerHTML = FILL_INS.map((f, i) => `
    <div class="fill">
      <div class="ref">${esc(f.ref)} (KJV)</div>
      <p class="sentence">${esc(f.before)}
        <button class="blank" data-fill="${i}" aria-label="Reveal the missing word">${S.fills.includes(i) ? esc(f.blank) : "&hellip;"}</button>
        ${esc(f.after)}</p>
    </div>`).join("");
  host.querySelectorAll("[data-fill]").forEach(b => b.addEventListener("click", () => {
    const i = +b.dataset.fill;
    b.textContent = FILL_INS[i].blank;
    b.classList.add("revealed");
    addOnce(S.fills, i);
  }));
  host.querySelectorAll(".blank").forEach(b => { if (b.textContent !== "…") b.classList.add("revealed"); });
}

/* ---------------- QUIZ ---------------- */
let qIdx = 0;
function renderQuiz() {
  const el = $("#quiz");
  el.innerHTML = `<h2 class="sec">Quiz</h2>
    <p class="seclead">Every question comes from the words shared in this fast. Nothing is timed and nothing is marked wrong against you.</p>
    <div id="quizhost"></div>`;
  drawQuiz();
}
function drawQuiz() {
  const q = QUIZ[qIdx];
  const answered = S.quiz[qIdx];
  const host = $("#quizhost");
  host.innerHTML = `
    <div class="qmeta"><span>Question ${qIdx + 1} of ${QUIZ.length}</span><span>${Object.keys(S.quiz).length} answered</span></div>
    <div class="qcard">
      <p class="qtext">${esc(q.q)}</p>
      <div id="opts">
        ${q.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("")}
      </div>
      <div id="qfeedback"></div>
      <div style="margin-top:12px;">
        <button class="btn ghost" id="showans">Show me the answer instead</button>
      </div>
    </div>
    <div class="cardnav">
      <button class="btn ghost" id="qprev">&#8592; Back</button>
      <button class="btn" id="qnext">Next &#8594;</button>
    </div>`;
  host.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
    const i = +b.dataset.i;
    S.quiz[qIdx] = i; save(); renderHome(); reveal(i);
  }));
  $("#showans").addEventListener("click", () => reveal(null));
  $("#qprev").addEventListener("click", () => { qIdx = (qIdx - 1 + QUIZ.length) % QUIZ.length; drawQuiz(); });
  $("#qnext").addEventListener("click", () => { qIdx = (qIdx + 1) % QUIZ.length; drawQuiz(); });
  if (answered !== undefined) reveal(answered);
}
function reveal(chosen) {
  const q = QUIZ[qIdx];
  document.querySelectorAll("#opts .opt").forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) b.classList.add("correct");
    else if (chosen !== null && i === chosen) b.classList.add("wrong");
  });
  const good = chosen === q.a;
  $("#qfeedback").innerHTML = `
    <div class="feedback">
      <div class="head">${chosen === null ? "The answer" : (good ? "Correct \u2014 Amen." : "The answer is:")}</div>
      <p style="margin:0 0 10px;"><strong>${esc(q.options[q.a])}</strong></p>
      <p style="margin:0 0 12px;">${esc(q.why)}</p>
      ${verseHTML(q.ref)}
    </div>`;
}

/* ---------------- PRAYER TOOL ---------------- */
let walkSet = "mercy", walkIdx = 0;
function currentWalk() {
  return walkSet === "mercy"
    ? MERCY_PRAYERS.map((t, i) => ({ id: "m" + i, n: "Prayer point " + (i + 1) + " of 12", text: t, ref: null }))
    : FRIDAY_PRAYERS.map((p, i) => ({ id: "f" + i, n: "Friday prayer " + p.n.replace(")", "") + " of 3", text: p.text, cite: p.cite, ref: p.ref }));
}
function renderPrayer() {
  const el = $("#prayer");
  el.innerHTML = `<h2 class="sec">Prayer Tool</h2>
    <p class="seclead">One prayer at a time. Pray it out loud, then tap Next.</p>
    <div class="tabs">
      <button class="tab" data-set="mercy">The Sure Mercies (12)</button>
      <button class="tab" data-set="friday">Friday renunciation (3)</button>
    </div>
    <div id="walkhost"></div>
    <h3 style="margin-top:34px;">21-Day Fast Tracker</h3>
    <p class="seclead">3 August &ndash; 25 August 2026. Tap a circle each day you fast. Saved on your phone.</p>
    <div id="trackhost"></div>`;
  el.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
    walkSet = t.dataset.set; walkIdx = 0; drawWalk();
  }));
  drawWalk();
  drawTracker();
}
function drawWalk() {
  document.querySelectorAll("#prayer .tab").forEach(t =>
    t.setAttribute("aria-pressed", t.dataset.set === walkSet ? "true" : "false"));
  const list = currentWalk();
  if (walkIdx >= list.length) walkIdx = 0;
  const p = list[walkIdx];
  const done = S.prayed.includes(p.id);
  $("#walkhost").innerHTML = `
    <div class="walk">
      <div class="pnum">${esc(p.n)}</div>
      <p class="ptext">${esc(p.text)}</p>
      ${p.cite ? `<p class="cite" style="margin:0 0 12px;">${esc(p.cite)}</p>` : ""}
      ${p.ref ? verseHTML(p.ref) : ""}
      <button class="prayed" id="prayedbtn" aria-pressed="${done}">
        <span class="box">${done ? "\u2713" : ""}</span> ${done ? "Prayed" : "Mark as prayed"}
      </button>
    </div>
    <div class="cardnav">
      <button class="btn ghost" id="wprev">&#8592; Back</button>
      <button class="btn" id="wnext">Next &#8594;</button>
    </div>
    <p class="counter">${walkIdx + 1} of ${list.length} &middot; ${S.prayed.length} prayers marked</p>`;
  $("#prayedbtn").addEventListener("click", () => {
    const i = S.prayed.indexOf(p.id);
    if (i >= 0) S.prayed.splice(i, 1); else S.prayed.push(p.id);
    save(); renderHome(); drawWalk();
  });
  $("#wprev").addEventListener("click", () => { walkIdx = (walkIdx - 1 + list.length) % list.length; drawWalk(); window.scrollTo(0, 0); });
  $("#wnext").addEventListener("click", () => { walkIdx = (walkIdx + 1) % list.length; drawWalk(); window.scrollTo(0, 0); });
}
function drawTracker() {
  const host = $("#trackhost");
  host.innerHTML = `<div class="tracker">${Array.from({ length: 21 }, (_, i) =>
    `<button class="daydot" data-day="${i + 1}" aria-pressed="${S.fast.includes(i + 1)}" aria-label="Day ${i + 1}">${i + 1}</button>`).join("")}</div>
    <p class="counter" id="trackcount">${S.fast.length} of 21 days marked</p>`;
  host.querySelectorAll(".daydot").forEach(b => b.addEventListener("click", () => {
    const d = +b.dataset.day;
    const i = S.fast.indexOf(d);
    if (i >= 0) S.fast.splice(i, 1); else S.fast.push(d);
    save(); renderHome(); drawTracker();
  }));
}

/* ---------------- VISUALS ---------------- */
function renderVisuals() {
  const el = $("#visuals");
  const max = Math.max(...THEMES.map(t => t.count));
  el.innerHTML = `<h2 class="sec">Visuals</h2>
    <p class="seclead">Built to read straight down the phone screen. No side-scrolling.</p>

    <h3>Bloodline of evil foundations</h3>
    <p class="seclead">Tap any step to read the Scripture in full.</p>
    <div class="tl" id="tl"></div>

    <h3 style="margin-top:34px;">Evil Foundation and Sure Foundation</h3>
    ${FOUNDATION_COMPARE.map(c => `
      <div class="cmp ${c.kind}">
        <h3>${esc(c.title)}</h3>
        <ul>${c.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        ${verseHTML(c.ref)}
      </div>`).join("")}

    <h3 style="margin-top:34px;">Recurring themes across the days</h3>
    <div class="bars card">
      ${THEMES.map(t => `
        <div class="barrow">
          <div class="blab"><span>${esc(t.name)}</span><span>${t.count} day${t.count > 1 ? "s" : ""}</span></div>
          <div class="bartrack"><div class="barfill" style="width:${Math.round(t.count / max * 100)}%"></div></div>
          <div class="barnote">${esc(t.days)}</div>
        </div>`).join("")}
    </div>`;
  const tl = $("#tl");
  BLOODLINE.forEach((n, i) => {
    const d = document.createElement("details");
    d.className = "tlnode";
    d.innerHTML = `<summary class="tlbtn">${esc(n.name)}<span class="plus">Tap</span></summary>
      <div class="tlpanel"><p>${esc(n.note)}</p>${verseHTML(n.ref)}</div>`;
    tl.appendChild(d);
  });
}

/* ---------------- init ---------------- */
applySize();
renderHome();
renderWord();
renderMemory();
renderQuiz();
renderPrayer();
renderVisuals();
go("home");
