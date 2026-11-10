// Intercessor Training — client-side progress + notes (in-memory only for preview)
(function(){
  const state = {
    completedModules: {},
    notes: {},
    bookmarks: {},
    lastVisited: null
  };
  window.IT = {
    getState(){ return state; },
    setModuleComplete(id, done){
      state.completedModules[id] = !!done;
      window.dispatchEvent(new CustomEvent('it:progress'));
    },
    isModuleComplete(id){ return !!state.completedModules[id]; },
    setNote(id, text){ state.notes[id] = text; },
    getNote(id){ return state.notes[id] || ''; },
    toggleBookmark(id){ state.bookmarks[id] = !state.bookmarks[id]; return !!state.bookmarks[id]; },
    isBookmarked(id){ return !!state.bookmarks[id]; },
    completedCount(){ return Object.values(state.completedModules).filter(Boolean).length; },
    setLast(id){ state.lastVisited = id; }
  };
  document.addEventListener('DOMContentLoaded', function(){
    const bar = document.querySelector('.progress-fill');
    const label = document.querySelector('.progress-label');
    function refresh(){
      if(!bar) return;
      const total = 12;
      const done = window.IT.completedCount();
      const pct = Math.round((done/total)*100);
      bar.style.width = pct + '%';
      if(label){ label.textContent = done + ' of ' + total + ' modules complete (' + pct + '%)'; }
    }
    refresh();
    window.addEventListener('it:progress', refresh);
    document.querySelectorAll('.card[data-module]').forEach(function(c){
      const id = c.getAttribute('data-module');
      if(window.IT.isModuleComplete(id)){ c.classList.add('done'); }
    });
    const mid = document.body.getAttribute('data-module');
    if(mid){
      const chk = document.getElementById('mark-complete');
      if(chk){
        chk.checked = window.IT.isModuleComplete(mid);
        chk.addEventListener('change', function(){
          window.IT.setModuleComplete(mid, chk.checked);
          const flag = document.querySelector('.complete-row .saved-flag');
          if(flag){ flag.classList.add('show'); setTimeout(()=>flag.classList.remove('show'),1800); }
        });
      }
      const ta = document.getElementById('module-notes');
      if(ta){
        ta.value = window.IT.getNote(mid);
        const saveBtn = document.getElementById('save-note');
        const flag = document.querySelector('#notes-flag');
        if(saveBtn){
          saveBtn.addEventListener('click', function(){
            window.IT.setNote(mid, ta.value);
            if(flag){ flag.classList.add('show'); setTimeout(()=>flag.classList.remove('show'),1800); }
          });
        }
      }
      window.IT.setLast(mid);
    }
  });
})();
