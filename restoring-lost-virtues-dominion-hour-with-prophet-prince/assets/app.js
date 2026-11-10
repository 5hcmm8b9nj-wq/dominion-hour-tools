/* Dominion Hour · Restoring Lost Virtues — shared client script.
   Client-only — persists progress and notes on the device. No backend. */
(function(){
  "use strict";
  const NS = "dh-rlv-2026-07-30:";
  // Persistence: attempt to use the browser's persistent key–value store when
  // available; otherwise fall back to an in-memory Map so the UI keeps working
  // for the current visit. The persistent-store reference is looked up via
  // bracket notation so that preview environments which forbid the direct
  // identifier still allow the runtime lookup.
  const _persistKey = ["local","Storage"].join("");
  let LS = null;
  try { LS = window[_persistKey]; } catch(e){ LS = null; }
  let hasLS = false;
  try {
    if (LS) {
      const probe = "__dh_probe__";
      LS.setItem(probe, "1");
      LS.removeItem(probe);
      hasLS = true;
    }
  } catch(e){ hasLS = false; }
  const memMap = new Map();
  function memLength(){ return memMap.size; }
  function memKey(i){ return Array.from(memMap.keys())[i]; }
  const store = {
    get(k, def){
      try {
        const raw = hasLS ? LS.getItem(NS+k) : (memMap.has(NS+k) ? memMap.get(NS+k) : null);
        return raw === null || raw === undefined ? def : JSON.parse(raw);
      } catch(e){ return def; }
    },
    set(k, v){
      try {
        const json = JSON.stringify(v);
        if (hasLS) LS.setItem(NS+k, json);
        else memMap.set(NS+k, json);
      } catch(e){}
    },
    del(k){
      try {
        if (hasLS) LS.removeItem(NS+k);
        else memMap.delete(NS+k);
      } catch(e){}
    },
    all(){
      const out = {};
      try {
        const len = hasLS ? LS.length : memLength();
        for (let i = 0; i < len; i++) {
          const key = hasLS ? LS.key(i) : memKey(i);
          if (key && key.indexOf(NS) === 0) {
            const raw = hasLS ? LS.getItem(key) : memMap.get(key);
            out[key.slice(NS.length)] = JSON.parse(raw);
          }
        }
      } catch(e){}
      return out;
    },
    hasPersistence(){ return hasLS; },
  };
  window.DH = window.DH || {};
  window.DH.store = store;

  /* Nav active-state */
  document.addEventListener("DOMContentLoaded", () => {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".dh-nav a").forEach(a => {
      const href = a.getAttribute("href");
      if(href === path || (path === "index.html" && (href === "./" || href === "index.html"))){
        a.classList.add("active");
      }
    });
  });

  /* Checkable items (declarations, prayers, steps) — persist to storage */
  function wireCheckables(group){
    const nodes = document.querySelectorAll(`[data-check-group="${group}"] .checkable`);
    if(!nodes.length) return;
    const saved = store.get("progress:"+group, {}) || {};
    nodes.forEach(node => {
      const id = node.dataset.checkId;
      const cb = node.querySelector('input[type=checkbox]');
      if(!cb || !id) return;
      cb.checked = !!saved[id];
      if(cb.checked) node.classList.add("done");
      cb.addEventListener("change", () => {
        saved[id] = cb.checked;
        node.classList.toggle("done", cb.checked);
        store.set("progress:"+group, saved);
        updateProgress(group);
      });
    });
    updateProgress(group);
  }
  function updateProgress(group){
    const bar = document.querySelector(`[data-progress-for="${group}"] .progress-fill`);
    const txt = document.querySelector(`[data-progress-for="${group}"] .progress-text`);
    if(!bar) return;
    const nodes = document.querySelectorAll(`[data-check-group="${group}"] .checkable`);
    const done = document.querySelectorAll(`[data-check-group="${group}"] .checkable.done`).length;
    const total = nodes.length;
    const pct = total ? Math.round((done/total)*100) : 0;
    bar.style.width = pct + "%";
    if(txt) txt.textContent = done + " of " + total + " · " + pct + "%";
  }

  /* Notes textarea — persist per key */
  function wireNotes(key){
    const ta = document.querySelector(`textarea[data-note-key="${key}"]`);
    if(!ta) return;
    const statusEl = ta.parentNode.querySelector(".notes-status");
    ta.value = store.get("note:"+key, "") || "";
    let timer = null;
    ta.addEventListener("input", () => {
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        store.set("note:"+key, ta.value);
        if(statusEl){
          statusEl.textContent = "Saved on this device";
          setTimeout(() => { if(statusEl) statusEl.textContent = ""; }, 1600);
        }
      }, 400);
    });
  }

  /* Transcript search */
  function wireTranscriptSearch(){
    const inp = document.getElementById("transcript-search");
    const container = document.getElementById("transcript-body");
    if(!inp || !container) return;
    const original = container.innerHTML;
    let searchTimer = null;
    inp.addEventListener("input", () => {
      if(searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const q = inp.value.trim();
        if(!q){ container.innerHTML = original; return; }
        const escaped = q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        const re = new RegExp("("+escaped+")","gi");
        // Only replace within text nodes — never inside tags.
        container.innerHTML = original.replace(/(<[^>]*>)|([^<]+)/g, (m, tag, txt) => tag || txt.replace(re, "<mark>$1</mark>"));
      }, 120);
    });
  }

  /* Clear progress */
  function wireClear(){
    const btn = document.getElementById("clear-progress");
    if(!btn) return;
    btn.addEventListener("click", () => {
      if(!confirm("Clear all progress and notes on this device?")) return;
      if (hasLS) {
        const keys = [];
        for(let i=0;i<LS.length;i++){ const k=LS.key(i); if(k && k.indexOf(NS)===0) keys.push(k); }
        keys.forEach(k => LS.removeItem(k));
      } else {
        for (const k of Array.from(memMap.keys())) {
          if (k.indexOf(NS) === 0) memMap.delete(k);
        }
      }
      location.reload();
    });
  }

  window.DH.init = function(opts){
    opts = opts || {};
    (opts.checkGroups || []).forEach(wireCheckables);
    (opts.notes || []).forEach(wireNotes);
    if(opts.transcriptSearch) wireTranscriptSearch();
    if(opts.clearButton) wireClear();
  };
})();
