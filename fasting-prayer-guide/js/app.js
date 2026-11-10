(function(){
"use strict";
var C=window.CONTENT, K=window.KJV;
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function strip(h){var d=document.createElement("div");d.innerHTML=h;return d.textContent||""}
function src(k){var s=C.S[k];return s?'<a href="'+s[1]+'" target="_blank" rel="noopener">'+esc(s[0])+'</a>':""}

/* ---------- in-session store ---------- */
var store=(function(){
  var mem={};
  return {
    get:function(k,d){return Object.prototype.hasOwnProperty.call(mem,k)?JSON.parse(mem[k]):d},
    set:function(k,v){mem[k]=JSON.stringify(v)},
    del:function(k){delete mem[k]},
    clear:function(){mem={}}
  };
})();

/* ---------- recorded audio ---------- */
var player=new Audio();player.preload="none";var playingBtn=null;window.__fgPlayer=player;
var FULL=window.FULL_GUIDE||[];var mode=null,fullIdx=0;
function slug(x){return x.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function fmt(t){if(!isFinite(t))return "0:00";t=Math.floor(t);var h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(s).padStart(2,"0")}
function stopAudio(){player.pause();if(playingBtn){playingBtn.classList.remove("on");setLbl(playingBtn,false)}playingBtn=null;if(mode==="clip"){mode=null;hideBar()}updBar()}
function play(src,btn){
  if(playingBtn===btn){stopAudio();return}
  if(playingBtn){playingBtn.classList.remove("on");setLbl(playingBtn,false)}
  mode="clip";player.src=src;playingBtn=btn;btn.classList.add("on");setLbl(btn,true);
  showBar(btn.dataset.title||"Listening","Now playing");
  var pr=player.play();if(pr&&pr.catch)pr.catch(function(){stopAudio()});
  setMeta(btn.dataset.title||"Fasting & Prayer Guide");
}
function playFull(i,resume){
  if(playingBtn){playingBtn.classList.remove("on");setLbl(playingBtn,false);playingBtn=null}
  if(!FULL.length)return;fullIdx=Math.max(0,Math.min(FULL.length-1,i));
  if(!(resume&&mode==="full"&&player.src.indexOf(FULL[fullIdx].src)>=0)){player.src=FULL[fullIdx].src}
  mode="full";showBar(FULL[fullIdx].title,"Part "+(fullIdx+1)+" of "+FULL.length);
  var pr=player.play();if(pr&&pr.catch)pr.catch(function(){updBar()});
  setMeta(FULL[fullIdx].title);
}
function toggleFull(){if(mode==="full"){if(player.paused){var pr=player.play();if(pr&&pr.catch)pr.catch(function(){})}else player.pause();updBar()}else playFull(fullIdx,false)}
player.addEventListener("ended",function(){if(mode==="full"){if(typeof setAud==="function")setAud(fullIdx,1);if(fullIdx<FULL.length-1)playFull(fullIdx+1);else{mode=null;fullIdx=0;hideBar()}}else stopAudio()});
player.addEventListener("error",function(){if(mode==="clip")stopAudio()});
["play","pause","timeupdate","loadedmetadata"].forEach(function(ev){player.addEventListener(ev,updBar)});
function setMeta(t){if("mediaSession" in navigator){try{navigator.mediaSession.metadata=new MediaMetadata({title:t,artist:"L137 Deliverance Ministry · Dominion Hour",album:"Fasting & Prayer Guide",artwork:[{src:"img/hero.jpg",sizes:"1600x900",type:"image/jpeg"}]});
  navigator.mediaSession.setActionHandler("play",function(){player.play()});navigator.mediaSession.setActionHandler("pause",function(){player.pause()});
  navigator.mediaSession.setActionHandler("nexttrack",mode==="full"?function(){if(fullIdx<FULL.length-1)playFull(fullIdx+1)}:null);
  navigator.mediaSession.setActionHandler("previoustrack",mode==="full"?function(){playFull(player.currentTime>5?fullIdx:fullIdx-1)}:null);
  navigator.mediaSession.setActionHandler("seekbackward",function(){player.currentTime=Math.max(0,player.currentTime-15)});
  navigator.mediaSession.setActionHandler("seekforward",function(){player.currentTime=Math.min(player.duration||0,player.currentTime+30)});
}catch(e){}}}
function showBar(t,k){var np=document.getElementById("nowPlaying");if(!np)return;np.querySelector("b").textContent=t;np.querySelector("small").textContent=k;np.classList.add("on");np.classList.toggle("full",mode==="full");updBar()}
function hideBar(){var np=document.getElementById("nowPlaying");if(np)np.classList.remove("on")}
function updBar(){var np=document.getElementById("nowPlaying");if(!np)return;var playing=!player.paused;
  var pb=document.getElementById("npPlay");if(pb){pb.innerHTML=playing?ICON_PAUSE:ICON_PLAY;pb.setAttribute("aria-label",playing?"Pause":"Play")}
  var sk=document.getElementById("npSeek");if(sk&&player.duration){sk.max=Math.floor(player.duration);if(!sk.dragging)sk.value=Math.floor(player.currentTime)}
  var tm=document.getElementById("npTime");if(tm)tm.textContent=fmt(player.currentTime)+" / "+fmt(player.duration);
  $$(".full-play").forEach(function(b){var on=mode==="full"&&playing;b.classList.toggle("on",on);var l=b.querySelector(".l");if(l)l.textContent=on?"Pause the guide":(mode==="full"?"Resume the guide":"Play the entire guide")});
}
var ICON_SP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
function listenBtn(id,title){return '<button class="listen" type="button" data-audio="audio/'+id+'.mp3" data-title="'+esc(title||"")+'" aria-label="Listen">'+ICON_PLAY+'<span class="l">Listen</span></button>'}
var ICON_PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
var ICON_PAUSE='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
function fullBlock(){return '<div class="full-card"><div><div class="eyebrow" style="color:var(--gold-light)">Listen to the whole guide</div><h3>Press play once and hear everything</h3><p>The full guide is read aloud from start to finish, with every scripture in full KJV. It moves to the next part by itself, and you can keep listening with your screen locked.</p><div class="ctas" style="margin-top:12px"><button type="button" class="btn btn-gold full-play" data-full="0">'+ICON_PLAY+'<span class="l">Play the entire guide</span></button></div></div><ol class="parts">'+FULL.map(function(f,i){return '<li><button type="button" data-full="'+i+'"><span>'+esc(f.title)+'</span><small>'+esc(f.len)+'</small></button></li>'}).join("")+'</ol></div>'}
function setLbl(b,on){var l=b.querySelector(".l");if(l)l.textContent=on?"Pause":"Listen";var sv=b.querySelector("svg");if(sv)sv.outerHTML=on?ICON_PAUSE:ICON_PLAY}

/* ---------- scripture ---------- */
function kjvText(ref){var v=K[ref];return v?v.map(function(x){return x.t}).join(" "):""}
function kjvCard(ref){
  var v=K[ref];if(!v)return "";
  var body=v.map(function(x){return '<sup>'+x.v+'</sup>'+esc(x.t)}).join(" ");
  return '<div class="kjv"><div class="kjv-h"><span class="kjv-ref">'+esc(ref)+'<small>KJV</small></span>'+listenBtn("kjv-"+slug(ref),ref)+'</div><div class="kjv-t">'+body+'</div></div>';
}
function kjvReveal(ref,open){
  if(!K[ref])return "";
  return '<details class="kjv-d"'+(open?" open":"")+'><summary><span class="sum-t">'+esc(ref)+'</span>'+listenBtn("kjv-"+slug(ref),ref)+'</summary>'+kjvCard(ref)+'</details>';
}
function refsBlock(refs){return (refs||[]).map(kjvCard).join("")}

/* ---------- views ---------- */
var VIEWS=[
  {id:"home",t:"Welcome",g:"Start"},
  {id:"what",t:"What fasting is",g:"Start"},
  {id:"origins",t:"Origins in Scripture",g:"Start"},
  {id:"benefits",t:"Benefits of fasting",g:"Start"},
  {id:"types",t:"Types of fasts",g:"Practice"},
  {id:"stages",t:"Beginner to advanced",g:"Practice"},
  {id:"plan",t:"Build my fasting plan",g:"Practice"},
  {id:"tracker",t:"Daily tracker",g:"Practice"},
  {id:"questions",t:"Your questions answered",g:"Questions"},
  {id:"pray",t:"Prayers & declarations",g:"Pray"},
  {id:"scripture",t:"Scripture library",g:"Pray"},
  {id:"quiz",t:"Check your understanding",g:"Learn"},
  {id:"flashcards",t:"Memory verse cards",g:"Learn"},
  {id:"reading",t:"Further reading",g:"More"},
  {id:"salvation",t:"Salvation & rededication",g:"More"}
];
var R={};

function head(eyebrow,title,lede){return '<div class="eyebrow">'+eyebrow+'</div><h2>'+title+'</h2><div class="rule"></div>'+(lede?'<p class="lede">'+lede+'</p>':"")}

R.home=function(){
  var cards=VIEWS.slice(1).map(function(v,i){
    var d={what:"Simple to deep explanations of biblical fasting.",origins:"From Moses to the early church, every fast in full KJV.",benefits:"Spiritual fruit, and what medical research says.",types:"Water, liquid, Daniel, absolute, set-hours and more.",stages:"What to do at each stage, with a 7-day starter plan.",plan:"Choose your fast, dates and what you will set aside.",tracker:"Tick off each day and keep a prayer journal.",questions:"Coffee, intimacy, TikTok, movies, eating before a fast.",pray:"A prayer flow, prayer points and declarations.",scripture:"Every fasting scripture in one place.",quiz:"Mixed questions with explanations.",flashcards:"Flip cards to hide the Word in your heart.",reading:"Trusted books and teachings on fasting.",salvation:"Begin or renew your walk with Jesus."}[v.id];
    return '<a class="card" href="#'+v.id+'"><div class="k">'+String(i+1).padStart(2,"0")+' · '+v.g+'</div><h3>'+v.t+'</h3><p>'+d+'</p></a>';
  }).join("");
  return '<div class="opening-block"><div class="wrap wide"><div class="opening-eyebrow">L137 Deliverance Ministry · Dominion Hour</div><p class="opening-lede">“Turn ye even to me with all your heart, and with fasting, and with weeping, and with mourning.” A guide to fasting the way Scripture teaches it, for the first-time faster and the seasoned intercessor alike.</p><div class="opening-rule"></div></div></div>'+
  '<div class="wrap wide"><div class="hero"><div><span class="pill">Fasting &amp; Prayer</span><h1>Fast with purpose. Pray with power.</h1><p class="attr"><b>L137 Deliverance Ministry International</b> with Pastor Kiky Ocansey · <b>Dominion Hour</b> with Prophet Prince Amo David</p><p class="lede">Learn where fasting comes from, how to choose a fast that fits your stage, what to set aside, and how to pray through every day of it. Every scripture is printed in full from the King James Version.</p><div class="ctas"><a class="btn btn-primary" href="#home/finder">Find my stage</a><a class="btn btn-ghost" href="#plan">Build my plan</a></div></div><div class="hero-img"><img src="img/hero.jpg" alt="An open Bible beside a cup of water in warm morning light" width="1600" height="900"></div></div>'+
  '<div class="verse-band"><q>Is not this the fast that I have chosen? to loose the bands of wickedness, to undo the heavy burdens, and to let the oppressed go free, and that ye break every yoke?</q><span class="ref">Isaiah 58:6 · KJV</span></div>'+
  '<section class="block" id="listen">'+head("Listen &amp; pray aloud","Hear the Word read to you","Play the whole guide, or tap Listen beside any scripture, prayer or declaration.")+fullBlock()+'<h3 style="margin-top:22px">Quick listens</h3>'+'<div class="listen-grid">'+[["kjv-luke-1-37","Luke 1:37"],["kjv-isaiah-58-6-7","Isaiah 58:6-7"],["kjv-matthew-6-16-18","Matthew 6:16-18"],["flow-1","Daily prayer: praise and worship"],["decl-0","Declaration 1"],["salvation","Prayer of salvation"]].map(function(x){return '<div class="lg-item"><span>'+x[1]+'</span>'+listenBtn(x[0],x[1])+'</div>'}).join("")+'</div><div class="ctas"><a class="btn btn-primary btn-sm" href="#pray">All prayers with audio</a><a class="btn btn-ghost btn-sm" href="#scripture">All scriptures with audio</a></div></section>'+
  '<section class="block" id="progress">'+head("Track your journey","How much you have completed","")+'<div id="progHome">'+progBlock()+'</div></section>'+
  '<section class="block" id="finder">'+head("Start here","Find your starting stage","Answer three questions and we will suggest where to begin.")+'<div class="finder" id="finderBox"></div></section>'+
  '<section class="block">'+head("The guide","Everything in this guide","")+'<div class="grid g3">'+cards+'</div></section>'+
  '<div class="verse-band"><q>For with God nothing shall be impossible.</q><span class="ref">Luke 1:37 · KJV</span></div></div>';
};
var FINDER=[
  {q:"How often have you fasted before?",o:["Never, or only once or twice","A few times, usually one day or a partial fast","Regularly, including fasts of several days"]},
  {q:"How is your prayer life right now?",o:["I am just starting to pray regularly","I pray and read the Word most days","I have a steady prayer life and pastoral oversight"]},
  {q:"Do any of these apply to you: pregnancy or breastfeeding, diabetes, an eating disorder, a chronic illness, or prescription medication?",o:["No","Yes, one or more of these"]}
];
function initFinder(){
  var box=$("#finderBox");if(!box)return;var ans=[];
  function draw(){
    var h=FINDER.map(function(f,i){return '<div class="fq">'+(i+1)+'. '+f.q+'</div><div class="opts" role="group">'+f.o.map(function(o,j){return '<button type="button" class="opt" data-q="'+i+'" data-a="'+j+'" aria-pressed="'+(ans[i]===j)+'">'+o+'</button>'}).join("")+'</div>'}).join("");
    var res="";
    if(ans.length===3&&ans.every(function(x){return x!=null})){
      var sc=ans[0]+ans[1];var st=sc<=1?"beginner":sc<=3?"intermediate":"advanced";
      if(ans[0]===0&&st==="advanced")st="intermediate";
      var S=C.stages[st];
      res='<div class="panel '+(S.color==="green"?"green":S.color==="ember"?"ember":"")+'" style="margin-top:18px"><div class="kick">Suggested stage</div><h3>'+S.name+': '+S.sub+'</h3><p>'+S.who+'</p><p><b>Good fasts to start with:</b> '+S.fasts.slice(0,2).join("; ")+'.</p>'+
      (ans[2]===1?'<div class="warn"><b>Speak with your doctor first.</b> You can still set aside media, entertainment or a favourite food, and many people with medical conditions keep a gentle partial fast with medical approval. See the health guidance on the stages page.</div>':"")+
      '<div class="ctas"><a class="btn btn-primary btn-sm" href="#stages/'+st+'">See the '+S.name.toLowerCase()+' stage</a><a class="btn btn-ghost btn-sm" href="#plan" data-stage="'+st+'">Build a '+S.name.toLowerCase()+' plan</a></div></div>';
    }
    box.innerHTML=h+res;
  }
  box.addEventListener("click",function(e){
    var b=e.target.closest(".opt");if(b){ans[+b.dataset.q]=+b.dataset.a;draw();return}
    var a=e.target.closest("[data-stage]");if(a){store.set("fg.preStage",a.dataset.stage)}
  });
  draw();
}

R.what=function(){
  var D=C.definition;
  return '<div class="wrap"><section class="block">'+head("Foundations","What is biblical fasting?","Choose the explanation that fits you best.")+
  '<div class="tabs" role="tablist" id="lvlTabs">'+["simple","teen","adult","deeper"].map(function(k){return '<button role="tab" data-k="'+k+'" aria-selected="'+(k==="adult")+'">'+{simple:"Simple",teen:"Teen",adult:"Adult",deeper:"Deeper"}[k]+'</button>'}).join("")+'</div>'+
  '<div id="lvlBody" class="card">'+D.adult+'</div>'+
  '<div class="panel gold"><div class="kick">Read · Pause and reflect</div><p>Read these passages slowly. Ask yourself: what is my appetite telling me, and what does my soul really need?</p></div>'+
  refsBlock(D.refs)+'</section></div>';
};
function initWhat(){
  var t=$("#lvlTabs");if(!t)return;
  t.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;$$("button",t).forEach(function(x){x.setAttribute("aria-selected",x===b)});$("#lvlBody").innerHTML=C.definition[b.dataset.k]});
}

R.origins=function(){
  var eras=[];C.timeline.forEach(function(t){if(eras.indexOf(t.era)<0)eras.push(t.era)});
  return '<div class="wrap"><section class="block">'+head("Origins","Where fasting comes from","Fasting runs through the whole Bible: in the Law, in times of national crisis, in the exile, in the prophets, in the life of Jesus, and in the early church. Tap any moment to read the scripture in full.")+
  '<div class="split" style="margin-bottom:26px"><div><div class="panel"><div class="kick">The words themselves</div><p>The Hebrew word <b>tsom</b> and the Greek word <b>nesteuo</b> both mean to abstain from food. In the Law, the Day of Atonement called Israel to “afflict your souls”, which Jewish and Christian readers have long understood as fasting. Through the rest of Scripture, fasting goes hand in hand with humility, repentance, mourning, seeking direction and spiritual warfare.</p><p class="src">See '+src("cruBiblical")+' and '+src("csl")+'.</p></div></div><div class="figure"><img src="img/wilderness.jpg" alt="A path through the wilderness at dawn" loading="lazy"></div></div>'+
  '<div class="era-filter" id="eraF"><button class="chip" aria-pressed="true" data-e="">All</button>'+eras.map(function(e){return '<button class="chip" aria-pressed="false" data-e="'+esc(e)+'">'+esc(e)+'</button>'}).join("")+'</div>'+
  '<ol class="tl" id="tl">'+C.timeline.map(function(t){return '<li data-e="'+esc(t.era)+'"><details><summary><span class="era">'+esc(t.era)+'</span><span class="tt">'+esc(t.title)+'</span>'+(t.refs.length?'<span class="rf">'+t.refs.join(" · ")+'</span>':"")+'</summary><div class="body"><p>'+t.note+'</p>'+refsBlock(t.refs)+'</div></details></li>'}).join("")+'</ol></section></div>';
};
function initOrigins(){
  var f=$("#eraF");if(!f)return;
  f.addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;$$(".chip",f).forEach(function(x){x.setAttribute("aria-pressed",x===b)});var v=b.dataset.e;$$("#tl li").forEach(function(li){li.style.display=!v||li.dataset.e===v?"":"none"})});
}

R.benefits=function(){
  return '<div class="wrap"><section class="block">'+head("Benefits","What fasting does","The Bible presents fasting first as a spiritual discipline. Here is what Scripture says it produces, followed by what medical research says about the body.")+
  '<h3>Spiritual benefits</h3>'+C.benefitsSpiritual.map(function(b,i){return '<details class="kjv-d"'+(i===0?" open":"")+'><summary>'+esc(b.t)+'</summary><div class="kjv" style="background:#fff;border:1px solid var(--line);border-left:4px solid var(--teal)"><p>'+b.d+'</p>'+refsBlock(b.refs)+'</div></details>'}).join("")+
  '<h3 style="margin-top:34px">Physical benefits: what research shows</h3><div class="grid g2">'+C.benefitsPhysical.map(function(b){return '<div class="card"><h4>'+esc(b.t)+'</h4><p class="small">'+b.d+'</p></div>'}).join("")+'</div>'+
  '<h3 style="margin-top:34px">What fasting is not</h3><div class="grid g2">'+C.notFasting.map(function(b){return '<div class="card"><h4>'+esc(b.t)+'</h4><p class="small">'+b.d+'</p>'+(b.refs||[]).map(function(r){return kjvReveal(r)}).join("")+'</div>'}).join("")+'</div>'+
  '</section></div>';
};

function lvlTags(l){if(!l.length)return '<div class="lvl"><span class="none">Not for imitation</span></div>';return '<div class="lvl">'+l.map(function(x){return '<span class="'+x+'">'+x+'</span>'}).join("")+'</div>'}
R.types=function(){
  return '<div class="wrap wide"><section class="block">'+head("Types","Different kinds of fasts","Scripture shows several ways God's people fasted. Each card shows what is allowed, what is set aside, and which stage it suits.")+
  '<div class="figure"><img src="img/table.jpg" alt="A simple table of vegetables, pulses and water for a Daniel fast" loading="lazy"></div>'+
  '<div class="era-filter" id="typeF"><button class="chip" aria-pressed="true" data-l="">All stages</button><button class="chip" aria-pressed="false" data-l="beginner">Beginner</button><button class="chip" aria-pressed="false" data-l="intermediate">Intermediate</button><button class="chip" aria-pressed="false" data-l="advanced">Advanced</button></div>'+
  '<div class="grid g2" id="typeGrid">'+C.types.map(function(t){return '<div class="card type-card" id="type-'+t.id+'" data-l="'+t.level.join(" ")+'"><span class="tag">'+esc(t.tag)+'</span><h3>'+esc(t.name)+'</h3>'+lvlTags(t.level)+'<p>'+t.what+'</p><div class="ya"><div class="y"><h4>Allowed</h4><ul>'+t.allow.map(function(a){return '<li>'+a+'</li>'}).join("")+'</ul></div><div class="n"><h4>Set aside</h4><ul>'+t.avoid.map(function(a){return '<li>'+a+'</li>'}).join("")+'</ul></div></div>'+(t.caution?'<div class="warn small" style="margin:8px 0">'+t.caution+'</div>':"")+t.refs.map(function(r){return kjvReveal(r)}).join("")+'</div>'}).join("")+'</div></section></div>';
};
function initTypes(){
  var f=$("#typeF");if(!f)return;
  f.addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;$$(".chip",f).forEach(function(x){x.setAttribute("aria-pressed",x===b)});var v=b.dataset.l;$$("#typeGrid .card").forEach(function(c){c.style.display=!v||c.dataset.l.indexOf(v)>=0?"":"none"})});
}

R.stages=function(){
  return '<div class="wrap"><section class="block">'+head("Stages","Beginner, intermediate, advanced","Grow into fasting the way you grow in prayer: step by step. Choose a stage.")+
  '<div class="stage-pick" id="stagePick">'+["beginner","intermediate","advanced"].map(function(k,i){var S=C.stages[k];return '<button type="button" class="'+S.color+'" data-s="'+k+'" aria-pressed="'+(i===0)+'"><b>'+S.name+'</b><span>'+S.sub+' · '+S.length+'</span></button>'}).join("")+'</div><div id="stageBody"></div>'+
  safetyBox()+'</section></div>';
};
function safetyBox(){var s=C.safety;return '<div class="panel ember" id="safety" style="margin-top:30px"><div class="kick">Health and safety</div><h3>Check with your doctor first if you are:</h3><ul>'+s.who.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul><p class="src">'+s.whoSrc+'</p><h4>Stop fasting and get help if you have:</h4><ul>'+s.stop.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul><h4>Rules that always apply</h4><ul>'+s.rules.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul></div>'}
function stageHTML(k){
  var S=C.stages[k];
  var h='<div class="card"><div class="eyebrow">'+S.name+' · '+S.sub+'</div><h3>Who this stage is for</h3><p>'+S.who+'</p><h4>Fasts to practise</h4><ul>'+S.fasts.map(function(f){return '<li>'+f+'</li>'}).join("")+'</ul><p><b>Typical length:</b> '+S.length+'</p></div>'+
  '<h3 style="margin-top:24px">A day in this stage</h3><div class="sched">'+S.schedule.map(function(s){return '<div><b>'+s[0]+'</b><span>'+s[1]+'</span></div>'}).join("")+'</div>'+
  '<div class="panel"><div class="kick">What to expect</div><p>'+S.expect+'</p></div><div class="panel green"><div class="kick">Breaking the fast</div><p>'+S.breaking+'</p></div>'+(S.sourceNote?'<p class="src">'+S.sourceNote+'</p>':"");
  if(S.plan){h+='<h3 style="margin-top:24px">Your first 7 days</h3><p class="muted">A gentle first week. Each day has one theme, one action and one scripture.</p><div class="days7">'+S.plan.map(function(d,i){return '<div class="d"><div class="n">Day '+(i+1)+'</div><div><b>'+d[0]+'</b> — '+d[1]+kjvReveal(d[2])+'</div></div>'}).join("")+'</div>'}
  h+='<h3 style="margin-top:24px">Scriptures for this stage</h3>'+refsBlock(S.refs)+'<div class="ctas"><a class="btn btn-primary" href="#plan" data-stage="'+k+'">Build a '+S.name.toLowerCase()+' plan</a></div>';
  return h;
}
function initStages(sub){
  var p=$("#stagePick");if(!p)return;
  function show(k){$$("button",p).forEach(function(x){x.setAttribute("aria-pressed",x.dataset.s===k)});$("#stageBody").innerHTML=stageHTML(k)}
  p.addEventListener("click",function(e){var b=e.target.closest("button");if(b)show(b.dataset.s)});
  $("#stageBody").addEventListener("click",function(e){var a=e.target.closest("[data-stage]");if(a)store.set("fg.preStage",a.dataset.stage)});
  show(C.stages[sub]?sub:"beginner");
}

/* ---------- plan builder ---------- */
var FOOD=["timed","daniel","liquid","normal","absolute"];
var MAXD={beginner:7,intermediate:21,advanced:40};
var ASIDE=[["coffee","Coffee and caffeine"],["sweets","Sweets, desserts and soft drinks"],["tiktok","TikTok and social media scrolling"],["tv","TV, movies and streaming"],["music","Secular music"],["games","Video and phone games"],["calls","Long or idle phone calls"],["shopping","Online shopping"],["news","News and endless browsing"],["intimacy","Marital intimacy (by mutual consent with my spouse)"]];
function typeById(id){for(var i=0;i<C.types.length;i++)if(C.types[i].id===id)return C.types[i]}
R.plan=function(){
  var today=new Date();var iso=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  return '<div class="wrap"><section class="block">'+head("Plan","Build my fasting plan","Choose your stage, your fast and what you will set aside. You will get a day-by-day plan you can print and track.")+
  '<form class="form card no-print" id="planForm" novalidate>'+
  '<div class="field"><span class="lab">1. My stage</span><div class="stage-pick" id="pStage" style="margin:0">'+["beginner","intermediate","advanced"].map(function(k){var S=C.stages[k];return '<button type="button" class="'+S.color+'" data-s="'+k+'" aria-pressed="false"><b>'+S.name+'</b><span>Up to '+MAXD[k]+' days</span></button>'}).join("")+'</div></div>'+
  '<div class="field"><label for="pType">2. Type of fast</label><select id="pType"></select><div class="hint" id="pTypeHint"></div></div>'+
  '<div class="row2"><div class="field"><label for="pStart">3. Start date</label><input type="date" id="pStart" value="'+iso+'"></div><div class="field"><label for="pDays">Number of days</label><input type="number" id="pDays" min="1" max="40" value="3" inputmode="numeric"></div></div>'+
  '<div class="row2" id="pHours"><div class="field"><label for="pFrom">Fasting from</label><input type="time" id="pFrom" value="06:00"></div><div class="field"><label for="pTo">Until</label><input type="time" id="pTo" value="15:00"></div></div>'+
  '<div class="field"><label for="pPurpose">4. My purpose</label><textarea id="pPurpose" placeholder="Write what you are seeking God for, as specifically as you can."></textarea><div class="hint">Cru encourages writing down a clear objective before you begin ('+src("cruSteps")+').</div></div>'+
  '<div class="field"><span class="lab">5. What I will also set aside</span><div class="checks">'+ASIDE.map(function(a){return '<label class="check"><input type="checkbox" name="aside" value="'+a[0]+'"><span>'+a[1]+'</span></label>'}).join("")+'</div></div>'+
  '<div class="field"><span class="lab">6. Prayer focus</span><div class="checks">'+C.prayerPoints.filter(function(p){return p.t!=="Ending the fast"}).map(function(p){return '<label class="check"><input type="checkbox" name="focus" value="'+esc(p.t)+'"><span>'+esc(p.t)+'</span></label>'}).join("")+'</div></div>'+
  '<div id="pWarn"></div><div class="ctas" style="margin-top:0"><button class="btn btn-primary" type="submit">Create my plan</button></div></form>'+
  '<div id="planOut" class="plan-out"></div></section></div>';
};
function initPlan(){
  var f=$("#planForm");if(!f)return;
  var saved=store.get("fg.plan",null),pre=store.get("fg.preStage",null);store.del("fg.preStage");
  var stage=pre||(saved&&saved.stage)||"beginner";
  function setStage(k){stage=k;$$("#pStage button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.s===k)});
    var sel=$("#pType"),cur=sel.value;
    sel.innerHTML=FOOD.map(typeById).filter(function(t){return t&&t.level.indexOf(k)>=0}).map(function(t){return '<option value="'+t.id+'">'+esc(t.name)+' — '+esc(t.tag)+'</option>'}).join("")+'<option value="none">No food fast: set aside other things only</option>';
    if(cur&&$('option[value="'+cur+'"]',sel))sel.value=cur;
    $("#pDays").max=MAXD[k];if(+$("#pDays").value>MAXD[k])$("#pDays").value=MAXD[k];
    check();
  }
  function check(){
    var t=$("#pType").value,d=+$("#pDays").value||1,w=[];
    $("#pHours").style.display=t==="timed"?"":"none";
    var ty=typeById(t);$("#pTypeHint").innerHTML=ty?strip(ty.what):"Choose items below to set aside. Biblical fasting refers to food, so consider adding a set-hours fast when you are able.";
    if(t==="absolute"&&d>3){w.push("<b>An absolute fast must not go beyond three days.</b> Your plan will be set to 3 days.")}
    if((t==="normal"||t==="liquid"||t==="absolute")&&d>3)w.push("<b>See your doctor before a fast longer than three days.</b> Cru gives this advice for any extended fast ("+src("cruBiblical")+").");
    if(t==="normal"&&d>3)w.push("<b>Water-only fasts beyond a few days need rest and medical supervision</b> ("+src("cruTypes")+").");
    if((t==="normal"||t==="liquid")&&d>5)w.push("<b>Break a long fast slowly.</b> Reintroducing food too fast after prolonged fasting can cause refeeding syndrome, a dangerous shift in body salts ("+src("bmj")+").");
    if(stage==="beginner"&&d>3&&t!=="daniel"&&t!=="none")w.push("<b>For a first fast, keep a full fast to 1 to 3 days.</b> A Daniel fast is a good way to go longer.");
    if($('input[value="intimacy"]',f).checked)w.push("<b>Agree together first.</b> Paul says to abstain only “with consent for a time”, then come together again (1 Corinthians 7:5).");
    $("#pWarn").innerHTML=w.map(function(x){return '<div class="warn" style="margin-bottom:8px">'+x+'</div>'}).join("");
  }
  $("#pStage").addEventListener("click",function(e){var b=e.target.closest("button");if(b)setStage(b.dataset.s)});
  f.addEventListener("input",check);f.addEventListener("change",check);
  if(saved){$("#pStart").value=saved.start;$("#pDays").value=saved.days;$("#pPurpose").value=saved.purpose||"";$("#pFrom").value=saved.from||"06:00";$("#pTo").value=saved.to||"15:00";
    $$('input[name=aside]',f).forEach(function(c){c.checked=saved.aside.indexOf(c.value)>=0});$$('input[name=focus]',f).forEach(function(c){c.checked=saved.focus.indexOf(c.value)>=0})}
  setStage(stage);
  if(saved&&$('#pType option[value="'+saved.type+'"]')){$("#pType").value=saved.type;check()}
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var t=$("#pType").value,d=Math.max(1,Math.min(MAXD[stage],Math.round(+$("#pDays").value||1)));if(t==="absolute")d=Math.min(d,3);
    var p={stage:stage,type:t,days:d,start:$("#pStart").value,from:$("#pFrom").value,to:$("#pTo").value,purpose:$("#pPurpose").value.trim(),
      aside:$$('input[name=aside]:checked',f).map(function(c){return c.value}),focus:$$('input[name=focus]:checked',f).map(function(c){return c.value}),created:Date.now()};
    var old=store.get("fg.plan",null);if(!old||old.days!==p.days||old.start!==p.start)store.set("fg.track",{});
    store.set("fg.plan",p);$("#planOut").innerHTML=planHTML(p);$("#planOut").scrollIntoView({behavior:"smooth",block:"start"});
  });
  if(saved)$("#planOut").innerHTML=planHTML(saved);
  $("#planOut").addEventListener("click",function(e){if(e.target.closest("#printPlan"))window.print()});
}
function dateOf(p,i){if(!p.start)return "";var d=new Date(p.start+"T12:00:00");d.setDate(d.getDate()+i);return d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"})}
function asideLabel(k){for(var i=0;i<ASIDE.length;i++)if(ASIDE[i][0]===k)return ASIDE[i][1];return k}
function dayInfo(p,i){
  var rot=C.dailyRotation[i%C.dailyRotation.length];
  if(p.stage==="beginner"&&C.stages.beginner.plan&&i<C.stages.beginner.plan.length){var b=C.stages.beginner.plan[i];return {theme:b[0],action:b[1],ref:b[2]}}
  var foc=p.focus.length?p.focus[i%p.focus.length]:null;
  var pp=null;if(foc)C.prayerPoints.forEach(function(x){if(x.t===foc)pp=x});
  return {theme:rot[0],ref:rot[1],focus:foc,pp:pp};
}
function planHTML(p){
  var ty=typeById(p.type),S=C.stages[p.stage];
  var tName=ty?ty.name:"Setting aside other things";
  var hours=p.type==="timed"?" · "+p.from+" to "+p.to:"";
  var prep=[];
  prep.push("Write your purpose and pray over it before Day 1.");
  prep.push("Eat smaller meals for a day or two before you begin, and avoid high-fat and sugary foods ("+src("cruSteps")+").");
  if(p.aside.indexOf("coffee")>=0||(ty&&ty.avoid.join(" ").toLowerCase().indexOf("coffee")>=0))prep.push("Cut down on coffee gradually over the days before, to avoid caffeine-withdrawal headaches ("+src("caff")+").");
  if(p.aside.indexOf("intimacy")>=0)prep.push("Talk and pray with your spouse, agree on the length together, and agree to come together again afterward (1 Corinthians 7:5).");
  if(p.aside.indexOf("tiktok")>=0||p.aside.indexOf("tv")>=0||p.aside.indexOf("games")>=0)prep.push("Delete or log out of apps you are setting aside, or move them off your home screen. Fill the time with worship, the Word and prayer.");
  if(p.days>3&&p.type!=="daniel"&&p.type!=="none"&&p.type!=="timed")prep.push("<b>See your doctor before you begin.</b>");
  prep.push("Tell a trusted believer or leader so someone can pray with you.");
  var brk=p.type==="none"||p.type==="timed"?"Return to your normal routine with thanksgiving. Keep one of the habits you gained.":
    p.days<=3?"End with a small glass of juice or a piece of fruit, then a light meal. Do not feast.":
    "Break the fast over several days: diluted juice, then broth, then soft foods and small meals, then normal meals. Do not feast ("+src("cruTypes")+"; "+src("bmj")+").";
  var days="";for(var i=0;i<p.days;i++){var di=dayInfo(p,i);
    days+='<div class="day"><div class="day-h"><b>Day '+(i+1)+': '+esc(di.theme)+'</b><span>'+dateOf(p,i)+'</span></div>'+(di.action?'<p>'+di.action+'</p>':"")+
    '<p class="small"><span class="cue read">Read</span>'+esc(di.ref)+(di.focus?' · <span class="cue">Pray</span>'+esc(di.focus):"")+'</p>'+(di.pp?'<ul class="small">'+di.pp.items.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul>':"")+kjvReveal(di.ref)+'</div>'}
  return '<div class="plan-head"><div class="eyebrow" style="color:var(--gold-light)">My fasting plan</div><h3>'+esc(tName)+' · '+p.days+' day'+(p.days>1?"s":"")+'</h3><div class="meta"><span>'+S.name+'</span><span>Starts '+dateOf(p,0)+'</span><span>Ends '+dateOf(p,p.days-1)+'</span>'+(hours?'<span>'+esc(hours.slice(3))+'</span>':"")+'</div>'+(p.purpose?'<p style="margin:14px 0 0"><b>Purpose:</b> '+esc(p.purpose)+'</p>':"")+'</div>'+
  (p.aside.length?'<div class="panel gold"><div class="kick">I am also setting aside</div><ul>'+p.aside.map(function(a){return '<li>'+esc(asideLabel(a))+'</li>'}).join("")+'</ul></div>':"")+
  '<div class="panel"><div class="kick">Before you begin</div><ul>'+prep.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul></div>'+
  '<h3 style="margin-top:24px">Day by day</h3>'+days+
  '<div class="panel green"><div class="kick">Breaking the fast</div><p>'+brk+'</p></div>'+
  '<div class="ctas no-print"><button class="btn btn-gold" id="printPlan" type="button">Print my plan</button><a class="btn btn-primary" href="#tracker">Open my daily tracker</a><a class="btn btn-ghost" href="#pray">Prayer flow</a></div>';
}

/* ---------- tracker ---------- */
var TCHK=[["pray","Morning prayer time"],["word","Read today's scripture"],["fast","Kept my fast"],["aside","Kept away from what I set aside"],["meal","Prayed at mealtimes"],["kind","Did one act of kindness"]];
R.tracker=function(){
  var p=store.get("fg.plan",null);
  if(!p)return '<div class="wrap"><section class="block">'+head("Tracker","Daily tracker","")+'<div class="panel gold"><div class="kick">No plan yet</div><p>Build your fasting plan first. Your days will appear here so you can tick them off and keep a short journal.</p><a class="btn btn-primary btn-sm" href="#plan">Build my plan</a></div></section></div>';
  var tr=store.get("fg.track",{});var ty=typeById(p.type);
  var days="";for(var i=0;i<p.days;i++){var di=dayInfo(p,i),t=tr[i]||{c:{},n:""};
    days+='<div class="day" data-i="'+i+'"><div class="day-h"><b>Day '+(i+1)+': '+esc(di.theme)+'</b><span>'+dateOf(p,i)+' · '+esc(di.ref)+'</span></div><div class="tchecks">'+TCHK.filter(function(c){return c[0]!=="aside"||p.aside.length}).filter(function(c){return c[0]!=="fast"||p.type!=="none"}).map(function(c){return '<label class="check"><input type="checkbox" data-c="'+c[0]+'"'+(t.c[c[0]]?" checked":"")+'><span>'+c[1]+'</span></label>'}).join("")+'</div><label class="sr-only" for="n'+i+'">Journal for day '+(i+1)+'</label><textarea id="n'+i+'" data-n placeholder="What did God show me today?">'+esc(t.n||"")+'</textarea></div>'}
  return '<div class="wrap"><section class="block">'+head("Tracker","Daily tracker",esc((ty?ty.name:"Setting aside other things")+" · "+p.days+" days · starts "+dateOf(p,0)))+
  '<div class="card"><b>Progress</b><div class="progress"><i id="prog"></i></div><span class="small muted" id="progT"></span></div>'+
  '<div id="trk">'+days+'</div><div class="ctas"><a class="btn btn-ghost btn-sm" href="#plan">Edit plan</a><button class="btn btn-ghost btn-sm" id="clearTrk" type="button">Clear ticks and journal</button></div></section></div>';
};
function initTracker(){
  var w=$("#trk");if(!w)return;
  function save(){var tr={};$$(".day",w).forEach(function(d){var c={};$$("input[data-c]",d).forEach(function(x){c[x.dataset.c]=x.checked});tr[d.dataset.i]={c:c,n:$("textarea",d).value}});store.set("fg.track",tr);prog()}
  function prog(){var all=$$("input[data-c]",w),on=all.filter(function(x){return x.checked}).length;var pc=all.length?Math.round(on/all.length*100):0;$("#prog").style.width=pc+"%";$("#progT").textContent=on+" of "+all.length+" steps completed ("+pc+"%)"}
  w.addEventListener("change",save);w.addEventListener("input",function(e){if(e.target.matches("textarea"))save()});
  $("#clearTrk").addEventListener("click",function(){if(confirm("Clear all ticks and journal notes?")){store.set("fg.track",{});render()}});
  prog();
}

/* ---------- questions ---------- */
R.questions=function(){
  var cats=[];C.faq.forEach(function(f){if(cats.indexOf(f.cat)<0)cats.push(f.cat)});
  return '<div class="wrap"><section class="block">'+head("Questions","Your questions answered","Honest answers to the questions people ask most, each with the scriptures in full.")+
  '<div class="faq-tools"><input type="text" id="faqQ" placeholder="Search: coffee, TikTok, movies, marriage…" aria-label="Search questions"></div>'+
  '<div class="era-filter" id="faqF"><button class="chip" aria-pressed="true" data-c="">All</button>'+cats.map(function(c){return '<button class="chip" aria-pressed="false" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join("")+'</div>'+
  '<div class="faq" id="faqL">'+C.faq.map(function(f,i){return '<details id="q'+i+'" data-c="'+esc(f.cat)+'" data-s="'+esc((f.q+" "+strip(f.a)).toLowerCase())+'"><summary><span><span class="c">'+esc(f.cat)+'</span><span class="q">'+esc(f.q)+'</span></span></summary><div class="a">'+f.a+((f.refs&&f.refs.length)?'<div class="kjv-label">The scriptures</div>'+refsBlock(f.refs):"")+'</div></details>'}).join("")+'</div><p id="faqNone" class="muted" style="display:none">No questions match. Try another word.</p></section></div>';
};
function initQuestions(sub){
  var q=$("#faqQ");if(!q)return;var cat="";
  function apply(){var s=q.value.trim().toLowerCase(),n=0;$$("#faqL details").forEach(function(d){var ok=(!cat||d.dataset.c===cat)&&(!s||d.dataset.s.indexOf(s)>=0);d.style.display=ok?"":"none";if(ok)n++});$("#faqNone").style.display=n?"none":""}
  q.addEventListener("input",apply);
  $("#faqF").addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;$$("#faqF .chip").forEach(function(x){x.setAttribute("aria-pressed",x===b)});cat=b.dataset.c;apply()});
  if(sub&&$("#"+sub)){var d=$("#"+sub);d.open=true;setTimeout(function(){d.scrollIntoView({block:"start"})},60)}
}

/* ---------- pray ---------- */
R.pray=function(){
  return '<div class="wrap"><section class="block">'+head("Pray","Prayers & declarations","Use this flow each day of your fast. Pray aloud.")+
  '<div class="split"><div class="audio-callout" style="margin:0"><div><b>LISTEN &amp; PRAY ALOUD</b><span>Tap Listen beside any prayer, declaration or scripture to hear it read aloud, then pray it after in your own voice.</span><button type="button" class="btn btn-gold btn-sm full-play" data-full="7" style="margin-top:10px">'+ICON_PLAY+'<span class="l">Play all prayers</span></button></div></div><div class="figure"><img src="img/prayer.jpg" alt="Hands resting on an open Bible with a phone turned face down" loading="lazy"></div></div>'+
  '<h3 style="margin-top:28px">Daily prayer flow</h3><div class="flow">'+C.prayerFlow.map(function(s){return '<div class="st"><div class="n">'+s.n+'</div><div><h4>'+esc(s.t)+'</h4><p class="pr"><span class="cue say">Say</span>'+esc(s.p)+'</p>'+listenBtn("flow-"+s.n,s.t)+(s.refs||[]).map(function(r){return kjvReveal(r)}).join("")+'</div></div>'}).join("")+'</div>'+
  '<div class="panel plum"><div class="kick">Pause and reflect</div><p>After you pray, stay quiet for a few minutes. Write down any scripture, impression or instruction the Holy Spirit brings to mind, and test it by the Word.</p></div>'+
  '<h3 style="margin-top:28px">Prayer points</h3>'+C.prayerPoints.map(function(p,pi){return '<details class="kjv-d"><summary>'+esc(p.t)+'</summary><div class="kjv" style="background:#fff;border:1px solid var(--line);border-left:4px solid var(--ember)"><p class="small" style="margin-bottom:6px"><span class="cue">Pray</span><span class="cue pause">Repeat</span></p><ul>'+p.items.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul>'+listenBtn("pp-"+pi,p.t)+refsBlock(p.refs)+'</div></details>'}).join("")+
  '<h3 style="margin-top:28px">Declarations</h3><p class="muted"><span class="cue say">Declare</span>Speak these out loud, with faith, every day of your fast.</p>'+C.declarations.map(function(d,di){return '<div class="decl"><div><p>'+esc(d.d)+'</p><small>'+esc(d.r)+'</small></div>'+listenBtn("decl-"+di,"Declaration "+(di+1))+'</div>'}).join("")+
  '<div class="verse-band"><q>For with God nothing shall be impossible.</q><span class="ref">Luke 1:37 · KJV</span></div></section></div>';
};

R.scripture=function(){
  return '<div class="wrap"><section class="block">'+head("Scripture","Scripture library","Every fasting scripture in this guide, printed in full from the King James Version. Tap a reference to read it.")+
  '<div class="faq-tools"><input type="text" id="scQ" placeholder="Search a word or reference…" aria-label="Search scriptures"></div><div id="scL">'+
  C.scriptureGroups.map(function(g){return '<div class="scg"><h3 style="margin-top:22px">'+esc(g[0])+'</h3>'+g[1].map(function(r){return '<div class="sci" data-s="'+esc((r+" "+kjvText(r)).toLowerCase())+'">'+kjvReveal(r)+'</div>'}).join("")+'</div>'}).join("")+'</div></section></div>';
};
function initScripture(){
  var q=$("#scQ");if(!q)return;
  q.addEventListener("input",function(){var s=q.value.trim().toLowerCase();$$("#scL .scg").forEach(function(g){var n=0;$$(".sci",g).forEach(function(i){var ok=!s||i.dataset.s.indexOf(s)>=0;i.style.display=ok?"":"none";if(ok){n++;if(s)$("details",i).open=true}});g.style.display=n?"":"none"})});
}

/* ---------- quiz ---------- */
var TN={mc:"Multiple choice",tf:"True or false",fill:"Fill in the blank",order:"Put in order",scenario:"Real-life scenario"};
function shuffled(n){var a=[];for(var i=0;i<n;i++)a.push(i);var tries=0;do{for(var j=n-1;j>0;j--){var k=Math.floor(Math.random()*(j+1));var t=a[j];a[j]=a[k];a[k]=t}tries++}while(a.every(function(v,i){return v===i})&&tries<10);return a}
R.quiz=function(){
  return '<div class="wrap"><section class="block">'+head("Learn","Check your understanding","Choose an answer to see the explanation.")+
  '<div class="card"><span class="score" id="qScore">0</span> <span class="muted">of '+C.quiz.length+' correct</span></div><div id="qL">'+
  C.quiz.map(function(q,i){var h='<div class="qcard" data-i="'+i+'"><div class="qt">'+(i+1)+' · '+TN[q.type]+'</div><div class="qq">'+esc(q.q)+'</div>';
    if(q.type==="mc"||q.type==="scenario")h+='<div class="opts">'+q.o.map(function(o,j){return '<button type="button" class="opt" data-a="'+j+'">'+esc(o)+'</button>'}).join("")+'</div>';
    else if(q.type==="tf")h+='<div class="opts" style="grid-template-columns:1fr 1fr"><button type="button" class="opt" data-a="true">True</button><button type="button" class="opt" data-a="false">False</button></div>';
    else if(q.type==="fill")h+='<div class="row2"><input type="text" aria-label="Your answer" class="fillIn" placeholder="Type the missing word"><button type="button" class="btn btn-primary btn-sm chk">Check</button></div>';
    else if(q.type==="order"){h+='<ol class="order-list">'+shuffled(q.items.length).map(function(k){return '<li data-k="'+k+'"><span>'+esc(q.items[k])+'</span><button type="button" class="up" aria-label="Move up">↑</button><button type="button" class="dn" aria-label="Move down">↓</button></li>'}).join("")+'</ol><div class="ctas" style="margin-top:10px"><button type="button" class="btn btn-primary btn-sm chk">Check order</button></div>'}
    return h+'<div class="fb" role="status"></div></div>'}).join("")+'</div><div class="ctas"><button class="btn btn-ghost" id="qReset" type="button">Start again</button></div></section></div>';
};
function initQuiz(){
  var L=$("#qL");if(!L)return;var score=0;
  function done(card,ok,q){card.dataset.done="1";if(ok){score++;$("#qScore").textContent=score}
    var fb=$(".fb",card);fb.className="fb show "+(ok?"ok":"no");fb.innerHTML='<b>'+(ok?"Correct.":"Not quite.")+'</b> '+esc(q.e)+(q.ref?kjvReveal(q.ref):"")}
  L.addEventListener("click",function(e){
    var card=e.target.closest(".qcard");if(!card||card.dataset.done)return;var q=C.quiz[+card.dataset.i];
    var b=e.target.closest(".opt");
    if(b){var ok;if(q.type==="tf"){ok=(b.dataset.a==="true")===q.a;$$(".opt",card).forEach(function(x){x.disabled=true;if((x.dataset.a==="true")===q.a)x.classList.add("right")})}
      else{ok=+b.dataset.a===q.a;$$(".opt",card).forEach(function(x){x.disabled=true;if(+x.dataset.a===q.a)x.classList.add("right")})}
      if(!ok)b.classList.add("wrong");done(card,ok,q);return}
    var li=e.target.closest(".order-list li");
    if(li&&e.target.closest(".up")&&li.previousElementSibling)li.parentNode.insertBefore(li,li.previousElementSibling);
    if(li&&e.target.closest(".dn")&&li.nextElementSibling)li.parentNode.insertBefore(li.nextElementSibling,li);
    if(e.target.closest(".chk")){
      if(q.type==="fill"){var inp=$(".fillIn",card),v=inp.value.trim().toLowerCase().replace(/[^a-z' ]/g,"");if(!v){inp.focus();return}var ok2=q.a.some(function(a){return a.toLowerCase()===v});inp.disabled=true;e.target.disabled=true;done(card,ok2,{e:(ok2?"":"The answer is “"+q.a[0]+"”. ")+q.e,ref:q.ref})}
      if(q.type==="order"){var lis=$$(".order-list li",card),ok3=lis.every(function(l,i){return +l.dataset.k===i});lis.forEach(function(l,i){l.classList.add(+l.dataset.k===i?"right":"wrong");$$("button",l).forEach(function(x){x.disabled=true})});e.target.disabled=true;
        done(card,ok3,{e:(ok3?"":"The right order is: "+q.items.map(function(t,i){return (i+1)+". "+t}).join("; ")+". ")+q.e,ref:q.ref})}
    }
  });
  L.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.matches(".fillIn")){var c=e.target.closest(".qcard");$(".chk",c).click()}});
  $("#qReset").addEventListener("click",function(){render()});
}

/* ---------- flashcards ---------- */
R.flashcards=function(){
  return '<div class="wrap"><section class="block">'+head("Learn","Memory verse cards","Read the reference, say the verse from memory, then tap to check.")+
  '<div class="fc-wrap"><div class="fc" id="fc" tabindex="0" role="button" aria-label="Flip card"><div class="face front"><b id="fcF"></b><span>Tap to see the verse</span></div><div class="face back"><p id="fcB"></p></div></div>'+
  '<div class="fc-nav"><button class="iconbtn" id="fcP" type="button">← Previous</button><span id="fcN" class="small muted"></span><button class="iconbtn" id="fcX" type="button">Next →</button></div><div style="text-align:center;margin-top:12px" id="fcL"></div></div></section></div>';
};
function initFlash(){
  var el=$("#fc");if(!el)return;var i=0;
  function show(){var f=C.flashcards[i];el.classList.remove("flip");$("#fcF").textContent=f[0];
    var v=K[f[1]],txt=v?v.map(function(x){return x.t}).join(" "):"";
    $("#fcB").innerHTML=esc(txt)+'<br><br><b style="font-family:var(--sans);font-size:13px;letter-spacing:.1em;color:#6b4f0d">'+esc(f[1].toUpperCase())+' · KJV</b>';
    $("#fcN").textContent=(i+1)+" / "+C.flashcards.length;$("#fcL").innerHTML=listenBtn("kjv-"+slug(f[1]),f[1])}
  el.addEventListener("click",function(){el.classList.toggle("flip")});
  el.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();el.classList.toggle("flip")}});
  $("#fcP").addEventListener("click",function(){i=(i-1+C.flashcards.length)%C.flashcards.length;show()});
  $("#fcX").addEventListener("click",function(){i=(i+1)%C.flashcards.length;show()});
  show();
}

/* ---------- reading ---------- */
R.reading=function(){
  var all=Object.keys(C.S).map(function(k){return '<li><a href="'+C.S[k][1]+'" target="_blank" rel="noopener">'+esc(C.S[k][0])+'</a></li>'}).join("");
  return '<div class="wrap"><section class="block">'+head("Go deeper","Further reading","Books and teachings for continued study.")+
  '<div class="grid g2">'+C.reading.map(function(r){return '<div class="card"><div class="eyebrow">'+esc(r.a)+'</div><h3>'+esc(r.t)+'</h3><p class="small">'+esc(r.d)+'</p><p class="small"><b>Reflect:</b> '+esc(r.r)+'</p>'+(r.k&&C.S[r.k]?'<p class="small">'+src(r.k)+'</p>':"")+'</div>'}).join("")+'</div>'+
  '<h3 style="margin-top:30px">References used in this guide</h3><ul class="sources">'+all+'</ul></section></div>';
};

R.salvation=function(){
  return '<div class="wrap"><section class="block">'+head("New life","Salvation & rededication","Fasting begins with a relationship with God through Jesus Christ. If you have never given your life to Him, or you have drifted away, you can come to Him today.")+
  refsBlock(["John 3:16","Romans 10:9-10","2 Corinthians 5:17"])+
  '<div class="card" style="margin-top:18px"><div class="eyebrow">Prayer of salvation</div><p style="font-family:var(--serif);font-size:18px"><span class="cue say">Say</span>Lord Jesus, I come to You as I am. I confess that I have sinned, and I ask You to forgive me. I believe You died for me and that God raised You from the dead. I confess You as my Lord and Saviour. Come into my heart, wash me in Your precious blood, and make me a new creature. Fill me with Your Holy Spirit. Thank You for saving me. In Jesus\' name, amen.</p>'+listenBtn("salvation","Prayer of salvation")+'</div>'+
  '<div class="card" style="margin-top:14px"><div class="eyebrow">Prayer of rededication</div><p style="font-family:var(--serif);font-size:18px"><span class="cue say">Say</span>Father, I have wandered from You, and I return to You with all my heart. Forgive me for every way I have grown cold. I give You my life again, my body, my time and my desires. Renew a right spirit within me. Draw me close as I fast and pray, and keep me faithful to the end. In Jesus\' name, amen.</p>'+listenBtn("rededication","Prayer of rededication")+'</div>'+
  '<div class="panel gold"><div class="kick">Next step</div><p>If you prayed this prayer, tell a pastor or a believer you trust, find a Bible-believing church, and begin reading the Gospel of John.</p></div></section></div>';
};

var INIT={home:initFinder,what:initWhat,origins:initOrigins,types:initTypes,stages:initStages,plan:initPlan,tracker:initTracker,questions:initQuestions,scripture:initScripture,quiz:initQuiz,flashcards:initFlash};

/* ---------- nav & routing ---------- */
function buildNav(){
  var g="",h="";VIEWS.forEach(function(v,i){if(v.g!==g){g=v.g;h+='<div class="group">'+g+'</div>'}h+='<a href="#'+v.id+'" data-v="'+v.id+'"><span class="num">'+String(i).padStart(2,"0")+'</span>'+v.t+'</a>'});$("#nav").innerHTML=h;
}
function pager(id){var i=-1;VIEWS.forEach(function(v,k){if(v.id===id)i=k});var p=VIEWS[i-1],n=VIEWS[i+1];
  return '<div class="wrap'+(id==="types"||id==="home"?" wide":"")+'"><div class="pager">'+(p?'<a href="#'+p.id+'"><small>← Previous</small><b>'+p.t+'</b></a>':'<span class="ghost"></span>')+(n?'<a class="next" href="#'+n.id+'"><small>Next →</small><b>'+n.t+'</b></a>':'<a class="next" href="#home"><small>Back to</small><b>Welcome</b></a>')+'</div></div>'}

/* ---------- reading & listening progress ---------- */
var PART_VIEW=["home","what","origins","benefits","types","stages","questions","pray","salvation"];
var PG={read:{},aud:{}};
function secDone(id){var d=PG.read[id]||0;var pi=PART_VIEW.indexOf(id);if(pi>=0)d=Math.max(d,PG.aud[pi]||0);return d}
function pct(){var t=0;VIEWS.forEach(function(v){t+=secDone(v.id)});return Math.round(t/VIEWS.length*100)}
function doneCount(){return VIEWS.filter(function(v){return secDone(v.id)>=1}).length}
function partsDone(){var n=0;for(var i=0;i<FULL.length;i++)if((PG.aud[i]||0)>=1)n++;return n}
function ring(p,size,stroke,label){var r=(size-stroke)/2,c=2*Math.PI*r,o=c*(1-p/100);
  return '<svg class="ring" viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'" aria-hidden="true"><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke-width="'+stroke+'" class="rt"/><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke-width="'+stroke+'" class="rf" stroke-dasharray="'+c.toFixed(2)+'" stroke-dashoffset="'+o.toFixed(2)+'" transform="rotate(-90 '+size/2+' '+size/2+')"/>'+(label?'<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">'+p+'%</text>':'')+'</svg>'}
function setRead(id,f){f=f>=0.97?1:f;if(f>(PG.read[id]||0)){PG.read[id]=f;updProg()}}
function setAud(i,f){f=f>=0.97?1:f;if(f>(PG.aud[i]||0)+0.01||(f===1&&PG.aud[i]!==1)){PG.aud[i]=f;updProg()}}
function progBlock(){var p=pct();
  return '<div class="prog-card"><div class="prog-ring">'+ring(p,132,12,true)+'</div><div class="prog-info"><h3>Your progress</h3><p><b>'+doneCount()+' of '+VIEWS.length+'</b> sections completed · <b>'+partsDone()+' of '+FULL.length+'</b> audio parts heard</p><p class="hint">The circle fills as you read to the end of each section or listen through it.</p>'+
  '<div class="prog-list">'+VIEWS.map(function(v){var d=secDone(v.id);return '<a href="#'+v.id+'" class="'+(d>=1?"done":(d>0?"part":""))+'"><span class="ck">'+(d>=1?"✓":Math.round(d*100)+"%")+'</span>'+v.t+'</a>'}).join("")+'</div>'+
  '<div class="prog-act"><button type="button" class="btn clear-all" data-clear>Clear all &amp; restart</button></div></div></div>'}
function updProg(){var p=pct();
  var tb=document.getElementById("progBtn");if(tb){tb.innerHTML=ring(p,40,3.5,true);tb.setAttribute("aria-label","Your progress: "+p+" percent complete")}
  var sb=document.getElementById("sideProg");if(sb)sb.innerHTML=ring(p,44,5,false)+'<div><b>'+p+'% complete</b><span>'+doneCount()+' of '+VIEWS.length+' sections</span></div><button type="button" class="side-clear" data-clear>Clear all</button>';
  var hb=document.getElementById("progHome");if(hb)hb.innerHTML=progBlock();
  $$("#nav a").forEach(function(a){var d=secDone(a.dataset.v);a.classList.toggle("done",d>=1)});
}
var scrollQ=false,lockUntil=0;
function measure(){scrollQ=false;if(Date.now()<lockUntil)return;var v=$("#main .view");if(!v||!current)return;var r=v.getBoundingClientRect();if(r.height<=0)return;if(window.scrollY<5&&r.height>window.innerHeight)return;
  var f=Math.max(0,Math.min(1,(window.innerHeight-r.top)/r.height));setRead(current,f)}
window.addEventListener("scroll",function(){if(!scrollQ){scrollQ=true;requestAnimationFrame(measure)}},{passive:true});
window.addEventListener("resize",function(){if(!scrollQ){scrollQ=true;requestAnimationFrame(measure)}});
player.addEventListener("timeupdate",function(){if(mode==="full"&&player.duration)setAud(fullIdx,player.currentTime/player.duration)});
function toast(t){var el=document.getElementById("toast");if(!el){el=document.createElement("div");el.id="toast";el.className="toast";el.setAttribute("role","status");document.body.appendChild(el)}el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},3200)}
function askClear(){var ov=document.getElementById("clearOv");ov.classList.add("on");setTimeout(function(){$("#clearYes").focus()},30)}
function closeClear(){document.getElementById("clearOv").classList.remove("on")}
function clearAll(){closeClear();
  player.pause();if(playingBtn){playingBtn.classList.remove("on");setLbl(playingBtn,false);playingBtn=null}
  mode=null;fullIdx=0;player.removeAttribute("src");try{player.load()}catch(e){}hideBar();
  store.clear();PG={read:{},aud:{}};current=null;lockUntil=Date.now()+1800;
  if(location.hash&&location.hash!=="#home"){location.hash="#home"}else render();
  window.scrollTo({top:0,behavior:"instant"});updProg();updBar();toast("Everything has been cleared. You are starting fresh.")}
document.addEventListener("click",function(e){if(e.target.closest("[data-clear]")){e.preventDefault();askClear()}});
var current=null;
function render(){
  var hs=(location.hash||"#home").slice(1).split("/"),id=hs[0],sub=hs[1];
  if(!R[id]){if(id==="main"){return}id="home"}
  if(mode==="clip")stopAudio();
  var m=$("#main");m.innerHTML='<div class="view on" data-view="'+id+'">'+R[id]()+pager(id)+'</div>';
  $$("#nav a").forEach(function(a){a.classList.toggle("active",a.dataset.v===id)});
  if(INIT[id])INIT[id](sub);
  document.title=(id==="home"?"":VIEWS.filter(function(v){return v.id===id})[0].t+" · ")+"Fasting & Prayer Guide — L137 · Dominion Hour";
  if(sub&&id==="home"){var t=$("#"+sub);if(t)setTimeout(function(){t.scrollIntoView({behavior:"smooth"})},40)}
  else if(current!==id||!sub)window.scrollTo(0,0);
  current=id;closeMenu();updProg();setTimeout(measure,400);
}
function closeMenu(){$("#side").classList.remove("open");$("#scrim").classList.remove("on");$("#menuBtn").setAttribute("aria-expanded","false")}
$("#menuBtn").addEventListener("click",function(){var o=$("#side").classList.toggle("open");$("#scrim").classList.toggle("on",o);$("#menuBtn").setAttribute("aria-expanded",o)});
$("#scrim").addEventListener("click",closeMenu);
document.addEventListener("click",function(e){var b=e.target.closest("[data-audio]");if(b){e.preventDefault();e.stopPropagation();play(b.dataset.audio,b);return}
  var f=e.target.closest("[data-full]");if(f){e.preventDefault();var i=+f.dataset.full;if(f.classList.contains("full-play")&&f.dataset.full==="0"&&mode==="full")toggleFull();else if(mode==="full"&&i===fullIdx&&!player.paused&&!f.classList.contains("full-play"))player.pause();else playFull(i,mode==="full"&&i===fullIdx)}},true);
window.addEventListener("hashchange",render);
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeMenu();closeSearch()}});

/* ---------- global search ---------- */
var IDX=null;
function buildIdx(){IDX=[];
  C.faq.forEach(function(f,i){IDX.push({k:"Question",t:f.q,s:strip(f.a),h:"#questions/q"+i})});
  C.types.forEach(function(t){IDX.push({k:"Type of fast",t:t.name,s:strip(t.what),h:"#types"})});
  C.timeline.forEach(function(t){IDX.push({k:"Origins",t:t.title,s:strip(t.note),h:"#origins"})});
  ["beginner","intermediate","advanced"].forEach(function(k){var S=C.stages[k];IDX.push({k:"Stage",t:S.name+": "+S.sub,s:S.who,h:"#stages/"+k})});
  C.benefitsSpiritual.forEach(function(b){IDX.push({k:"Benefit",t:b.t,s:strip(b.d),h:"#benefits"})});
  C.prayerPoints.forEach(function(p){IDX.push({k:"Prayer points",t:p.t,s:p.items.join(" "),h:"#pray"})});
  Object.keys(K).forEach(function(r){IDX.push({k:"Scripture · KJV",t:r,s:kjvText(r),h:"#scripture"})});
}
function hl(s,q){var i=s.toLowerCase().indexOf(q);if(i<0)return esc(s.slice(0,140));var a=Math.max(0,i-50);return (a?"…":"")+esc(s.slice(a,i))+"<mark>"+esc(s.slice(i,i+q.length))+"</mark>"+esc(s.slice(i+q.length,i+q.length+90))+"…"}
function doSearch(){var q=$("#searchIn").value.trim().toLowerCase(),r=$("#searchRes");if(q.length<2){r.innerHTML='<p class="muted small" style="padding:10px">Try: coffee, TikTok, movies, Daniel, Esther, intimacy, water.</p>';return}
  if(!IDX)buildIdx();var res=IDX.filter(function(x){return (x.t+" "+x.s).toLowerCase().indexOf(q)>=0}).slice(0,30);
  r.innerHTML=res.length?res.map(function(x){return '<a href="'+x.h+'"><small>'+x.k+'</small><b>'+esc(x.t)+'</b><span>'+hl(x.s,q)+'</span></a>'}).join(""):'<p class="muted" style="padding:10px">Nothing found.</p>'}
function openSearch(){$("#searchOv").classList.add("on");$("#searchIn").focus();doSearch()}
function closeSearch(){$("#searchOv").classList.remove("on")}
$("#searchBtn").addEventListener("click",openSearch);$("#searchClose").addEventListener("click",closeSearch);
$("#searchOv").addEventListener("click",function(e){if(e.target.id==="searchOv"||e.target.closest(".res a"))closeSearch()});
$("#searchIn").addEventListener("input",doSearch);

buildNav();render();updBar();
var npP=document.getElementById("npPlay");if(npP)npP.addEventListener("click",function(){if(mode==="full")toggleFull();else if(player.paused){player.play()}else{player.pause()}});
var npX=document.getElementById("npClose");if(npX)npX.addEventListener("click",function(){player.pause();if(playingBtn){playingBtn.classList.remove("on");setLbl(playingBtn,false);playingBtn=null}mode=mode==="full"?"full":null;hideBar();updBar()});
var npN=document.getElementById("npNext");if(npN)npN.addEventListener("click",function(){if(mode==="full"&&fullIdx<FULL.length-1)playFull(fullIdx+1)});
var npB=document.getElementById("npPrev");if(npB)npB.addEventListener("click",function(){if(mode==="full")playFull(player.currentTime>5?fullIdx:fullIdx-1)});
var npS=document.getElementById("npSeek");if(npS){npS.addEventListener("input",function(){npS.dragging=true});npS.addEventListener("change",function(){player.currentTime=+npS.value;npS.dragging=false})}
document.getElementById("clearYes").addEventListener("click",clearAll);
document.getElementById("clearNo").addEventListener("click",closeClear);
document.getElementById("clearOv").addEventListener("click",function(e){if(e.target.id==="clearOv")closeClear()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeClear()});
updProg();

/* ---------- day / night ---------- */
(function(){
  var root=document.documentElement,btn=document.getElementById("themeBtn"),meta=document.querySelector('meta[name="theme-color"]');
  function setTheme(t){root.setAttribute("data-theme",t);var l=btn.querySelector(".theme-label");if(l)l.textContent=t==="night"?"Night":"Day";
    btn.setAttribute("aria-label",t==="night"?"Switch to day":"Switch to night");if(meta)meta.setAttribute("content",t==="night"?"#0B1220":"#FAF8F2")}
  btn.addEventListener("click",function(){setTheme(root.getAttribute("data-theme")==="night"?"day":"night")});
  setTheme("day");
  var cv=document.getElementById("sky"),ctx=cv.getContext("2d"),stars=[],W=0,H=0;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function size(){var dpr=Math.min(window.devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    stars=[];var n=Math.round(W*H/6000);for(var i=0;i<n;i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.3,p:Math.random()*6.28,s:.5+Math.random()*1.5})}
  function draw(t){
    if(root.getAttribute("data-theme")==="night"){
      ctx.clearRect(0,0,W,H);var sm=W<640,mx=W*(sm?.9:.86),my=sm?96:Math.max(110,H*.14),mr=sm?18:26;
      var g=ctx.createRadialGradient(mx,my,0,mx,my,260);g.addColorStop(0,"rgba(230,209,154,.18)");g.addColorStop(1,"rgba(230,209,154,0)");
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      ctx.fillStyle="rgba(240,230,200,.9)";ctx.beginPath();ctx.arc(mx,my,mr,0,6.29);ctx.fill();
      ctx.fillStyle="#0B1220";ctx.beginPath();ctx.arc(mx+mr*.42,my-mr*.27,mr*.88,0,6.29);ctx.fill();
      for(var i=0;i<stars.length;i++){var st=stars[i],a=reduce?.7:.35+.65*Math.abs(Math.sin(st.p+t/1000*st.s));
        ctx.fillStyle="rgba(246,236,206,"+a.toFixed(2)+")";ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,6.29);ctx.fill()}
    }
    requestAnimationFrame(draw)}
  size();addEventListener("resize",size);requestAnimationFrame(draw);
  var ss=document.getElementById("sideSearch");if(ss)ss.addEventListener("click",function(){closeMenu();openSearch()});
})();
})();
