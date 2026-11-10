/* ============================================================
   PROVOKING THE DIVINE COVENANT — interactive companion
   Solo-first, no scorekeeping, no shame. Progress kept in-session.
   ============================================================ */
(function () {
  'use strict';

  /* ---- In-memory progress store (persists for the session) ---- */
  var store = (function () {
    var mem = {};
    return {
      get: function (key) { return mem.hasOwnProperty(key) ? mem[key] : null; },
      set: function (key, val) { mem[key] = val; }
    };
  })();
  function loadJSON(key, fallback) {
    try { var v = store.get(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function saveJSON(key, val) { store.set(key, JSON.stringify(val)); }

  var $ = function (s, c) { return (c || document).querySelector(s); };

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  var menuToggle = $('[data-menu-toggle]');
  var mobileMenu = $('[data-mobile-menu]');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ============================================================
     LODEBAR REVEAL
     ============================================================ */
  var lodBtn = $('[data-lodebar-reveal]');
  var lodRev = $('#lodebar-reveal');
  if (lodBtn && lodRev) {
    lodBtn.addEventListener('click', function () {
      var shown = lodRev.classList.toggle('show');
      lodBtn.setAttribute('aria-expanded', shown ? 'true' : 'false');
      lodBtn.textContent = shown ? 'Hide the meaning' : 'Reveal the meaning';
    });
  }

  /* ============================================================
     TOOL A — COVENANT vs COVENANT (flip cards)
     ============================================================ */
  var covenantPairs = [
    {
      claim: 'I am here by a covenant. Your grandfather sought help and made an agreement — this bondage belongs to your bloodline.',
      answer: 'My covenant with Jesus is a HIGHER covenant. It annuls and nullifies that ancestral agreement — it has no legal hold on me.'
    },
    {
      claim: 'There is a handwriting of ordinance written against you. The record stands, and it demands payment.',
      answer: 'Jesus nailed every handwriting of ordinance to the cross. The record against me is cancelled — it is nullified in His name.'
    },
    {
      claim: 'A death sentence has been pronounced over you and your loved ones. It is only a matter of time.',
      answer: 'By covenant I shall not die prematurely. Every death sentence is reversed by the blood of Jesus — I will see the visitation of God.'
    },
    {
      claim: 'Your marriage, your finances, and your health are under legal claim by prior agreement.',
      answer: 'No demon operating by legality can access my life, my marriage, my finances, or my health — I am covered by the blood.'
    },
    {
      claim: 'Your generation is bound to what came before. The pattern will repeat in your children.',
      answer: 'I command my generation, my children, and my seed OUT of every ancestral covenant by my covenant with God.'
    },
    {
      claim: 'You belong to Lodebar — forgotten, lame, and left in a place of nothing.',
      answer: 'Like Mephibosheth, God is moving me out of Lodebar into the palace to eat at the King\u2019s table.'
    }
  ];
  var flipGrid = $('#flip-grid');
  if (flipGrid) {
    var flipState = loadJSON('dh_flips', {});
    covenantPairs.forEach(function (pair, i) {
      var btn = document.createElement('button');
      btn.className = 'flip';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Covenant claim card ' + (i + 1) + '. Tap to reveal the higher covenant answer.');
      btn.innerHTML =
        '<span class="flip__inner">' +
          '<span class="flip__face flip__face--front">' +
            '<span class="flip__label">A covenant claims\u2026</span>' +
            '<span class="flip__text">' + pair.claim + '</span>' +
            '<span class="flip__hint">Tap to answer &#8635;</span>' +
          '</span>' +
          '<span class="flip__face flip__face--back">' +
            '<span class="flip__label">The higher covenant answers</span>' +
            '<span class="flip__text">' + pair.answer + '</span>' +
            '<span class="flip__hint">Tap to return &#8635;</span>' +
          '</span>' +
        '</span>';
      if (flipState[i]) { btn.classList.add('flipped'); btn.setAttribute('aria-pressed', 'true'); }
      btn.addEventListener('click', function () {
        var f = btn.classList.toggle('flipped');
        btn.setAttribute('aria-pressed', f ? 'true' : 'false');
        flipState[i] = f;
        saveJSON('dh_flips', flipState);
      });
      flipGrid.appendChild(btn);
    });
  }

  /* ============================================================
     TOOL B — SELF-CHECK
     ============================================================ */
  var checkStatements = [
    'I remind God of His covenant when I pray.',
    'I am consistent in prayer, giving, and fasting.',
    'I give thanks and enter His presence with worship.',
    'I walk conscious that I am untouchable by covenant.',
    'I speak declarations over my life and my family.',
    'I bring a sacrifice that actually costs me something.',
    'I remember that Jesus annulled every claim against me.',
    'I expect the visitation and the hand of God.'
  ];
  var scWrap = $('#selfcheck');
  var scMsg = $('#selfcheck-msg');
  if (scWrap) {
    var scState = loadJSON('dh_selfcheck', {});
    function maybeShowMsg() {
      var any = Object.keys(scState).some(function (k) { return scState[k]; });
      if (scMsg) scMsg.classList.toggle('show', any);
    }
    checkStatements.forEach(function (txt, i) {
      var b = document.createElement('button');
      b.className = 'check';
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML =
        '<span class="check__box" aria-hidden="true">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
        '</span><span>' + txt + '</span>';
      if (scState[i]) { b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); }
      b.addEventListener('click', function () {
        var on = b.classList.toggle('on');
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        scState[i] = on;
        saveJSON('dh_selfcheck', scState);
        maybeShowMsg();
      });
      scWrap.appendChild(b);
    });
    maybeShowMsg();

    var scReset = $('[data-selfcheck-reset]');
    if (scReset) scReset.addEventListener('click', function () {
      scState = {};
      saveJSON('dh_selfcheck', scState);
      scWrap.querySelectorAll('.check').forEach(function (c) { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
      if (scMsg) scMsg.classList.remove('show');
    });
    var scSkip = $('[data-selfcheck-skip]');
    if (scSkip) scSkip.addEventListener('click', function () {
      var teaching = document.getElementById('teaching');
      if (teaching) teaching.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ============================================================
     TOOL C — OUT OF LODEBAR JOURNEY
     ============================================================ */
  var stages = [
    {
      step: 'Step One',
      title: 'Lodebar',
      line: 'A place of no word, no pasture, nothing — rejection, lack, and spiritual isolation. Mephibosheth is hidden and forgotten here, lame in his feet.',
      ref: '2 Samuel 9:4 (KJV)',
      verse: '…Behold, he is in the house of Machir, the son of Ammiel, in Lodebar.'
    },
    {
      step: 'Step Two',
      title: 'Covenant Remembered',
      line: 'The king does not forget. Because of a covenant made long ago with Jonathan, David asks whether anyone is left to whom he may show kindness.',
      ref: '2 Samuel 9:1 (KJV)',
      verse: 'And David said, Is there yet any that is left of the house of Saul, that I may shew him kindness for Jonathan\u2019s sake?'
    },
    {
      step: 'Step Three',
      title: 'The King Sends For You',
      line: 'Covenant reaches into the place of nothing. The king sends and fetches Mephibosheth out of Lodebar — you do not have to find your own way out.',
      ref: '2 Samuel 9:5 (KJV)',
      verse: 'Then king David sent, and fetched him out of the house of Machir, the son of Ammiel, from Lodebar.'
    },
    {
      step: 'Step Four',
      title: 'Seated at the Table',
      line: 'Fear is answered with kindness. The land is restored, and the once-forgotten son eats bread at the king\u2019s table continually. This is what covenant does.',
      ref: '2 Samuel 9:7 (KJV)',
      verse: 'Fear not: for I will surely shew thee kindness… and thou shalt eat bread at my table continually.'
    }
  ];
  var jStage = $('#journey-stage');
  var jTrack = $('#journey-track');
  var jPrev = $('[data-journey-prev]');
  var jNext = $('[data-journey-next]');
  if (jStage && jTrack) {
    var jIdx = loadJSON('dh_journey', 0);
    if (typeof jIdx !== 'number' || jIdx < 0 || jIdx >= stages.length) jIdx = 0;
    stages.forEach(function () {
      var d = document.createElement('span');
      d.className = 'journey-dot';
      jTrack.appendChild(d);
    });
    function renderJourney() {
      var s = stages[jIdx];
      jStage.innerHTML =
        '<span class="journey-stage__step">' + s.step + '</span>' +
        '<h4>' + s.title + '</h4>' +
        '<p>' + s.line + '</p>' +
        '<div class="verse"><p class="verse__ref">' + s.ref + '</p><p class="verse__text">' + s.verse + '</p></div>';
      jTrack.querySelectorAll('.journey-dot').forEach(function (d, i) {
        d.classList.toggle('active', i <= jIdx);
      });
      if (jPrev) jPrev.disabled = jIdx === 0;
      if (jNext) jNext.textContent = jIdx === stages.length - 1 ? 'Start again \u21ba' : 'Next step \u2192';
      saveJSON('dh_journey', jIdx);
    }
    if (jPrev) jPrev.addEventListener('click', function () { if (jIdx > 0) { jIdx--; renderJourney(); } });
    if (jNext) jNext.addEventListener('click', function () {
      jIdx = jIdx >= stages.length - 1 ? 0 : jIdx + 1;
      renderJourney();
    });
    renderJourney();
  }

  /* ============================================================
     TOOL D — DECLARATION WALL
     ============================================================ */
  var declarations = [
    'I am a covenant child of the Most High God, and by covenant I am untouchable in the name of Jesus.',
    'God is a Covenant-Keeping God; He remembers His covenant with me and He is under obligation to visit me.',
    'My covenant with Jesus is a HIGHER covenant; it annuls and nullifies every ancestral and demonic covenant.',
    'Every handwriting of ordinance written against me contrary to my covenant, Jesus nailed it to the cross \u2014 it is nullified.',
    'I command my generation, my children, and my seed OUT of every ancestral covenant by my covenant with God.',
    'I am out of every satanic covenant. I am out of every satanic covenant, in the name of Jesus.',
    'No demon operating by legality can access my life, my marriage, my finances, or my health \u2014 I am covered by the blood.',
    'By covenant, I shall not die prematurely; I will see the visitation and the hand of God.',
    'Like Mephibosheth, God is moving me out of Lodebar into the palace to eat at the King\u2019s table.',
    'By covenant, the Lord will restore my glory, my generational blessing, and my bloodline blessing.',
    'Every death sentence pronounced over me and my loved ones is reversed by the blood of Jesus.',
    'I walk in the covenant of long life, prosperity, healing, and protection, in the name of Jesus.',
    'The blessing of Abraham is my portion through Jesus Christ by virtue of new birth.',
    'I provoke the covenant by my prayer, my consistency, my giving, and my sacrifice \u2014 and heaven answers.',
    'I am a conqueror, a winner, delivered and restored \u2014 my life is immune and my destiny is secured.'
  ];
  var declGrid = $('#declar-grid');
  if (declGrid) {
    var declState = loadJSON('dh_declar', {});
    declarations.forEach(function (txt, i) {
      var b = document.createElement('button');
      b.className = 'declar';
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="declar__num" aria-hidden="true">' + (i + 1) + '</span><span>' + txt + '</span>';
      if (declState[i]) { b.classList.add('lit'); b.setAttribute('aria-pressed', 'true'); }
      b.addEventListener('click', function () {
        var lit = b.classList.toggle('lit');
        b.setAttribute('aria-pressed', lit ? 'true' : 'false');
        declState[i] = lit;
        saveJSON('dh_declar', declState);
      });
      declGrid.appendChild(b);
    });
  }

  /* ============================================================
     AUDIO — graceful fallback + persistent bar
     ============================================================ */
  var audiobar = $('#audiobar');
  var audiobarAudio = $('#audiobar-audio');
  var audiobarName = $('#audiobar-name');
  var audioTitles = { declarations: 'The Declarations', renunciation: 'The Renunciation Prayer' };
  var audioSrc = { declarations: './audio/declarations.mp3', renunciation: './audio/renunciation.mp3' };

  document.querySelectorAll('audio[data-audio]').forEach(function (a) {
    var block = a.closest('.audio-block');
    var fallback = block ? block.querySelector('[data-fallback]') : null;
    function showFallback() { if (fallback) fallback.classList.add('show'); }
    function hideFallback() { if (fallback) fallback.classList.remove('show'); }
    a.addEventListener('error', showFallback, true);
    a.addEventListener('stalled', showFallback);
    // Surface fallback if source fails
    var src = a.querySelector('source');
    if (src) { src.addEventListener('error', showFallback); }
    // If the file loads successfully, keep the fallback hidden
    a.addEventListener('loadeddata', hideFallback);
    a.addEventListener('canplay', hideFallback);
    // Verify the file exists (HEAD-style probe via fetch of the mp3 path).
    // In the sandbox binary fetch may be blocked — treat network failure as "unknown", not missing.
    var key = a.getAttribute('data-audio');
    var url = audioSrc[key];
    if (url) {
      fetch(url, { method: 'GET' }).then(function (r) {
        if (r.status === 404 || r.status === 403) { showFallback(); a.setAttribute('data-missing', '1'); }
      }).catch(function () { /* CORS/sandbox redirect — leave native player + error handler to decide */ });
    }
    // When user plays a section player, mirror it into the persistent bar
    a.addEventListener('play', function () {
      var key = a.getAttribute('data-audio');
      if (audiobar && audiobarAudio) {
        if (audiobarName) audiobarName.textContent = audioTitles[key] || 'Listen & Pray Aloud';
        if (audiobarAudio.getAttribute('data-key') !== key) {
          audiobarAudio.src = audioSrc[key];
          audiobarAudio.setAttribute('data-key', key);
        }
        audiobar.classList.add('show');
      }
    });
  });

  // Keep bar and section player from double-playing: pause others when one plays
  var allAudios = Array.prototype.slice.call(document.querySelectorAll('audio'));
  allAudios.forEach(function (a) {
    a.addEventListener('play', function () {
      allAudios.forEach(function (o) { if (o !== a && !o.paused) o.pause(); });
    });
  });

  var barClose = $('[data-audiobar-close]');
  if (barClose && audiobar && audiobarAudio) {
    barClose.addEventListener('click', function () {
      audiobarAudio.pause();
      audiobar.classList.remove('show');
    });
  }
})();
