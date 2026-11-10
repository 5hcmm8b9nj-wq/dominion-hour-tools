/* Altar vs Altar — interactive workbook renderer */
(function () {
  "use strict";
  var WB = window.WORKBOOK;
  var LS = window.localStorage;
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  var boxMeta = {
    scripture: { cls: "scripture", label: "Scripture", emoji: "📖" },
    key: { cls: "key", label: "Key Truth", emoji: "✦" },
    teaching: { cls: "teaching", label: "Teaching", emoji: "📖" },
    warning: { cls: "warning", label: "Warning", emoji: "⚠️" },
    prayer: { cls: "prayer", label: "Prayer", emoji: "🙏" },
    declaration: { cls: "declaration", label: "Declaration", emoji: "🗣️" }
  };

  // ---------- block renderers ----------
  function renderBlock(block, section) {
    var t = block.t;
    if (t === "lead") { var d = el("p", "lead"); d.textContent = block.v; return d; }
    if (t === "p") { var p = el("p"); p.textContent = block.v; return p; }
    if (t === "h") { var h = el("h3", "subhead"); h.textContent = block.v; return h; }
    if (t === "bullets") {
      var ul = el("ul", "bullets");
      block.v.forEach(function (li) { var l = el("li"); l.textContent = li; ul.appendChild(l); });
      return ul;
    }
    if (boxMeta[t]) {
      var m = boxMeta[t];
      var box = el("div", "box " + m.cls);
      var lab = el("div", "box-label");
      lab.innerHTML = '<span class="be">' + m.emoji + '</span> ' + (t === "scripture" && block.ref ? esc(block.ref) : m.label);
      box.appendChild(lab);
      var bp = el("p", t === "scripture" ? "stext" : null);
      bp.textContent = t === "scripture" ? '“' + block.v + '”' : block.v;
      box.appendChild(bp);
      return box;
    }
    if (t === "comparison") return renderComparison(block);
    if (t === "altarGrid") return renderAltarGrid();
    if (t === "bridge") return renderBridge(block.v);
    if (t === "watches") return renderWatches();
    if (t === "reflect") return renderReflect(block, section);
    if (t === "todo") return renderTodo(block, section);
    if (t === "assignment") return renderAssignment(block);
    if (t === "tracker") return renderTracker();
    if (t === "endmark") return renderEndmark(block);
    return el("div");
  }

  function renderComparison(b) {
    var wrap = el("div");
    var tg = el("div", "compare-toggle");
    var bl = el("button", "active left"); bl.textContent = b.headers[0];
    var br = el("button", "right"); br.textContent = b.headers[1];
    tg.appendChild(bl); tg.appendChild(br);
    var comp = el("div", "compare");
    var cols = el("div", "compare-cols show-left");
    var left = el("div", "compare-col left");
    left.appendChild(el("div", "cc-head", esc(b.headers[0])));
    var lu = el("ul"); b.left.forEach(function (x) { var li = el("li"); li.textContent = x; lu.appendChild(li); }); left.appendChild(lu);
    var right = el("div", "compare-col right");
    right.appendChild(el("div", "cc-head", esc(b.headers[1])));
    var ru = el("ul"); b.right.forEach(function (x) { var li = el("li"); li.textContent = x; ru.appendChild(li); }); right.appendChild(ru);
    cols.appendChild(left); cols.appendChild(right);
    comp.appendChild(cols);
    bl.addEventListener("click", function () { cols.className = "compare-cols show-left"; bl.className = "active left"; br.className = "right"; });
    br.addEventListener("click", function () { cols.className = "compare-cols show-right"; br.className = "active right"; bl.className = "left"; });
    wrap.appendChild(tg); wrap.appendChild(comp);
    return wrap;
  }

  function renderAltarGrid() {
    var grid = el("div", "altar-grid");
    WB.altarItems.forEach(function (it) {
      var tile = el("div", "altar-tile"); tile.tabIndex = 0; tile.setAttribute("role", "button");
      tile.innerHTML = '<span class="ae">' + it.e + '</span><span class="al">' + esc(it.l) + '</span><span class="ad">' + esc(it.d) + '</span>';
      tile.addEventListener("click", function () { tile.classList.toggle("show"); });
      tile.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tile.classList.toggle("show"); } });
      grid.appendChild(tile);
    });
    return grid;
  }

  function renderBridge(items) {
    var wrap = el("div", "bridge");
    items.forEach(function (it, i) {
      var box = el("div", "bridge-box " + it.accent);
      box.innerHTML = '<span class="be">' + it.emoji + '</span>' + esc(it.label) + '<span class="bn">' + esc(it.note) + '</span>';
      wrap.appendChild(box);
      if (i < items.length - 1) wrap.appendChild(el("div", "conn", i === 0 ? "⬆" : "⬇"));
    });
    return wrap;
  }

  function renderWatches() {
    var wrap = el("div");
    var now = el("p", "watch-now");
    now.innerHTML = 'Current local time: <span class="clock">—</span>';
    wrap.appendChild(now);
    var grid = el("div", "watch-grid");
    WB.watches.forEach(function (w) {
      var c = el("div", "watch-card"); c.setAttribute("data-hour", w.h);
      c.innerHTML = '<span class="now-badge">⏰ Closest watch</span>' +
        '<div class="wt">' + esc(w.time) + '</div>' +
        '<div class="wl">' + esc(w.label) + '</div>' +
        '<div class="wv">' + esc(w.verse) + '</div>' +
        '<div class="wd">' + esc(w.desc) + '</div>';
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function updateWatches() {
    var clock = $(".watch-now .clock");
    if (!clock) return;
    var d = new Date();
    var hh = d.getHours(), mm = d.getMinutes();
    var ampm = hh >= 12 ? "PM" : "AM";
    var h12 = hh % 12; if (h12 === 0) h12 = 12;
    clock.textContent = h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ampm;
    // find closest watch by absolute hour distance (wrap around 24h)
    var nowMin = hh * 60 + mm;
    var best = null, bestDist = 1e9;
    WB.watches.forEach(function (w) {
      var wm = w.h * 60;
      var dist = Math.abs(nowMin - wm);
      dist = Math.min(dist, 1440 - dist);
      if (dist < bestDist) { bestDist = dist; best = w.h; }
    });
    document.querySelectorAll(".watch-card").forEach(function (c) {
      c.classList.toggle("next", parseInt(c.getAttribute("data-hour"), 10) === best);
    });
  }

  function renderReflect(b, section) {
    var key = "altar_reflect_" + section.id;
    var card = el("div", "reflect-card");
    card.innerHTML = '<div class="rlabel">🙏 Reflect</div><div class="rq">' + esc(b.v) + '</div>';
    var ta = el("textarea");
    ta.placeholder = "Write your reflection here… (saved automatically on this device)";
    ta.value = LS.getItem(key) || "";
    card.appendChild(ta);
    var foot = el("div", "rfoot");
    var saved = el("span", "saved", "✦ Saved");
    var clear = el("button", "clear-btn", "Clear");
    foot.appendChild(saved); foot.appendChild(clear);
    card.appendChild(foot);
    var tmr;
    ta.addEventListener("input", function () {
      LS.setItem(key, ta.value);
      saved.classList.add("show");
      clearTimeout(tmr); tmr = setTimeout(function () { saved.classList.remove("show"); }, 1400);
    });
    clear.addEventListener("click", function () {
      ta.value = ""; LS.removeItem(key); ta.focus();
    });
    return card;
  }

  function renderTodo(b, section) {
    var box = el("div", "todo-box");
    box.innerHTML = '<div class="tlabel">✅ Things To Do</div>';
    b.v.forEach(function (item, i) {
      var key = "altar_todo_" + section.id + "_" + (b.id || "x") + "_" + i;
      var row = el("div", "todo-item");
      if (LS.getItem(key) === "1") row.classList.add("done");
      var chk = el("span", "tcheck");
      var txt = el("span", "ttext"); txt.textContent = item;
      row.appendChild(chk); row.appendChild(txt);
      row.addEventListener("click", function () {
        row.classList.toggle("done");
        LS.setItem(key, row.classList.contains("done") ? "1" : "0");
      });
      box.appendChild(row);
    });
    return box;
  }

  function renderAssignment(b) {
    var box = el("div", "assign-box");
    box.innerHTML = '<div class="alabel">✍️ Assignment</div><div class="atitle">' + esc(b.title) + '</div>';
    var ol = el("ol");
    b.items.forEach(function (item) { var li = el("li"); li.textContent = item; ol.appendChild(li); });
    box.appendChild(ol);
    return box;
  }

  function renderTracker() {
    var weeks = [
      { name: "Week 1 · Build the Altar", start: 1, end: 7 },
      { name: "Week 2 · Fortify the Altar", start: 8, end: 14 },
      { name: "Week 3 · Release Seeds & Harvest", start: 15, end: 21 }
    ];
    var wrap = el("div", "tracker");
    var pw = el("div", "progress-wrap");
    pw.innerHTML = '<div class="progress-label"><span>21-Day Progress</span><span class="pct">0 / 21 days</span></div><div class="bar"><div class="bar-fill"></div></div>';
    wrap.appendChild(pw);

    // determine "today" relative to teaching start (June 19, 2026)
    var start = new Date(2026, 5, 19);
    var today = new Date();
    var dayNum = Math.floor((today - start) / 86400000) + 1;

    weeks.forEach(function (wk) {
      var row = el("div", "week-row");
      row.appendChild(el("div", "wk-head", esc(wk.name)));
      var days = el("div", "days");
      for (var d = wk.start; d <= wk.end; d++) {
        (function (day) {
          var key = "altar_day_" + day;
          var c = el("div", "day-circle"); c.textContent = day;
          if (LS.getItem(key) === "1") c.classList.add("done");
          if (day === dayNum) { c.classList.add("today"); c.appendChild(el("span", "today-tag", "Today")); }
          c.addEventListener("click", function () {
            c.classList.toggle("done");
            LS.setItem(key, c.classList.contains("done") ? "1" : "0");
            updateProgress();
          });
          days.appendChild(c);
        })(d);
      }
      row.appendChild(days);
      wrap.appendChild(row);
    });
    var reset = el("button", "reset-btn", "Reset tracker");
    reset.addEventListener("click", function () {
      if (!confirm("Clear all 21 days?")) return;
      for (var d = 1; d <= 21; d++) LS.removeItem("altar_day_" + d);
      wrap.querySelectorAll(".day-circle").forEach(function (c) { c.classList.remove("done"); });
      updateProgress();
    });
    wrap.appendChild(reset);

    function updateProgress() {
      var done = 0;
      for (var d = 1; d <= 21; d++) if (LS.getItem("altar_day_" + d) === "1") done++;
      $(".bar-fill", wrap).style.width = (done / 21 * 100) + "%";
      $(".pct", wrap).textContent = done + " / 21 days";
    }
    setTimeout(updateProgress, 0);
    return wrap;
  }

  function renderEndmark(b) {
    var box = el("div", "endmark");
    box.innerHTML = '<div class="em-rule">✦ ━━━━━━━ 🔥 ━━━━━━━ ✦</div>' +
      '<div class="em-end">End of the Series</div>' +
      '<div class="em-verse">🔥 ' + esc(b.v) + '</div>';
    return box;
  }

  function divider() {
    var d = el("div", "divider");
    d.innerHTML = '✦ <span class="line">━━━━━━━━</span> 🔥 <span class="line">━━━━━━━━</span> ✦';
    return d;
  }

  // ---------- read aloud ----------
  var synth = window.speechSynthesis;
  var currentBtn = null;
  function plainText(section) {
    var parts = [section.title + "."];
    section.blocks.forEach(function (b) {
      if (b.t === "lead" || b.t === "p" || b.t === "h" || b.t === "key" || b.t === "teaching" || b.t === "warning" || b.t === "prayer" || b.t === "declaration" || b.t === "reflect") {
        parts.push(b.v);
      } else if (b.t === "scripture") {
        parts.push((b.ref || "") + ". " + b.v);
      } else if (b.t === "bullets") {
        parts.push(b.v.join(". "));
      } else if (b.t === "comparison") {
        parts.push(b.headers[0] + ": " + b.left.join(". ") + ". " + b.headers[1] + ": " + b.right.join(". "));
      } else if (b.t === "assignment") {
        parts.push(b.title + ". " + b.items.join(". "));
      } else if (b.t === "todo") {
        parts.push("Things to do. " + b.v.join(". "));
      } else if (b.t === "endmark") {
        parts.push(b.v);
      }
    });
    return parts.join(" ");
  }
  function stopRead() {
    if (synth) synth.cancel();
    if (currentBtn) { currentBtn.classList.remove("playing"); currentBtn.innerHTML = '🗣️ Read aloud'; currentBtn = null; }
  }
  function readAloud(section, btn) {
    if (!synth) { alert("Read-aloud is not supported in this browser."); return; }
    if (currentBtn === btn) { stopRead(); return; }
    stopRead();
    var u = new SpeechSynthesisUtterance(plainText(section));
    u.rate = 0.94; u.pitch = 1.0;
    u.onend = function () { if (currentBtn === btn) stopRead(); };
    currentBtn = btn;
    btn.classList.add("playing"); btn.innerHTML = '⏸ Stop';
    synth.speak(u);
  }

  // ---------- build the page ----------
  function build() {
    // hero
    $("#hero-title").innerHTML = 'Altar <span class="vs">vs</span> Altar';
    var main = $("#sections-root");

    // TOC
    var toc = el("section", "toc"); toc.id = "contents";
    var tw = el("div", "wrap");
    tw.appendChild(el("h2", "section-title", "✦ Table of Contents"));
    tw.appendChild(el("p", "toc-intro", "Three parts of the teaching, combined into one navigable workbook. Tap any section to jump straight to it."));
    WB.parts.forEach(function (part, pi) {
      var card = el("div", "part-card p" + (pi + 1));
      var head = el("div", "pc-head");
      head.innerHTML = '<div class="pc-label">' + esc(part.label) + '</div><div class="pc-title">' + esc(part.title) + '</div><p class="pc-blurb">' + esc(part.blurb) + '</p>';
      card.appendChild(head);
      var grid = el("div", "toc-grid");
      part.sections.forEach(function (s) {
        var a = el("a", "toc-item"); a.href = "#" + s.id;
        a.innerHTML = '<span class="tci">' + s.icon + '</span><span>' + esc(s.title) + '</span>';
        grid.appendChild(a);
      });
      card.appendChild(grid);
      tw.appendChild(card);
    });
    toc.appendChild(tw);
    main.appendChild(toc);

    // sections
    var audioIdx = 0;
    WB.parts.forEach(function (part) {
      part.sections.forEach(function (section) {
        audioIdx++;
        var sec = el("section", "section"); sec.id = section.id; sec.setAttribute("data-part", part.id);
        var w = el("div", "wrap");
        var head = el("div", "section-head");
        head.appendChild(el("div", "section-eyebrow", esc(part.label) + " · " + esc(part.title)));
        var title = el("h2", "section-title");
        title.innerHTML = '<span class="sti">' + section.icon + '</span> ' + esc(section.title);
        head.appendChild(title);
        var actions = el("div", "section-actions");
        var rb = el("button", "read-btn", "🗣️ Read aloud");
        rb.addEventListener("click", function () { readAloud(section, rb); });
        actions.appendChild(rb);
        head.appendChild(actions);
        w.appendChild(head);

        // Studio Voice audio player (Adam + Brian hybrid)
        var studio = el("div", "studio-voice");
        studio.innerHTML =
          '<div class="sv-label"><span class="sv-icon">\uD83C\uDF99\uFE0F</span> <strong>Studio Voice</strong> <span class="sv-sub">\u00b7 Adam &amp; Brian</span></div>' +
          '<audio controls preload="none" class="sv-audio" src="audio/s' + audioIdx + '.mp3?v=studio-1"></audio>';
        w.appendChild(studio);

        section.blocks.forEach(function (b) { w.appendChild(renderBlock(b, section)); });
        w.appendChild(divider());
        sec.appendChild(w);
        main.appendChild(sec);
      });
    });

    buildNav();
    setupScrollSpy();
    setupSearch();
    setupUI();
    updateWatches();
    setInterval(updateWatches, 30000);
  }

  // ---------- side nav ----------
  function buildNav() {
    var nav = $("#sidenav-inner");
    var home = el("a", "nav-home", "🏠 Cover &amp; Contents"); home.href = "#top";
    nav.appendChild(home);
    WB.parts.forEach(function (part, pi) {
      var group = el("div", "nav-group" + (pi > 0 ? " collapsed" : ""));
      var head = el("button", "nav-group-head");
      head.innerHTML = '<span>' + esc(part.label) + '<small>' + esc(part.title) + '</small></span><span class="chev">▾</span>';
      var ul = el("ul", "nav-items");
      part.sections.forEach(function (s) {
        var li = el("li");
        var a = el("a"); a.href = "#" + s.id; a.setAttribute("data-target", s.id);
        a.innerHTML = '<span class="ni">' + s.icon + '</span>' + esc(s.title);
        li.appendChild(a); ul.appendChild(li);
      });
      head.addEventListener("click", function () { group.classList.toggle("collapsed"); });
      group.appendChild(head); group.appendChild(ul);
      nav.appendChild(group);
    });
  }

  function setupScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-items a"));
    var map = {}; links.forEach(function (l) { map[l.getAttribute("data-target")] = l; });
    var sections = Array.prototype.slice.call(document.querySelectorAll(".section[id]"));
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var a = map[e.target.id];
          if (a) {
            a.classList.add("active");
            // expand its group
            var grp = a.closest(".nav-group"); if (grp) grp.classList.remove("collapsed");
            a.scrollIntoView({ block: "nearest" });
          }
        }
      });
    }, { rootMargin: "-80px 0px -65% 0px", threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  }

  // ---------- search ----------
  function setupSearch() {
    var input = $("#search-input"); var results = $("#search-results");
    var index = [];
    WB.parts.forEach(function (part) {
      part.sections.forEach(function (s) {
        var text = s.title + " ";
        s.blocks.forEach(function (b) {
          if (typeof b.v === "string") text += b.v + " ";
          if (b.ref) text += b.ref + " ";
          if (Array.isArray(b.v)) text += b.v.join(" ") + " ";
          if (b.left) text += b.left.join(" ") + " ";
          if (b.right) text += b.right.join(" ") + " ";
          if (b.items) text += b.items.join(" ") + " ";
          if (b.title) text += b.title + " ";
        });
        index.push({ id: s.id, title: s.title, part: part.label, icon: s.icon, text: text.toLowerCase() });
      });
    });
    function run() {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.classList.remove("open"); return; }
      var hits = index.filter(function (x) { return x.title.toLowerCase().indexOf(q) > -1 || x.text.indexOf(q) > -1; });
      results.innerHTML = "";
      if (!hits.length) { results.innerHTML = '<div class="sr-empty">No sections found for “' + esc(input.value) + '”.</div>'; results.classList.add("open"); return; }
      hits.slice(0, 12).forEach(function (h) {
        var a = el("a"); a.href = "#" + h.id;
        a.innerHTML = '<span class="sr-part">' + esc(h.part) + '</span>' + h.icon + ' ' + esc(h.title);
        a.addEventListener("click", function () {
          results.classList.remove("open"); input.value = "";
          setTimeout(function () {
            var sec = document.getElementById(h.id);
            if (sec) { sec.classList.add("search-hit"); setTimeout(function () { sec.classList.remove("search-hit"); }, 1600); }
          }, 400);
        });
        results.appendChild(a);
      });
      results.classList.add("open");
    }
    input.addEventListener("input", run);
    input.addEventListener("focus", function () { if (input.value.trim().length >= 2) run(); });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-wrap")) results.classList.remove("open");
    });
  }

  // ---------- misc UI ----------
  function setupUI() {
    var toggle = $("#menu-toggle"), nav = $("#sidenav"), backdrop = $("#nav-backdrop");
    function closeNav() { nav.classList.remove("open"); backdrop.classList.remove("open"); }
    toggle.addEventListener("click", function () { nav.classList.toggle("open"); backdrop.classList.toggle("open"); });
    backdrop.addEventListener("click", closeNav);
    document.querySelectorAll(".sidenav a").forEach(function (a) {
      a.addEventListener("click", function () { if (window.innerWidth <= 860) closeNav(); });
    });
    // stop read aloud when navigating away
    window.addEventListener("beforeunload", stopRead);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stopRead(); });
    // back to top
    var bt = $("#back-top");
    bt.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () { bt.classList.toggle("show", window.scrollY > 700); });

    // Prayer Watch Mode toggle
    var wm = $("#watch-mode-toggle");
    if (wm) {
      var saved = false;
      try { saved = localStorage.getItem("altar-watch-mode") === "1"; } catch (e) {}
      if (saved) { document.body.classList.add("watch-mode"); wm.textContent = "\u2600\uFE0F"; }
      wm.addEventListener("click", function () {
        var on = document.body.classList.toggle("watch-mode");
        wm.textContent = on ? "\u2600\uFE0F" : "\uD83C\uDF05";
        try { localStorage.setItem("altar-watch-mode", on ? "1" : "0"); } catch (e) {}
      });
    }

    // Share button + share menu
    setupShare();
  }

  function setupShare() {
    var btn = $("#share-btn");
    var menu = $("#share-menu");
    if (!btn || !menu) return;

    var closeBtn = $("#share-close");
    var backdrop = $("#share-backdrop");
    var waLink = $("#share-whatsapp");
    var smsLink = $("#share-sms");
    var emailLink = $("#share-email");
    var copyBtn = $("#share-copy");
    var nativeBtn = $("#share-native");
    var linkInput = $("#share-link-input");
    var toast = $("#share-toast");

    var SHARE_URL = "https://altar-vs-altar.pplx.app";
    var SHARE_TITLE = "Altar vs Altar — Prophetic Prayers";
    var SHARE_MSG = "\uD83D\uDD25 Altar vs Altar — Prophetic Prayers\n\nComplete interactive workbook from Prophet Prince Amo David's Clubhouse teaching. Includes the 21-day altar assignment, prayer cards, and dream symbolism guide.\n\nTap the \uD83C\uDF05 sunrise button for night-mode reading during early-morning prayer watch.\n\n" + SHARE_URL;
    var EMAIL_SUBJECT = SHARE_TITLE + " — Complete Workbook";

    if (linkInput) linkInput.value = SHARE_URL;

    function open() {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg || "Link copied \u2728";
      toast.classList.add("show");
      setTimeout(function () { toast.classList.remove("show"); }, 1800);
    }

    btn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) close();
    });

    // Wire share targets
    if (waLink) waLink.href = "https://wa.me/?text=" + encodeURIComponent(SHARE_MSG);
    if (smsLink) smsLink.href = "sms:&body=" + encodeURIComponent(SHARE_MSG);
    if (emailLink) emailLink.href = "mailto:?subject=" + encodeURIComponent(EMAIL_SUBJECT) + "&body=" + encodeURIComponent(SHARE_MSG);

    // Copy link
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var done = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(SHARE_URL).then(function () { showToast("Link copied \u2728"); });
            done = true;
          }
        } catch (e) {}
        if (!done && linkInput) {
          try {
            linkInput.removeAttribute("readonly");
            linkInput.select();
            linkInput.setSelectionRange(0, 99999);
            document.execCommand("copy");
            linkInput.setAttribute("readonly", "true");
            showToast("Link copied \u2728");
          } catch (e) {
            showToast("Copy manually \u261D\uFE0F");
          }
        }
      });
    }

    // Native share (mobile share sheet)
    if (nativeBtn) {
      if (!navigator.share) {
        nativeBtn.style.display = "none";
      } else {
        nativeBtn.addEventListener("click", function () {
          navigator.share({
            title: SHARE_TITLE,
            text: SHARE_MSG,
            url: SHARE_URL
          }).then(function () { close(); }).catch(function () {});
        });
      }
    }

    // Tap-to-select link
    if (linkInput) {
      linkInput.addEventListener("click", function () {
        linkInput.select();
        linkInput.setSelectionRange(0, 99999);
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
