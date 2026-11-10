/* ==========================================================================
   Prepare With Psalm 34 — app.js
   Injects verse pages 4-10 from DEVOTIONALS, wires click-to-answer quizzes.
   The rest of the layout mirrors the PDF page-for-page.
   ========================================================================== */

(function () {
  "use strict";

  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function optLetter(i) {
    return String.fromCharCode(65 + i); // A, B, C, …
  }

  function renderQuizItem(q, idx, verseIdx) {
    const optionsHtml = q.options
      .map((opt, i) => `
        <button type="button" class="quiz-option"
                data-verse="${verseIdx}" data-q="${idx}" data-i="${i}"
                aria-label="Option ${optLetter(i)}: ${escapeHtml(opt)}">
          <span class="opt-letter" aria-hidden="true">${optLetter(i)}</span>
          <span class="opt-text">${escapeHtml(opt)}</span>
        </button>`)
      .join("");

    return `
      <div class="quiz-q" data-verse="${verseIdx}" data-q="${idx}">
        <p class="quiz-q-text"><span class="quiz-q-num">${idx + 1}.</span>${escapeHtml(q.question)}</p>
        <div class="quiz-options" role="group" aria-label="Answer options">${optionsHtml}</div>
        <div class="quiz-feedback" role="status" aria-live="polite"></div>
      </div>`;
  }

  function renderKeyWords(pairs) {
    return pairs.map(([term, def]) => `
      <li><span class="kw-term">${escapeHtml(term)}:</span> <span class="kw-def">${escapeHtml(def)}</span></li>
    `).join("");
  }

  function renderInsight(paragraphs) {
    return paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("");
  }

  function renderVersePage(v, idx) {
    const pageNum = 4 + idx; // pages 4..10
    const verseNum = 6 + idx; // Psalm 34:6..12
    const quizHtml = v.quiz.map((q, qi) => renderQuizItem(q, qi, idx)).join("");

    return `
      <section class="page verse-page" id="verse-${verseNum}">
        <div class="page-header">
          <div class="header-left"><strong>Dominion Hour</strong> <span>with Prophet Prince Amo David</span></div>
          <div class="header-right">PAGE ${pageNum} &nbsp;&bull;&nbsp; ${escapeHtml(v.step)} &nbsp;&bull;&nbsp; PSALM 34:${verseNum}</div>
        </div>

        <div class="page-body">
          <div class="verse-eyebrow">${escapeHtml(v.step)} &nbsp;&bull;&nbsp; READ</div>
          <h2 class="verse-heading">${escapeHtml(v.ref)}</h2>

          <!-- Scripture -->
          <div class="scripture-card">
            <div class="card-eyebrow">SCRIPTURE &mdash; PSALM 34:${verseNum} (KJV)</div>
            <p class="kjv-text">&ldquo;${escapeHtml(v.kjv)}&rdquo;</p>
          </div>

          <!-- Study Bible Insight -->
          <div class="insight-card">
            <div class="card-eyebrow">STUDY BIBLE INSIGHT</div>
            <p class="card-subtitle">Adapted from the biblical text and informed by trusted evangelical study resources.</p>
            ${renderInsight(v.insight)}
          </div>

          <!-- Key Words + Word Picture -->
          <div class="two-col">
            <div class="key-words-card">
              <div class="card-eyebrow">KEY WORDS</div>
              <ul class="kw-list">${renderKeyWords(v.key_words)}</ul>
            </div>
            <div class="word-picture-card">
              <div class="card-eyebrow">WORD PICTURE</div>
              <h3 class="word-picture-title">${escapeHtml(v.word_picture_title)}</h3>
              <p class="word-picture-body">${escapeHtml(v.word_picture_body)}</p>
            </div>
          </div>

          <!-- Key Truth -->
          <div class="key-truth">
            <div class="card-eyebrow">KEY TRUTH</div>
            <p class="key-truth-text">${escapeHtml(v.key_truth)}</p>
          </div>

          <!-- Faith Check Quiz -->
          <div class="quiz-card">
            <div class="card-eyebrow">BIBLE STUDY CHALLENGE &mdash; FAITH CHECK QUIZ</div>
            ${quizHtml}

            <div class="reflection-block">
              <p class="reflection-text">
                <span class="quiz-q-num">3.</span>
                <span class="reflection-label">Reflection:</span>
                ${escapeHtml(v.reflection)}
              </p>
              <textarea class="reflection-lines" rows="4" placeholder="Write your reflection here…" aria-label="Your reflection"></textarea>
            </div>
          </div>

          <!-- Bonus -->
          <div class="bonus-bar">
            <div class="bonus-icon">&#9733;</div>
            <div class="bonus-content">
              <div class="card-eyebrow">BONUS CHALLENGE</div>
              <p class="bonus-text">${escapeHtml(v.bonus)}</p>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <span class="footer-verse-serif">&ldquo;Oh, taste and see that the Lord is good.&rdquo;</span>
          <span class="footer-dash">—</span>
          <span class="footer-ref">PSALM 34:8</span>
        </div>
      </section>
    `;
  }

  // Track answered questions to prevent re-answer
  const answered = new Set(); // key: `${verseIdx}-${qIdx}`

  function handleQuizClick(e) {
    const btn = e.target.closest(".quiz-option");
    if (!btn) return;

    const verseIdx = Number(btn.dataset.verse);
    const qIdx = Number(btn.dataset.q);
    const chosen = Number(btn.dataset.i);
    const key = `${verseIdx}-${qIdx}`;

    if (answered.has(key)) return;
    answered.add(key);

    const question = DEVOTIONALS[verseIdx].quiz[qIdx];
    const correctIdx = question.correct;
    const isCorrect = chosen === correctIdx;

    // Find all option buttons for this question
    const container = btn.closest(".quiz-q");
    const opts = container.querySelectorAll(".quiz-option");
    opts.forEach((opt, i) => {
      opt.disabled = true;
      if (i === correctIdx) {
        opt.classList.add(isCorrect && i === chosen ? "correct" : "reveal-correct");
      } else if (i === chosen && !isCorrect) {
        opt.classList.add("incorrect");
      }
    });

    // Feedback
    const feedback = container.querySelector(".quiz-feedback");
    if (feedback) {
      feedback.classList.remove("correct", "incorrect");
      if (isCorrect) {
        feedback.classList.add("correct", "show");
        feedback.innerHTML =
          '<strong>&#10003; CORRECT</strong>' +
          'Well done. This answer reflects what David is teaching in this verse.';
      } else {
        feedback.classList.add("incorrect", "show");
        feedback.innerHTML =
          '<strong>REFLECT AGAIN</strong>' +
          'The highlighted option is the answer that best fits this verse. Re-read the scripture and Study Bible Insight above.';
      }
    }
  }

  function init() {
    const mount = document.getElementById("verse-pages");
    if (!mount || typeof DEVOTIONALS === "undefined") return;

    mount.innerHTML = DEVOTIONALS.map(renderVersePage).join("");
    mount.addEventListener("click", handleQuizClick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
