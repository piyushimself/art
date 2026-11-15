/* The Atlas — lightweight navigation, page search and reading tools */
(()=>{'use strict';
const PAGES=[{"file":"300_animated_films.html","title":"300 Essential Animated Films","category":"culture","keywords":"animation, cinema, animated films, film"},{"file":"Meal_Picker_v2 (2).html","title":"Meal Picker","category":"learning","keywords":"food, meals, recipes, planner"},{"file":"The_Curators_Library.html","title":"The Curator's Library","category":"culture","keywords":"curated library, film, anime, books, poetry, art"},{"file":"anime-manga-values-curriculum.html","title":"Anime & Manga for a Life of Reflection","category":"manga","keywords":"anime, manga, values, reflection, stories"},{"file":"blackout_poetry_tutorial.html","title":"Blackout Poetry — A Tutorial","category":"art","keywords":"poetry, writing, creative exercise"},{"file":"bob_ross_complete_guide.html","title":"Bob Ross — The Joy of Painting","category":"art","keywords":"painting, bob ross, art, tutorial"},{"file":"free-art-resources.html","title":"Free Creative Art Resources","category":"art","keywords":"art, resources, drawing, painting"},{"file":"human-development-curriculum.html","title":"The Inner Life — Human Development Curriculum","category":"learning","keywords":"human development, anime, manga, psychology, curriculum"},{"file":"life-fiction-curriculum.html","title":"The Fiction of Living","category":"learning","keywords":"fiction, life, reading, curriculum"},{"file":"living-curriculum-2026.html","title":"How to Live — A Complete Curriculum","category":"learning","keywords":"life, philosophy, learning, curriculum"},{"file":"manga-1000.html","title":"1200 Manga — The Complete Reading Atlas","category":"manga","keywords":"manga, reading list, discovery"},{"file":"manga-archive-v4.html","title":"Manga & Comics Archive","category":"manga","keywords":"manga, comics, archive, search, filter"},{"file":"manga-comics-master.html","title":"Manga & Comics Master Index","category":"manga","keywords":"manga, comics, index, catalogue"},{"file":"manga-guide.html","title":"50 Manga That Will Move You","category":"manga","keywords":"manga, guide, recommendations, reading"},{"file":"manga-index.html","title":"DARK INK — Transgressive Manga Index","category":"manga","keywords":"manga, themes, index, catalogue"},{"file":"manhwa300.html","title":"300 Adult Het Romance Manhwa","category":"manga","keywords":"manhwa, romance, mature, catalogue"},{"file":"manhwa_300_filter_app.html","title":"Manhwa 300 — Interactive Filter","category":"manga","keywords":"manhwa, filter, search, ratings"},{"file":"marginalia-diary.html","title":"Marginalia — A Daily Notebook","category":"learning","keywords":"journal, diary, notes, writing"},{"file":"political-comics-list.html","title":"Political Comics & Manga — World Curriculum","category":"manga","keywords":"politics, comics, manga, history, society"},{"file":"taboo-comics.html","title":"Forbidden Pages — Transgressive Comics Index","category":"manga","keywords":"comics, manga, themes, catalogue"},{"file":"the-loom-tracker.html","title":"The Loom — Four Threads","category":"learning","keywords":"habits, tracker, reflection, routines"},{"file":"top500_adult_manga.html","title":"Top 500 Manga — Mature Collection","category":"manga","keywords":"manga, adult, ranking, list"},{"file":"watercolour_tasks (1).html","title":"Watercolour Journal — 30 Painting Tasks","category":"art","keywords":"watercolour, painting, prompts, journal"}];
const body=document.body;
if(!body)return;
const theme=body.dataset.libraryTheme||'home';
const progress=document.createElement('div');progress.className='atlas-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
const dock=document.createElement('nav');dock.className='atlas-dock';dock.setAttribute('aria-label','Library tools');
dock.innerHTML='<a class="atlas-home" href="index.html">← Library</a><button type="button" data-atlas-toc>Contents</button><button type="button" data-atlas-search>Search ⌕</button>';
document.body.appendChild(dock);
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
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(36);};
function checkbox(id,type,title,href,host,labelText){
 const lab=document.createElement('label');lab.className='atlas-item-check';lab.title='Save this item to your Atlas checklist';
 const box=document.createElement('input');box.type='checkbox';box.checked=!!read().records[id];box.setAttribute('aria-label','Mark '+title+' as completed');
 const txt=document.createElement('span');txt.textContent=box.checked?'Saved':'Add to tracker';
 lab.append(box,txt);host.appendChild(lab);
 box.addEventListener('change',()=>{set(type,id,{title:title,page:pageFile,pageTitle:pageTitle,href:href},box.checked);txt.textContent=box.checked?'Saved':'Add to tracker';});
}
function addPageControl(){
 const dock=document.querySelector('.atlas-dock');if(!dock||dock.querySelector('.atlas-page-check'))return;
 const id='collection:'+pageFile;
 const lab=document.createElement('label');lab.className='atlas-page-check';
 const box=document.createElement('input');box.type='checkbox';box.checked=!!read().records[id];box.setAttribute('aria-label','Mark this page complete');
 const txt=document.createElement('span');txt.textContent='Page done';
 lab.append(box,txt);dock.insertBefore(lab,dock.firstChild);
 box.addEventListener('change',()=>{set('page',id,{title:pageTitle,page:pageFile,pageTitle:pageTitle,href:pageFile},box.checked);txt.textContent=box.checked?'Page saved':'Page done';});
 txt.textContent=box.checked?'Page saved':'Page done';
}
const selectors='main li, article li, .content li, .manga-card, .book, .practical-item, .task-item, .task-card, .film-card, .movie-card, .resource-card, .work-card, .entry, .lcard, .card, tbody tr';
const seen=new WeakSet();
function addItems(){
 if(document.body.dataset.libraryTheme==='home')return;
 document.querySelectorAll(selectors).forEach(node=>{
  if(seen.has(node)||node.querySelector('.atlas-item-check')||node.closest('nav, .atlas-dock, .atlas-overlay, .atlas-toc, footer')||node.parentElement?.closest('.atlas-trackable'))return;
  const raw=(node.innerText||node.textContent||'').replace(/\\s+/g,' ').trim();
  if(raw.length<18)return;
  if(node.matches('li')&&node.querySelector('ul,ol'))return;
  const titleNode=node.querySelector('h2,h3,h4,.card-title,.book-title,.manga-title,.title-cell,.title,.name');
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
function renderDashboard(){
 if(document.body.dataset.libraryTheme!=='home')return;
 let panel=document.getElementById('atlas-completed-panel');
 if(!panel){panel=document.createElement('section');panel.id='atlas-completed-panel';panel.className='atlas-completed-panel';panel.setAttribute('aria-label','Your completed items');const toolbar=document.querySelector('.shelf-toolbar');if(toolbar)toolbar.insertAdjacentElement('afterend',panel);else document.body.prepend(panel);}
 const records=list().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
 const rows=records.map(r=>'<div class="atlas-done-row"><label><input type="checkbox" checked data-atlas-uncheck="'+esc(r.id)+'"><span class="atlas-done-check">✓</span></label><a href="'+esc(r.href||r.page||'#')+'"><span>'+esc(r.title||r.pageTitle||r.page||'Completed item')+'</span><small>'+esc(r.pageTitle||r.page||'Library')+' · '+esc(r.type||'item')+'</small></a></div>').join('');
 panel.innerHTML='<div class="atlas-done-head"><div><span class="atlas-done-kicker">YOUR PERSONAL CHECKLIST</span><h2>Completed & saved <span>'+records.length+'</span></h2></div><span class="atlas-done-note">Saved in this browser</span></div>'+(rows?'<div class="atlas-done-list">'+rows+'</div>':'<p class="atlas-done-empty">Nothing checked yet. Open any collection and use “Add to tracker” beside an item, or mark the page complete.</p>');
 panel.querySelectorAll('[data-atlas-uncheck]').forEach(box=>box.addEventListener('change',()=>{const id=box.getAttribute('data-atlas-uncheck');const data=read();delete data.records[id];write(data);}));
}
addPageControl();
addItems();
if(document.body.dataset.libraryTheme!=='home'){
 const observer=new MutationObserver(()=>addItems());
 observer.observe(document.body,{childList:true,subtree:true});
}
renderDashboard();
window.addEventListener('atlas-progress-change',renderDashboard);
window.addEventListener('storage',e=>{if(e.key===STORE)renderDashboard();});
})();