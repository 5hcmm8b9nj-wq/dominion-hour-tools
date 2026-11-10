(function () {
  "use strict";

  /* ---------------- Persistence (in-memory for this study session) ---------------- */
  var memoryStore = {};
  function storeGet(key, fallback) {
    return key in memoryStore ? memoryStore[key] : fallback;
  }
  function storeSet(key, val) {
    memoryStore[key] = val;
  }

  /* ---------------- State ---------------- */
  var state = {
    view: "home",
    moduleIndex: null,
    completedModules: storeGet("bmd_completed", []),
    declPrayed: storeGet("bmd_decl", []),
    flashIndex: 0,
    flashFlipped: false,
    flashKnown: storeGet("bmd_flash_known", []),
    quizIndex: 0,
    quizScore: 0,
    quizAnswered: null,
    quizDone: false,
    theme: storeGet("bmd_theme", null),
  };

  function persist() {
    storeSet("bmd_completed", state.completedModules);
    storeSet("bmd_decl", state.declPrayed);
    storeSet("bmd_flash_known", state.flashKnown);
  }

  /* ---------------- Theme ---------------- */
  function applyTheme() {
    var theme = state.theme;
    if (!theme) {
      theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
  }
  document.getElementById("themeToggle").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    state.theme = cur === "dark" ? "light" : "dark";
    storeSet("bmd_theme", state.theme);
    applyTheme();
  });

  /* ---------------- Speech (Web Speech API) ---------------- */
  var speechSupported = "speechSynthesis" in window;
  var currentUtterance = null;
  function speakText(text, btn) {
    if (!speechSupported) return;
    if (currentUtterance && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      document.querySelectorAll(".speak-btn.playing").forEach(function (b) {
        b.classList.remove("playing");
        b.textContent = "🔊 Listen";
      });
      if (currentUtterance._btn === btn) {
        currentUtterance = null;
        return;
      }
    }
    var utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1;
    utter._btn = btn;
    utter.onend = function () {
      btn.classList.remove("playing");
      btn.textContent = "🔊 Listen";
      currentUtterance = null;
    };
    currentUtterance = utter;
    btn.classList.add("playing");
    btn.textContent = "⏸ Playing…";
    window.speechSynthesis.speak(utter);
  }

  /* ---------------- Helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }
  function scriptureBlock(sc) {
    if (!sc) return "";
    return (
      '<div class="scripture-card"><div class="ref">📖 ' +
      esc(sc.ref) +
      '</div><div class="txt">"' +
      esc(sc.text) +
      '"</div></div>'
    );
  }

  var viewsEl = document.getElementById("views");
  var navBtns = document.querySelectorAll(".nav-btn");

  function setActiveNav(view) {
    navBtns.forEach(function (b) {
      b.classList.toggle("active", b.dataset.view === view);
    });
  }

  function goto(view, opts) {
    opts = opts || {};
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    state.view = view;
    if ("moduleIndex" in opts) state.moduleIndex = opts.moduleIndex;
    setActiveNav(view === "moduleDetail" ? "study" : view);
    render();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  navBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      goto(b.dataset.view);
    });
  });

  /* ================= RENDER: HOME ================= */
  function renderHome() {
    var total = MODULES.length;
    var done = state.completedModules.length;
    var pct = Math.round((done / total) * 100);
    var flow = [
      ["🙏", "Confess"],
      ["📖", "Stand on the Word"],
      ["🔥", "Command & Decree"],
      ["🫙", "Anoint & Wash"],
      ["🕊️", "Walk in Freedom"],
    ];
    var flowSvg =
      '<svg class="flow-svg" viewBox="0 0 520 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Teaching flow overview">';
    var stepW = 520 / flow.length;
    flow.forEach(function (f, i) {
      var cx = stepW * i + stepW / 2;
      flowSvg +=
        '<circle cx="' + cx + '" cy="34" r="26" fill="none" stroke="#c9a227" stroke-width="1.6"/>' +
        '<text x="' + cx + '" y="42" text-anchor="middle" font-size="20">' + f[0] + "</text>" +
        '<text x="' + cx + '" y="88" text-anchor="middle" font-size="10.5" fill="#fbf6ea" font-family="system-ui,sans-serif">' +
        f[1] +
        "</text>";
      if (i < flow.length - 1) {
        var x1 = cx + 26,
          x2 = cx + stepW - 26;
        flowSvg += '<line x1="' + x1 + '" y1="34" x2="' + x2 + '" y2="34" stroke="#c9a227" stroke-width="1.4" stroke-dasharray="3 4"/>';
      }
    });
    flowSvg += "</svg>";

    var html =
      '<div class="hero">' +
      '<div class="eyebrow">' + esc(MINISTRY.teachingDate) + " · Clubhouse Teaching</div>" +
      "<h1>" + esc(MINISTRY.teachingTitle) + "</h1>" +
      '<p class="sub">A Scripture-first study companion for ' + esc(MINISTRY.name) + "</p>" +
      '<div class="anchor">"' + esc(MINISTRY.anchorText) + '"<cite>' + esc(MINISTRY.anchor) + " · KJV</cite></div>" +
      flowSvg +
      "</div>" +
      '<div class="view">' +
      '<div class="notice">This companion preserves Prophet Prince Amo David\'s teaching, prayers, and "repeat after me" declarations from the August 18, 2026 service. The complete service recording remains private; congregant testimonies and identifying details are not included here. Commentary added for teaching purposes is clearly marked as "Understand It," separate from Prophet Prince\'s own words.</div>' +
      '<div class="section-title">🏆 Your Progress <span class="n">(' + done + " / " + total + " sections)</span></div>" +
      '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="nav-row">' +
      '<button class="btn primary" id="startBtn">📖 Begin the Study</button>' +
      "</div>" +
      '<div class="nav-row" style="margin-top:12px">' +
      '<button class="btn" data-goto="declarations">🔥 Declarations</button>' +
      '<button class="btn" data-goto="flashcards">🃏 Flashcards</button>' +
      '<button class="btn" data-goto="quiz">❓ Quiz</button>' +
      "</div>" +
      '<div class="footer-note">Bible quotations are King James Version (KJV), quoted in full. This is an unofficial study companion and is not a replacement for the complete service.</div>' +
      "</div>";
    viewsEl.innerHTML = html;
    document.getElementById("startBtn").addEventListener("click", function () {
      goto("study");
    });
    viewsEl.querySelectorAll("[data-goto]").forEach(function (b) {
      b.addEventListener("click", function () {
        goto(b.dataset.goto);
      });
    });
  }

  /* ================= RENDER: STUDY LIST ================= */
  function renderStudy() {
    var html =
      '<div class="view">' +
      '<div class="section-title">📖 Study — ' + esc(MINISTRY.teachingTitle) + '<span class="n">(' + MODULES.length + " sections)</span></div>";
    MODULES.forEach(function (m, i) {
      var doneCls = state.completedModules.indexOf(m.id) > -1 ? " done" : "";
      html +=
        '<div class="card module-card' + doneCls + '" data-idx="' + i + '">' +
        '<div class="icon">' + m.icon + "</div>" +
        '<div class="meta"><div class="idx">Section ' + (i + 1) + "</div><h3>" + esc(m.title) + '</h3><p class="subtitle">' +
        esc(m.subtitle) +
        "</p></div>" +
        (state.completedModules.indexOf(m.id) > -1 ? '<span class="check">✓</span>' : '<span class="chev">›</span>') +
        "</div>";
    });
    html += "</div>";
    viewsEl.innerHTML = html;
    viewsEl.querySelectorAll(".module-card").forEach(function (card) {
      card.addEventListener("click", function () {
        goto("moduleDetail", { moduleIndex: parseInt(card.dataset.idx, 10) });
      });
    });
  }

  /* ================= RENDER: MODULE DETAIL ================= */
  function renderModuleDetail() {
    var i = state.moduleIndex;
    var m = MODULES[i];
    var isFirst = i === 0,
      isLast = i === MODULES.length - 1;

    var html = '<div class="view">';
    html += '<button class="back-btn" id="backToStudy">‹ All Sections</button>';
    html += '<div class="detail-header"><div class="block-label"><span class="icon-big">' + m.icon + "</span></div>";
    html += "<h2>" + esc(m.title) + "</h2>";
    html += '<p class="subtitle" style="color:var(--text-muted);margin-top:4px">' + esc(m.subtitle) + "</p></div>";

    // Scripture blocks (SEE IT / READ IT)
    ["scripture", "scripture2", "scripture3", "scripture4"].forEach(function (key) {
      if (m[key]) html += scriptureBlock(m[key]);
    });

    // HEAR IT / READ IT — Prophet Prince's words
    html +=
      '<div class="block-label">🎧 Hear It — Prophet Prince\'s Words <button class="speak-btn" data-speak="quote-' +
      i +
      '">🔊 Listen</button></div>';
    html += '<div class="teaching-quote">' + esc(m.quote) + "</div>";

    if (m.prayer) {
      html +=
        '<div class="block-label" style="margin-top:20px">🙏 Pray It <button class="speak-btn" data-speak="prayer-' +
        i +
        '">🔊 Listen</button></div>';
      html += '<div class="teaching-quote">' + esc(m.prayer) + "</div>";
    }

    // UNDERSTAND IT — tap to reveal
    html +=
      '<div class="block-label" style="margin-top:20px">💡 Understand It <span style="font-weight:400;color:var(--text-muted);text-transform:none;font-size:var(--text-xs)">(tap to reveal)</span></div>';
    html += '<div class="understand-box" id="understandBox" style="cursor:pointer">';
    html += '<strong>Tap to reveal the explanation ▾</strong>';
    html += '<div class="understand-full hidden">' + esc(m.understand) + "</div>";
    html += "</div>";

    // KEY POINT
    html += '<div class="keypoint-box"><strong>🔑 Key Point:</strong> ' + esc(m.keyPoint) + "</div>";

    // APPLY IT
    html += '<div class="apply-box"><strong>🤔 Apply It:</strong> ' + esc(m.application) + "</div>";

    if (m.linksTo === "declarations") {
      html += '<button class="btn primary" id="jumpDecl" style="width:100%;margin-bottom:16px">🔥 Open Declarations</button>';
    }

    html += '<div class="nav-row">';
    html += '<button class="btn ghost" id="prevBtn" ' + (isFirst ? "disabled" : "") + '>‹ Previous</button>';
    html += '<button class="btn primary" id="doneNextBtn">' + (state.completedModules.indexOf(m.id) > -1 ? "✓ Completed" : "Mark Complete") + "</button>";
    html += '<button class="btn ghost" id="nextBtn" ' + (isLast ? "disabled" : "") + '>Next ›</button>';
    html += "</div></div>";

    viewsEl.innerHTML = html;

    document.getElementById("backToStudy").addEventListener("click", function () {
      goto("study");
    });
    var box = document.getElementById("understandBox");
    box.addEventListener("click", function () {
      var full = box.querySelector(".understand-full");
      var revealed = !full.classList.contains("hidden");
      full.classList.toggle("hidden");
      box.querySelector("strong").textContent = revealed ? "Tap to reveal the explanation ▾" : "Explanation ▴";
    });
    viewsEl.querySelectorAll("[data-speak]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.dataset.speak.startsWith("quote") ? m.quote : m.prayer;
        speakText(key, btn);
      });
    });
    if (m.linksTo === "declarations") {
      document.getElementById("jumpDecl").addEventListener("click", function () {
        goto("declarations");
      });
    }
    document.getElementById("prevBtn").addEventListener("click", function () {
      if (!isFirst) goto("moduleDetail", { moduleIndex: i - 1 });
    });
    document.getElementById("nextBtn").addEventListener("click", function () {
      if (!isLast) goto("moduleDetail", { moduleIndex: i + 1 });
    });
    document.getElementById("doneNextBtn").addEventListener("click", function () {
      if (state.completedModules.indexOf(m.id) === -1) {
        state.completedModules.push(m.id);
        persist();
      }
      if (!isLast) goto("moduleDetail", { moduleIndex: i + 1 });
      else goto("study");
    });
  }

  /* ================= RENDER: DECLARATIONS ================= */
  function renderDeclarations() {
    var totalCards = 0;
    DECLARATIONS.categories.forEach(function (c) { totalCards += c.cards.length; });
    var doneCount = state.declPrayed.length;
    var html =
      '<div class="view"><div class="section-title">🔥 Declarations <span class="n">(' +
      doneCount + " / " + totalCards + ' prayed)</span></div>';
    html += '<div class="notice">' + esc(DECLARATIONS.intro) + "</div>";
    html += '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + Math.round((doneCount/totalCards)*100) + '%"></div></div>';
    DECLARATIONS.categories.forEach(function (cat, ci) {
      html += '<div class="decl-cat"><h3>' + esc(cat.name) + "</h3>";
      cat.cards.forEach(function (card, cj) {
        var key = ci + "-" + cj;
        var said = state.declPrayed.indexOf(key) > -1;
        html +=
          '<div class="decl-card' + (said ? " said" : "") + '" data-key="' + key + '">' +
          '<span class="tap-circle">' + (said ? "✓" : "") + "</span><p>" + esc(card) + "</p></div>";
      });
      html += "</div>";
    });
    html += "</div>";
    viewsEl.innerHTML = html;
    viewsEl.querySelectorAll(".decl-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var key = card.dataset.key;
        var idx = state.declPrayed.indexOf(key);
        if (idx > -1) state.declPrayed.splice(idx, 1);
        else state.declPrayed.push(key);
        persist();
        renderDeclarations();
      });
    });
  }

  /* ================= RENDER: FLASHCARDS ================= */
  function renderFlashcards() {
    var i = state.flashIndex;
    var card = FLASHCARDS[i];
    var known = state.flashKnown.indexOf(i) > -1;
    var html =
      '<div class="view"><div class="section-title">🃏 Remember It — Key Terms</div>' +
      '<div class="flash-wrap">' +
      '<div class="flash-progress">Card ' + (i + 1) + " of " + FLASHCARDS.length + " · " + state.flashKnown.length + " marked known</div>" +
      '<div class="flashcard' + (state.flashFlipped ? " flipped" : "") + '" id="flashcard">' +
      '<div class="flashcard-inner">' +
      '<div class="flash-face front">' + esc(card.front) + "</div>" +
      '<div class="flash-face back">' + esc(card.back) + "</div>" +
      "</div></div>" +
      '<div class="flash-controls">' +
      '<button class="btn ghost" id="flashPrev" ' + (i === 0 ? "disabled" : "") + '>‹ Prev</button>' +
      '<button class="btn' + (known ? " primary" : "") + '" id="flashKnown">' + (known ? "✓ Known" : "Mark Known") + '</button>' +
      '<button class="btn ghost" id="flashNext" ' + (i === FLASHCARDS.length - 1 ? "disabled" : "") + '>Next ›</button>' +
      "</div></div></div>";
    viewsEl.innerHTML = html;
    document.getElementById("flashcard").addEventListener("click", function () {
      state.flashFlipped = !state.flashFlipped;
      renderFlashcards();
    });
    document.getElementById("flashPrev").addEventListener("click", function () {
      if (i > 0) {
        state.flashIndex--;
        state.flashFlipped = false;
        renderFlashcards();
      }
    });
    document.getElementById("flashNext").addEventListener("click", function () {
      if (i < FLASHCARDS.length - 1) {
        state.flashIndex++;
        state.flashFlipped = false;
        renderFlashcards();
      }
    });
    document.getElementById("flashKnown").addEventListener("click", function () {
      var idx = state.flashKnown.indexOf(i);
      if (idx > -1) state.flashKnown.splice(idx, 1);
      else state.flashKnown.push(i);
      persist();
      renderFlashcards();
    });
  }

  /* ================= RENDER: QUIZ ================= */
  function renderQuiz() {
    if (state.quizDone) {
      var pct = Math.round((state.quizScore / QUIZ.length) * 100);
      viewsEl.innerHTML =
        '<div class="view"><div class="quiz-score card">' +
        '<div class="big">' + state.quizScore + " / " + QUIZ.length + "</div>" +
        '<p>You scored ' + pct + '% on this section.</p>' +
        '<button class="btn primary" id="quizRestart">🔄 Try Again</button>' +
        "</div></div>";
      document.getElementById("quizRestart").addEventListener("click", function () {
        state.quizIndex = 0;
        state.quizScore = 0;
        state.quizAnswered = null;
        state.quizDone = false;
        renderQuiz();
      });
      return;
    }
    var i = state.quizIndex;
    var q = QUIZ[i];
    var html =
      '<div class="view"><div class="section-title">❓ Test It</div>' +
      '<div class="quiz-progress">Question ' + (i + 1) + " of " + QUIZ.length + " · Score: " + state.quizScore + "</div>" +
      '<div class="quiz-q">' + esc(q.q) + "</div>";
    q.choices.forEach(function (choice, ci) {
      var cls = "";
      if (state.quizAnswered !== null) {
        if (ci === q.answer) cls = " correct";
        else if (ci === state.quizAnswered) cls = " incorrect";
      }
      html += '<button class="choice-btn' + cls + '" data-ci="' + ci + '" ' + (state.quizAnswered !== null ? "disabled" : "") + '>' + esc(choice) + "</button>";
    });
    if (state.quizAnswered !== null) {
      html += '<div class="quiz-explain"><strong>' + (state.quizAnswered === q.answer ? "✅ Correct. " : "❌ Not quite. ") + '</strong>' + esc(q.explain) + "</div>";
      html += '<div class="nav-row" style="margin-top:20px"><button class="btn primary" id="quizNext" style="width:100%">' + (i === QUIZ.length - 1 ? "See Results" : "Next Question ›") + "</button></div>";
    }
    html += "</div>";
    viewsEl.innerHTML = html;
    viewsEl.querySelectorAll(".choice-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (state.quizAnswered !== null) return;
        var ci = parseInt(btn.dataset.ci, 10);
        state.quizAnswered = ci;
        if (ci === q.answer) state.quizScore++;
        renderQuiz();
      });
    });
    var nextBtn = document.getElementById("quizNext");
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (i === QUIZ.length - 1) {
          state.quizDone = true;
        } else {
          state.quizIndex++;
          state.quizAnswered = null;
        }
        renderQuiz();
      });
    }
  }

  /* ================= RENDER: REVIEW / MASTER ================= */
  function renderReview() {
    var total = MODULES.length;
    var done = state.completedModules.length;
    var html =
      '<div class="view"><div class="section-title">🏆 Review &amp; Master It</div>';
    html += '<div class="card"><h3 style="margin-bottom:8px">📝 Study Progress</h3>';
    html += '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + Math.round((done/total)*100) + '%"></div></div>';
    html += "<p>" + done + " of " + total + " study sections completed · " + state.declPrayed.length + " declarations prayed · " + state.flashKnown.length + "/" + FLASHCARDS.length + " terms known.</p></div>";

    html += '<div class="card"><h3 style="margin-bottom:12px">🔑 Key Lessons</h3>';
    REVIEW_POINTS.forEach(function (pt) {
      html += '<p style="margin-bottom:12px">• ' + esc(pt) + "</p>";
    });
    html += "</div>";

    html += '<div class="card"><div class="block-label">🙏 Opening Prayer <button class="speak-btn" data-speak="open">🔊 Listen</button></div><div class="teaching-quote">' + esc(PRAYERS.opening) + "</div></div>";
    html += '<div class="card"><div class="block-label">🙏 Closing Prayer &amp; Benediction <button class="speak-btn" data-speak="close">🔊 Listen</button></div><div class="teaching-quote">' + esc(PRAYERS.closing) + "</div></div>";

    html += '<div class="card"><h3 style="margin-bottom:8px">📖 Anchor Scripture</h3><div class="scripture-card"><div class="ref">' + esc(MINISTRY.anchor) + ' (KJV)</div><div class="txt">"' + esc(MINISTRY.anchorText) + '"</div></div></div>';

    html += '<div class="nav-row">';
    html += '<button class="btn" data-goto="quiz">❓ Retake Quiz</button>';
    html += '<button class="btn" data-goto="flashcards">🃏 Review Flashcards</button>';
    html += "</div>";
    html += '<div class="footer-note">This companion is an unofficial derivative teaching resource for Dominion Hour with Prophet Prince Amo David, built for study and sharing. All Scripture quoted is King James Version (KJV).</div>';
    html += "</div>";
    viewsEl.innerHTML = html;
    viewsEl.querySelectorAll("[data-speak]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        speakText(btn.dataset.speak === "open" ? PRAYERS.opening : PRAYERS.closing, btn);
      });
    });
    viewsEl.querySelectorAll("[data-goto]").forEach(function (b) {
      b.addEventListener("click", function () {
        goto(b.dataset.goto);
      });
    });
  }

  /* ---------------- Router ---------------- */
  function render() {
    switch (state.view) {
      case "home": return renderHome();
      case "study": return renderStudy();
      case "moduleDetail": return renderModuleDetail();
      case "declarations": return renderDeclarations();
      case "flashcards": return renderFlashcards();
      case "quiz": return renderQuiz();
      case "review": return renderReview();
      default: return renderHome();
    }
  }

  applyTheme();
  render();
})();
