/* ========================================================
   FOUNDATIONS — Interactive App Logic
   ======================================================== */
(function () {
  'use strict';

  const D = window.FOUNDATIONS_DATA;

  // ---------- Utilities ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // In-session storage. localStorage may be blocked in sandboxed
  // iframes for deployed sites, so we keep entries in memory and
  // give the user Export/Import for persistence.
  const journal = { entries: [] };

  // ---------- Tab navigation ----------
  function activateTab(name) {
    $$('.tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === name));
    $$('.view').forEach((v) => v.classList.toggle('active', v.id === name));
    // Scroll to top of main on tab switch (but not on initial load)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  // ---------- Overview: theme cards ----------
  function renderThemes() {
    const container = $('#theme-grid');
    container.innerHTML = D.themes
      .map(
        (t) => `
      <article class="theme-card">
        <p class="theme-anchor">Anchor: ${escapeHtml(t.anchor_verse)}</p>
        <h3>${escapeHtml(t.title)}</h3>
        <p>${escapeHtml(t.summary)}</p>
        <ul class="theme-reflect">
          ${t.reflection.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
        </ul>
      </article>`
      )
      .join('');
  }

  // ---------- Timeline ----------
  function renderTimeline(era = 'all') {
    const items = era === 'all' ? D.timeline : D.timeline.filter((e) => e.era === era);
    const list = $('#timeline-list');
    list.innerHTML = items
      .map((e) => {
        const isCurse = e.theme_tags.some((t) => /curse|false foundation|pride/i.test(t));
        const isCovenant = e.theme_tags.some((t) =>
          /covenant|call|cornerstone|Christ|eternal city/i.test(t)
        );
        const attrs = [
          isCurse ? 'data-curse="1"' : '',
          isCovenant && !isCurse ? 'data-covenant="1"' : ''
        ]
          .filter(Boolean)
          .join(' ');
        return `
        <li class="timeline-item" ${attrs}>
          <div class="timeline-meta">
            <span class="timeline-date">${escapeHtml(e.date)}</span>
            <span class="timeline-era">${escapeHtml(e.era)}</span>
          </div>
          <h3>${escapeHtml(e.title)}</h3>
          <p class="timeline-passage">${escapeHtml(e.passage)}</p>
          <p class="timeline-summary">${escapeHtml(e.summary)}</p>
          <blockquote class="timeline-verse">${escapeHtml(e.key_verse)}</blockquote>
          <ul class="timeline-tags">
            ${e.theme_tags.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}
          </ul>
        </li>`;
      })
      .join('');
  }

  $$('.timeline-filters .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('.timeline-filters .chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderTimeline(chip.dataset.era);
    });
  });

  // ---------- Commentary search ----------
  function renderCommentary(query = '') {
    const q = query.trim().toLowerCase();
    const results = !q
      ? D.commentary
      : D.commentary.filter((c) => {
          const hay = [
            c.ref,
            c.author,
            c.excerpt,
            (c.themes || []).join(' ')
          ]
            .join(' ')
            .toLowerCase();
          return hay.includes(q);
        });

    const highlight = (text) => {
      if (!q) return escapeHtml(text);
      const escaped = escapeHtml(text);
      // Case-insensitive highlight, escape the query for regex
      const pattern = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return escaped.replace(new RegExp(`(${pattern})`, 'gi'), '<mark>$1</mark>');
    };

    $('#commentary-count').textContent =
      results.length === D.commentary.length
        ? `${D.commentary.length} commentary entries`
        : `${results.length} of ${D.commentary.length} entries match`;

    $('#commentary-list').innerHTML = results.length
      ? results
          .map(
            (c) => `
        <article class="commentary-card">
          <div class="commentary-head">
            <h3 class="commentary-ref">${escapeHtml(c.ref)}</h3>
            <span class="commentary-author">${escapeHtml(c.author)}</span>
          </div>
          <p class="commentary-excerpt">${highlight(c.excerpt)}</p>
          <ul class="commentary-themes">
            ${(c.themes || [])
              .map((t) => `<li>${escapeHtml(t)}</li>`)
              .join('')}
          </ul>
        </article>`
          )
          .join('')
      : `<p style="color:var(--ink-mute);font-style:italic;padding:24px 0;">
           No commentary entries match &ldquo;${escapeHtml(query)}&rdquo;. Try a broader term.
         </p>`;
  }

  $('#commentary-search').addEventListener('input', (e) => {
    renderCommentary(e.target.value);
  });

  // ---------- Verse comparison ----------
  function renderVerseSelect() {
    const select = $('#verse-select');
    select.innerHTML = D.verses
      .map(
        (v, i) =>
          `<option value="${i}">${escapeHtml(v.ref)} — ${escapeHtml(v.title)}</option>`
      )
      .join('');
    select.addEventListener('change', (e) => renderVerse(+e.target.value));
    renderVerse(0);
  }

  function renderVerse(idx) {
    const v = D.verses[idx];
    $('#verse-title').innerHTML = `
      <span style="color:var(--gold);font-size:14px;letter-spacing:0.14em;text-transform:uppercase;font-family:var(--font-sans);font-weight:600;display:block;margin-bottom:6px;">
        ${escapeHtml(v.ref)}
      </span>
      ${escapeHtml(v.title)}
    `;
    const grid = $('#verse-grid');
    const order = ['KJV', 'NKJV', 'ESV', 'NIV', 'WEB'];
    const items = order
      .filter((t) => v.translations[t])
      .map(
        (t) => `
      <article class="translation-card ${t.toLowerCase()}">
        <p class="translation-name">${t} · ${translationLabel(t)}</p>
        <p class="translation-text">${escapeHtml(v.translations[t])}</p>
      </article>`
      )
      .join('');
    grid.innerHTML = items;
  }

  function translationLabel(t) {
    return (
      {
        KJV: 'King James Version',
        NKJV: 'New King James',
        ESV: 'English Standard',
        NIV: 'New International',
        WEB: 'World English Bible'
      }[t] || t
    );
  }

  // ---------- Journal ----------
  function renderJournal() {
    const list = $('#journal-list');
    const empty = $('#journal-empty');

    if (!journal.entries.length) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');

    list.innerHTML = journal.entries
      .slice()
      .sort((a, b) => b.created - a.created)
      .map(
        (e) => `
      <article class="entry-card" data-id="${e.id}">
        <div class="entry-head">
          <h3 class="entry-title">${escapeHtml(e.title || 'Untitled reflection')}</h3>
          <span class="entry-meta">${new Date(e.created).toLocaleString()}</span>
        </div>
        ${e.verse ? `<span class="entry-verse-tag">${escapeHtml(e.verse)}</span>` : ''}
        <p class="entry-body">${escapeHtml(e.body)}</p>
        <div class="entry-actions">
          <button data-action="delete" data-id="${e.id}">Delete</button>
        </div>
      </article>`
      )
      .join('');
  }

  $('#btn-save-entry').addEventListener('click', () => {
    const title = $('#entry-title').value.trim();
    const verse = $('#entry-verse').value.trim();
    const body = $('#entry-body').value.trim();

    if (!body) {
      $('#entry-body').focus();
      return;
    }
    journal.entries.push({
      id: 'e-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
      title,
      verse,
      body,
      created: Date.now()
    });
    $('#entry-title').value = '';
    $('#entry-verse').value = '';
    $('#entry-body').value = '';
    renderJournal();
  });

  // Delete via event delegation
  $('#journal-list').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="delete"]');
    if (!btn) return;
    const id = btn.dataset.id;
    journal.entries = journal.entries.filter((x) => x.id !== id);
    renderJournal();
  });

  // Datalist of verses for the journal composer
  function renderVerseDatalist() {
    const dl = $('#verse-datalist');
    dl.innerHTML = [
      ...D.verses.map((v) => v.ref),
      ...D.themes.map((t) => t.title)
    ]
      .map((v) => `<option value="${escapeHtml(v)}">`)
      .join('');
  }

  // Export / Import
  $('#btn-export').addEventListener('click', () => {
    if (!journal.entries.length) {
      alert('No entries to export yet.');
      return;
    }
    const blob = new Blob(
      [
        JSON.stringify(
          {
            exported: new Date().toISOString(),
            source: 'Foundations Bible Study Dashboard',
            entries: journal.entries
          },
          null,
          2
        )
      ],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      'foundations-journal-' +
      new Date().toISOString().slice(0, 10) +
      '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 100);
  });

  $('#import-file').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const incoming = Array.isArray(parsed.entries) ? parsed.entries : [];
        // Merge, avoiding duplicate ids
        const seen = new Set(journal.entries.map((x) => x.id));
        incoming.forEach((entry) => {
          if (entry && entry.body && !seen.has(entry.id)) {
            journal.entries.push({
              id: entry.id || 'e-imp-' + Date.now() + Math.random(),
              title: entry.title || '',
              verse: entry.verse || '',
              body: entry.body,
              created: entry.created || Date.now()
            });
          }
        });
        renderJournal();
      } catch (err) {
        alert('Could not read that file. Please choose a valid JSON export.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset
  });

  // ---------- Boot ----------
  function boot() {
    renderThemes();
    renderTimeline();
    renderCommentary();
    renderVerseSelect();
    renderVerseDatalist();
    renderJournal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
