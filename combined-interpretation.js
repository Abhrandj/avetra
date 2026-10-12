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
 <h2>Pembacaan Gabungan · ${safe(r.n)}</h2>
 <p class="note">AVETRA v2.3 · Interpretasi simbolik SCS berdasarkan kamus tahap 1. Bukan penilaian medis, prediksi, atau fakta kausal.</p>
 <div class="reading-block"><h3>1. Klasifikasi dasar</h3>
 <p><b>Harani ${safe(r.h)}:</b> ${h?safe(h.status_dasar):'belum terdokumentasi'}. ${h?'Fase pendek: '+safe(h.fase_pendek)+'. Fase panjang: '+safe(h.fase_panjang)+'.':''}</p>
 <p><b>Acoustic Root ${safe(r.a)}:</b> ${a?safe(a.arti):'Belum tersedia'}.</p>
 <p><b>Time ${safe(r.t)}:</b> ${t?safe(t.kekuatan)+'; tantangan: '+safe(t.tantangan):'Belum tersedia'}.</p></div>
 <div class="reading-block"><h3>2. Indikator pendukung</h3>
 <ul>${line('Synchronicity',r.sv+' (ambang dasar ≥ 0,8)')}${line('Coherence',r.cv+' (ambang dasar ≥ 0,7)')}${line('Obstacle 3',o?'O:3 terdeteksi':'Tidak terdeteksi')}</ul></div>
 <div class="reading-block"><h3>3. Pembacaan lintas indikator</h3>
 ${strengths.length?'<p><b>Aspek pendukung:</b></p><ul>'+strengths.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':''}
 ${signals.length?'<p><b>Indikator perhatian:</b></p><ul>'+signals.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':'<p>Belum ada indikator perhatian dari pemeriksaan SV, CV, dan O:3.</p>'}
 <p><b>Kesimpulan terbatas:</b> ${safe(conclusion)}</p></div>
 <details><summary>Dasar pembacaan & keterbatasan</summary>
 <p class="note">Klasifikasi Harani bersifat dasar. SV/CV dibandingkan dengan ambang sumber. O:3 ditentukan dari Kecil = 3. Aturan otomatis untuk mengubah Harani positif menjadi negatif belum terverifikasi. Penyebutan cedera, kehilangan anggota tubuh, penyakit atau kematian dalam tulisan historis tidak dapat digunakan sebagai ramalan.</p>
 <p><a href="${safe(d.sources.dasar)}" target="_blank" rel="noopener noreferrer">Referensi Arkand bagian 1</a> · <a href="${safe(d.sources.detail)}" target="_blank" rel="noopener noreferrer">Bagian 2</a></p></details>
 </div>`;
 return html;
}
function run(){
 const name=document.getElementById('pname')?.value.trim(),date=document.getElementById('pdob')?.value;
 if(!name||!date)return;
 const sex=Number(document.getElementById('psex').value);
 const a=acousticRoot(name),t=time(date),h=harani(name),c=caturPersonal(name);
 const besar=red(a+t,[11,13,14,16]),kecil=red(Math.abs((a===22?4:a)-t));
 const sv=synchronicity(besar,kecil,c,sex===3?1:sex),cv=cohPersonal(c,sex===3?1:sex);
 const output=document.getElementById('pout');
 output.insertAdjacentHTML('beforeend',build({n:name,a,t,h,kecil,sv,cv}));
}
const btn=document.getElementById('pcalc');
if(btn)btn.addEventListener('click',run);
})();