// Shared header + footer, path-aware so the site works both root-hosted and subdir-hosted.
(function(){
  // Compute base path: everything up to and including the site root
  // Pages live at index.html, l137/index.html, dominion-hour/index.html, modules/*.html, rubrics/*.html, how-to-build.html
  // The base is the directory whose index.html is the site's root.
  const path=window.location.pathname;
  // Detect current depth from the URL path segments after the site root.
  // We treat any of the known folders as depth-1; other paths as depth-0.
  const seg=path.replace(/\/$/,'').split('/').filter(Boolean);
  const last=seg[seg.length-1]||'';
  const parent=seg[seg.length-2]||'';
  let base='./';
  if(parent==='l137'||parent==='dominion-hour'||parent==='modules'||parent==='rubrics'){base='../';}

  const H=(u)=>base+u;

  const HEADER=`
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${H('index.html')}" aria-label="School of Deliverance home">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5"/>
          <path d="M20 8 L20 32 M8 20 L32 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="20" cy="20" r="4" fill="currentColor"/>
        </svg>
        School of Deliverance
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="${H('index.html')}">Home</a>
        <a href="${H('l137/index.html')}">L137 School</a>
        <a href="${H('dominion-hour/index.html')}">Dominion Hour School</a>
        <a href="${H('modules/ordinances-of-intimacy.html')}">Sample Module</a>
        <a href="${H('rubrics/index.html')}">Rubric</a>
        <a href="${H('how-to-build.html')}">Guide</a>
      </nav>
    </div>
  </header>`;

  const FOOTER=`
  <footer class="footer">
    <div class="container">
      <div>
        <strong>School of Deliverance</strong>
        <p>A shared online training design for two ministries. Blueprint inspired by Koinonia School of Ministry (Apostle Joshua Selman), used structurally only; no affiliation claimed.</p>
        <p class="footer-tag">L137 Deliverance Ministry International · Luke 1:37 KJV · For with God nothing shall be impossible.</p>
        <p class="footer-tag">Dominion Hour with Prophet Prince Amo David · Luke 10:19 KJV.</p>
      </div>
      <div>
        <strong>L137</strong>
        <p><a href="${H('l137/index.html')}">L137 Syllabus</a></p>
        <p><a href="https://l137ministry.org">l137ministry.org</a></p>
        <p><a href="https://l137.pplx.app">l137.pplx.app</a></p>
      </div>
      <div>
        <strong>Dominion Hour</strong>
        <p><a href="${H('dominion-hour/index.html')}">Dominion Hour Syllabus</a></p>
        <p><a href="https://dominion-hour.pplx.app">dominion-hour.pplx.app</a></p>
      </div>
    </div>
  </footer>`;

  document.addEventListener('DOMContentLoaded',()=>{
    const h=document.getElementById('site-header');
    const f=document.getElementById('site-footer');
    if(h) h.outerHTML=HEADER;
    if(f) f.outerHTML=FOOTER;
  });
})();
