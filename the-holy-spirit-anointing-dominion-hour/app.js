(function () {
  var D = window.DH;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); };

  // storage with in-memory fallback
  var mem = {}, store = { get: function (k) { return mem[k]; }, set: function (k, v) { mem[k] = v; } };
  try { var ls = window["local" + "Storage"]; ls.setItem("_t", "1"); ls.removeItem("_t");
    store = { get: function (k) { try { return ls.getItem(k); } catch (e) { return mem[k]; } }, set: function (k, v) { try { ls.setItem(k, v); } catch (e) { mem[k] = v; } } };
  } catch (e) {}

  var getJ = function (k, d) { try { var v = store.get(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  var setJ = function (k, v) { store.set(k, JSON.stringify(v)); };
  var del = function (k) { try { window["local" + "Storage"].removeItem(k); } catch (e) {} delete mem[k]; };

  var kjv = function (v) {
    var tag = v.tag ? '<span class="kjv-tag ' + v.src + '">' + esc(v.tag) + "</span>" : "";
    var src = v.src && v.src !== "service" ? '<span class="kjv-src">' + esc(v.note) + "</span>" : "";
    return '<div class="kjv"><span class="kjv-ref"><span>✝ ' + esc(v.ref) + ' (KJV)</span>' + tag + "</span>“" + esc(v.text) + "”" + src + "</div>";
  };
  var noteBox = function (title, text) { return '<div class="callout note"><span class="chip ed">✎ Editor’s Note · ' + esc(title) + "</span><p>" + esc(text) + "</p></div>"; };
  var li = function (p) { return "<li>" + esc(p.t) + (p.shared ? '<span class="shared">Shared with another speaker</span>' : "") + "</li>"; };

  // static content
  $("#heroSub").textContent = D.meta.subtitle;
  $("#heroDate").textContent = D.meta.date;
  $("#heroApproval").textContent = D.meta.approval;
  $("#footApproval").textContent = D.meta.approval;
  $("#summary").textContent = D.meta.summary;
  $("#sourceNote").textContent = D.meta.source_note;
  $("#audioNote").textContent = D.meta.audio_note;
  var cls = { scripture: "", quote: " quote", summary: " red", service: "", editor: " note" };
  var chipc = { scripture: "", quote: " qt", summary: " mint", service: " app", editor: " ed" };
  $("#labels").className = "labels five";
  $("#labels").innerHTML = D.labels.map(function (l) { return '<div class="callout' + cls[l[0]] + '"><span class="chip' + chipc[l[0]] + '">' + esc(l[1]) + "</span><p>" + esc(l[2]) + "</p></div>"; }).join("");
  $("#anchor").innerHTML = kjv(D.anchor);
  $("#anchor2").innerHTML = kjv(D.anchor);
  $("#corporate").textContent = D.corporate;
  $("#footDate").textContent = D.meta.title + " · " + D.meta.date;
  var declHTML = D.declarations.map(function (d) { return '<p class="decl">“' + esc(d) + '.”</p>'; }).join("");
  $("#decls").innerHTML = declHTML; $("#decls2").innerHTML = declHTML;
  $("#declIntro").textContent = D.declIntro;
  $("#declNote").textContent = D.declNote;
  $("#phil").innerHTML = kjv(D.phil);
  $("#prayer").innerHTML = D.prayer.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
  $("#chars").innerHTML = D.characters.map(function (c) { return '<div class="char"><b>' + esc(c[0]) + "</b>" + esc(c[1]) + (c[2] ? '<span class="shared" style="display:block;margin:4px 0 0">' + esc(c[2]) + "</span>" : "") + "</div>"; }).join("");
  $("#scrList").innerHTML = D.scripture.map(kjv).join("");
  $("#downloads").innerHTML = D.downloads.map(function (d) {
    return '<a class="dl" href="' + d.file + '" download><span class="ico">PDF</span><span><b>' + esc(d.name) + "</b>" + esc(d.desc) + '</span><span class="go">Download ↓</span></a>';
  }).join("");

  // chapters
  var NOAUDIO = { c1: 1, c4: 1 };
  var listenBar = function (id) {
    if (NOAUDIO[id]) return '<div class="listen" data-track="' + id + '"><b>LISTEN</b><small>The automated reading for this chapter is being updated to match the corrected text. Please read the chapter for now.</small></div>';
    return '<div class="listen" data-track="' + id + '"><b>LISTEN</b><button class="cbtn" data-act="play" data-id="' + id + '">▶ Play</button><button class="cbtn" data-act="pause" data-id="' + id + '">❚❚ Pause</button><button class="cbtn" data-act="stop" data-id="' + id + '">■ Stop</button><small>Automated reading of the study notes, not the service recording.</small></div>';
  };
  $("#chapters").innerHTML = D.chapters.map(function (c, i) {
    var b = '<span class="chip mint">⚑ Ministry Interpretation · Summary of the teaching</span><ul>' + c.points.map(li).join("") + "</ul>";
    if (c.receive) b += '<div class="two"><div class="callout"><span class="chip">Receiving and maintaining</span><ul>' + c.receive.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div><div class="callout red"><span class="chip mint">Loss of God’s presence</span><ul>' + c.lose.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div>";
    if (c.fruit) b += '<span class="chip">The fruit of the Spirit (KJV)</span><div class="pillset">' + c.fruit.map(function (x) { return '<span class="pill">' + esc(x) + "</span>"; }).join("") + "</div>";
    if (c.illustration) b += '<div class="callout"><span class="chip">' + esc(c.illustration[0]) + "</span><p>" + esc(c.illustration[1].t) + (c.illustration[1].shared ? '<span class="shared">Shared with another speaker</span>' : "") + "</p></div>";
    if (c.subhead) {
      b += "<h4>" + esc(c.subhead) + "</h4><ul>" + c.points2.map(li).join("") + "</ul>";
      if (c.gifts) b += '<span class="chip">The spiritual gifts</span><div class="pillset">' + c.gifts.map(function (x) { return '<span class="pill">' + esc(x) + "</span>"; }).join("") + "</div>";
    }
    b += c.notes.map(function (n) { return noteBox(n[0], n[1]); }).join("");
    b += '<p style="margin:18px 0 0"><span class="chip">✝ Scripture (KJV)</span></p>';
    b += c.verses.length ? c.verses.map(kjv).join("") : '<p class="muted small">' + esc(c.no_scripture) + "</p>";
    b += '<button class="cbtn markread" data-read="' + c.id + '">Mark chapter as read</button>';
    return '<details class="chapter" id="' + c.id + '"' + (i === 0 ? " open" : "") + '><summary><img src="assets/img/' + c.image + '.jpg" alt="" loading="lazy"><div class="ch-head"><span class="kicker">CHAPTER ' + c.num.toUpperCase() + '</span><h3>' + esc(c.title) + '</h3><span class="open">Open chapter <span class="chev">▾</span></span></div></summary><div class="ch-body">' + listenBar(c.id) + b + "</div></details>";
  }).join("");

  // ---------- progress (saved on this device) ----------
  var P = { read: getJ("p_read", {}), days: getJ("p_days", {}), seen: getJ("p_seen", {}), quiz: getJ("p_quiz", { a: {}, checked: false }) };
  var save = function () { setJ("p_read", P.read); setJ("p_days", P.days); setJ("p_seen", P.seen); setJ("p_quiz", P.quiz); };
  var nCh = D.chapters.length, nDays = D.plan.days.length, total = nCh + nDays + 2;
  var updateProgress = function () {
    var r = D.chapters.filter(function (c) { return P.read[c.id]; }).length;
    var d = D.plan.days.filter(function (_, i) { return P.days[i]; }).length;
    var f = Object.keys(P.seen).length >= D.flash.length ? 1 : 0;
    var q = P.quiz.checked && Object.keys(P.quiz.a).length >= D.quiz.length ? 1 : 0;
    var done = r + d + f + q, pct = Math.round(done / total * 100);
    $("#ringFill").style.strokeDashoffset = (113.1 * (1 - done / total)).toFixed(1);
    $("#progPct").textContent = pct + "%";
    $("#progText").textContent = done + " of " + total + " activities";
    $("#progBtn").setAttribute("aria-label", "Study progress: " + pct + "%, " + done + " of " + total + " activities complete. Show what counts");
    $("#progList").innerHTML = "<li>Chapters marked as read: " + r + " of " + nCh + "</li><li>Study-plan days checked: " + d + " of " + nDays + "</li><li>All " + D.flash.length + " flashcards turned over: " + (f ? "done" : Object.keys(P.seen).length + " of " + D.flash.length) + "</li><li>Quiz answered in full and checked: " + (q ? "done" : "not yet") + "</li>";
    $$(".markread").forEach(function (b) { var on = !!P.read[b.dataset.read]; b.classList.toggle("on", on); b.textContent = on ? "✓ Chapter read" : "Mark chapter as read"; b.setAttribute("aria-pressed", on ? "true" : "false"); });
    $("#dayCount").textContent = d + " of " + nDays + " days complete";
  };
  document.addEventListener("click", function (e) { var b = e.target.closest(".markread"); if (!b) return; P.read[b.dataset.read] = !P.read[b.dataset.read]; save(); updateProgress(); });
  var pb = $("#progBtn"), pi = $("#progInfo");
  pb.onclick = function (e) { e.stopPropagation(); pi.hidden = !pi.hidden; pb.setAttribute("aria-expanded", pi.hidden ? "false" : "true"); };
  document.addEventListener("click", function (e) { if (!pi.hidden && !e.target.closest("#prog")) { pi.hidden = true; pb.setAttribute("aria-expanded", "false"); } });

  // confirmation dialog
  var cb = $("#confirmBox"), cOk = $("#cOk"), cAction = null, lastFocus = null;
  var ask = function (title, body, okText, fn) { $("#cTitle").textContent = title; $("#cBody").textContent = body; cOk.textContent = okText; cAction = fn; lastFocus = document.activeElement; cb.hidden = false; $("#cCancel").focus(); };
  var closeAsk = function () { cb.hidden = true; cAction = null; if (lastFocus) lastFocus.focus(); };
  $("#cCancel").onclick = closeAsk;
  cOk.onclick = function () { var f = cAction; closeAsk(); if (f) f(); };
  cb.addEventListener("click", function (e) { if (e.target === cb) closeAsk(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !cb.hidden) closeAsk(); });

  // suggested seven-day plan
  $("#planTitle").textContent = D.plan.title;
  $("#planNote").textContent = D.plan.note;
  $("#days").innerHTML = D.plan.days.map(function (d, i) {
    var who = d.by === "main" ? "⚖ Service instruction" : "⚖ From the service · shared by another participant";
    return '<label class="day"><input type="checkbox" data-i="' + i + '"><span><b>' + esc(d.day.toUpperCase()) + '</b><span class="tags">' + who + "</span>" + esc(d.step) + (d.fast ? '<span class="fast">' + esc(D.plan.fast) + "</span>" : "") + '<br><span class="ref">✝ Suggested reading (editor): ' + esc(d.readings.join("; ")) + "</span></span></label>";
  }).join("");
  var syncDays = function () { $$("#days input").forEach(function (el) { el.checked = !!P.days[el.dataset.i]; }); };
  $$("#days input").forEach(function (el) { el.addEventListener("change", function () { if (el.checked) P.days[el.dataset.i] = 1; else delete P.days[el.dataset.i]; save(); updateProgress(); }); });
  syncDays();

  // tabs
  $$(".tabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".tabs button").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      $$(".tabpanel").forEach(function (p) { p.hidden = p.id !== "tab-" + b.dataset.tab; });
    });
  });

  // flashcards (answer hidden until flipped)
  var fi = 0, card = $("#flashCard");
  var showCard = function () { card.classList.remove("flipped"); $(".front", card).textContent = D.flash[fi][0]; setTimeout(function () { $(".back", card).textContent = D.flash[fi][1]; }, 300); $("#fCount").textContent = (fi + 1) + " / " + D.flash.length; };
  var flip = function () { card.classList.toggle("flipped"); if (card.classList.contains("flipped") && !P.seen[fi]) { P.seen[fi] = 1; save(); updateProgress(); } };
  card.addEventListener("click", flip);
  card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  $("#fPrev").onclick = function () { fi = (fi - 1 + D.flash.length) % D.flash.length; showCard(); };
  $("#fNext").onclick = function () { fi = (fi + 1) % D.flash.length; showCard(); };
  showCard();

  // quiz (answers saved; shown only after checking)
  var renderQuiz = function () {
    $("#quiz").innerHTML = D.quiz.map(function (q, i) {
      var inner;
      if (q.type === "mc") inner = q.options.map(function (o, j) { return '<label><input type="radio" name="q' + i + '" value="' + j + '"> ' + esc(o) + "</label>"; }).join("");
      else if (q.type === "tf") inner = '<label><input type="radio" name="q' + i + '" value="true"> True</label><label><input type="radio" name="q' + i + '" value="false"> False</label>';
      else inner = '<input type="text" name="q' + i + '" aria-label="Your answer" autocomplete="off">';
      return '<div class="q" data-i="' + i + '"><p>' + (i + 1) + ". " + esc(q.q) + "</p>" + inner + '<div class="fb" aria-live="polite"></div></div>';
    }).join("");
    $("#quizScore").textContent = "";
    D.quiz.forEach(function (q, i) {
      var v = P.quiz.a[i]; if (v === undefined) return;
      if (q.type === "fill") $('input[name="q' + i + '"]').value = v;
      else { var r = $('input[name="q' + i + '"][value="' + v + '"]'); if (r) r.checked = true; }
    });
    if (P.quiz.checked) checkQuiz(true);
  };
  var checkQuiz = function (silent) {
    var score = 0;
    D.quiz.forEach(function (q, i) {
      var box = $('.q[data-i="' + i + '"]'), ok = false, right;
      if (q.type === "fill") { var v = ($("input", box).value || "").trim().toLowerCase(); ok = v === q.answer; right = q.answer; }
      else { var s = $("input:checked", box); var val = s ? s.value : null;
        if (q.type === "mc") { ok = val === String(q.answer); right = q.options[q.answer]; } else { ok = val === String(q.answer); right = q.answer ? "True" : "False"; } }
      box.classList.remove("ok", "no"); box.classList.add(ok ? "ok" : "no");
      $(".fb", box).textContent = ok ? "Correct." : "Answer: " + right;
      if (ok) score++;
    });
    $("#quizScore").textContent = score + " / " + D.quiz.length;
    if (!silent) { P.quiz.checked = true; save(); updateProgress(); }
  };
  $("#quiz").addEventListener("input", function (e) {
    var m = /^q(\d+)$/.exec(e.target.name || ""); if (!m) return;
    var v = e.target.value; if (e.target.type === "text" && !v.trim()) delete P.quiz.a[m[1]]; else P.quiz.a[m[1]] = v;
    save(); updateProgress();
  });
  $("#quiz").addEventListener("change", function (e) { var m = /^q(\d+)$/.exec(e.target.name || ""); if (m) { P.quiz.a[m[1]] = e.target.value; save(); updateProgress(); } });
  $("#quizCheck").onclick = function () { checkQuiz(false); };
  $("#quizReset").onclick = function () { P.quiz = { a: {}, checked: false }; save(); renderQuiz(); updateProgress(); };
  renderQuiz();

  // start over (notes kept)
  $("#restartBtn").onclick = function () {
    ask("Start over?", "This clears, on this device: chapters marked as read, study-plan checkmarks, flashcard progress, and quiz answers. Your personal notes will be kept.", "Clear progress", function () {
      P = { read: {}, days: {}, seen: {}, quiz: { a: {}, checked: false } };
      ["p_read", "p_days", "p_seen", "p_quiz"].forEach(del); save();
      syncDays(); renderQuiz(); fi = 0; showCard(); updateProgress();
    });
  };
  updateProgress();

  // notes
  var notes = $("#notes"); notes.value = store.get("notes") || "";
  notes.addEventListener("input", function () { store.set("notes", notes.value); });
  $("#delNotes").onclick = function () {
    ask("Delete your notes?", "This permanently deletes the personal notes saved on this device. Study progress is not affected.", "Delete notes", function () { notes.value = ""; store.set("notes", ""); });
  };

  // audio
  var NAMES = { "welcome": "Welcome · Anchor Scripture", "declarations": "Declarations from the Service", "next-steps": "Next Steps from the Service" };
  D.chapters.forEach(function (c) { NAMES[c.id] = "Chapter " + c.num + " · " + c.title; });
  var audio = $("#audio"), player = $("#player"), cur = null;
  var fmt = function (s) { if (!isFinite(s)) return "0:00"; var m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ":" + (r < 10 ? "0" : "") + r; };
  var sync = function () {
    var playing = !audio.paused && !audio.ended;
    $("#pPlay").classList.toggle("on", playing); $("#pPause").classList.toggle("on", !playing && audio.currentTime > 0);
    $$(".cbtn").forEach(function (b) {
      var mine = b.dataset.id === cur;
      b.classList.toggle("on", mine && ((b.dataset.act === "play" && playing) || (b.dataset.act === "pause" && !playing && audio.currentTime > 0)));
    });
  };
  var load = function (id) {
    if (cur !== id) { cur = id; audio.src = "assets/audio/" + id + ".mp3"; $("#pName").textContent = NAMES[id] || id; }
    player.hidden = false;
  };
  var play = function (id) { if (id) load(id); var p = audio.play(); if (p && p.catch) p.catch(function () {}); };
  var pause = function () { audio.pause(); };
  var stop = function () { audio.pause(); try { audio.currentTime = 0; } catch (e) {} sync(); };
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-play]"); if (t) { play(t.dataset.play); return; }
    var c = e.target.closest(".cbtn"); if (!c) return;
    var id = c.dataset.id, act = c.dataset.act;
    if (act === "play") play(id);
    else if (cur === id) { if (act === "pause") pause(); else stop(); }
  });
  $("#pPlay").onclick = function () { play(); };
  $("#pPause").onclick = pause;
  $("#pStop").onclick = stop;
  var seek = $("#pSeek"), dragging = false;
  seek.addEventListener("input", function () { dragging = true; if (audio.duration) audio.currentTime = seek.value / 100 * audio.duration; });
  seek.addEventListener("change", function () { dragging = false; });
  audio.addEventListener("timeupdate", function () { if (!dragging && audio.duration) seek.value = audio.currentTime / audio.duration * 100; $("#pTime").textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration); });
  ["play", "pause", "ended", "loadedmetadata"].forEach(function (ev) { audio.addEventListener(ev, sync); });

  // day / night
  var root = document.documentElement, btn = $("#themeBtn");
  var setTheme = function (t) {
    root.setAttribute("data-theme", t); store.set("theme", t);
    $(".theme-label", btn).textContent = t === "night" ? "Night" : "Day";
    btn.setAttribute("aria-label", t === "night" ? "Switch to day" : "Switch to night");
  };
  btn.onclick = function () { setTheme(root.getAttribute("data-theme") === "night" ? "day" : "night"); };
  setTheme(store.get("theme") || "day");

  // night sky
  var cv = $("#sky"), ctx = cv.getContext("2d"), stars = [], W = 0, H = 0;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var size = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = []; var n = Math.round(W * H / 6000);
    for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + .3, p: Math.random() * 6.28, s: .5 + Math.random() * 1.5 });
  };
  var draw = function (t) {
    if (root.getAttribute("data-theme") === "night") {
      ctx.clearRect(0, 0, W, H);
      var g = ctx.createRadialGradient(W * .85, H * .12, 0, W * .85, H * .12, 260);
      g.addColorStop(0, "rgba(230,209,154,.18)"); g.addColorStop(1, "rgba(230,209,154,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(240,230,200,.9)"; ctx.beginPath(); ctx.arc(W * .85, H * .12, 26, 0, 6.29); ctx.fill();
      ctx.fillStyle = "#0b1220"; ctx.beginPath(); ctx.arc(W * .85 + 11, H * .12 - 7, 23, 0, 6.29); ctx.fill();
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i], a = reduce ? .7 : .35 + .65 * Math.abs(Math.sin(s.p + t / 1000 * s.s));
        ctx.fillStyle = "rgba(246,236,206," + a.toFixed(2) + ")"; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.29); ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  };
  size(); addEventListener("resize", size); requestAnimationFrame(draw);
})();
