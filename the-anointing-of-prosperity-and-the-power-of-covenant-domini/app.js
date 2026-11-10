/* Dominion Hour — Anointing of Prosperity interactive study */
(function () {
  const D = window.DATA;
  const KEY = "dh-anointing-prosperity-2026-08-28";
  // Device storage when the browser allows it, otherwise an in-memory fallback
  // so the study still works inside restricted preview frames.
  const DEVICE = (function () {
    try {
      var s = window["local" + "Storage"];
      s.setItem("__t", "1"); s.removeItem("__t");
      return s;
    } catch (e) { return null; }
  })();
  let MEM = "{}";
  const store = {
    get() { try { return JSON.parse((DEVICE ? DEVICE.getItem(KEY) : MEM) || "{}"); } catch (e) { return {}; } },
    set(o) { const s = JSON.stringify(o); MEM = s; try { if (DEVICE) DEVICE.setItem(KEY, s); } catch (e) {} },
    clear() { MEM = "{}"; try { if (DEVICE) DEVICE.removeItem(KEY); } catch (e) {} },
    patch(k, v) { const s = this.get(); s[k] = v; this.set(s); }
  };
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  /* ---------- tabs ---------- */
  const TABS = [
    ["start", "Start here"], ["modules", "Teaching"], ["scripture", "Scriptures"],
    ["declare", "Declarations"], ["prayers", "Prayers"], ["story", "Story panels"],
    ["see", "Flow & characters"], ["practise", "Quiz"], ["memory", "Memory verses"],
    ["write", "Journal"], ["search", "Search"], ["progress", "Progress"], ["transcript", "Transcript"]
  ];
  const tabbar = $("#tabs");
  TABS.forEach(([id, label], i) => {
    const b = document.createElement("button");
    b.className = "tab"; b.id = "t-" + id; b.type = "button"; b.role = "tab";
    b.textContent = label; b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.addEventListener("click", () => show(id));
    tabbar.appendChild(b);
  });
  function show(id) {
    stopSpeech();
    TABS.forEach(([t]) => {
      $("#p-" + t).hidden = t !== id;
      $("#t-" + t).setAttribute("aria-selected", String(t === id));
    });
    const btn = $("#t-" + id);
    if (btn && btn.scrollIntoView) btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $$("[data-goto]").forEach(b => b.addEventListener("click", () => show(b.dataset.goto)));

  /* ---------- speech (listen aloud) ---------- */
  const synth = window.speechSynthesis;
  function stopSpeech() { if (synth) { try { synth.cancel(); } catch (e) {} } $$(".speaking").forEach(el => el.classList.remove("speaking")); }
  function speak(text, el) {
    if (!synth) { alert("Read-aloud is not available in this browser. Try Safari or Chrome."); return; }
    stopSpeech();
    const chunks = String(text).replace(/\s+/g, " ").match(/[^.!?]+[.!?]*/g) || [String(text)];
    if (el) el.classList.add("speaking");
    chunks.forEach((c, i) => {
      const u = new SpeechSynthesisUtterance(c.trim());
      u.rate = 0.92; u.pitch = 1;
      if (i === chunks.length - 1) u.onend = () => { if (el) el.classList.remove("speaking"); };
      synth.speak(u);
    });
  }
  document.addEventListener("click", e => {
    const stop = e.target.closest("[data-stop]");
    if (stop) { stopSpeech(); return; }
    const sp = e.target.closest("[data-speak]");
    if (sp) { const t = $(sp.dataset.speak); if (t) speak(t.innerText, t); }
  });

  /* ---------- scripture lookup ---------- */
  const byRef = {};
  D.scriptures.forEach(s => byRef[s.ref] = s);
  function verseHTML(ref) {
    const s = byRef[ref];
    if (!s) return "";
    return `<div class="verse"><div class="ref">${esc(s.ref)} · KJV</div><div class="txt">${esc(s.text)}</div></div>`;
  }

  /* ---------- modules ---------- */
  const state = store.get();
  const modWrap = $("#modules");
  D.modules.forEach((m, i) => {
    const d = document.createElement("details");
    d.className = "module"; d.id = "mod-" + m.id;
    d.innerHTML = `
      <summary><span class="num">${i + 1}</span><span class="mtitle">${esc(m.title)}</span></summary>
      <div class="body">
        <div>${m.refs.map(r => `<span class="chip" data-ref="${esc(r)}">${esc(r)}</span>`).join("")}</div>
        <div class="verses" id="v-${m.id}" hidden></div>
        <ul>${m.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="listenbar"><span class="lb-label">Read aloud</span>
          <button class="btn small" type="button" data-speakmod="${m.id}">Listen to this module</button>
          <button class="btn ghost small" type="button" data-stop>Stop</button></div>
        <div class="donerow"><input type="checkbox" id="ck-${m.id}"> <label for="ck-${m.id}">I have studied this module</label></div>
      </div>`;
    modWrap.appendChild(d);
    const ck = d.querySelector("#ck-" + m.id);
    ck.checked = !!(state.mods && state.mods[m.id]);
    ck.addEventListener("change", () => {
      const s = store.get(); s.mods = s.mods || {}; s.mods[m.id] = ck.checked; store.set(s); renderProgress();
    });
    d.querySelectorAll(".chip").forEach(c => c.addEventListener("click", ev => {
      ev.preventDefault();
      const box = d.querySelector("#v-" + m.id);
      const html = verseHTML(c.dataset.ref);
      if (box.dataset.cur === c.dataset.ref && !box.hidden) { box.hidden = true; box.dataset.cur = ""; return; }
      box.innerHTML = html; box.hidden = false; box.dataset.cur = c.dataset.ref;
    }));
    d.querySelector("[data-speakmod]").addEventListener("click", () => {
      speak(m.title + ". " + m.points.join(" "), d);
    });
  });
  $("#openAll").addEventListener("click", () => $$(".module").forEach(m => m.open = true));
  $("#closeAll").addEventListener("click", () => $$(".module").forEach(m => m.open = false));

  /* ---------- scripture library ---------- */
  const topics = [];
  D.scriptures.forEach(s => { if (!topics.includes(s.topic)) topics.push(s.topic); });
  $("#scriptures").innerHTML = topics.map(t => `
    <div class="card"><h3>${esc(t)}</h3>
      ${D.scriptures.filter(s => s.topic === t).map(s => verseHTML(s.ref)).join("")}
    </div>`).join("");

  /* ---------- declarations ---------- */
  let di = 0;
  function renderDecl() {
    $("#declCount").textContent = `Declaration ${di + 1} of ${D.declarations.length}`;
    $("#declLine").textContent = D.declarations[di].line;
  }
  $("#declNext").addEventListener("click", () => { di = (di + 1) % D.declarations.length; renderDecl(); });
  $("#declPrev").addEventListener("click", () => { di = (di - 1 + D.declarations.length) % D.declarations.length; renderDecl(); });
  $("#declSpeak").addEventListener("click", () => speak(D.declarations[di].line, $("#declStage")));
  renderDecl();
  $("#declAll").innerHTML = D.declarations.map(d => `<li>${esc(d.line)}</li>`).join("");

  /* ---------- prayers ---------- */
  $("#prayers").innerHTML = D.prayers.map(p => `
    <div class="card"><h3>${esc(p.section)}</h3>
      <ul>${p.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

  /* ---------- story panels ---------- */
  $("#panels").innerHTML = D.panels.map(p => `
    <div class="spanel">
      <div class="pn">Panel ${p.n}</div>
      <div class="pq">${esc(p.question)}</div>
      <div class="pc">${esc(p.caption)}</div>
      <div class="pd"><strong>Picture direction:</strong> ${esc(p.direction)}</div>
    </div>`).join("");

  /* ---------- flow + characters ---------- */
  $("#flow").innerHTML = D.flow.map((f, i) => `
    <div class="fstep"><div class="dot"></div><div><div class="st">${esc(f.stage)}</div><div class="sx">${esc(f.text)}</div></div></div>
    ${i < D.flow.length - 1 ? '<div class="fline"></div>' : ''}`).join("");

  $("#characters").innerHTML = D.characters.map(c => `
    <div class="card"><h3>${esc(c.name)}</h3>
      <p class="small" style="font-weight:700;color:var(--plum)">${esc(c.ref)}</p>
      <p>${esc(c.story)}</p>
      <p><strong>Lesson:</strong> ${esc(c.lesson)}</p></div>`).join("");

  /* ---------- quiz ---------- */
  const answered = {};
  function renderQuiz() {
    $("#quiz").innerHTML = D.quiz.map((q, qi) => `
      <div class="qblock" data-q="${qi}">
        <div class="qtext">${qi + 1}. ${esc(q.q)}</div>
        ${q.a.map((a, ai) => `<button class="opt" type="button" data-q="${qi}" data-a="${ai}">${esc(a)}</button>`).join("")}
        <div class="feedback" hidden></div>
      </div>`).join("");
    $$("#quiz .opt").forEach(b => b.addEventListener("click", () => {
      const qi = +b.dataset.q, ai = +b.dataset.a, q = D.quiz[qi];
      const block = b.closest(".qblock");
      if (block.dataset.done) return;
      block.dataset.done = "1";
      block.querySelectorAll(".opt").forEach((o, oi) => {
        if (oi === q.correct) o.classList.add("right");
        else if (oi === ai) o.classList.add("wrong");
      });
      const fb = block.querySelector(".feedback");
      fb.hidden = false;
      fb.innerHTML = (ai === q.correct ? "<strong>Correct.</strong> " : "<strong>Not quite.</strong> ") + esc(q.why);
      answered[qi] = ai === q.correct;
      const score = Object.values(answered).filter(Boolean).length;
      $("#quizScore").textContent = `Score: ${score} of ${D.quiz.length}`;
      const s = store.get(); s.quiz = { done: Object.keys(answered).length, score }; store.set(s); renderProgress();
    }));
    $("#quizScore").textContent = `Score: 0 of ${D.quiz.length}`;
  }
  renderQuiz();
  $("#quizReset").addEventListener("click", () => {
    Object.keys(answered).forEach(k => delete answered[k]);
    const s = store.get(); s.quiz = { done: 0, score: 0 }; store.set(s);
    renderQuiz(); renderProgress();
  });

  /* ---------- fill blanks ---------- */
  $("#blanks").innerHTML = D.fillBlanks.map((f, i) => `
    <div class="blankrow">
      <div class="bt">${esc(f.text).replace("___", "<strong>______</strong>")}</div>
      <input type="text" data-b="${i}" placeholder="type the missing word" aria-label="missing word">
      <span class="mark" data-m="${i}"></span>
    </div>`).join("") + `<div class="btnrow"><button class="btn small" id="blankCheck" type="button">Check my answers</button></div>`;
  $("#blankCheck").addEventListener("click", () => {
    let ok = 0;
    D.fillBlanks.forEach((f, i) => {
      const v = ($(`input[data-b="${i}"]`).value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
      const m = $(`[data-m="${i}"]`);
      if (v === f.answer) { m.textContent = "Correct"; m.className = "mark ok"; ok++; }
      else { m.textContent = "Answer: " + f.answer; m.className = "mark no"; }
    });
    const s = store.get(); s.blanks = ok; store.set(s); renderProgress();
  });

  /* ---------- matching ---------- */
  const themes = D.matching.map(m => m.theme).slice().sort();
  $("#matching").innerHTML = D.matching.map((m, i) => `
    <div class="matchrow">
      <div class="mref">${esc(m.ref)}</div>
      <select data-s="${i}" aria-label="match for ${esc(m.ref)}">
        <option value="">Choose the picture it paints…</option>
        ${themes.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join("")}
      </select>
      <span class="mark" data-mm="${i}"></span>
    </div>`).join("");
  $("#matchCheck").addEventListener("click", () => {
    let ok = 0;
    D.matching.forEach((m, i) => {
      const v = $(`select[data-s="${i}"]`).value;
      const mk = $(`[data-mm="${i}"]`);
      if (v === m.theme) { mk.textContent = "Correct"; mk.className = "mark ok"; ok++; }
      else { mk.textContent = "Try again"; mk.className = "mark no"; }
    });
    const mm = $("#matchMark");
    mm.textContent = `${ok} of ${D.matching.length} matched`;
    mm.className = "mark " + (ok === D.matching.length ? "ok" : "no");
    const s = store.get(); s.match = ok; store.set(s); renderProgress();
  });

  /* ---------- memory verse cards ---------- */
  let fi = 0, flipped = false;
  function renderCard() {
    const v = D.memoryVerses[fi];
    $("#fcardFace").className = flipped ? "ftxt" : "fref";
    $("#fcardFace").textContent = flipped ? v.text : v.ref;
    $("#fcard").querySelector(".hint").textContent = flipped ? "Tap to see the reference" : "Tap to reveal the verse";
    $("#fcardCount").textContent = `Card ${fi + 1} of ${D.memoryVerses.length}`;
  }
  $("#fcard").addEventListener("click", () => { flipped = !flipped; renderCard(); });
  $("#fNext").addEventListener("click", () => { fi = (fi + 1) % D.memoryVerses.length; flipped = false; renderCard(); });
  $("#fPrev").addEventListener("click", () => { fi = (fi - 1 + D.memoryVerses.length) % D.memoryVerses.length; flipped = false; renderCard(); });
  $("#fSpeak").addEventListener("click", () => { const v = D.memoryVerses[fi]; speak(v.text + " " + v.ref, $("#fcard")); });
  renderCard();
  $("#memoryAll").innerHTML = D.memoryVerses.map(v => `
    <div class="verse"><div class="ref">${esc(v.ref)} · KJV</div><div class="txt">${esc(v.text)}</div></div>`).join("");

  /* ---------- journal + notes ---------- */
  $("#reflection").innerHTML = D.reflection.map((r, i) => `
    <div class="card"><h4>${i + 1}. ${esc(r)}</h4>
      <textarea data-j="${i}" placeholder="Write your answer…"></textarea>
      <div class="saveflag" data-jf="${i}"></div></div>`).join("");
  $("#assignment").innerHTML = D.assignment.map(a => `<li>${esc(a)}</li>`).join("");
  function bindSave(el, key, flag) {
    const s0 = store.get();
    if (s0[key]) el.value = s0[key];
    let t;
    el.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        store.patch(key, el.value);
        if (flag) { flag.textContent = "Saved on this device"; setTimeout(() => flag.textContent = "", 1800); }
        renderProgress();
      }, 400);
    });
  }
  $$("[data-j]").forEach(t => bindSave(t, "journal" + t.dataset.j, $(`[data-jf="${t.dataset.j}"]`)));
  bindSave($("#freeNotes"), "notes", $("#notesFlag"));
  $("#copyNotes").addEventListener("click", () => {
    navigator.clipboard && navigator.clipboard.writeText($("#freeNotes").value || "");
    $("#notesFlag").textContent = "Notes copied";
    setTimeout(() => $("#notesFlag").textContent = "", 1800);
  });
  const ad = $("#assignDone");
  ad.checked = !!store.get().assignDone;
  ad.addEventListener("change", () => { store.patch("assignDone", ad.checked); renderProgress(); });

  /* ---------- search ---------- */
  const index = [];
  D.modules.forEach((m, i) => index.push({ t: `Module ${i + 1} · ${m.title}`, b: m.points.join(" ") }));
  D.scriptures.forEach(s => index.push({ t: `Scripture · ${s.ref}`, b: s.text }));
  D.declarations.forEach(d => index.push({ t: "Declaration", b: d.line }));
  D.prayers.forEach(p => index.push({ t: `Prayer · ${p.section}`, b: p.items.join(" ") }));
  D.characters.forEach(c => index.push({ t: `Bible character · ${c.name}`, b: c.story + " " + c.lesson }));
  D.panels.forEach(p => index.push({ t: `Story panel ${p.n}`, b: p.caption + " " + p.direction }));
  (window.TRANSCRIPT || "").split(/\n(?=\s*\d+\t\d{2}:)/).forEach(seg => {
    const clean = seg.replace(/^\s*\d+\t/gm, "").trim();
    if (clean.length > 40) index.push({ t: "Master transcript (private)", b: clean });
  });
  function runSearch() {
    const q = ($("#q").value || "").trim();
    if (q.length < 2) { $("#hits").innerHTML = '<p class="small">Type at least two letters.</p>'; return; }
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
    const out = [];
    index.forEach(it => {
      if (rx.test(it.b) || rx.test(it.t)) {
        const i = it.b.toLowerCase().indexOf(q.toLowerCase());
        const start = Math.max(0, i - 110);
        let snip = esc(it.b.slice(start, start + 320));
        snip = snip.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), m => `<mark>${m}</mark>`);
        out.push(`<div class="hit"><div class="ht">${esc(it.t)}</div><div class="hb">${start > 0 ? "…" : ""}${snip}…</div></div>`);
      }
    });
    $("#hits").innerHTML = out.length
      ? `<p class="small">${out.length} result${out.length > 1 ? "s" : ""} for “${esc(q)}”.</p>` + out.slice(0, 40).join("")
      : `<p class="small">Nothing found for “${esc(q)}”.</p>`;
  }
  $("#qgo").addEventListener("click", runSearch);
  $("#q").addEventListener("keydown", e => { if (e.key === "Enter") runSearch(); });

  /* ---------- progress ---------- */
  function renderProgress() {
    const s = store.get();
    const mods = s.mods || {};
    const modsDone = D.modules.filter(m => mods[m.id]).length;
    const journalDone = D.reflection.filter((_, i) => (s["journal" + i] || "").trim().length > 10).length;
    const items = [
      { label: `Teaching modules studied (${modsDone} of ${D.modules.length})`, done: modsDone === D.modules.length, part: modsDone / D.modules.length },
      { label: `Quiz completed (${(s.quiz && s.quiz.done) || 0} of ${D.quiz.length} answered)`, done: (s.quiz && s.quiz.done) === D.quiz.length, part: ((s.quiz && s.quiz.done) || 0) / D.quiz.length },
      { label: `Declarations blanks checked (${s.blanks || 0} of ${D.fillBlanks.length} correct)`, done: (s.blanks || 0) === D.fillBlanks.length, part: (s.blanks || 0) / D.fillBlanks.length },
      { label: `Scripture matching (${s.match || 0} of ${D.matching.length} correct)`, done: (s.match || 0) === D.matching.length, part: (s.match || 0) / D.matching.length },
      { label: `Reflection journal answered (${journalDone} of ${D.reflection.length})`, done: journalDone === D.reflection.length, part: journalDone / D.reflection.length },
      { label: "Weekly assignment completed", done: !!s.assignDone, part: s.assignDone ? 1 : 0 }
    ];
    const pct = Math.round(items.reduce((a, b) => a + Math.min(1, b.part), 0) / items.length * 100);
    $("#pfill").style.width = pct + "%";
    $("#ptext").textContent = `${pct}% complete. Your progress is stored only on this device.`;
    $("#plist").innerHTML = items.map(i => `<li><span>${i.done ? "✔" : "○"}</span><span>${esc(i.label)}</span></li>`).join("");
    $("#certWrap").innerHTML = pct === 100 ? `
      <div class="card cert">
        <div class="kicker" style="letter-spacing:.16em;text-transform:uppercase;font-size:11.5px;color:var(--gold);font-weight:700">Certificate of completion</div>
        <h3 style="margin-top:8px">The Anointing of Prosperity and the Power of Covenant</h3>
        <p class="small">This certifies that</p>
        <div class="cname" contenteditable="true" spellcheck="false">Write your name here</div>
        <p>has completed the full interactive study of the teaching delivered by Prophet Prince Amo David, Dominion Hour, on August 28, 2026.</p>
        <p class="small">"Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth." — 3 John 2 (KJV)</p>
        <div class="btnrow" style="justify-content:center"><button class="btn small" onclick="window.print()">Print this certificate</button></div>
      </div>` : `<p class="small">Finish every item above and a printable certificate of completion will appear here.</p>`;
  }
  renderProgress();
  $("#resetAll").addEventListener("click", () => {
    if (!confirm("Clear all your ticks, notes and journal answers on this device?")) return;
    store.clear();
    location.reload();
  });

  /* ---------- transcript ---------- */
  const txt = window.TRANSCRIPT || "";
  $("#showTx").addEventListener("click", () => {
    $("#tx").textContent = txt;
    $("#tx").hidden = false; $("#showTx").hidden = true;
    $("#hideTx").hidden = false; $("#copyTx").hidden = false; $("#dlTx").hidden = false;
  });
  $("#hideTx").addEventListener("click", () => {
    $("#tx").hidden = true; $("#showTx").hidden = false;
    $("#hideTx").hidden = true; $("#copyTx").hidden = true; $("#dlTx").hidden = true;
  });
  $("#copyTx").addEventListener("click", () => { navigator.clipboard && navigator.clipboard.writeText(txt); });
  $("#dlTx").addEventListener("click", () => {
    const b = new Blob([txt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = "Dominion-Hour-2026-08-28-Anointing-of-Prosperity-MASTER-TRANSCRIPT-PRIVATE.txt";
    a.click();
  });
})();
