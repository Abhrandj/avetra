/* AVETRA v2.3 - sourced, non-predictive combined interpretation */
(function(){
'use strict';
const d=window.AVETRA_SCS_DICTIONARY;
if(!d)return;
const safe=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[c]));
const numeric=x=>{const n=Number.parseFloat(String(x).replace(/!/g,''));return Number.isFinite(n)?n:null;};
const line=(title,text)=>'<li><b>'+safe(title)+':</b> '+safe(text)+'</li>';
function build(r){
 const h=d.harani[String(r.h)],a=d.acoustic_root[String(r.a)],t=d.time[String(r.t)];
 const sv=numeric(r.sv),cv=numeric(r.cv),o=r.kecil===3;
 const signals=[];
 if(sv!==null && sv<d.thresholds.synchronicity.positive_min)signals.push('Synchronicity '+sv.toFixed(2)+' di bawah ambang '+d.thresholds.synchronicity.positive_min.toFixed(1));
 if(cv!==null && cv<d.thresholds.coherence.positive_min)signals.push('Coherence '+cv.toFixed(2)+' di bawah ambang '+d.thresholds.coherence.positive_min.toFixed(1));
 if(o)signals.push('Obstacle 3 (O:3) terdeteksi dari selisih A.R. dan Time');
 const strengths=[];
 if(sv!==null && sv>=.8)strengths.push('Synchronicity memenuhi ambang');
 if(cv!==null && cv>=.7)strengths.push('Coherence memenuhi ambang');
 if(h && h.status_dasar==='positif')strengths.push('Harani '+r.h+' memiliki klasifikasi dasar positif');
 const conclusion=signals.length?
   'Ada '+signals.length+' indikator perhatian. Ini tidak mengubah klasifikasi dasar Harani dan bukan ukuran risiko kejadian nyata.':
   'Tidak ada indikator perhatian dari tiga pemeriksaan yang tersedia. Ini bukan jaminan hasil kehidupan.';
 const html=`<div class="card combined-reading" id="combinedReading">
 <h2>Ringkasan Interpretasi · ${safe(r.n)}</h2>
 <p class="note">Pembacaan simbolik berdasarkan metode SCS, bukan prediksi ilmiah.</p>
 <h3>Indikator Platinum</h3>
 <div class="reading-status platinum-metrics">
 <span><small>Harani</small><b>${safe(r.h)}</b><small>${h?safe(h.status_dasar):'Belum ada klasifikasi'}</small></span>
 <span><small>A.R.</small><b>${safe(r.a)}</b></span>
 <span><small>Time</small><b>${safe(r.t)}</b></span>
 <span><small>F / M / E / I</small><b>${safe(r.catur.join(' / '))}</b></span>
 <span><small>Catur reduced</small><b>${safe(r.cReduced.join(' / '))}</b></span>
 <span><small>f</small><b>${safe(r.f.toFixed(1))}</b></span>
 <span><small>c.i</small><b>${safe(r.ci)}</b></span>
 <span><small>Synchronicity (SV)</small><b>${safe(r.sv)}</b></span>
 <span><small>Coherence (CV)</small><b>${safe(r.cv)}</b></span>
 <span><small>Besar</small><b>${safe(r.besar)}</b></span>
 <span><small>Kecil</small><b>${safe(r.kecil)}</b></span>
 <span><small>Obstacle 3</small><b>${o?'O:3':'Tidak terdeteksi'}</b></span>
 <span><small>Synergy</small><b class="unverified">Belum tervalidasi</b></span>
 <span><small>Productive</small><b class="unverified">Belum tervalidasi</b></span>
 <span><small>Momentum Stream</small><b class="unverified">Belum tervalidasi</b></span>
 <span><small>Vitranta</small><b class="unverified">Belum tervalidasi</b></span>
 </div>
 <h3>Gambaran struktur</h3>
 <p>${h?'Harani: '+safe(h.fase_pendek)+'. ':''}${a?'Acoustic Root: '+safe(a.arti)+'. ':''}${t?'Time: '+safe(t.kekuatan)+'.':''}</p>
 ${strengths.length?'<h3>Aspek pendukung</h3><ul>'+strengths.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':''}
 ${signals.length?'<h3>Indikator perhatian</h3><ul>'+signals.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':'<p><b>Indikator perhatian:</b> tidak ditemukan pada SV, CV, dan O:3 yang diperiksa.</p>'}

 <details class="deep-analysis"><summary>Analisis Mendalam · buka rincian lengkap</summary><div id="avetraDeepContent"></div></details>
 <p class="note"><a href="${safe(d.sources.dasar)}" target="_blank" rel="noopener noreferrer">Referensi Arkand Bagian 1</a> · <a href="${safe(d.sources.detail)}" target="_blank" rel="noopener noreferrer">Bagian 2</a></p>
 </div>`;
 return html;
}
function run(){
 const name=document.getElementById('pname')?.value.trim(),date=document.getElementById('pdob')?.value;
 if(!name||!date)return;
 const sex=Number(document.getElementById('psex').value);
 const a=acousticRoot(name),t=time(date),h=harani(name),c=caturPersonal(name);
 const besar=red(a+t,[11,13,14,16]),kecil=red(Math.abs((a===22?4:a)-t));
 const cReduced=Object.values(c).map(v=>red(v));
 const f=[0,.8,.9,1,.7,.3][name.trim().split(/\\s+/).length]??.2;
 const hits=Object.values(c).filter(v=>Math.abs(a-v)===3).length;
 const ci=hits===0?1:-hits;
 const sv=synchronicity(besar,kecil,c,sex===3?1:sex),cv=cohPersonal(c,sex===3?1:sex);
 const output=document.getElementById('pout');
 const previous=Array.from(output.children);
 output.insertAdjacentHTML('afterbegin',build({n:name,a,t,h,kecil,besar,sv,cv,catur:Object.values(c),cReduced,f,ci}));
 const deep=document.getElementById('avetraDeepContent');
 if(deep){
  previous.forEach((node,i)=>{
   if(i===0){const heading=document.createElement('h3');heading.textContent='Hasil Perhitungan Personal';deep.appendChild(heading);}
   if(i===1){const heading=document.createElement('h3');heading.textContent='Arti Struktur Nama dan FMEI';deep.appendChild(heading);}
   deep.appendChild(node);
  });
 }
}
const btn=document.getElementById('pcalc');
if(btn)btn.addEventListener('click',run);
})();