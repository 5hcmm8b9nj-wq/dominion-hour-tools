/* =========================================================
   Course 2 — Kingdom Wealth Activation (8 Lessons)
   Interactive engagement-first course. Less than 20% teaching,
   more than 80% engagement — checkboxes, ratings, write-ins,
   case studies, action plans, blueprints.
   Registers with window.DH for unified journal save/restore.
   ========================================================= */

(function () {
  "use strict";

  const C2 = window.COURSE2_DATA;
  if (!C2) return;

  const root = document.getElementById("course2-root");
  if (!root) return;

  // ---------- In-memory store (mirrors c1 pattern; no persistent storage) ----------
  const s = {
    openSet: {},        // {lessonId: bool} — collapsible state
    openingChoices: {}, // {"L1-opt": bool}
    heartCheck: {},     // {"L2-opt": bool}
    discovery: {},      // {"L3-line0": "text"}
    planning: {},       // {"L4-line0": "text"}
    reflectionChoices: {}, // {"L5-opt": bool} for the multi-choice stagnation list
    text: {},           // generic text inputs: {"L1-action": "", "L2-journal": "", ...}
    scriptureAnswers: {}, // {lessonId: "text"}
    inventory: {},      // {"L1-Financial Health": 7, ...} 1..10
    selfEval: {},       // {"L7-Prayer": 8, ...}
    weeklyChallenge: {},// {"L7-Read Scripture daily": true, ...}
    covenantSentences:{}, // {"L6-0": "text"}
    blueprint: {},      // {"L8-0": "text"} for the 5 blueprint prompts
    finalDecree: false, // tap-to-affirm the Kingdom Wealth Declaration
    cases: {},          // {"L3-Dorcas": true} — case study "noted" toggles
  };

  // ---------- Helpers ----------
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function key(...parts) { return parts.join("|"); }

  // ---------- Header ----------
  function renderHeader() {
    const el = root.querySelector("[data-c2-header]");
    el.innerHTML = `
      <p class="c2-eyebrow">${esc(C2.meta.code)} \u00b7 ${esc(C2.meta.ministry)}</p>
      <h1 class="c2-h1">${esc(C2.meta.title)} <span class="c2-h1-sub">\u2014 ${esc(C2.meta.subtitle)}</span></h1>
      <p class="c2-lede">${esc(C2.meta.description)}</p>
      <dl class="c2-meta">
        <div><dt>Teacher</dt><dd>${esc(C2.meta.instructor)}</dd></div>
        <div><dt>Source</dt><dd>${esc(C2.meta.sourceTeaching)}</dd></div>
        <div><dt>Lessons</dt><dd>${C2.lessons.length}</dd></div>
        <div><dt>Anchor</dt><dd>Deuteronomy 8:18</dd></div>
      </dl>
      <div class="c2-progress" role="status" aria-live="polite">
        <span class="c2-progress-label">Your Activation Journey</span>
        <div class="c2-progress-bar" aria-hidden="true"><div class="c2-progress-fill" data-c2-progress></div></div>
        <span class="c2-progress-stats" data-c2-stats>0 of 0 activations completed</span>
      </div>
    `;
  }

  // ---------- Lesson list ----------
  function renderLessons() {
    const list = root.querySelector("[data-c2-lessons]");
    list.innerHTML = C2.lessons.map(lessonHtml).join("");
    wire();
    updateProgress();
  }

  function lessonHtml(L) {
    const open = !!s.openSet[L.id];
    return `
      <article class="c2-lesson${open ? " is-open" : ""}" data-lesson="${L.id}">
        <button class="c2-lesson-head" data-toggle aria-expanded="${open}">
          <span class="c2-lesson-num">Lesson ${L.id}</span>
          <span class="c2-lesson-title">${esc(L.title)}</span>
          <span class="c2-lesson-verse">${esc(L.verse)}</span>
          <span class="c2-lesson-chev" aria-hidden="true">${open ? "\u2212" : "+"}</span>
        </button>
        <div class="c2-lesson-body">${lessonBody(L)}</div>
      </article>
    `;
  }

  function lessonBody(L) {
    switch (L.id) {
      case 1: return l1(L);
      case 2: return l2(L);
      case 3: return l3(L);
      case 4: return l4(L);
      case 5: return l5(L);
      case 6: return l6(L);
      case 7: return l7(L);
      case 8: return l8(L);
      default: return "";
    }
  }

  // ---------- Component primitives ----------
  function blockTitle(num, label) {
    return `<h3 class="c2-block-title"><span class="c2-block-num">${num}</span>${esc(label)}</h3>`;
  }
  function checkboxList(name, options, scopeKey, prefix) {
    return `<ul class="c2-check-list">${options.map((o, i) => {
      const k = `${prefix}|${i}`;
      const checked = !!s[scopeKey][k];
      return `<li>
        <button type="button" class="c2-check${checked ? " is-on" : ""}" data-check="${scopeKey}" data-key="${esc(k)}" aria-pressed="${checked}">
          <span class="c2-check-box" aria-hidden="true">${checked ? "\u2713" : ""}</span>
          <span class="c2-check-label">${esc(o)}</span>
        </button>
      </li>`;
    }).join("")}</ul>`;
  }
  function scriptureBox(ref, passage, qLabel, qKey) {
    const val = s.scriptureAnswers[qKey] || "";
    return `
      <div class="c2-scripture">
        <div class="c2-scripture-ref">${esc(ref)}</div>
        <p class="c2-scripture-text">${esc(passage)}</p>
      </div>
      <label class="c2-q">${esc(qLabel)}</label>
      <textarea class="c2-textarea" data-text="scriptureAnswers" data-key="${esc(qKey)}" rows="3" placeholder="Write your answer\u2026">${esc(val)}</textarea>
    `;
  }
  function ratingRow(label, scopeKey, rowKey, max) {
    const val = s[scopeKey][rowKey] || 0;
    return `
      <div class="c2-rating-row">
        <div class="c2-rating-label">${esc(label)}</div>
        <div class="c2-rating-dots" data-rating="${scopeKey}" data-key="${esc(rowKey)}" data-max="${max}">
          ${Array.from({ length: max }, (_, i) => {
            const v = i + 1;
            return `<button type="button" class="c2-dot${val >= v ? " is-on" : ""}" data-val="${v}" aria-label="Rate ${v} of ${max}">${v}</button>`;
          }).join("")}
        </div>
      </div>
    `;
  }
  function writeIn(label, scopeKey, rowKey, rows) {
    const val = s[scopeKey][rowKey] || "";
    return `
      <label class="c2-q">${esc(label)}</label>
      <textarea class="c2-textarea" data-text="${scopeKey}" data-key="${esc(rowKey)}" rows="${rows || 2}" placeholder="Write your answer\u2026">${esc(val)}</textarea>
    `;
  }
  function writeLines(scopeKey, lessonId, count) {
    return Array.from({ length: count }, (_, i) => {
      const k = `${lessonId}|${i}`;
      const val = s[scopeKey][k] || "";
      return `<input type="text" class="c2-line" data-text="${scopeKey}" data-key="${esc(k)}" value="${esc(val)}" placeholder="${i + 1}." />`;
    }).join("");
  }
  function quote(text) {
    return `<blockquote class="c2-quote">${esc(text)}</blockquote>`;
  }
  function bulletList(items) {
    return `<ul class="c2-bullets">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  }

  // ---------- Lesson renderers ----------
  function l1(L) {
    return `
      ${blockTitle("1", "Opening Reflection")}
      <p class="c2-prompt">${esc(L.openingReflection.prompt)}</p>
      ${checkboxList("opening", L.openingReflection.options, "openingChoices", "L1")}

      ${blockTitle("2", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      <p class="c2-list-label">${esc(L.keyTeaching.listLabel)}</p>
      ${bulletList(L.keyTeaching.list)}
      ${quote(L.keyTeaching.quote)}

      ${blockTitle("3", "Scripture Study")}
      ${scriptureBox(L.scriptureStudy.reference, L.scriptureStudy.passage, L.scriptureStudy.question, "L1|scripture")}

      ${blockTitle("4", "Personal Inventory")}
      <p class="c2-prompt">${esc(L.personalInventory.instruction)}</p>
      <div class="c2-rating-list">
        ${L.personalInventory.items.map(it => ratingRow(it, "inventory", `L1|${it}`, 10)).join("")}
      </div>

      ${blockTitle("5", "Action Step")}
      ${writeIn(L.actionStep, "text", "L1|action", 3)}
    `;
  }

  function l2(L) {
    return `
      ${blockTitle("1", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      <p class="c2-pullquote">\u201c${esc(L.keyTeaching.pullquote)}\u201d</p>
      ${quote(L.keyTeaching.quote)}

      ${blockTitle("2", "Read Deuteronomy 8:2")}
      ${scriptureBox(L.scriptureStudy.reference, L.scriptureStudy.passage, L.scriptureStudy.question, "L2|scripture")}

      ${blockTitle("3", "Heart Check Exercise")}
      <p class="c2-prompt">${esc(L.heartCheck.prompt)}</p>
      ${checkboxList("heart", L.heartCheck.options, "heartCheck", "L2")}

      ${blockTitle("4", "Journal Prompt")}
      ${writeIn(L.journalPrompt, "text", "L2|journal", 6)}

      ${blockTitle("5", "Prayer Activation")}
      <p class="c2-prayer">${esc(L.prayerActivation)}</p>
      <button type="button" class="c2-affirm${s.text["L2|prayed"] === "yes" ? " is-on" : ""}" data-affirm="L2|prayed">
        <span class="c2-affirm-mark" aria-hidden="true">${s.text["L2|prayed"] === "yes" ? "\u2713" : ""}</span>
        I prayed this
      </button>
    `;
  }

  function l3(L) {
    return `
      ${blockTitle("1", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      <p class="c2-list-label">${esc(L.keyTeaching.listLabel)}</p>
      ${bulletList(L.keyTeaching.list)}
      ${quote(L.keyTeaching.quote)}

      ${blockTitle("2", "Discovery Exercise")}
      <p class="c2-prompt">${esc(L.discoveryExercise.instruction)}</p>
      <div class="c2-lines">${writeLines("discovery", "L3", L.discoveryExercise.lines)}</div>

      ${blockTitle("3", "Reflection")}
      ${writeIn(L.reflection, "text", "L3|reflection", 5)}

      ${blockTitle("4", "Case Studies")}
      <p class="c2-prompt">${esc(L.caseStudies.intro)}</p>
      <div class="c2-cases">
        ${L.caseStudies.cases.map(c => {
          const k = `L3|${c.name}`;
          const on = !!s.cases[k];
          return `
            <article class="c2-case${on ? " is-on" : ""}">
              <header><span class="c2-case-name">${esc(c.name)}</span><span class="c2-case-sphere">${esc(c.sphere)}</span></header>
              <p>${esc(c.note)}</p>
              <button type="button" class="c2-mark" data-case="${esc(k)}">${on ? "Noted \u2713" : "Mark as studied"}</button>
            </article>
          `;
        }).join("")}
      </div>

      ${blockTitle("5", "Application")}
      ${writeIn(L.caseStudies.question, "text", "L3|application", 5)}
    `;
  }

  function l4(L) {
    return `
      ${blockTitle("1", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      <p class="c2-list-label">${esc(L.keyTeaching.listLabel)}</p>
      ${bulletList(L.keyTeaching.list)}
      ${quote(L.keyTeaching.quote)}

      ${blockTitle("2", "Read Joshua 1:8")}
      ${scriptureBox(L.scriptureStudy.reference, L.scriptureStudy.passage, L.scriptureStudy.question, "L4|scripture")}

      ${blockTitle("3", "Reflection")}
      ${writeIn(L.reflection, "text", "L4|reflection", 4)}

      ${blockTitle("4", "Kingdom Planning Exercise")}
      <p class="c2-prompt">${esc(L.planningExercise.instruction)}</p>
      <div class="c2-lines">${writeLines("planning", "L4", L.planningExercise.lines)}</div>

      ${blockTitle("5", "Action Step")}
      ${writeIn(L.actionStep, "text", "L4|action", 3)}
    `;
  }

  function l5(L) {
    return `
      ${blockTitle("1", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      ${quote(L.keyTeaching.quote)}
      <p class="c2-list-label">${esc(L.keyTeaching.listLabel)}</p>
      ${bulletList(L.keyTeaching.list)}

      ${blockTitle("2", "Reflection")}
      <p class="c2-prompt">${esc(L.reflection.prompt)}</p>
      ${checkboxList("stuck", L.reflection.options, "reflectionChoices", "L5")}

      ${blockTitle("3", "Faith Exercise")}
      ${writeIn(L.faithExercise, "text", "L5|faith", 4)}

      ${blockTitle("4", "Activation")}
      ${writeIn(L.activation, "text", "L5|activation", 4)}
    `;
  }

  function l6(L) {
    return `
      ${blockTitle("1", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      ${quote(L.keyTeaching.quote)}

      ${blockTitle("2", "Scripture Meditation")}
      <p class="c2-prompt">${esc(L.scriptureMeditation.intro)}</p>
      ${L.scriptureMeditation.passages.map(p => `
        <div class="c2-scripture">
          <div class="c2-scripture-ref">${esc(p.reference)}</div>
          <p class="c2-scripture-text">${esc(p.text)}</p>
        </div>
      `).join("")}

      ${blockTitle("3", "Reflection")}
      ${writeIn(L.reflection, "text", "L6|reflection", 4)}

      ${blockTitle("4", "Covenant Declaration")}
      <p class="c2-prompt">${esc(L.covenantDeclaration.intro)}</p>
      ${L.covenantDeclaration.prompts.map((p, i) => writeIn(p, "covenantSentences", `L6|${i}`, 2)).join("")}
    `;
  }

  function l7(L) {
    return `
      ${blockTitle("1", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      ${quote(L.keyTeaching.quote)}

      ${blockTitle("2", "Self-Evaluation")}
      <p class="c2-prompt">${esc(L.selfEvaluation.instruction)}</p>
      <div class="c2-rating-list">
        ${L.selfEvaluation.items.map(it => ratingRow(it, "selfEval", `L7|${it}`, 10)).join("")}
      </div>

      ${blockTitle("3", "Journal")}
      ${writeIn(L.journal, "text", "L7|journal", 4)}

      ${blockTitle("4", "Weekly Challenge")}
      <p class="c2-prompt">${esc(L.weeklyChallenge.instruction)}</p>
      <ul class="c2-check-list">
        ${L.weeklyChallenge.items.map((item) => {
          const k = `L7|${item}`;
          const on = !!s.weeklyChallenge[k];
          return `<li>
            <button type="button" class="c2-check${on ? " is-on" : ""}" data-check="weeklyChallenge" data-key="${esc(k)}" aria-pressed="${on}">
              <span class="c2-check-box" aria-hidden="true">${on ? "\u2713" : ""}</span>
              <span class="c2-check-label">${esc(item)}</span>
            </button>
          </li>`;
        }).join("")}
      </ul>
    `;
  }

  function l8(L) {
    const decreed = !!s.finalDecree;
    return `
      ${blockTitle("1", "Key Teaching")}
      <p class="c2-lede">${esc(L.keyTeaching.intro)}</p>
      ${quote(L.keyTeaching.quote)}

      ${blockTitle("2", "My Kingdom Wealth Blueprint")}
      ${L.blueprintPrompts.map((p, i) => writeIn(p, "blueprint", `L8|${i}`, 3)).join("")}

      ${blockTitle("3", "My Kingdom Wealth Declaration")}
      <div class="c2-final-decree${decreed ? " is-on" : ""}">
        <h4>${esc(L.finalDeclaration.title)}</h4>
        <p>${esc(L.finalDeclaration.text)}</p>
        <button type="button" class="c2-affirm-large" data-final-decree>
          <span class="c2-affirm-mark" aria-hidden="true">${decreed ? "\u2713" : ""}</span>
          ${decreed ? "I have declared this" : "I declare this"}
        </button>
      </div>
    `;
  }

  // ---------- Wiring ----------
  function wire() {
    // Collapse / expand
    root.querySelectorAll("[data-toggle]").forEach(b => {
      b.addEventListener("click", () => {
        const article = b.closest(".c2-lesson");
        const id = +article.dataset.lesson;
        s.openSet[id] = !s.openSet[id];
        article.classList.toggle("is-open", s.openSet[id]);
        b.setAttribute("aria-expanded", String(!!s.openSet[id]));
        b.querySelector(".c2-lesson-chev").textContent = s.openSet[id] ? "\u2212" : "+";
      });
    });

    // Checkboxes (multi)
    root.querySelectorAll("[data-check]").forEach(btn => {
      btn.addEventListener("click", () => {
        const scope = btn.dataset.check, k = btn.dataset.key;
        s[scope][k] = !s[scope][k];
        btn.classList.toggle("is-on", !!s[scope][k]);
        btn.setAttribute("aria-pressed", String(!!s[scope][k]));
        btn.querySelector(".c2-check-box").textContent = s[scope][k] ? "\u2713" : "";
        updateProgress();
      });
    });

    // Text inputs (textareas + lines)
    root.querySelectorAll("[data-text]").forEach(el => {
      el.addEventListener("input", () => {
        const scope = el.dataset.text, k = el.dataset.key;
        s[scope][k] = el.value;
        updateProgress();
      });
    });

    // Rating dots (1..max)
    root.querySelectorAll("[data-rating]").forEach(group => {
      group.querySelectorAll(".c2-dot").forEach(dot => {
        dot.addEventListener("click", () => {
          const scope = group.dataset.rating, k = group.dataset.key;
          const v = +dot.dataset.val;
          // Tap same value to clear
          s[scope][k] = (s[scope][k] === v) ? 0 : v;
          group.querySelectorAll(".c2-dot").forEach(d => {
            d.classList.toggle("is-on", s[scope][k] >= +d.dataset.val);
          });
          updateProgress();
        });
      });
    });

    // Case study mark
    root.querySelectorAll("[data-case]").forEach(btn => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.case;
        s.cases[k] = !s.cases[k];
        const article = btn.closest(".c2-case");
        article.classList.toggle("is-on", !!s.cases[k]);
        btn.textContent = s.cases[k] ? "Noted \u2713" : "Mark as studied";
        updateProgress();
      });
    });

    // Generic affirm (e.g., "I prayed this")
    root.querySelectorAll("[data-affirm]").forEach(btn => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.affirm;
        s.text[k] = s.text[k] === "yes" ? "" : "yes";
        btn.classList.toggle("is-on", s.text[k] === "yes");
        btn.querySelector(".c2-affirm-mark").textContent = s.text[k] === "yes" ? "\u2713" : "";
        updateProgress();
      });
    });

    // Final declaration
    const finalBtn = root.querySelector("[data-final-decree]");
    if (finalBtn) {
      finalBtn.addEventListener("click", () => {
        s.finalDecree = !s.finalDecree;
        const wrap = finalBtn.closest(".c2-final-decree");
        wrap.classList.toggle("is-on", s.finalDecree);
        finalBtn.querySelector(".c2-affirm-mark").textContent = s.finalDecree ? "\u2713" : "";
        finalBtn.lastChild.textContent = " " + (s.finalDecree ? "I have declared this" : "I declare this");
        updateProgress();
      });
    }
  }

  // ---------- Progress ----------
  function updateProgress() {
    // Count "engagements" — total activations made by the user across L1..L8
    let total = 0, done = 0;
    C2.lessons.forEach(L => {
      // Opening reflection options
      if (L.openingReflection) {
        L.openingReflection.options.forEach((_, i) => {
          total++; if (s.openingChoices[`L${L.id}|${i}`]) done++;
        });
      }
      // Heart check
      if (L.heartCheck) {
        L.heartCheck.options.forEach((_, i) => {
          total++; if (s.heartCheck[`L${L.id}|${i}`]) done++;
        });
      }
      // Reflection w/ options
      if (L.reflection && typeof L.reflection === "object" && L.reflection.options) {
        L.reflection.options.forEach((_, i) => {
          total++; if (s.reflectionChoices[`L${L.id}|${i}`]) done++;
        });
      }
      // Personal inventory
      if (L.personalInventory) {
        L.personalInventory.items.forEach(it => {
          total++; if ((s.inventory[`L${L.id}|${it}`] || 0) > 0) done++;
        });
      }
      // Scripture study answers
      if (L.scriptureStudy) {
        total++;
        if ((s.scriptureAnswers[`L${L.id}|scripture`] || "").trim()) done++;
      }
      // Action step
      if (L.actionStep) {
        total++; if ((s.text[`L${L.id}|action`] || "").trim()) done++;
      }
      // Journal prompt
      if (L.journalPrompt) {
        total++; if ((s.text[`L${L.id}|journal`] || "").trim()) done++;
      }
      // Prayer activation tap
      if (L.prayerActivation) {
        total++; if (s.text[`L${L.id}|prayed`] === "yes") done++;
      }
      // Discovery exercise lines
      if (L.discoveryExercise) {
        total++; // count "completed" if at least 1 line
        const filled = Array.from({length: L.discoveryExercise.lines}).some((_, i) => (s.discovery[`L${L.id}|${i}`] || "").trim());
        if (filled) done++;
      }
      // Plain reflection (string)
      if (typeof L.reflection === "string") {
        total++; if ((s.text[`L${L.id}|reflection`] || "").trim()) done++;
      }
      // Case studies
      if (L.caseStudies) {
        L.caseStudies.cases.forEach(c => {
          total++; if (s.cases[`L${L.id}|${c.name}`]) done++;
        });
        total++; if ((s.text[`L${L.id}|application`] || "").trim()) done++;
      }
      // Planning exercise
      if (L.planningExercise) {
        total++;
        const filled = Array.from({length: L.planningExercise.lines}).some((_, i) => (s.planning[`L${L.id}|${i}`] || "").trim());
        if (filled) done++;
      }
      // Faith exercise & activation (lesson 5)
      if (L.faithExercise) { total++; if ((s.text[`L${L.id}|faith`] || "").trim()) done++; }
      if (L.activation && typeof L.activation === "string") { total++; if ((s.text[`L${L.id}|activation`] || "").trim()) done++; }
      // Covenant declaration
      if (L.covenantDeclaration) {
        L.covenantDeclaration.prompts.forEach((_, i) => {
          total++; if ((s.covenantSentences[`L${L.id}|${i}`] || "").trim()) done++;
        });
      }
      // Self-eval
      if (L.selfEvaluation) {
        L.selfEvaluation.items.forEach(it => {
          total++; if ((s.selfEval[`L${L.id}|${it}`] || 0) > 0) done++;
        });
      }
      // Weekly challenge
      if (L.weeklyChallenge) {
        L.weeklyChallenge.items.forEach(it => {
          total++; if (s.weeklyChallenge[`L${L.id}|${it}`]) done++;
        });
      }
      // Stewardship journal (lesson 7)
      if (L.journal) { total++; if ((s.text[`L${L.id}|journal`] || "").trim()) done++; }
      // Blueprint prompts (lesson 8)
      if (L.blueprintPrompts) {
        L.blueprintPrompts.forEach((_, i) => {
          total++; if ((s.blueprint[`L${L.id}|${i}`] || "").trim()) done++;
        });
      }
      // Final declaration
      if (L.finalDeclaration) { total++; if (s.finalDecree) done++; }
    });

    const fill = root.querySelector("[data-c2-progress]");
    const stat = root.querySelector("[data-c2-stats]");
    if (fill) fill.style.width = (total ? (done / total) * 100 : 0) + "%";
    if (stat) stat.innerHTML = `<strong>${done}</strong> of <strong>${total}</strong> activations completed`;
    // Update journal preview if open
    if (typeof window.DH_renderJournal === "function") window.DH_renderJournal();
  }

  // ---------- Register with kernel ----------
  window.DH.register("c2", {
    courseLabel: "Course 2 \u2014 Kingdom Wealth Activation",
    serialize: () => s,
    restore: (incoming) => {
      Object.keys(s).forEach(k => {
        if (typeof s[k] === "object" && s[k] !== null) {
          s[k] = {};
        }
      });
      s.finalDecree = false;
      Object.assign(s, incoming);
      // Ensure all dict keys exist
      ["openSet","openingChoices","heartCheck","discovery","planning","reflectionChoices","text","scriptureAnswers","inventory","selfEval","weeklyChallenge","covenantSentences","blueprint","cases"].forEach(k => {
        if (!s[k] || typeof s[k] !== "object") s[k] = {};
      });
      renderLessons();
    },
    reset: () => {
      ["openSet","openingChoices","heartCheck","discovery","planning","reflectionChoices","text","scriptureAnswers","inventory","selfEval","weeklyChallenge","covenantSentences","blueprint","cases"].forEach(k => {
        s[k] = {};
      });
      s.finalDecree = false;
      renderLessons();
    },
    refresh: () => updateProgress(),
    collectEntries: () => {
      const out = [];
      const mod = (id, t) => `C2 Lesson ${id} \u2014 ${t}`;
      C2.lessons.forEach(L => {
        const m = mod(L.id, L.title);
        // Scripture answers
        const sa = (s.scriptureAnswers[`L${L.id}|scripture`] || "").trim();
        if (sa && L.scriptureStudy) out.push({ mod: m, kind: "Scripture Study", q: L.scriptureStudy.question, a: sa });
        // Action steps
        const act = (s.text[`L${L.id}|action`] || "").trim();
        if (act && L.actionStep) out.push({ mod: m, kind: "Action Step", q: L.actionStep, a: act });
        // Journal prompts (lessons 2, 7)
        const jp = (s.text[`L${L.id}|journal`] || "").trim();
        if (jp && (L.journalPrompt || L.journal)) out.push({ mod: m, kind: "Journal", q: L.journalPrompt || L.journal, a: jp });
        // Generic reflection
        const refl = (s.text[`L${L.id}|reflection`] || "").trim();
        if (refl && typeof L.reflection === "string") out.push({ mod: m, kind: "Reflection", q: L.reflection, a: refl });
        // Discovery (gifts)
        if (L.discoveryExercise) {
          const lines = [];
          for (let i = 0; i < L.discoveryExercise.lines; i++) {
            const v = (s.discovery[`L${L.id}|${i}`] || "").trim();
            if (v) lines.push(v);
          }
          if (lines.length) out.push({ mod: m, kind: "Discovery", q: L.discoveryExercise.instruction, a: lines.join("\n") });
        }
        // Planning
        if (L.planningExercise) {
          const lines = [];
          for (let i = 0; i < L.planningExercise.lines; i++) {
            const v = (s.planning[`L${L.id}|${i}`] || "").trim();
            if (v) lines.push(v);
          }
          if (lines.length) out.push({ mod: m, kind: "Planning", q: L.planningExercise.instruction, a: lines.join("\n") });
        }
        // Case study application
        const ap = (s.text[`L${L.id}|application`] || "").trim();
        if (ap && L.caseStudies) out.push({ mod: m, kind: "Application", q: L.caseStudies.question, a: ap });
        // Lesson 5 — faith & activation
        const fx = (s.text[`L${L.id}|faith`] || "").trim();
        if (fx && L.faithExercise) out.push({ mod: m, kind: "Faith Exercise", q: L.faithExercise, a: fx });
        const av = (s.text[`L${L.id}|activation`] || "").trim();
        if (av && typeof L.activation === "string") out.push({ mod: m, kind: "Activation", q: L.activation, a: av });
        // Covenant sentences
        if (L.covenantDeclaration) {
          L.covenantDeclaration.prompts.forEach((p, i) => {
            const v = (s.covenantSentences[`L${L.id}|${i}`] || "").trim();
            if (v) out.push({ mod: m, kind: "Covenant", q: p, a: v });
          });
        }
        // Blueprint
        if (L.blueprintPrompts) {
          L.blueprintPrompts.forEach((p, i) => {
            const v = (s.blueprint[`L${L.id}|${i}`] || "").trim();
            if (v) out.push({ mod: m, kind: "Blueprint", q: p, a: v });
          });
        }
      });
      return out;
    },
  });

  // ---------- Init ----------
  renderHeader();
  renderLessons();
  if (typeof window.DH_renderJournal === "function") window.DH_renderJournal();
})();
