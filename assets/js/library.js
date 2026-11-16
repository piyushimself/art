/* The Atlas — lightweight navigation, page search and reading tools */
(()=>{'use strict';
/* Keep the shared responsive type/filter system current on every library page. */
const atlasStyleHref='assets/css/mobile-system.css?v=responsive-audit-20261116-8';
let atlasStyle=document.querySelector('link[rel="stylesheet"][href*="mobile-system.css"]');
if(atlasStyle){if(!atlasStyle.href.includes('responsive-audit-20261116-8'))atlasStyle.href=atlasStyleHref;}
else{atlasStyle=document.createElement('link');atlasStyle.rel='stylesheet';atlasStyle.href=atlasStyleHref;document.head.appendChild(atlasStyle);}

const PAGES=[{"file":"animated-film-atlas.html","title":"300 Essential Animated Films","category":"culture","keywords":"animation, animated films, world cinema, 300 film atlas"},{"file":"meal-picker.html","title":"Meal Picker","category":"learning","keywords":"meal planning, food, recipes, everyday tool"},{"file":"curators-library.html","title":"The Curator’s Library","category":"culture","keywords":"curated discovery, film, anime, books, poetry, art"},{"file":"anime-manga-values-curriculum.html","title":"Anime & Manga for a Life of Reflection","category":"manga","keywords":"anime, manga, values, reflection, stories"},{"file":"blackout-poetry.html","title":"Blackout Poetry Studio","category":"art","keywords":"poetry, writing, creative exercise, tutorial"},{"file":"joy-of-painting.html","title":"The Joy of Painting — Bob Ross","category":"art","keywords":"painting, Bob Ross, art practice, tutorial"},{"file":"free-art-resources.html","title":"Free Creative Art Resources","category":"art","keywords":"art, resources, drawing, painting"},{"file":"human-development-curriculum.html","title":"The Inner Life — Human Development Curriculum","category":"learning","keywords":"human development, anime, manga, psychology, curriculum"},{"file":"fiction-of-living.html","title":"The Fiction of Living","category":"learning","keywords":"life stages, fiction, reading curriculum, identity, loss"},{"file":"how-to-live.html","title":"How to Live — A Complete Curriculum","category":"learning","keywords":"philosophy, life, learning, practical curriculum"},{"file":"manga-reading-atlas.html","title":"Manga Reading Atlas — 1,200 Titles","category":"manga","keywords":"manga, reading list, discovery, recommendations"},{"file":"manga-comics-archive.html","title":"Manga & Comics Archive","category":"manga","keywords":"manga, comics, archive, search, creators"},{"file":"manga-comics-index.html","title":"Manga & Comics Master Index","category":"manga","keywords":"manga, comics, master index, catalogue"},{"file":"manga-that-move.html","title":"50 Manga That Will Move You","category":"manga","keywords":"manga, recommendations, emotional stories, reading guide"},{"file":"dark-ink-manga.html","title":"Dark Ink — Transgressive Manga Index","category":"manga","keywords":"manga, transgressive fiction, mature themes, catalogue"},{"file":"manhwa-romance-index.html","title":"Manhwa Romance Index — 294 Titles","category":"manga","keywords":"294 adult romance manhwa, search, category filters, ratings"},{"file":"marginalia.html","title":"Marginalia — Personal Notebook","category":"learning","keywords":"notebook, journal, notes, writing"},{"file":"political-comics.html","title":"Political Comics & Manga","category":"manga","keywords":"political comics, manga, history, society, curriculum"},{"file":"forbidden-pages.html","title":"Forbidden Pages — Transgressive Comics","category":"manga","keywords":"transgressive comics, manga, mature themes, content advisory"},{"file":"loom-tracker.html","title":"The Loom — Personal Tracker","category":"learning","keywords":"habit tracker, routines, reflection, balance"},{"file":"top-500-adult-manga.html","title":"Top 500 Adult Manga","category":"manga","keywords":"adult manga, ranked list, mature themes, content advisory"},{"file":"watercolour-journal.html","title":"Watercolour Journal — 30 Painting Tasks","category":"art","keywords":"watercolour, painting, prompts, journal"},{"file":"asian-cinema-curriculum.html","title":"Asian Cinema — A Guided Curriculum","category":"culture","keywords":"asian cinema, world cinema, film, japan, korea, india"},{"file":"cinema-obscura.html","title":"Cinematic Database","category":"culture","keywords":"cinema, films, directors, film database"},{"file":"cinematic-canon.html","title":"The Cinematic Canon","category":"culture","keywords":"cinema, film canon, directors, classics"},{"file":"film-collection.html","title":"The Complete Film Collection — 1,619 Films","category":"culture","keywords":"film watchlist, watched tracker, cinema, import export"},{"file":"four-arcs-library.html","title":"The Four Arcs — A Life Library","category":"ideas","keywords":"four arcs, human experience, films, books, anime, manga, poetry"},{"file":"film-and-art-library.html","title":"The Film & Art Library","category":"culture","keywords":"world cinema, biographies, anime, books, art, poetry"},{"file":"grand-library.html","title":"The Grand Library","category":"ideas","keywords":"cross-media catalogue, personal tracker, films, anime, manga, books, music, art"},{"file":"sensual-mood-cinema.html","title":"Sensual Mood Cinema — 660 Films","category":"culture","keywords":"sensual cinema, mature themes, mood-led film collection"}];
const body=document.body;
if(!body)return;
const templateStyles=document.createElement('link');
templateStyles.rel='stylesheet';
templateStyles.href='assets/css/collection-template.css?v=global-theme-20261116-4';
document.head.appendChild(templateStyles);
const pageFile=(location.pathname.split('/').pop()||'index.html').toLowerCase();
body.dataset.atlasPage=pageFile;
const currentPage=PAGES.find(p=>decodeURIComponent(p.file).toLowerCase()===pageFile);
if(currentPage){document.title=currentPage.title;}

const inferredTheme=/(manga|manhwa|comic|taboo)/.test(pageFile)?'manga':/(film|cinema|movie|curator|arc)/.test(pageFile)?'culture':/(poetry|ross|art|watercolour|painting|resource)/.test(pageFile)?'art':/(curriculum|loom|marginalia|meal|fiction)/.test(pageFile)?'learning':'utility';
if(!body.dataset.libraryTheme)body.dataset.libraryTheme=inferredTheme;
/* Page-specific repair: Top 500 Adult Manga.
   Preserve its authored two-line title and dark masthead; the shared colour
   token layer must not turn the masthead into a pale panel with invisible text. */
if(pageFile==='top-500-adult-manga.html'){
 const pageFix=document.createElement('style');
 pageFix.textContent=`
  body[data-library-theme="manga"]>header{
   display:block!important;min-height:0!important;height:auto!important;
   padding:38px 24px 28px!important;margin:0!important;
   background:#0d0d0d!important;color:#f5f0e8!important;
   border-bottom:1px solid #343434!important;
  }
  body[data-library-theme="manga"]>header h1{
   display:block!important;color:#f5f0e8!important;
   font-family:"Bebas Neue",Impact,sans-serif!important;
   font-size:clamp(42px,9vw,76px)!important;line-height:.96!important;
   letter-spacing:.025em!important;margin:0!important;
  }
  body[data-library-theme="manga"]>header h1 span{color:#c0392b!important}
  body[data-library-theme="manga"]>header p{
   color:#b9b4aa!important;font-size:12px!important;line-height:1.55!important;
   letter-spacing:.12em!important;margin:12px 0 0!important;max-width:68ch!important;
  }
  body[data-library-theme="manga"]>header .header-meta{
   display:flex!important;gap:8px!important;flex-wrap:wrap!important;margin-top:18px!important;
  }
  body[data-library-theme="manga"]>header .meta-pill{
   background:#1b1d1e!important;color:#c5c0b8!important;
   border:1px solid #393d3e!important;padding:7px 10px!important;
   font-size:10px!important;letter-spacing:.08em!important;
  }
  body[data-library-theme="manga"]>header .meta-pill b{color:#e06a54!important}
  @media(max-width:640px){
   body[data-library-theme="manga"]>header{padding:28px 20px 22px!important}
   body[data-library-theme="manga"]>header h1{font-size:clamp(40px,11vw,58px)!important}
   body[data-library-theme="manga"]>header .header-meta{gap:7px!important;margin-top:14px!important}
   body[data-library-theme="manga"]>header .meta-pill{padding:6px 8px!important;font-size:9px!important}
  }`;
 document.head.appendChild(pageFix);
}

/* Load the shared list-first design after legacy page repairs so it wins consistently. */
const standardStyles=document.createElement('link');
standardStyles.rel='stylesheet';
standardStyles.href='assets/css/atlas-standard.css?v=20261116-1';
document.head.appendChild(standardStyles);

const theme=body.dataset.libraryTheme||'home';
const progress=document.createElement('div');progress.className='atlas-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
const dock=document.createElement('nav');dock.className='atlas-dock';dock.setAttribute('aria-label','Library tools');
dock.innerHTML='<a class="atlas-home" href="index.html">← Library</a><button type="button" data-atlas-more aria-expanded="false">Tools ＋</button><button type="button" data-atlas-toc>Contents</button><button type="button" data-atlas-search>Search ⌕</button><button type="button" class="atlas-theme-toggle" data-atlas-theme aria-label="Switch to dark theme" aria-pressed="false">◐ Dark</button>';
document.body.appendChild(dock);
const moreToggle=dock.querySelector('[data-atlas-more]');
moreToggle.addEventListener('click',()=>{const expanded=dock.classList.toggle('is-expanded');moreToggle.setAttribute('aria-expanded',String(expanded));moreToggle.textContent=expanded?'Close ×':'Tools ＋';});
const dockStyle=document.createElement('style');dockStyle.textContent='@media(max-width:640px){.atlas-dock:not(.is-expanded)>:not(.atlas-home):not([data-atlas-more]):not(.atlas-page-check){display:none!important}.atlas-dock:not(.is-expanded){width:auto!important;min-width:0!important;gap:5px!important;padding:5px!important}.atlas-dock.is-expanded{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;width:min(320px,calc(100vw - 24px))!important;max-width:calc(100vw - 24px)!important;gap:5px!important;padding:8px!important}.atlas-dock.is-expanded>*{min-width:0!important;white-space:nowrap!important}.atlas-dock.is-expanded .atlas-home{grid-column:1/-1}.atlas-dock [data-atlas-more]{background:var(--atlas-accent,#557d68)!important;color:#fff!important}}';document.head.appendChild(dockStyle);
const themeToggle=dock.querySelector('[data-atlas-theme]');
const root=document.documentElement;
let colorMode='dark';try{colorMode=localStorage.getItem('atlas.color-mode')==='light'?'light':'dark';}catch(_){}
function applyColorMode(mode){colorMode=mode;root.dataset.colorMode=mode;body.dataset.colorMode=mode;const dark=mode==='dark';themeToggle.textContent=dark?'☼ UI Light':'◐ UI Dark';themeToggle.setAttribute('aria-pressed',String(dark));themeToggle.setAttribute('aria-label',dark?'Switch library tools to light theme':'Switch library tools to dark theme');try{localStorage.setItem('atlas.color-mode',mode);}catch(_){}}
applyColorMode(colorMode);
themeToggle.addEventListener('click',()=>applyColorMode(colorMode==='dark'?'light':'dark'));
const back=document.createElement('button');back.className='atlas-backtop';back.type='button';back.textContent='↑';back.setAttribute('aria-label','Back to top');document.body.appendChild(back);
const overlay=document.createElement('div');overlay.className='atlas-overlay';overlay.innerHTML='<section class="atlas-dialog" role="dialog" aria-modal="true" aria-labelledby="atlasSearchTitle"><div class="atlas-dialog-head"><h2 id="atlasSearchTitle">Search the library</h2><button class="atlas-close" type="button" aria-label="Close">×</button></div><input class="atlas-search" type="search" placeholder="Search collections, topics and pages…" autocomplete="off"><p class="atlas-hint">Search all pages. Press Enter to find the term inside this page. Shortcut: Ctrl / ⌘ + K</p><div class="atlas-results" aria-live="polite"></div></section>';
document.body.appendChild(overlay);
const input=overlay.querySelector('input'),results=overlay.querySelector('.atlas-results');
function render(q){const term=q.trim().toLowerCase();const found=PAGES.filter(p=>(p.title+' '+p.category+' '+p.keywords+' '+p.file).toLowerCase().includes(term)).slice(0,12);results.innerHTML=found.length?found.map(p=>'<a class="atlas-result" href="'+encodeURI(p.file)+'"><strong>'+esc(p.title)+'</strong><small>'+esc(p.category)+' · '+esc(p.keywords)+'</small></a>').join(''):'<div class="atlas-empty">No collection title matches. Press Enter to search within this page.</div>';}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function openSearch(){overlay.classList.add('is-open');input.value='';render('');setTimeout(()=>input.focus(),30);}
function closeSearch(){overlay.classList.remove('is-open');}
dock.querySelector('[data-atlas-search]').addEventListener('click',openSearch);
overlay.querySelector('.atlas-close').addEventListener('click',closeSearch);
overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch();});
input.addEventListener('input',()=>render(input.value));
input.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=input.value.trim();if(!q)return;closeSearch();if(typeof window.find==='function'){const found=window.find(q,false,false,true,false,false,false);if(!found){const msg=document.createElement('div');msg.textContent='No further match found on this page.';msg.style.cssText='position:fixed;z-index:10001;bottom:80px;left:50%;transform:translateX(-50%);padding:10px 15px;border-radius:10px;background:#222;color:#fff;font:13px system-ui';document.body.appendChild(msg);setTimeout(()=>msg.remove(),2200);}}}if(e.key==='Escape')closeSearch();});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}if(e.key==='Escape'){closeSearch();toc?.classList.remove('is-open');}});
const headings=[...document.querySelectorAll('main h2,article h2,section h2,main h3,article h3')].filter(h=>h.textContent.trim());
const toc=document.createElement('aside');toc.className='atlas-toc';toc.setAttribute('aria-label','Page contents');
if(headings.length>=4){toc.innerHTML='<h2>On this page</h2>'+headings.map((h,i)=>{if(!h.id)h.id='atlas-section-'+i;return '<a data-level="'+h.tagName.slice(1)+'" href="#'+h.id+'">'+esc(h.textContent.trim().replace(/\s+/g,' ').slice(0,90))+'</a>';}).join('');document.body.appendChild(toc);dock.querySelector('[data-atlas-toc]').addEventListener('click',()=>toc.classList.toggle('is-open'));toc.addEventListener('click',e=>{if(e.target.closest('a'))toc.classList.remove('is-open');});}else{dock.querySelector('[data-atlas-toc]').hidden=true;}
function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';back.classList.toggle('is-visible',scrollY>480);}
addEventListener('scroll',onScroll,{passive:true});onScroll();back.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
if(theme==='home'){const old=document.querySelector('[data-atlas-toc]');if(old)old.hidden=true;}
})();

/* Atlas shared checklist — one progress store for every page */
(()=>{'use strict';
const STORE='atlas.progress.v2';
const pageFile=(location.pathname.split('/').pop()||'index.html');
const pageTitle=(document.title||pageFile).replace(/\\s*[—|].*$/,'').trim();
function read(){try{const v=JSON.parse(localStorage.getItem(STORE)||'{}');return v&&v.records&&typeof v.records==='object'?v:{records:{}};}catch(_){return{records:{}};}}
function write(data){try{localStorage.setItem(STORE,JSON.stringify(data));window.dispatchEvent(new CustomEvent('atlas-progress-change'));return true;}catch(_){return false;}}
function set(type,id,meta,done){const data=read();if(done){data.records[id]=Object.assign({id,type,done:true,updatedAt:Date.now()},meta||{});}else{delete data.records[id];}write(data);}
function list(){return Object.values(read().records).filter(x=>x&&x.done);}
window.AtlasProgress={set:set,list:list,read:read,storeKey:STORE};
const safeHref=v=>{const s=String(v||'');return /^(?!\/\/)(?![a-z][a-z0-9+.-]*:)[\w%(). -]+\.html(?:#[\w-]+)?$/i.test(s)?s:'#';};
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(36);};
function checkbox(id,type,title,href,host,labelText){
 const lab=document.createElement('label');lab.className='atlas-item-check';lab.title='Save this item to your Atlas checklist';
 const box=document.createElement('input');box.type='checkbox';box.dataset.atlasProgressId=id;box.dataset.atlasProgressType=type;box.checked=!!read().records[id];box.setAttribute('aria-label','Mark '+title+' as completed');
 const txt=document.createElement('span');txt.textContent=box.checked?'Saved':'Add to tracker';
 lab.append(box,txt);lab.addEventListener('click',e=>e.stopPropagation());if(host.matches('a.card')){const wrap=document.createElement('div');wrap.className='atlas-card-track-wrap';host.parentNode.insertBefore(wrap,host);wrap.append(host,lab);lab.classList.add('atlas-item-check--inside-link');}else if(host.matches('a,button'))host.insertAdjacentElement('afterend',lab);else host.appendChild(lab);
 box.addEventListener('change',()=>{set(type,id,{title:title,page:pageFile,pageTitle:pageTitle,href:href},box.checked);txt.textContent=box.checked?'Saved':'Add to tracker';});
}
function addPageControl(){
 const dock=document.querySelector('.atlas-dock');if(!dock||dock.querySelector('.atlas-page-check'))return;
 const id='collection:'+pageFile;
 const lab=document.createElement('label');lab.className='atlas-page-check';
 const box=document.createElement('input');box.type='checkbox';box.dataset.atlasProgressId=id;box.dataset.atlasProgressType='collection';box.checked=!!read().records[id];box.setAttribute('aria-label','Mark this page complete');
 const txt=document.createElement('span');txt.textContent='Page done';
 lab.append(box,txt);dock.insertBefore(lab,dock.firstChild);
 box.addEventListener('change',()=>{set('page',id,{title:pageTitle,page:pageFile,pageTitle:pageTitle,href:pageFile},box.checked);txt.textContent=box.checked?'Page saved':'Page done';});
 txt.textContent=box.checked?'Page saved':'Page done';
}
const selectors='.manga-card, .mc, .book, .book-card, .episode-card, .practical-item, .task-item, .task-card, .film-card, .movie-card, .resource-card, .work-card, .entry, .lcard, .card, tbody tr';
const seen=new WeakSet();
function addItems(){
 if(document.body.dataset.libraryTheme==='home')return;
 document.querySelectorAll(selectors).forEach(node=>{
  if(seen.has(node)||node.querySelector('.atlas-item-check')||node.closest('nav, .atlas-dock, .atlas-overlay, .atlas-toc, footer')||node.parentElement?.closest('.atlas-trackable'))return;
  const raw=(node.innerText||node.textContent||'').replace(/\\s+/g,' ').trim();
  if(raw.length<18)return;
  if(node.matches('li')&&node.querySelector('ul,ol'))return;
  const titleNode=node.querySelector('h2,h3,h4,.card-title,.mc-title,.mt,.ep-title,.entry-title,.card-name,.book-title,.manga-title,.title-cell,.title,.name');
  let title=(titleNode&&titleNode.textContent||raw).replace(/\\s+/g,' ').trim();
  if(title.length>110)title=title.slice(0,107)+'…';
  const identity=pageFile+'|'+(node.getAttribute('data-id')||node.id||title+'|'+raw.slice(0,180));
  const id='item:'+pageFile+':'+hash(identity);
  node.id=node.id||('atlas-'+hash(identity));
  const host=node.tagName==='TR'?(node.cells[0]||node):node;
  checkbox(id,'item',title,pageFile+'#'+node.id,host);
  node.classList.add('atlas-trackable');
  seen.add(node);
 });
}
function syncControls(){const records=read().records;document.querySelectorAll('[data-atlas-progress-id]').forEach(box=>{box.checked=!!records[box.dataset.atlasProgressId];const text=box.nextElementSibling;if(text){const type=box.dataset.atlasProgressType;text.textContent=box.checked?(type==='collection'?'Page saved':'Saved'):(type==='collection'?'Page done':'Add to tracker');}});}
function renderDashboard(){
 if(document.body.dataset.libraryTheme!=='home')return;
 let panel=document.getElementById('atlas-completed-panel');
 if(!panel){panel=document.createElement('section');panel.id='atlas-completed-panel';panel.className='atlas-completed-panel';panel.setAttribute('aria-label','Your completed items');const toolbar=document.querySelector('.shelf-toolbar');if(toolbar)toolbar.insertAdjacentElement('afterend',panel);else document.body.prepend(panel);}
 const wasOpen=!!panel.querySelector('details')?.open;
 const records=list().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
 const rows=records.map(r=>'<div class="atlas-done-row"><label><input type="checkbox" checked data-atlas-uncheck="'+esc(r.id)+'"><span class="atlas-done-check">✓</span></label><a href="'+esc(safeHref(r.href||r.page))+'"><span>'+esc(r.title||r.pageTitle||r.page||'Completed item')+'</span><small>'+esc(r.pageTitle||r.page||'Library')+' · '+esc(r.type||'item')+'</small></a></div>').join('');
 panel.innerHTML='<details class="atlas-done-details"'+(wasOpen?' open':'')+'><summary><div class="atlas-done-head"><div><span class="atlas-done-kicker">YOUR PERSONAL CHECKLIST</span><h2>Completed & saved <span>'+records.length+'</span></h2></div><span class="atlas-done-note">'+(records.length?'Open to review or uncheck':'Saved in this browser')+' · Browser-local</span></div></summary>'+(rows?'<div class="atlas-done-list">'+rows+'</div>':'<p class="atlas-done-empty">Nothing checked yet. Open any collection and use “Add to tracker” beside an item, or mark the page complete.</p>')+'</details>';
 panel.querySelectorAll('[data-atlas-uncheck]').forEach(box=>box.addEventListener('change',()=>{const id=box.getAttribute('data-atlas-uncheck');const data=read();delete data.records[id];write(data);}));
}
addPageControl();
addItems();
if(document.body.dataset.libraryTheme!=='home'){
 const observer=new MutationObserver(()=>addItems());
 observer.observe(document.body,{childList:true,subtree:true});
}
renderDashboard();
window.addEventListener('atlas-progress-change',()=>{syncControls();renderDashboard();});
window.addEventListener('storage',e=>{if(e.key===STORE){syncControls();renderDashboard();}});
window.addEventListener('pageshow',()=>{syncControls();renderDashboard();});
})();