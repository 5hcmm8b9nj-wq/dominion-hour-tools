// Simple current-nav highlighter
document.addEventListener('DOMContentLoaded',()=>{
  const path=window.location.pathname.replace(/\/$/,'')||'/index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href) return;
    const norm=href.replace(/\/$/,'');
    if(path.endsWith(norm)||(norm==='/index.html'&&(path===''||path==='/'))){a.classList.add('active');}
  });
});
