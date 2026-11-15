/* Personal Shelf — browser-local collection progress */
(()=>{'use strict';
const KEY='atlas.personal-shelf.progress.v1';
const cards=[...document.querySelectorAll('.card')];
const status=document.getElementById('shelfStatus');
const doneNode=document.getElementById('shelfDone');
const totalNode=document.getElementById('shelfTotal');
const percentNode=document.getElementById('shelfPercent');
const meter=document.getElementById('shelfMeter');
const fill=document.getElementById('shelfMeterFill');
const gridButton=document.getElementById('shelfGrid');
const listButton=document.getElementById('shelfList');
const resetButton=document.getElementById('shelfReset');
if(!cards.length||!status)return;
const safeRead=()=>{try{const raw=localStorage.getItem(KEY);const parsed=raw?JSON.parse(raw):[];return new Set(Array.isArray(parsed)?parsed.filter(x=>typeof x==='string'):[]);}catch(_){return new Set();}};
let completed=safeRead();
let layout='grid';
function save(){try{localStorage.setItem(KEY,JSON.stringify([...completed]));}catch(_){announce('Progress could not be saved in this browser.');}}
function announce(message){let node=document.getElementById('shelfAnnounce');if(!node){node=document.createElement('p');node.id='shelfAnnounce';node.className='shelf-privacy';node.setAttribute('role','status');document.querySelector('.shelf-toolbar').appendChild(node);}node.textContent=message;}
function keyFor(card){return card.getAttribute('href')||card.querySelector('h3')?.textContent.trim()||'collection';}
function renderProgress(){
 const count=completed.size,total=cards.length,pct=total?Math.round(count/total*100):0;
 doneNode.textContent=String(count);totalNode.textContent=String(total);percentNode.textContent=pct+'%';
 fill.style.width=pct+'%';meter.setAttribute('aria-valuemax',String(total));meter.setAttribute('aria-valuenow',String(count));
}
function applyFilters(){
 const mode=status.value;
 document.querySelectorAll('.section').forEach(section=>{
  let any=false;
  section.querySelectorAll('.shelf-item').forEach(item=>{
   const card=item.querySelector('.card');
   const isDone=completed.has(keyFor(card));
   const visible=!card.hidden&&(mode==='all'||(mode==='done'&&isDone)||(mode==='open'&&!isDone));
   item.hidden=!visible;item.classList.toggle('is-done',isDone);
   any=any||visible;
  });
  section.hidden=!any;
 });
}
cards.forEach(card=>{
 const key=keyFor(card);
 const item=document.createElement('div');item.className='shelf-item';
 card.parentNode.insertBefore(item,card);item.appendChild(card);
 const label=document.createElement('label');label.className='shelf-check';
 const input=document.createElement('input');input.type='checkbox';input.checked=completed.has(key);input.setAttribute('aria-label','Mark '+(card.querySelector('h3')?.textContent.trim()||'collection')+' as completed');
 const text=document.createElement('span');text.textContent=input.checked?'Completed':'Mark done';
 label.append(input,text);item.appendChild(label);
 input.addEventListener('change',()=>{
  if(input.checked)completed.add(key);else completed.delete(key);
  text.textContent=input.checked?'Completed':'Mark done';save();renderProgress();applyFilters();
 });
});
function syncSearch(){cards.forEach(card=>{const item=card.closest('.shelf-item');if(item){item.hidden=card.hidden;}});applyFilters();}
const search=document.getElementById('librarySearch');
if(search)search.addEventListener('input',()=>{requestAnimationFrame(syncSearch);});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>requestAnimationFrame(syncSearch)));
status.addEventListener('change',applyFilters);
function setLayout(next){
 layout=next;document.querySelectorAll('.grid').forEach(g=>g.classList.toggle('shelf-list',layout==='list'));
 gridButton.classList.toggle('is-active',layout==='grid');listButton.classList.toggle('is-active',layout==='list');
 gridButton.setAttribute('aria-pressed',String(layout==='grid'));listButton.setAttribute('aria-pressed',String(layout==='list'));
 try{localStorage.setItem(KEY+'.layout',layout);}catch(_){}
}
gridButton.addEventListener('click',()=>setLayout('grid'));
listButton.addEventListener('click',()=>setLayout('list'));
resetButton.addEventListener('click',()=>{
 if(!completed.size)return announce('There is no saved progress to reset.');
 if(!window.confirm('Reset completion for every collection on this device?'))return;
 completed.clear();save();document.querySelectorAll('.shelf-check input').forEach(input=>{input.checked=false;input.nextElementSibling.textContent='Mark done';});
 renderProgress();applyFilters();announce('Your local checklist has been reset.');
});
try{const savedLayout=localStorage.getItem(KEY+'.layout');if(savedLayout==='list')setLayout('list');}catch(_){}
totalNode.textContent=String(cards.length);renderProgress();applyFilters();
if(search&&search.value)syncSearch();
})();