// ============ State ============
const state = {
  rate: 1.0,
  voice: null,
  currentUtterance: null,
  currentQueue: [],
};

// ============ Progress (localStorage) ============
const PROGRESS_KEY = "mantles_progress_v1";
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch {}
}
function getMantleProgress(n) {
  const p = loadProgress();
  return p[n] || { read: false, flashcardsFlipped: 0, quizCorrect: 0, quizAttempts: 0, scenarioDone: false, complete: false };
}
function updateMantleProgress(n, patch) {
  const p = loadProgress();
  const cur = getMantleProgress(n);
  const next = { ...cur, ...patch };
  // Mark complete when they have read + attempted quiz + done scenario
  next.complete = next.read && next.quizAttempts >= 2 && next.scenarioDone;
  p[n] = next;
  saveProgress(p);
  renderProgressBadges();
  return next;
}
function resetProgress() {
  saveProgress({});
  renderProgressBadges();
  renderProgressView();
}

// ============ Tabs ============
document.querySelectorAll(".tab").forEach(t => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
    t.classList.add("is-active"); t.setAttribute("aria-selected", "true");
    const target = t.dataset.tab;
    document.querySelectorAll(".view").forEach(v => v.classList.remove("is-active"));
    document.getElementById("view-" + target).classList.add("is-active");
    if (target === "progress") renderProgressView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ============ Build grid ============
const grid = document.getElementById("grid");
MANTLES.forEach((m) => {
  const btn = document.createElement("button");
  btn.className = "card";
  btn.style.setProperty("--card-accent", m.color.accent);
  btn.style.setProperty("--card-bg", m.color.bg);
  btn.style.setProperty("--card-border", m.color.border);
  btn.setAttribute("aria-label", `Mantle ${m.n}: ${m.title}`);
  btn.innerHTML = `
    <div class="card-num">Mantle ${String(m.n).padStart(2, "0")}</div>
    <div class="progress-dot" data-dot="${m.n}" aria-hidden="true">○</div>
    <div class="card-emoji" aria-hidden="true">${m.emoji}</div>
    <div class="card-title">${m.title}</div>
    <div class="card-sub">${m.sub}</div>
    <div class="card-cta">Open</div>
  `;
  btn.addEventListener("click", () => openMantle(m));
  grid.appendChild(btn);
});

// ============ Mode switcher ============
const modeHints = {
  read: "Read mode: full teaching, scriptures and prayers.",
  listen: "Listen mode: tap the speaker on any part to hear it.",
  watch: "Watch mode: pictures and symbols with short text.",
  simple: "Simple mode: short easy words. Great for children or first readers.",
};
document.querySelectorAll(".mode-btn").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
    b.classList.add("is-active");
    b.setAttribute("aria-selected", "true");
    const mode = b.dataset.mode;
    document.body.dataset.mode = mode;
    document.getElementById("modeHint").textContent = modeHints[mode];
  });
});

// ============ Settings ============
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
settingsBtn.addEventListener("click", () => {
  const isOpen = !settingsPanel.hasAttribute("hidden");
  if (isOpen) { settingsPanel.setAttribute("hidden", ""); settingsBtn.setAttribute("aria-expanded", "false"); }
  else { settingsPanel.removeAttribute("hidden"); settingsBtn.setAttribute("aria-expanded", "true"); }
});
document.querySelectorAll(".chip").forEach((c) => {
  c.addEventListener("click", () => {
    const action = c.dataset.action;
    const value = c.dataset.value;
    // Toggle within same action group
    document.querySelectorAll(`.chip[data-action="${action}"]`).forEach(x => x.classList.remove("is-active"));
    c.classList.add("is-active");
    if (action === "size") document.body.dataset.size = value;
    if (action === "font") document.body.dataset.font = value;
    if (action === "theme") document.body.dataset.theme = value;
    if (action === "rate") state.rate = parseFloat(value);
  });
});

// ============ Build blueprint ============
const rhythmDays = document.getElementById("rhythmDays");
if (rhythmDays && typeof DAILY_RHYTHM !== "undefined") {
  DAILY_RHYTHM.forEach(r => {
    const d = document.createElement("div");
    d.className = "rhythm-day";
    d.innerHTML = `
      <div class="r-day">${r.day}</div>
      <div class="r-ico" aria-hidden="true">${r.ico}</div>
      <div class="r-theme">${r.theme}</div>
      <div class="r-prompt">${r.prompt}</div>
    `;
    rhythmDays.appendChild(d);
  });
}

const blueprintList = document.getElementById("blueprintList");
if (blueprintList && typeof BLUEPRINT_WEEKS !== "undefined") {
  let currentMonth = "";
  BLUEPRINT_WEEKS.forEach(w => {
    if (w.month !== currentMonth) {
      const h = document.createElement("h2");
      h.className = "month-header";
      h.textContent = w.month;
      blueprintList.appendChild(h);
      currentMonth = w.month;
    }
    // Find the mantle (mantleN === 0 means Watchnight / all mantles)
    const m = MANTLES.find(x => x.n === w.mantleN);
    const accent = m ? m.color.accent : "#7a3e1d";
    const bgc    = m ? m.color.bg     : "#fff8ed";
    const border = m ? m.color.border : "#e9d4b0";
    const emoji  = m ? m.emoji : "🕯️";
    const mantleName = m ? m.title.replace(/^The /, "") : "All 12 mantles · Job 33 sealing";

    const card = document.createElement("div");
    card.className = "week-card";
    card.style.setProperty("--card-accent", accent);
    card.style.setProperty("--card-border", border);

    const scripturesHtml = m ? m.scriptures.map(s => `
      <div class="scripture-box">
        <div class="scripture-ref">${s.ref}</div>
        <p class="scripture-text">${s.text}</p>
      </div>
    `).join("") : `
      <div class="scripture-box">
        <div class="scripture-ref">1 Corinthians 2:12 (KJV)</div>
        <p class="scripture-text">Now we have received, not the spirit of the world, but the spirit which is of God; that we might know the things that are freely given to us of God.</p>
      </div>`;

    const declText = m ? m.declaration : "I pick up every mantle released this season. I refuse to let one word fall to the ground. In the name of Jesus. Amen.";
    const prayerText = m ? m.prayer : "Father, seal every mantle from this Ember season in me. Take me into the new year already carrying what You have given. In Jesus’ name. Amen.";

    card.innerHTML = `
      <div class="week-num"><div class="wn-label">Week</div><div class="wn-value">${w.w}</div></div>
      <div class="week-meta">
        <div class="week-dates">${w.from} – ${w.to}</div>
        <div class="week-focus">${w.focus}</div>
        <div class="week-mantle"><span class="m-emoji" aria-hidden="true">${emoji}</span> ${mantleName}</div>
      </div>
      <div class="week-open">Open</div>
      <div class="week-details">
        ${scripturesHtml}
        <div class="declaration-box">
          <div class="decl-label">Declaration — Repeat after me</div>
          <p class="declaration-text">${declText}</p>
        </div>
        <p class="prayer-text" style="margin-top:0.9rem">${prayerText}</p>
        ${m ? `<button class="week-cta" data-goto-mantle="${m.n}"><span aria-hidden="true">→</span> Open the full mantle</button>` : ""}
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-goto-mantle]")) return; // handled below
      card.classList.toggle("is-open");
      const openEl = card.querySelector(".week-open");
      if (openEl) openEl.textContent = card.classList.contains("is-open") ? "Close" : "Open";
    });

    blueprintList.appendChild(card);
  });

  blueprintList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-goto-mantle]");
    if (!btn) return;
    e.stopPropagation();
    const n = parseInt(btn.dataset.gotoMantle, 10);
    const m = MANTLES.find(x => x.n === n);
    if (m) {
      // Switch back to Mantles view then open dialog
      document.querySelector('.tab[data-tab="mantles"]').click();
      setTimeout(() => openMantle(m), 200);
    }
  });
}

// ============ Speech synthesis ============
function pickVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Prefer a natural English voice
  const prefer = voices.find(v => /Google.*English|Samantha|Karen|Serena|Daniel|Microsoft.*Aria|Microsoft.*Jenny/i.test(v.name) && /en/i.test(v.lang));
  return prefer || voices.find(v => /en-US|en-GB/i.test(v.lang)) || voices[0];
}
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = () => { state.voice = pickVoice(); };
  state.voice = pickVoice();
}

function stopSpeaking() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  state.currentQueue = [];
  document.querySelectorAll(".is-speaking").forEach(el => el.classList.remove("is-speaking"));
  const stopBtn = document.getElementById("stopAll");
  if (stopBtn) stopBtn.hidden = true;
}

function speakOne(text, opts = {}) {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) { resolve(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = state.rate;
    u.pitch = opts.pitch || 1;
    if (state.voice) u.voice = state.voice;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    speechSynthesis.speak(u);
  });
}

async function speakQueue(items) {
  stopSpeaking();
  document.getElementById("stopAll").hidden = false;
  for (const item of items) {
    if (item.el) item.el.classList.add("is-speaking");
    await speakOne(item.text, item.opts);
    if (item.el) item.el.classList.remove("is-speaking");
  }
  document.getElementById("stopAll").hidden = true;
}

// Delegate inline "hear it out loud" buttons
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-listen]");
  if (!t) return;
  const target = document.querySelector(t.dataset.listen);
  if (!target) return;
  speakQueue([{ el: target, text: target.textContent.trim() }]);
});

document.getElementById("stopAll").addEventListener("click", stopSpeaking);

// ============ Dialog ============
const dialog = document.getElementById("mantleDialog");
const dialogBody = document.getElementById("dialogBody");
const dialogTitle = document.getElementById("dialogTitle");
const dialogSub = document.getElementById("dialogSub");
const dialogKicker = document.getElementById("dialogKicker");

function openMantle(m) {
  stopSpeaking();
  // Set accent variables for this mantle
  dialog.style.setProperty("--card-accent", m.color.accent);
  dialog.style.setProperty("--card-bg", m.color.bg);
  dialog.style.setProperty("--card-border", m.color.border);
  dialogKicker.textContent = `Mantle ${String(m.n).padStart(2, "0")} · ${m.emoji}`;
  dialogTitle.textContent = m.title;
  dialogSub.textContent = m.sub;

  const scripturesHtml = m.scriptures.map(s => `
    <div class="scripture-box">
      <div class="scripture-ref">${s.ref}</div>
      <p class="scripture-text">${s.text}</p>
    </div>
  `).join("");

  const picsHtml = m.pics.map(p => `
    <div class="pic-item">
      <div class="pic-ico" aria-hidden="true">${p.ico}</div>
      <div class="pic-cap">${p.cap}</div>
    </div>
  `).join("");

  dialogBody.innerHTML = `
    <div class="simple-summary">${m.simple}</div>
    <div class="picture-strip" aria-label="Picture summary">${picsHtml}</div>

    <section class="section-block what-block">
      <div class="section-heading"><span class="heading-ico" aria-hidden="true">✳️</span> What was released</div>
      <p class="what-text">${m.what}</p>
      <button class="listen-inline" data-role="listen-what"><span aria-hidden="true">🔊</span> Hear it</button>
    </section>

    <section class="section-block scripture-block">
      <div class="section-heading"><span class="heading-ico" aria-hidden="true">📖</span> Scripture — King James Version</div>
      ${scripturesHtml}
      <button class="listen-inline" data-role="listen-scripture"><span aria-hidden="true">🔊</span> Hear the scripture</button>
    </section>

    <section class="section-block prayer-block">
      <div class="section-heading"><span class="heading-ico" aria-hidden="true">🙏</span> Prayer to receive the mantle</div>
      <p class="prayer-text">${m.prayer}</p>
      <button class="listen-inline" data-role="listen-prayer"><span aria-hidden="true">🔊</span> Hear the prayer</button>
    </section>

    <section class="section-block declaration-block">
      <div class="declaration-box">
        <div class="decl-label">Declaration — Repeat after me</div>
        <p class="declaration-text">${m.declaration}</p>
        <button class="listen-inline" data-role="listen-decl"><span aria-hidden="true">🔊</span> Say it with me</button>
      </div>
    </section>

    <section class="section-block reflection-block">
      <div class="section-heading"><span class="heading-ico" aria-hidden="true">✍️</span> Reflection</div>
      <p class="reflection-text">${m.reflection}</p>
      <div class="reflect-lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </section>

    ${renderFlashcardsSection(m)}
    ${renderQuizSection(m)}
    ${renderScenarioSection(m)}

    <div class="mantle-complete" data-role="mantle-complete" hidden>
      <div class="check" aria-hidden="true">✓</div>
      <div class="title">Mantle received</div>
      <div class="sub">You have read, tested, and worked through this mantle. Check your progress tab.</div>
    </div>
  `;

  // Mark 'read' progress once opened
  updateMantleProgress(m.n, { read: true });

  // Wire the new interactive sections
  wireFlashcards(m);
  wireQuiz(m);
  wireScenario(m);
  refreshCompletionBadge(m.n);

  // Wire the section-level speak buttons
  dialogBody.querySelector('[data-role="listen-what"]').addEventListener("click", () => {
    const el = dialogBody.querySelector(".what-text");
    speakQueue([{ el, text: el.textContent }]);
  });
  dialogBody.querySelector('[data-role="listen-scripture"]').addEventListener("click", () => {
    const items = [...dialogBody.querySelectorAll(".scripture-box")].map(b => ({
      el: b, text: `${b.querySelector(".scripture-ref").textContent}. ${b.querySelector(".scripture-text").textContent}`
    }));
    speakQueue(items);
  });
  dialogBody.querySelector('[data-role="listen-prayer"]').addEventListener("click", () => {
    const el = dialogBody.querySelector(".prayer-text");
    speakQueue([{ el, text: el.textContent }]);
  });
  dialogBody.querySelector('[data-role="listen-decl"]').addEventListener("click", () => {
    const el = dialogBody.querySelector(".declaration-text");
    speakQueue([{ el, text: el.textContent }, { el, text: el.textContent }]);
  });

  dialog.showModal();
}

// ============ Flashcards ============
function renderFlashcardsSection(m) {
  const cards = (LEARNING[m.n] || {}).flashcards || [];
  if (!cards.length) return "";
  return `
    <section class="section-block">
      <div class="learn-heading"><span class="num">1</span> Flashcards — tap to flip</div>
      <div class="flashcards" data-role="flashcards">
        <div class="flash-viewport">
          <div class="flash-card" data-role="flash-card" tabindex="0" aria-label="Flashcard, tap or press space to flip">
            <div class="flash-face front">
              <div class="flash-role">Question</div>
              <div class="flash-text" data-role="flash-front"></div>
              <div class="flash-hint">Tap the card to reveal</div>
            </div>
            <div class="flash-face back">
              <div class="flash-role">Answer</div>
              <div class="flash-text" data-role="flash-back"></div>
            </div>
          </div>
        </div>
        <div class="flash-controls">
          <button class="flash-btn" data-role="flash-prev">← Prev</button>
          <div class="flash-counter" data-role="flash-count"></div>
          <button class="flash-btn" data-role="flash-next">Next →</button>
        </div>
      </div>
    </section>
  `;
}
function wireFlashcards(m) {
  const cards = (LEARNING[m.n] || {}).flashcards || [];
  if (!cards.length) return;
  const root = dialogBody.querySelector('[data-role="flashcards"]');
  const card = root.querySelector('[data-role="flash-card"]');
  const front = root.querySelector('[data-role="flash-front"]');
  const back = root.querySelector('[data-role="flash-back"]');
  const count = root.querySelector('[data-role="flash-count"]');
  let idx = 0;
  const flippedSet = new Set();
  function render() {
    card.classList.remove("is-flipped");
    front.textContent = cards[idx].front;
    back.textContent = cards[idx].back;
    count.textContent = `${idx + 1} of ${cards.length}`;
  }
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
    if (card.classList.contains("is-flipped")) {
      flippedSet.add(idx);
      updateMantleProgress(m.n, { flashcardsFlipped: Math.max(getMantleProgress(m.n).flashcardsFlipped, flippedSet.size) });
    }
  });
  card.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); card.click(); } });
  root.querySelector('[data-role="flash-prev"]').addEventListener("click", () => {
    idx = (idx - 1 + cards.length) % cards.length; render();
  });
  root.querySelector('[data-role="flash-next"]').addEventListener("click", () => {
    idx = (idx + 1) % cards.length; render();
  });
  render();
}

// ============ Quiz ============
function renderQuizSection(m) {
  const questions = (LEARNING[m.n] || {}).quiz || [];
  if (!questions.length) return "";
  return `
    <section class="section-block">
      <div class="learn-heading"><span class="num">2</span> Knowledge check — pick before you peek</div>
      <div class="quiz" data-role="quiz">
        <div class="quiz-question" data-role="quiz-q"></div>
        <div class="quiz-options" data-role="quiz-opts"></div>
        <div class="quiz-explain" data-role="quiz-explain" hidden></div>
        <div class="quiz-nav">
          <div class="quiz-count" data-role="quiz-count"></div>
          <button class="quiz-next" data-role="quiz-next" disabled>Next question</button>
        </div>
      </div>
    </section>
  `;
}
function wireQuiz(m) {
  const questions = (LEARNING[m.n] || {}).quiz || [];
  if (!questions.length) return;
  const root = dialogBody.querySelector('[data-role="quiz"]');
  const qEl = root.querySelector('[data-role="quiz-q"]');
  const optsEl = root.querySelector('[data-role="quiz-opts"]');
  const explainEl = root.querySelector('[data-role="quiz-explain"]');
  const countEl = root.querySelector('[data-role="quiz-count"]');
  const nextBtn = root.querySelector('[data-role="quiz-next"]');
  let i = 0, correctCount = 0;

  function render() {
    const q = questions[i];
    qEl.textContent = q.q;
    optsEl.innerHTML = q.options.map((opt, k) => `
      <button class="quiz-option" data-k="${k}">
        <span class="letter">${String.fromCharCode(65 + k)}</span>
        <span>${opt}</span>
      </button>
    `).join("");
    explainEl.hidden = true;
    explainEl.textContent = "";
    countEl.textContent = `Question ${i + 1} of ${questions.length}`;
    nextBtn.disabled = true;
    nextBtn.textContent = i === questions.length - 1 ? "Finish" : "Next question";

    optsEl.querySelectorAll(".quiz-option").forEach(b => {
      b.addEventListener("click", () => {
        const k = parseInt(b.dataset.k, 10);
        // Disable all
        optsEl.querySelectorAll(".quiz-option").forEach(x => x.disabled = true);
        const isCorrect = k === q.correct;
        if (isCorrect) { b.classList.add("is-correct"); correctCount++; }
        else {
          b.classList.add("is-wrong");
          const correctBtn = optsEl.querySelector(`.quiz-option[data-k="${q.correct}"]`);
          if (correctBtn) correctBtn.classList.add("is-correct");
        }
        explainEl.hidden = false;
        explainEl.innerHTML = `<strong>${isCorrect ? "Correct." : "Not quite."}</strong> ${q.explain}`;
        nextBtn.disabled = false;

        updateMantleProgress(m.n, {
          quizAttempts: getMantleProgress(m.n).quizAttempts + 1,
          quizCorrect: getMantleProgress(m.n).quizCorrect + (isCorrect ? 1 : 0),
        });
        refreshCompletionBadge(m.n);
      });
    });
  }

  nextBtn.addEventListener("click", () => {
    if (i < questions.length - 1) { i++; render(); }
    else {
      // Finished — replace quiz with score
      root.innerHTML = `
        <div class="quiz-question">Quiz complete — ${correctCount} of ${questions.length} correct.</div>
        <div class="quiz-explain" style="margin-top:0">Answering — right or wrong — is how the truth settles into you. Return any time to try again.</div>
      `;
    }
  });

  render();
}

// ============ Scenario ============
function renderScenarioSection(m) {
  const s = (LEARNING[m.n] || {}).scenario;
  if (!s) return "";
  return `
    <section class="section-block">
      <div class="learn-heading"><span class="num">3</span> What would you do?</div>
      <div class="scenario" data-role="scenario">
        <div class="scenario-situation">${s.situation}</div>
        <div class="scenario-prompt">Choose your response</div>
        <div class="quiz-options" data-role="scenario-opts">
          ${s.choices.map((c, k) => `
            <button class="quiz-option" data-k="${k}">
              <span class="letter">${String.fromCharCode(65 + k)}</span>
              <span>${c}</span>
            </button>
          `).join("")}
        </div>
        <div class="scenario-response" data-role="scenario-response" hidden></div>
      </div>
    </section>
  `;
}
function wireScenario(m) {
  const s = (LEARNING[m.n] || {}).scenario;
  if (!s) return;
  const root = dialogBody.querySelector('[data-role="scenario"]');
  const opts = root.querySelector('[data-role="scenario-opts"]');
  const response = root.querySelector('[data-role="scenario-response"]');
  opts.querySelectorAll(".quiz-option").forEach(b => {
    b.addEventListener("click", () => {
      const k = parseInt(b.dataset.k, 10);
      opts.querySelectorAll(".quiz-option").forEach(x => x.disabled = true);
      const isCorrect = k === s.correct;
      if (isCorrect) b.classList.add("is-correct");
      else {
        b.classList.add("is-wrong");
        const correctBtn = opts.querySelector(`.quiz-option[data-k="${s.correct}"]`);
        if (correctBtn) correctBtn.classList.add("is-correct");
      }
      response.hidden = false;
      response.innerHTML = `<strong>${isCorrect ? "Yes." : "Think again."}</strong> ${s.response}`;
      updateMantleProgress(m.n, { scenarioDone: true });
      refreshCompletionBadge(m.n);
    });
  });
}

// ============ Completion badge inside dialog ============
function refreshCompletionBadge(n) {
  const badge = dialogBody.querySelector('[data-role="mantle-complete"]');
  if (!badge) return;
  const p = getMantleProgress(n);
  badge.hidden = !p.complete;
}

// ============ Progress dots on cards ============
function renderProgressBadges() {
  document.querySelectorAll("[data-dot]").forEach(dot => {
    const n = parseInt(dot.dataset.dot, 10);
    const p = getMantleProgress(n);
    if (p.complete) { dot.classList.add("is-done"); dot.textContent = "✓ Received"; }
    else if (p.read || p.quizAttempts || p.scenarioDone) { dot.classList.remove("is-done"); dot.textContent = "In progress"; }
    else { dot.classList.remove("is-done"); dot.textContent = "○"; }
  });
}

// ============ Progress view ============
function renderProgressView() {
  const grid = document.getElementById("masteryGrid");
  if (!grid) return;
  const p = loadProgress();

  // Aggregate stats
  let done = 0, quizCorrect = 0, flashFlipped = 0, scenarioDone = 0;
  MANTLES.forEach(m => {
    const mp = p[m.n] || {};
    if (mp.complete) done++;
    quizCorrect += mp.quizCorrect || 0;
    flashFlipped += mp.flashcardsFlipped || 0;
    if (mp.scenarioDone) scenarioDone++;
  });

  // Ring — 490 is 2πr for r=78 (≈ 490.088)
  const total = MANTLES.length;
  const circ = 2 * Math.PI * 78;
  const bar = document.querySelector(".progress-ring .bar");
  if (bar) {
    bar.setAttribute("stroke-dasharray", circ.toFixed(2));
    const offset = circ * (1 - done / total);
    bar.setAttribute("stroke-dashoffset", offset.toFixed(2));
  }
  document.getElementById("pctValue").textContent = done;
  document.getElementById("statMantles").textContent = done;
  document.getElementById("statQuiz").textContent = quizCorrect;
  document.getElementById("statFlash").textContent = flashFlipped;
  document.getElementById("statScenario").textContent = scenarioDone;

  // Mastery grid
  grid.innerHTML = MANTLES.map(m => {
    const mp = p[m.n] || {};
    const status = mp.complete ? "Received" : (mp.read ? "In progress" : "Not started");
    return `
      <button class="mastery-item ${mp.complete ? "is-done" : ""}" data-mantle="${m.n}"
        style="--m-accent:${m.color.accent}; --m-bg:${m.color.bg};">
        <div class="m-num">Mantle ${String(m.n).padStart(2, "0")}</div>
        <div class="m-emo" aria-hidden="true">${m.emoji}</div>
        <div class="m-title">${m.title.replace(/^The /, "")}</div>
        <div class="m-status">${status}</div>
      </button>
    `;
  }).join("");
  grid.querySelectorAll("[data-mantle]").forEach(b => {
    b.addEventListener("click", () => {
      const n = parseInt(b.dataset.mantle, 10);
      const m = MANTLES.find(x => x.n === n);
      document.querySelector('.tab[data-tab="mantles"]').click();
      setTimeout(() => openMantle(m), 200);
    });
  });

  // Master It reveals only when all 12 complete
  document.getElementById("masterIt").hidden = done < total;
}

document.getElementById("resetProgress").addEventListener("click", () => {
  if (confirm("Reset all progress? Your saved mantle work on this device will be cleared.")) resetProgress();
});

// Initial paint of progress dots on cards
renderProgressBadges();

document.getElementById("closeDialog").addEventListener("click", () => {
  stopSpeaking();
  dialog.close();
});
dialog.addEventListener("click", (e) => {
  // Close when clicking backdrop
  if (e.target === dialog) { stopSpeaking(); dialog.close(); }
});
dialog.addEventListener("close", () => stopSpeaking());

// Play the whole dialog page top-to-bottom
document.getElementById("listenAll").addEventListener("click", () => {
  const items = [];
  const simple = dialogBody.querySelector(".simple-summary");
  if (simple && getComputedStyle(simple).display !== "none") items.push({ el: simple, text: simple.textContent });
  const what = dialogBody.querySelector(".what-text");
  if (what && getComputedStyle(what).display !== "none") items.push({ el: what, text: `What was released. ${what.textContent}` });
  dialogBody.querySelectorAll(".scripture-box").forEach(b => {
    if (getComputedStyle(b).display !== "none") {
      items.push({ el: b, text: `${b.querySelector(".scripture-ref").textContent}. ${b.querySelector(".scripture-text").textContent}` });
    }
  });
  const prayer = dialogBody.querySelector(".prayer-text");
  if (prayer && getComputedStyle(prayer).display !== "none") items.push({ el: prayer, text: `Prayer. ${prayer.textContent}` });
  const decl = dialogBody.querySelector(".declaration-text");
  if (decl) items.push({ el: decl, text: `Declaration. Repeat after me. ${decl.textContent}` });
  speakQueue(items);
});
