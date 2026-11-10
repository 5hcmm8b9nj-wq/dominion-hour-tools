// Interactive shell for the teaching site.  Client-only, in-memory state.
(function(){
  const D = window.DATA;
  const IDX = window.SEARCH_INDEX;
  const KEY = "dh_witchcraft_2026_08_14__";
  // In-memory key-value store. Persistence within a single browsing session only.
  const MEM = {};
  const STORE = {
    get: k => (k in MEM ? MEM[k] : null),
    set: (k,v) => { MEM[k] = v; },
    del: k => { delete MEM[k]; },
  };
  const g = id => document.getElementById(id);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const escapeHtml = s => (s||"").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  /* -------- Progress tracking (modules + checklist + homework) -------- */
  function get(key, def){ try{const v=STORE.get(KEY+key);return v?JSON.parse(v):def}catch(e){return def} }
  function set(key, val){ try{ STORE.set(KEY+key, JSON.stringify(val)); }catch(e){} }

  function updateProgressBar(){
    const modDone = (get("modules-done",[])||[]).length;
    const clDone  = (get("checklist-done",[])||[]).length;
    const hwDone  = (get("hw-done",[])||[]).length;
    const total   = D.modules.length + D.checklist.length + D.homework.length;
    const done    = modDone + clDone + hwDone;
    const pct = total ? Math.round(done*100/total) : 0;
    const bar = g("progress-fill"), lab = g("progress-pct");
    if(bar) bar.style.width = pct + "%";
    if(lab) lab.textContent = pct + "%";
    // Certificate button
    const btn = g("certificate-btn");
    if(btn) btn.disabled = pct < 100;
    const noticedone = g("cert-locked");
    if(noticedone) noticedone.style.display = pct < 100 ? "block" : "none";
    const certcard = g("cert-card");
    if(certcard) certcard.style.display = pct >= 100 ? "block" : "none";
  }

  /* -------- Tabs -------- */
  function activateTab(name){
    $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    $$(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "tab-"+name));
    try{ STORE.set(KEY+"lasttab", name) }catch(e){}
    window.scrollTo({top: 0, behavior: "smooth"});
  }
  window.goTab = activateTab;

  /* -------- Modules (Welcome list) -------- */
  function renderModules(){
    const host = g("module-list");
    if(!host) return;
    const done = get("modules-done", []);
    host.innerHTML = D.modules.map(m => `
      <li onclick="goTab('modules');document.getElementById('${m.id}').scrollIntoView({behavior:'smooth'})">
        <div class="num">${m.num}</div>
        <div class="name">${escapeHtml(m.name)}</div>
        <div class="lead">${escapeHtml(m.lead)}</div>
        <div class="small" style="margin-top:6px;color:${done.includes(m.id)?'#3D5A2E':'#8a8781'}">
          ${done.includes(m.id) ? "✓ Complete" : "Not started"}
        </div>
      </li>`).join("");
  }

  function renderFullModules(){
    const host = g("modules-body");
    if(!host) return;
    const done = get("modules-done", []);
    host.innerHTML = D.modules.map(m => `
      <article class="card" id="${m.id}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
          <div>
            <span class="pill">Module ${m.num}</span>
            <h3 class="card-title" style="margin-top:8px">${escapeHtml(m.name)}</h3>
            <div class="card-sub">${escapeHtml(m.lead)}</div>
          </div>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" data-mod="${m.id}" ${done.includes(m.id)?'checked':''} />
            <span class="small">Mark complete</span>
          </label>
        </div>
        ${moduleBody(m.id)}
      </article>
    `).join("");
    // wire checkboxes
    host.querySelectorAll("input[data-mod]").forEach(cb => cb.addEventListener("change", e => {
      const id = e.target.dataset.mod;
      let arr = get("modules-done", []);
      if(e.target.checked){ if(!arr.includes(id)) arr.push(id) }
      else{ arr = arr.filter(x => x !== id) }
      set("modules-done", arr);
      renderModules(); updateProgressBar();
    }));
  }

  function moduleBody(id){
    // Return descriptive body for each module — teaching + scriptures + prayers as appropriate
    switch(id){
      case "m1": return `
        <p>Prophet Prince opened the altar with worship and thanksgiving, teaching that when you praise before you pray you release the presence of God to enforce your deliverance.</p>
        ${sc("Psalm 34:1-7")}
        ${sc("Psalm 34:7")}
        <p><strong>Witchcraft attack defined:</strong> The demonically orchestrated affliction of a person's life, family, finances, marriage, ministry, or destiny by human agents empowered by unclean spirits.</p>`;
      case "m2": return `
        ${sc("Exodus 22:18")}
        <p>This is not a suggestion. The Lord commands His people to give witchcraft no place. We do not tolerate what God says to destroy.</p>
        ${sc("Matthew 3:10")}
        ${sc("Luke 3:16")}`;
      case "m3": return `
        <p>Witchcraft operates through people close to you — family members, friends, co-workers — who carry information about your life into demonic gatherings. They trade in witchcraft markets where a soul is bought and sold.</p>
        <p>Household enemies are the hardest form of witchcraft attack because they have access, information, and permission by association. But no weapon formed against you shall prosper.</p>
        ${sc("Isaiah 54:17")}
        ${sc("Psalm 59:1-9")}`;
      case "m4": return `
        <p>Prophet Prince gave seven signs — a diagnostic every believer should learn.</p>
        <div class="sign-grid">
          ${D.sevenSigns.map((s,i)=>`
            <div class="sign">
              <div class="sign-num">${i+1}</div>
              <h4>${escapeHtml(s.name)}</h4>
              <p>${escapeHtml(s.body)}</p>
            </div>`).join("")}
        </div>`;
      case "m5": return `
        ${sc("2 Kings 9:22")}
        <p>Jezebel represents a higher order of witchcraft — sorcery, manipulation, and control. When Jehu asked, "Is it peace?" the answer was, "What peace, so long as the whoredoms of thy mother Jezebel and her witchcrafts are so many?"</p>
        <p>A no-peace pattern in a life, marriage, workplace, or ministry can be the fingerprint of this operation. The remedy is repentance, submission to God, and warfare in Jesus' name.</p>
        ${sc("James 4:7")}`;
      case "m6": return `
        <p>Prophet Prince taught extensively on dream attacks. Spiritual snakes, dogs and unclean animals in dreams are witchcraft projections. Food eaten in a dream is a witchcraft transaction if not renounced. Dream-sex points to a spirit-spouse contract that must be broken by the blood of Jesus.</p>
        <p>Response: take communion; renounce the transaction; ask the Holy Spirit for revelation; and journal recurring symbols to bring to your covering.</p>
        ${sc("Luke 10:19")}`;
      case "m7": return `
        <p>The 20 corporate declarations from the service are preserved verbatim on the Declarations tab. Speak them aloud with faith.</p>
        <button class="btn btn-gold btn-small" onclick="goTab('declarations')">Open Declarations →</button>`;
      case "m8": return `
        <p>Cover your spouse and your children in the blood of Jesus. Pray for them by name. Prophet Prince shared how the pastor's-wife pattern shows that when a covering keeps praying through the retaliation, the breakthrough comes.</p>
        <div class="declaration">Deliver me, deliver my partner, deliver my husband, deliver my wife, deliver my children. They shall not be used against me. I block every access; I block every entrance they always use to attack me.</div>`;
      case "m9": return `
        <div class="instruction">
          <h4>Prophetic instruction — garlic in oil</h4>
          <p>Open the cap of your anointing oil. Take three fresh cloves of garlic, remove the stems, and drop them into the oil. Soak for three days. <strong>Do not use it</strong> until Prophet Prince gives the instruction in the anointing service later this week.</p>
        </div>
        <p>Communion is available for those attacked in dreams — drink the wine as the blood of Jesus and mark yourself with the oil once approved.</p>`;
      case "m10": return `
        <p>Corporate seven-fold fire — command Holy Ghost fire seven times when you pray. This is a covenant declaration based on:</p>
        ${sc("Psalm 18:12-14")}
        <div class="declaration">Holy Ghost fire! Holy Ghost fire! Holy Ghost fire! Holy Ghost fire! Holy Ghost fire! Holy Ghost fire! Holy Ghost fire! (Seven times)</div>`;
      case "m11": return `
        <p>Prophet Prince called the church to trade with the anointing — to seal deliverance with a titled covenant seed. The seed silences the voice of the witch.</p>
        <div class="declaration">Let this seed silence every voice of a witch in my life. Let my seed silence every witchcraft attack in the name of Jesus.</div>
        <p class="small">Give through the ministry's Linktree, Cash App, Zelle, or MoMo channels shared in the service.</p>`;
      case "m12": return `
        <p>The closing exhortation calls the church to repair the altar. Where the altar is broken, witchcraft flourishes. Where the altar burns, witchcraft cannot stand.</p>
        <p>Prophet Prince also warned against fake prophets and the pull of consulting occult men when God delays. The remedy is corporate prayer, submission to your covering, and faith in the God who cannot lie.</p>
        ${sc("Luke 1:37")}`;
      default: return "";
    }
  }
  function sc(ref){
    const t = D.kjv[ref] || "";
    return `<div class="scripture"><span class="ref">${escapeHtml(ref)} (KJV)</span><span class="body">${escapeHtml(t)}</span></div>`;
  }

  /* -------- Scriptures library -------- */
  function renderScriptures(){
    const host = g("scriptures-body");
    if(!host) return;
    host.innerHTML = D.scriptureGroups.map(gr => `
      <article class="card">
        <h3 class="card-title">${escapeHtml(gr.group)}</h3>
        ${gr.refs.map(r => sc(r)).join("")}
      </article>`).join("");
  }

  /* -------- Declarations -------- */
  function renderDeclarations(){
    const host = g("declarations-body");
    if(!host) return;
    host.innerHTML = `
      <div class="card">
        <p class="small">All 20 declarations exactly as delivered in the service. Speak them aloud; hear yourself speak faith.</p>
        <div class="note-toolbar">
          <button class="btn btn-gold btn-small" onclick="window.print()">Print declarations</button>
        </div>
      </div>
      ${D.declarations.map((d,i)=>`
        <div class="card" style="padding:14px 20px">
          <div class="pill">Declaration ${i+1}</div>
          <div class="declaration" style="margin-top:10px">${escapeHtml(d)}</div>
        </div>`).join("")}`;
  }

  /* -------- Prayers -------- */
  function renderPrayers(){
    const host = g("prayers-body");
    if(!host) return;
    host.innerHTML = D.prayerPoints.map(sec => `
      <article class="card">
        <h3 class="card-title">${escapeHtml(sec.section)}</h3>
        ${sec.points.map(p => `<div class="prayer">${escapeHtml(p)}</div>`).join("")}
      </article>`).join("");
  }

  /* -------- Prophetic directions -------- */
  function renderDirections(){
    const host = g("directions-body");
    if(!host) return;
    host.innerHTML = D.propheticDirections.map(pd => `
      <div class="instruction">
        <h4>${escapeHtml(pd.title)}</h4>
        <p>${escapeHtml(pd.body)}</p>
      </div>`).join("");
  }

  /* -------- Notes -------- */
  function renderNotes(){
    const ta = g("notes-textarea");
    if(!ta) return;
    ta.value = get("notes", "") || "";
    ta.addEventListener("input", () => set("notes", ta.value));
  }
  window.exportNotes = function(){
    const blob = new Blob([get("notes","")||""], {type:"text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url;
    a.download="deliverance-from-witchcraft-attacks_notes.txt";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 500);
  }
  window.clearNotes = function(){
    if(confirm("Clear all notes on this device?")){ set("notes",""); renderNotes(); }
  }

  /* -------- Progress: checklist & homework -------- */
  function renderChecklist(){
    const host = g("checklist-body");
    if(!host) return;
    const done = get("checklist-done", []);
    host.innerHTML = `<ul class="checklist">${D.checklist.map((item,i)=>`
      <li class="${done.includes(i)?'done':''}" data-i="${i}">
        <input type="checkbox" ${done.includes(i)?'checked':''} data-cli="${i}"/>
        <span>${escapeHtml(item)}</span>
      </li>`).join("")}</ul>`;
    host.querySelectorAll("input[data-cli]").forEach(cb => cb.addEventListener("change", e => {
      const i = parseInt(e.target.dataset.cli,10);
      let arr = get("checklist-done", []);
      if(e.target.checked){ if(!arr.includes(i)) arr.push(i) } else { arr = arr.filter(x=>x!==i) }
      set("checklist-done", arr);
      renderChecklist(); updateProgressBar();
    }));
  }
  function renderHomework(){
    const host = g("homework-body");
    if(!host) return;
    const done = get("hw-done", []);
    host.innerHTML = `<ul class="checklist">${D.homework.map((item,i)=>`
      <li class="${done.includes(i)?'done':''}" data-i="${i}">
        <input type="checkbox" ${done.includes(i)?'checked':''} data-hw="${i}"/>
        <span>${escapeHtml(item)}</span>
      </li>`).join("")}</ul>`;
    host.querySelectorAll("input[data-hw]").forEach(cb => cb.addEventListener("change", e => {
      const i = parseInt(e.target.dataset.hw,10);
      let arr = get("hw-done", []);
      if(e.target.checked){ if(!arr.includes(i)) arr.push(i) } else { arr = arr.filter(x=>x!==i) }
      set("hw-done", arr);
      renderHomework(); updateProgressBar();
    }));
  }

  /* -------- Downloads -------- */
  function renderDownloads(){
    const host = g("downloads-body");
    if(!host) return;
    host.innerHTML = `<div class="dl-grid">${D.downloads.map(d=>`
      <a class="dl" href="assets/downloads/${d.file}" download>
        <div class="pill">PDF</div>
        <div class="dl-title">${escapeHtml(d.title)}</div>
        <div class="dl-desc">${escapeHtml(d.desc)}</div>
        <div class="dl-link">Download →</div>
      </a>`).join("")}</div>`;
  }

  /* -------- Search -------- */
  function renderSearch(){
    const input = g("search-input");
    if(!input) return;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      const host = g("search-results");
      if(!q){ host.innerHTML = `<p class="small">Type at least two characters. The index covers all Scriptures, modules, declarations, prayer points, prophetic directions, and the seven signs.</p>`; return; }
      if(q.length < 2){ host.innerHTML=""; return; }
      const results = IDX.filter(r => (r.title+" "+r.text+" "+r.cat).toLowerCase().includes(q)).slice(0,60);
      if(!results.length){ host.innerHTML = `<p class="small">No matches. Try another word.</p>`; return; }
      const mark = txt => escapeHtml(txt).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),"gi"), m => `<mark>${m}</mark>`);
      host.innerHTML = results.map(r => `
        <div class="search-result" onclick="goTab('${r.tab}')">
          <div class="cat">${escapeHtml(r.cat)}</div>
          <div style="font-weight:600;color:#0B1E3F">${mark(r.title)}</div>
          <div class="small" style="margin-top:4px">${mark((r.text||"").slice(0,220))}${(r.text||"").length>220?'…':''}</div>
        </div>`).join("");
    });
  }

  /* -------- Quiz -------- */
  function renderQuiz(){
    const host = g("quiz-body");
    if(!host) return;
    const savedAns = get("quiz-answers", {});
    host.innerHTML = D.quiz.map((q,i)=>`
      <div class="quiz-q" id="qq${i}">
        <h4>Q${i+1}. ${escapeHtml(q.q)}</h4>
        ${q.opts.map((o,j)=>`
          <label class="quiz-opt" data-i="${i}" data-j="${j}">
            <input type="radio" name="q${i}" value="${j}" ${savedAns[i]===j?'checked':''}/>
            ${escapeHtml(o)}
          </label>`).join("")}
      </div>`).join("") + `
      <div class="card center">
        <button class="btn btn-gold" id="quiz-check">Check my answers</button>
        <button class="btn btn-ghost" style="color:#0B1E3F;border-color:#0B1E3F;margin-left:8px" onclick="resetQuiz()">Reset quiz</button>
        <div id="quiz-score" style="margin-top:16px"></div>
      </div>`;
    host.querySelectorAll("input[type=radio]").forEach(r => r.addEventListener("change", e=>{
      const p = e.target.closest(".quiz-q");
      const i = Array.from(host.querySelectorAll(".quiz-q")).indexOf(p);
      const ans = get("quiz-answers", {}); ans[i]=parseInt(e.target.value,10); set("quiz-answers",ans);
    }));
    g("quiz-check").addEventListener("click", ()=>{
      const ans = get("quiz-answers", {});
      let score=0;
      D.quiz.forEach((q,i)=>{
        const p = g("qq"+i);
        p.querySelectorAll(".quiz-opt").forEach(opt=>opt.classList.remove("correct","wrong"));
        const chosen = ans[i];
        if(chosen === q.correct){
          p.querySelectorAll(".quiz-opt")[q.correct].classList.add("correct");
          score++;
        } else {
          if(chosen !== undefined) p.querySelectorAll(".quiz-opt")[chosen].classList.add("wrong");
          p.querySelectorAll(".quiz-opt")[q.correct].classList.add("correct");
        }
      });
      g("quiz-score").innerHTML = `<strong>Score: ${score} / ${D.quiz.length}</strong> — ${score===D.quiz.length?"Every answer correct. Well done.":"Review the modules where an answer was missed."}`;
    });
  }

  /* -------- Certificate -------- */
  function certName(){ return (get("cert-name","") || "Beloved Believer"); }
  window.saveCertName = function(){
    const val = g("cert-name-input").value.trim();
    set("cert-name", val);
    g("cert-name-line").textContent = val || "Beloved Believer";
  }
  window.printCert = function(){ window.print(); }
  window.resetQuiz = function(){ set("quiz-answers", {}); renderQuiz(); }

  /* -------- Init -------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderModules();
    renderFullModules();
    renderScriptures();
    renderDeclarations();
    renderPrayers();
    renderDirections();
    renderChecklist();
    renderHomework();
    renderDownloads();
    renderSearch();
    renderNotes();
    renderQuiz();

    $$(".tab").forEach(t => t.addEventListener("click", () => activateTab(t.dataset.tab)));
    const last = STORE.get(KEY+"lasttab");
    activateTab(last || "welcome");

    // Cert name
    const nameInput = g("cert-name-input");
    if(nameInput){ nameInput.value = get("cert-name","") || ""; }
    const nl = g("cert-name-line");
    if(nl) nl.textContent = certName();

    updateProgressBar();
  });
})();
