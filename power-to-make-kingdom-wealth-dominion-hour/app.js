/* =========================================================
   Power to Make Kingdom Wealth — Interactive Course
   Prophet Prince Amo David · Dominion Hour Ministries International

   STORAGE MODEL
     - All progress, answers, and testimonies live in MEMORY ONLY
       for the duration of the page session.
     - The user can DOWNLOAD their journal as a .json file at any time
       via the "Save my journal" button in the My Journal section.
     - To resume later, they UPLOAD that file with "Restore from file".
     - Nothing ever leaves their device. The data file lives wherever
       they save it, not in any database or cloud.
   ========================================================= */

/* ---------- Shared kernel for multiple courses ----------
   Exposes a registry so other course scripts (Course 2, etc.) can:
     - contribute journal entries to the unified My Journal page
     - serialize their state into the saved journal file
     - restore their state from the saved journal file
     - clear themselves on reset
   Each course registers itself with a unique courseId.
   ----------------------------------------------------- */
window.DH = window.DH || {
  registry: {},
  register(id, hooks) { this.registry[id] = hooks; },
  list() { return Object.entries(this.registry); },
  toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  },
  refreshAll() {
    this.list().forEach(([, h]) => h.refresh && h.refresh());
    if (typeof window.DH_renderJournal === "function") window.DH_renderJournal();
  },
};

(function () {
  "use strict";

  const data = window.COURSE_DATA;
  if (!data) return;

  // ---------- In-memory store ----------
  // Shape:
  // {
  //   cardIndex: { 1: 0, 2: 0, ... },           // current teaching card per module
  //   reflectionAnswers: { "1-0": "text", ... },
  //   discoveryAnswers:  { "1-0": "text", ... },
  //   journal:           { 1: "text", ... },
  //   activationDone:    { 1: true, ... },
  //   prayerPointDone:   { "1-0": true, ... },
  //   declarationDone:   { "1-0": true, ... },
  //   assignmentDone:    { 1: true, ... },
  //   testimony:         { 1: "text", ... },
  //   selfAssessment:    { "1-0": 4, ... },     // 1..5 rating
  //   theme: "light" | "dark" | null
  // }
  const store = {
    cardIndex: {},
    reflectionAnswers: {},
    discoveryAnswers: {},
    journal: {},
    activationDone: {},
    prayerPointDone: {},
    declarationDone: {},
    assignmentDone: {},
    testimony: {},
    selfAssessment: {},
    theme: null,
  };

  // ---------- Theme ----------
  const themeBtn = document.getElementById("theme-toggle");
  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    themeBtn.innerHTML = mode === "dark" ? SUN : MOON;
    themeBtn.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  const initialTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(initialTheme);
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // ---------- Hero ----------
  document.getElementById("course-code").textContent = data.course.code;
  document.getElementById("course-term").textContent = data.course.term;
  const titleEl = document.getElementById("course-title");
  const titleParts = data.course.title.split(" \u2014 ");
  titleEl.innerHTML = titleParts.length === 2
    ? `${escapeHtml(titleParts[0])} <span class="title-dash" aria-hidden="true">\u2014</span> <em>${escapeHtml(titleParts[1])}</em>`
    : escapeHtml(data.course.title);
  document.getElementById("course-desc").textContent = data.course.description;

  const heroMeta = document.getElementById("hero-meta");
  heroMeta.innerHTML = `
    <div><dt>Teacher</dt><dd>${escapeHtml(data.course.instructor)}</dd></div>
    <div><dt>Series</dt><dd>${escapeHtml(data.course.series)}</dd></div>
    <div><dt>Live On</dt><dd>${escapeHtml(data.course.meetingTime)}</dd></div>
    <div><dt>Anchor</dt><dd>${escapeHtml(data.course.motto)}</dd></div>
  `;

  // ---------- Filters (themes) ----------
  const themes = ["All", ...Array.from(new Set(data.weeks.map(w => w.theme)))];
  const filtersEl = document.getElementById("filters");
  let activeTheme = "All";
  filtersEl.innerHTML = themes.map(t => `
    <button class="chip${t === activeTheme ? " active" : ""}" data-theme="${escapeAttr(t)}">${escapeHtml(t)}</button>
  `).join("");
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    activeTheme = btn.dataset.theme;
    filtersEl.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.theme === activeTheme));
    renderWeeks();
  });

  // ---------- Weeks (modules) ----------
  const weekList = document.getElementById("week-list");
  let openWeeks = new Set();
  let allExpanded = false;

  function renderWeeks() {
    const visible = activeTheme === "All" ? data.weeks : data.weeks.filter(w => w.theme === activeTheme);
    weekList.innerHTML = visible.map(w => weekHtml(w)).join("");
    wireWeekInteractions();
  }

  function weekHtml(w) {
    const open = openWeeks.has(w.n);
    const chevron = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
    const progress = moduleProgress(w);

    return `
      <article class="week${open ? " is-open" : ""}${progress.complete ? " is-complete" : ""}" data-week="${w.n}">
        <button class="week-head" data-week="${w.n}" aria-expanded="${open}">
          <div class="week-num">${pad(w.n)}</div>
          <div class="week-title-block">
            <div class="week-title">${escapeHtml(w.title)}</div>
            <div class="week-dates">${escapeHtml(w.dates)}</div>
          </div>
          <span class="week-theme">${escapeHtml(w.theme)}</span>
          <span class="week-progress" title="Sections engaged">${progress.engaged} / ${progress.total}</span>
          <span class="week-toggle" aria-hidden="true">${chevron}</span>
        </button>

        ${open ? weekBodyHtml(w) : ""}
      </article>
    `;
  }

  function weekBodyHtml(w) {
    return `
      <div class="week-body">

        ${section(1, "Teaching", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
          teachingHtml(w))}

        ${section(2, "Reflection", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>',
          reflectionHtml(w))}

        ${section(3, "Scripture Discovery", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
          discoveryHtml(w))}

        ${section(4, "Prophetic Journal", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
          journalHtml(w))}

        ${section(5, "Activation Exercise", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
          activationHtml(w))}

        ${section(6, "Prayer Points", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
          prayerPointsHtml(w))}

        ${section(7, "Declarations", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
          declarationsHtml(w))}

        ${section(8, "Practical Kingdom Assignment", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
          assignmentHtml(w))}

        ${section(9, "Testimony", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z"/></svg>',
          testimonyHtml(w))}

        ${section(10, "Self-Assessment", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>',
          selfAssessmentHtml(w))}

      </div>
    `;
  }

  function section(num, title, iconSvg, contentHtml) {
    return `
      <section class="course-section">
        <header class="course-section-head">
          <span class="section-icon" aria-hidden="true">${iconSvg}</span>
          <h3>${escapeHtml(title)}</h3>
        </header>
        <div class="course-section-body">${contentHtml}</div>
      </section>
    `;
  }

  // ----- Section renderers -----

  function teachingHtml(w) {
    const idx = store.cardIndex[w.n] || 0;
    const card = w.teachingCards[idx];
    const total = w.teachingCards.length;
    return `
      <div class="teaching-card">
        <div class="teaching-card-meta">Card ${idx + 1} of ${total}</div>
        <p class="teaching-card-text">${escapeHtml(card)}</p>
        <div class="teaching-card-controls">
          <button class="btn-pill" data-teach-prev="${w.n}" ${idx === 0 ? "disabled" : ""}>\u2190 Previous</button>
          <div class="teaching-dots" aria-hidden="true">
            ${w.teachingCards.map((_, i) => `<span class="dot${i === idx ? " active" : ""}" data-teach-jump="${w.n}-${i}"></span>`).join("")}
          </div>
          <button class="btn-pill" data-teach-next="${w.n}" ${idx === total - 1 ? "disabled" : ""}>Next \u2192</button>
        </div>
        <button class="btn-secondary btn-speak" data-speak="${escapeAttr(card)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          Read aloud
        </button>
      </div>
    `;
  }

  function reflectionHtml(w) {
    return `
      <p class="section-lede">Answer privately. Your responses stay on this device until you choose to save them as a file.</p>
      <div class="reflection-list">
        ${w.reflection.map((q, i) => `
          <div class="reflection-item">
            <label for="reflect-${w.n}-${i}" class="reflection-q">${escapeHtml(q)}</label>
            <textarea
              id="reflect-${w.n}-${i}"
              class="journal-input"
              rows="3"
              placeholder="Write your answer\u2026"
              data-reflect="${w.n}-${i}"
            >${escapeHtml(store.reflectionAnswers[w.n + "-" + i] || "")}</textarea>
          </div>
        `).join("")}
      </div>
    `;
  }

  function discoveryHtml(w) {
    const d = w.scriptureDiscovery;
    return `
      <p class="section-lede">Read the passages slowly. Then answer the discovery questions in your own words.</p>
      <div class="discovery-passages">
        ${d.passages.map(p => `
          <blockquote class="kjv-block">
            <span class="kjv-ref">${escapeHtml(p.ref)}</span>
            <p>${escapeHtml(p.text)}</p>
          </blockquote>
        `).join("")}
      </div>
      <div class="reflection-list">
        ${d.questions.map((q, i) => `
          <div class="reflection-item">
            <label for="discover-${w.n}-${i}" class="reflection-q">${escapeHtml(q)}</label>
            <textarea
              id="discover-${w.n}-${i}"
              class="journal-input"
              rows="3"
              placeholder="Discover and write\u2026"
              data-discover="${w.n}-${i}"
            >${escapeHtml(store.discoveryAnswers[w.n + "-" + i] || "")}</textarea>
          </div>
        `).join("")}
      </div>
    `;
  }

  function journalHtml(w) {
    return `
      <p class="section-lede prompt-quote">${escapeHtml(w.journalPrompt)}</p>
      <textarea
        class="journal-input journal-input-large"
        rows="6"
        placeholder="Impressions, scriptures, convictions, action steps\u2026"
        data-journal="${w.n}"
      >${escapeHtml(store.journal[w.n] || "")}</textarea>
      <p class="section-footnote">Test every impression against Scripture. Seek wise counsel where needed.</p>
    `;
  }

  function activationHtml(w) {
    const done = !!store.activationDone[w.n];
    return `
      <div class="callout-card activation-card${done ? " is-done" : ""}">
        <p>${escapeHtml(w.activation)}</p>
        <button class="btn-toggle${done ? " is-done" : ""}" data-activation="${w.n}">
          ${done ? "\u2713 I did this" : "Mark as done"}
        </button>
      </div>
    `;
  }

  function prayerPointsHtml(w) {
    return `
      <p class="section-lede">Pray each one aloud. Tap when you have prayed it.</p>
      <ul class="prayer-list">
        ${w.prayerPoints.map((p, i) => {
          const done = !!store.prayerPointDone[w.n + "-" + i];
          return `
            <li class="prayer-item${done ? " is-done" : ""}">
              <button class="prayer-tick${done ? " is-done" : ""}" data-prayer="${w.n}-${i}" aria-pressed="${done}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
              <span class="prayer-text">${escapeHtml(p)}</span>
            </li>
          `;
        }).join("")}
      </ul>
    `;
  }

  function declarationsHtml(w) {
    return `
      <p class="section-lede">Speak each line aloud, one at a time. Tap to mark each one declared.</p>
      <ol class="declaration-list">
        ${w.declarations.map((d, i) => {
          const done = !!store.declarationDone[w.n + "-" + i];
          return `
            <li class="declaration-item${done ? " is-done" : ""}">
              <span class="declaration-text">${escapeHtml(d)}</span>
              <div class="declaration-actions">
                <button class="btn-icon btn-speak" data-speak="${escapeAttr(d)}" title="Read aloud">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
                <button class="btn-pill btn-declare${done ? " is-done" : ""}" data-declaration="${w.n}-${i}">
                  ${done ? "\u2713 Declared" : "I declare this"}
                </button>
              </div>
            </li>
          `;
        }).join("")}
      </ol>
      <button class="btn-secondary" data-speak-all="${w.n}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        Read all declarations aloud
      </button>
    `;
  }

  function assignmentHtml(w) {
    const done = !!store.assignmentDone[w.n];
    return `
      <div class="callout-card assignment-card${done ? " is-done" : ""}">
        <p>${escapeHtml(w.weeklyAssignment)}</p>
        <button class="btn-toggle${done ? " is-done" : ""}" data-assignment="${w.n}">
          ${done ? "\u2713 I am committed" : "I commit to this"}
        </button>
      </div>
    `;
  }

  function testimonyHtml(w) {
    return `
      <p class="section-lede">${escapeHtml(w.testimony)}</p>
      <textarea
        class="journal-input journal-input-large"
        rows="5"
        placeholder="What God did this week\u2026 dates, details, answered prayers."
        data-testimony="${w.n}"
      >${escapeHtml(store.testimony[w.n] || "")}</textarea>
    `;
  }

  function selfAssessmentHtml(w) {
    const s = w.selfAssessment;
    const total = s.items.length * 5;
    let earned = 0;
    s.items.forEach((_, i) => { earned += store.selfAssessment[w.n + "-" + i] || 0; });
    const pct = total ? Math.round((earned / total) * 100) : 0;
    return `
      <p class="section-lede">${escapeHtml(s.title)} \u2014 rate yourself honestly, 1 (low) to 5 (high).</p>
      <div class="assess-list">
        ${s.items.map((item, i) => {
          const val = store.selfAssessment[w.n + "-" + i] || 0;
          return `
            <div class="assess-item">
              <div class="assess-label">${escapeHtml(item)}</div>
              <div class="assess-scale" role="radiogroup">
                ${[1,2,3,4,5].map(n => `
                  <button
                    class="assess-dot${val === n ? " active" : ""}"
                    data-assess="${w.n}-${i}-${n}"
                    aria-label="Rate ${n}"
                    title="${n}"
                  >${n}</button>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
      <div class="assess-summary">
        <div class="assess-bar"><div class="assess-bar-fill" style="width:${pct}%"></div></div>
        <span class="assess-score">${earned} / ${total} \u00b7 ${pct}%</span>
      </div>
    `;
  }

  // ---------- Wire interactions for each rendered week ----------
  function wireWeekInteractions() {
    // Module head toggle
    weekList.querySelectorAll(".week-head").forEach(head => {
      head.addEventListener("click", () => {
        const n = +head.dataset.week;
        if (openWeeks.has(n)) openWeeks.delete(n); else openWeeks.add(n);
        renderWeeks();
        if (openWeeks.has(n)) {
          // Scroll the newly-opened module into view
          setTimeout(() => {
            const article = weekList.querySelector(`.week[data-week="${n}"]`);
            if (article) article.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      });
    });

    // Teaching card nav
    weekList.querySelectorAll("[data-teach-prev]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const n = +b.dataset.teachPrev;
        store.cardIndex[n] = Math.max(0, (store.cardIndex[n] || 0) - 1);
        renderWeeks();
      });
    });
    weekList.querySelectorAll("[data-teach-next]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const n = +b.dataset.teachNext;
        const w = data.weeks.find(x => x.n === n);
        store.cardIndex[n] = Math.min(w.teachingCards.length - 1, (store.cardIndex[n] || 0) + 1);
        renderWeeks();
      });
    });
    weekList.querySelectorAll("[data-teach-jump]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const [n, i] = b.dataset.teachJump.split("-").map(Number);
        store.cardIndex[n] = i;
        renderWeeks();
      });
    });

    // Reflection textareas
    weekList.querySelectorAll("[data-reflect]").forEach(t => {
      t.addEventListener("input", () => {
        store.reflectionAnswers[t.dataset.reflect] = t.value;
        updateProgress();
        updateJournalCount();
      });
    });

    // Discovery textareas
    weekList.querySelectorAll("[data-discover]").forEach(t => {
      t.addEventListener("input", () => {
        store.discoveryAnswers[t.dataset.discover] = t.value;
        updateProgress();
        updateJournalCount();
      });
    });

    // Journal textarea
    weekList.querySelectorAll("[data-journal]").forEach(t => {
      t.addEventListener("input", () => {
        store.journal[+t.dataset.journal] = t.value;
        updateProgress();
        updateJournalCount();
      });
    });

    // Activation
    weekList.querySelectorAll("[data-activation]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const n = +b.dataset.activation;
        store.activationDone[n] = !store.activationDone[n];
        renderWeeks();
        updateProgress();
      });
    });

    // Prayer points
    weekList.querySelectorAll("[data-prayer]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = b.dataset.prayer;
        store.prayerPointDone[key] = !store.prayerPointDone[key];
        renderWeeks();
        updateProgress();
      });
    });

    // Declarations
    weekList.querySelectorAll("[data-declaration]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = b.dataset.declaration;
        store.declarationDone[key] = !store.declarationDone[key];
        renderWeeks();
        updateProgress();
      });
    });

    // Assignment
    weekList.querySelectorAll("[data-assignment]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const n = +b.dataset.assignment;
        store.assignmentDone[n] = !store.assignmentDone[n];
        renderWeeks();
        updateProgress();
      });
    });

    // Testimony textarea
    weekList.querySelectorAll("[data-testimony]").forEach(t => {
      t.addEventListener("input", () => {
        store.testimony[+t.dataset.testimony] = t.value;
        updateProgress();
        updateJournalCount();
      });
    });

    // Self-assessment
    weekList.querySelectorAll("[data-assess]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const [n, i, v] = b.dataset.assess.split("-").map(Number);
        const key = n + "-" + i;
        store.selfAssessment[key] = store.selfAssessment[key] === v ? 0 : v;
        renderWeeks();
        updateProgress();
      });
    });

    // Speak (single line)
    weekList.querySelectorAll("[data-speak]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        speak(b.dataset.speak);
      });
    });
    // Speak all declarations
    weekList.querySelectorAll("[data-speak-all]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const n = +b.dataset.speakAll;
        const w = data.weeks.find(x => x.n === n);
        speakSequence(w.declarations);
      });
    });
  }

  // ---------- Speech ----------
  function speak(text) {
    if (!("speechSynthesis" in window)) {
      toast("Read-aloud isn't available in this browser");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1.0;
    window.speechSynthesis.speak(u);
  }
  function speakSequence(lines) {
    if (!("speechSynthesis" in window)) {
      toast("Read-aloud isn't available in this browser");
      return;
    }
    window.speechSynthesis.cancel();
    lines.forEach(line => {
      const u = new SpeechSynthesisUtterance(line);
      u.rate = 0.95;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    });
  }

  // ---------- Module progress ----------
  function moduleProgress(w) {
    // Count engagement: each non-empty answer / each ticked item counts
    let engaged = 0;
    let total = 0;

    // Teaching cards: count as engaged if user advanced past first card
    total += 1;
    if ((store.cardIndex[w.n] || 0) >= w.teachingCards.length - 1) engaged += 1;

    // Reflection
    w.reflection.forEach((_, i) => {
      total += 1;
      if ((store.reflectionAnswers[w.n + "-" + i] || "").trim()) engaged += 1;
    });
    // Discovery
    w.scriptureDiscovery.questions.forEach((_, i) => {
      total += 1;
      if ((store.discoveryAnswers[w.n + "-" + i] || "").trim()) engaged += 1;
    });
    // Journal
    total += 1;
    if ((store.journal[w.n] || "").trim()) engaged += 1;
    // Activation
    total += 1;
    if (store.activationDone[w.n]) engaged += 1;
    // Prayer points
    w.prayerPoints.forEach((_, i) => {
      total += 1;
      if (store.prayerPointDone[w.n + "-" + i]) engaged += 1;
    });
    // Declarations
    w.declarations.forEach((_, i) => {
      total += 1;
      if (store.declarationDone[w.n + "-" + i]) engaged += 1;
    });
    // Assignment
    total += 1;
    if (store.assignmentDone[w.n]) engaged += 1;
    // Testimony
    total += 1;
    if ((store.testimony[w.n] || "").trim()) engaged += 1;
    // Self-assessment
    w.selfAssessment.items.forEach((_, i) => {
      total += 1;
      if (store.selfAssessment[w.n + "-" + i]) engaged += 1;
    });

    return { engaged, total, complete: engaged === total };
  }

  // ---------- Progress strip ----------
  function updateProgress() {
    // Spiritual metrics, not %.
    let declared = 0, prayed = 0, reflected = 0, testimonies = 0;
    data.weeks.forEach(w => {
      w.declarations.forEach((_, i) => { if (store.declarationDone[w.n + "-" + i]) declared++; });
      w.prayerPoints.forEach((_, i) => { if (store.prayerPointDone[w.n + "-" + i]) prayed++; });
      w.reflection.forEach((_, i) => { if ((store.reflectionAnswers[w.n + "-" + i] || "").trim()) reflected++; });
      w.scriptureDiscovery.questions.forEach((_, i) => { if ((store.discoveryAnswers[w.n + "-" + i] || "").trim()) reflected++; });
      if ((store.journal[w.n] || "").trim()) reflected++;
      if ((store.testimony[w.n] || "").trim()) testimonies++;
    });
    document.getElementById("progress-stats").innerHTML =
      `<strong>${declared}</strong> decrees declared \u00b7 <strong>${prayed}</strong> prayer points prayed \u00b7 <strong>${reflected}</strong> reflections written \u00b7 <strong>${testimonies}</strong> testimonies recorded`;

    // Progress bar = total engagement across all modules
    let engaged = 0, total = 0;
    data.weeks.forEach(w => {
      const p = moduleProgress(w);
      engaged += p.engaged;
      total += p.total;
    });
    const pct = total ? Math.round((engaged / total) * 100) : 0;
    document.getElementById("progress-fill").style.width = pct + "%";
  }

  // ---------- My Journal section (unified across courses) ----------
  function updateJournalCount() {
    if (typeof window.DH_renderJournal === "function") window.DH_renderJournal();
  }

  function renderJournalPreview() {
    if (typeof window.DH_renderJournal === "function") window.DH_renderJournal();
  }

  // ---------- Register Course 1 with shared kernel ----------
  window.DH.register("c1", {
    courseLabel: "Course 1 — Power to Make Kingdom Wealth",
    serialize: () => store,
    restore: (s) => {
      Object.keys(store).forEach(k => { delete store[k]; });
      Object.assign(store, s);
      ["cardIndex","reflectionAnswers","discoveryAnswers","journal","activationDone","prayerPointDone","declarationDone","assignmentDone","testimony","selfAssessment"].forEach(k => {
        if (!store[k] || typeof store[k] !== "object") store[k] = {};
      });
      renderWeeks();
      updateProgress();
      updateJournalCount();
    },
    reset: () => {
      ["cardIndex","reflectionAnswers","discoveryAnswers","journal","activationDone","prayerPointDone","declarationDone","assignmentDone","testimony","selfAssessment"].forEach(k => {
        store[k] = {};
      });
      renderWeeks();
      updateProgress();
      updateJournalCount();
    },
    refresh: () => updateJournalCount(),
    collectEntries: () => {
      const entries = [];
      data.weeks.forEach(w => {
        const mod = `C1 Module ${w.n} \u2014 ${w.title}`;
        w.reflection.forEach((q, i) => {
          const a = (store.reflectionAnswers[w.n + "-" + i] || "").trim();
          if (a) entries.push({ mod, kind: "Reflection", q, a });
        });
        w.scriptureDiscovery.questions.forEach((q, i) => {
          const a = (store.discoveryAnswers[w.n + "-" + i] || "").trim();
          if (a) entries.push({ mod, kind: "Discovery", q, a });
        });
        const j = (store.journal[w.n] || "").trim();
        if (j) entries.push({ mod, kind: "Prophetic Journal", q: w.journalPrompt, a: j });
        const t = (store.testimony[w.n] || "").trim();
        if (t) entries.push({ mod, kind: "Testimony", q: "What God did", a: t });
      });
      return entries;
    },
  });

  // ---------- Save / Restore journal as file (unified across all courses) ----------
  const saveBtn = document.getElementById("save-journal");
  if (saveBtn) saveBtn.addEventListener("click", () => {
    const bundle = { _format: "DominionHourCourse.v2", _savedAt: new Date().toISOString(), courses: {} };
    window.DH.list().forEach(([id, h]) => { bundle.courses[id] = h.serialize(); });
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().slice(0, 10);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-kingdom-wealth-journal-${stamp}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    window.DH.toast("Journal saved \u2014 keep this file private");
  });

  const restoreBtn = document.getElementById("restore-journal");
  const restoreInput = document.getElementById("restore-input");
  if (restoreBtn) restoreBtn.addEventListener("click", () => restoreInput.click());
  if (restoreInput) restoreInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        if (!payload) { window.DH.toast("That file doesn't look like a journal save"); return; }
        // Backward compatibility with v1 (Course 1 only)
        if (payload._format === "DominionHourCourse.v1" && payload.store) {
          window.DH.registry.c1.restore(payload.store);
        } else if (payload._format === "DominionHourCourse.v2" && payload.courses) {
          Object.entries(payload.courses).forEach(([id, s]) => {
            if (window.DH.registry[id]) window.DH.registry[id].restore(s);
          });
        } else {
          window.DH.toast("That file doesn't look like a journal save"); return;
        }
        window.DH.refreshAll();
        window.DH.toast("Journal restored");
      } catch (err) {
        window.DH.toast("Could not read that file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  // ---------- Reset (clears every registered course) ----------
  const resetBtn = document.getElementById("reset-progress");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    if (!confirm("Reset everything on this device? Your reflections, journal entries, and testimonies will be cleared from both courses. (You may want to save them to a file first.)")) return;
    window.DH.list().forEach(([, h]) => h.reset && h.reset());
    window.DH.refreshAll();
    window.DH.toast("Reset complete");
  });

  // ---------- Unified journal renderer (lives globally so c2 can trigger it) ----------
  window.DH_renderJournal = function () {
    const el = document.getElementById("journal-preview");
    const countEl = document.getElementById("journal-count");
    if (!el) return;
    let entries = [];
    window.DH.list().forEach(([, h]) => {
      if (h.collectEntries) entries = entries.concat(h.collectEntries());
    });
    if (countEl) countEl.textContent = entries.length;
    if (!entries.length) {
      el.innerHTML = `<div class="journal-empty">
        <span class="label">Your journal is empty</span>
        Start any lesson and write your reflections. Everything you type across both courses will appear in this private journal.
      </div>`;
      return;
    }
    el.innerHTML = entries.map(e => `
      <article class="journal-entry">
        <div class="journal-entry-head">
          <span class="journal-kind">${escapeHtml(e.kind)}</span>
          <span class="journal-mod">${escapeHtml(e.mod)}</span>
        </div>
        <div class="journal-q">${escapeHtml(e.q)}</div>
        <div class="journal-a">${escapeHtml(e.a).replace(/\n/g, "<br>")}</div>
      </article>
    `).join("");
  };

  // ---------- Helpers ----------
  function pad(n) { return String(n).padStart(2, "0"); }
  function escapeHtml(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function escapeAttr(s) { return escapeHtml(s); }
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  // ---------- Initial render ----------
  renderWeeks();
  updateProgress();
  updateJournalCount();
})();
