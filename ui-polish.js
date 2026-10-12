/* AVETRA 2.6.4: presentation-only enhancements, no calculation changes. */
(function(){
 'use strict';
 function init(){
  var tabs=document.querySelector('.tabs');
  if(tabs){
   tabs.setAttribute('aria-label','Modul AVETRA');
   tabs.querySelectorAll('.tab').forEach(function(b){b.setAttribute('aria-pressed',String(b.classList.contains('active')));});
   tabs.addEventListener('click',function(e){
    var b=e.target.closest('.tab');if(!b)return;
    tabs.querySelectorAll('.tab').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});
   });
   new MutationObserver(function(){tabs.querySelectorAll('.tab').forEach(function(b){b.setAttribute('aria-pressed',String(b.classList.contains('active')));});}).observe(tabs,{subtree:true,attributes:true,attributeFilter:['class'],childList:true});
  }
  var top=document.createElement('button');top.type='button';top.id='avetraBackTop';top.textContent='↑ Ke atas';top.setAttribute('aria-label','Kembali ke atas halaman');
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
  document.body.appendChild(top);
  var ticking=false;
  function update(){top.classList.toggle('show',window.scrollY>650);ticking=false;}
  window.addEventListener('scroll',function(){if(!ticking){window.requestAnimationFrame(update);ticking=true;}},{passive:true});update();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
