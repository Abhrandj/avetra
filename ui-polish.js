/* AVETRA v2.6.5: navigation and presentation only. All calculation engines untouched. */
(function(){
 'use strict';
 function init(){
  const tabs=document.querySelector('.tabs');
  if(!tabs)return;
  tabs.setAttribute('aria-label','Modul AVETRA');
  const nav=document.createElement('div');nav.className='avetra-quicknav';
  const lbl=document.createElement('label');lbl.htmlFor='avetraModuleSelect';lbl.textContent='Pindah modul';
  const select=document.createElement('select');select.id='avetraModuleSelect';select.setAttribute('aria-label','Pilih modul AVETRA');
  nav.append(lbl,select);tabs.parentNode.insertBefore(nav,tabs.nextSibling);
  function sync(){
   const buttons=[...tabs.querySelectorAll('.tab')];
   const active=buttons.find(b=>b.classList.contains('active'));
   const current=active?active.dataset.tab:'personal';
   select.replaceChildren(...buttons.map(b=>{const o=document.createElement('option');o.value=b.dataset.tab;o.textContent=b.textContent.trim();return o;}));
   select.value=current;
   buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===active)));
  }
  tabs.addEventListener('click',e=>{if(e.target.closest('.tab'))requestAnimationFrame(sync)});
  new MutationObserver(sync).observe(tabs,{subtree:true,attributes:true,attributeFilter:['class'],childList:true});
  select.addEventListener('change',()=>{
   const b=[...tabs.querySelectorAll('.tab')].find(x=>x.dataset.tab===select.value);
   if(b){b.click();document.querySelector('header').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
  });
  sync();
  const top=document.createElement('button');top.type='button';top.id='avetraBackTop';top.textContent='↑';top.title='Kembali ke atas';top.setAttribute('aria-label','Kembali ke atas halaman');
  top.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
  document.body.appendChild(top);
  let previous=window.scrollY,ticking=false;
  function update(){const y=window.scrollY;top.classList.toggle('show',y>750&&(y<previous-3||Math.abs(y-previous)<3));previous=y;ticking=false;}
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});update();
  function arrange(){
   const metrics=document.querySelector('#combinedReading .platinum-metrics');
   if(!metrics||metrics.dataset.smart==='yes')return;
   metrics.dataset.smart='yes';
   const items=[...metrics.children];
   const primary=[0,1,2,7,8,12];
   const details=document.createElement('details');details.className='avetra-more-metrics';
   const summary=document.createElement('summary');summary.textContent='Lihat semua indikator Platinum ('+(items.length-primary.length)+' tambahan)';
   const extra=document.createElement('div');extra.className='reading-status platinum-metrics avetra-extra-grid';
   items.forEach((item,i)=>{if(!primary.includes(i))extra.appendChild(item);});
   details.append(summary,extra);metrics.insertAdjacentElement('afterend',details);
  }
  const pout=document.getElementById('pout');if(pout){new MutationObserver(arrange).observe(pout,{childList:true,subtree:false});arrange();}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
