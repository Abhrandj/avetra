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
 // v2.6: interpretation is descriptive, not a predictive or moral scoring model.
 const plat=r.platinum;
 const pct=v=>typeof v==='number'&&Number.isFinite(v)?v:null;
 const sy=plat?pct(plat.synergy):null,pr=plat?pct(plat.productive):null;
 const raw=plat?pct(plat.momentumRaw):null;
 const pNotes=[];
 if(sy!==null)pNotes.push('Synergy '+sy+'%: '+sy+' dari 100 nilai Vitranta masuk kategori hitungan positif pada mesin rekonstruksi. Angka ini bukan peluang sukses.');
 if(pr!==null)pNotes.push('Productive '+pr+'%: proporsi nilai yang memenuhi kategori hitungan pada rentang 60 posisi Vitranta, dibulatkan ke bawah. Bukan ukuran produktivitas kerja.');
 if(raw!==null)pNotes.push('Momentum Stream '+String(plat.momentum)+': rata-rata bobot 40 posisi Vitranta adalah '+raw.toFixed(5)+'. Tampilan +1 merupakan batas atas pada rumus, bukan jaminan hasil.');
 const cNotes=[];
 if(r.ci<0)cNotes.push('c.i '+r.ci+' berasal dari '+Math.abs(r.ci)+' kecocokan selisih 3 antara A.R. dan Catur mentah. Tanda minus adalah konvensi perhitungan, bukan diagnosis.');
 else cNotes.push('c.i '+r.ci+' berasal dari tidak ditemukannya kecocokan selisih 3 pada perhitungan Catur.');
 if(o)cNotes.push('O:3 muncul karena nilai Kecil tereduksi menjadi 3. Ini bukan prediksi cedera atau kehilangan bagian tubuh.');
 if(sv!==null&&cv!==null)cNotes.push('SV dan CV diperiksa terpisah; nilai tinggi pada satu indikator tidak membatalkan indikator perhatian lain.');
 const interpretHtml=`<section class="reading-block platinum-reading">
 <h3>Pembacaan Gabungan Platinum</h3>
 <p><b>Harani ${safe(r.h)}</b> memiliki klasifikasi dasar ${h?safe(h.status_dasar):'belum terdokumentasi'} dalam kamus yang tersedia. Klasifikasi dasar tidak berubah otomatis karena nilai indikator lain.</p>
 <h4>Synergy, Productive & Momentum</h4>
 ${pNotes.length?'<ul>'+pNotes.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':'<p>Hasil agregat belum tersedia untuk nama ini.</p>'}
 <h4>Hubungan indikator</h4><ul>${cNotes.map(x=>'<li>'+safe(x)+'</li>').join('')}</ul>
 <p><b>Indikator perhatian terdeteksi:</b> ${safe(String(signals.length))} dari SV, CV dan O:3 yang diperiksa. ${signals.length?'Perlu dibaca bersama klasifikasi dasar, bukan sebagai ramalan.':'Tidak ada sinyal perhatian pada tiga pemeriksaan tersebut; bukan berarti semua aspek kehidupan bebas tantangan.'}</p>
 <details><summary>Metode dan batas interpretasi</summary><p>Synergy menghitung jumlah 100 nilai Vitranta yang tidak termasuk 11, 13, dan 19. Productive memakai posisi 22–81 (60 nilai), dibulatkan ke bawah. Momentum memakai bobot pada posisi 19–58 (40 nilai). Ketiganya hasil rekonstruksi yang cocok pada sejumlah sampel historis, belum tervalidasi secara independen sebagai model prediksi.</p><p>Angka dan simbol tidak dapat digunakan untuk menyimpulkan moralitas, penyakit, kecelakaan, kematian, atau kepastian karier seseorang.</p></details>
 </section>`;
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
 <span><small>f · ${safe(r.wordCount)} kata</small><b>${safe(r.f.toFixed(1))}</b></span>
 <span><small>c.i</small><b>${safe(r.ci)}</b></span>
 <span><small>Synchronicity (SV)</small><b>${safe(r.sv)}</b></span>
 <span><small>Coherence (CV)</small><b>${safe(r.cv)}</b></span>
 <span><small>Besar</small><b>${safe(r.besar)}</b></span>
 <span><small>Kecil</small><b>${safe(r.kecil)}</b></span>
 <span><small>Obstacle 3</small><b>${o?'O:3':'Tidak terdeteksi'}</b></span>
 <span><small>Synergy</small><b>${r.platinum?safe(r.platinum.synergy)+"%":"Tidak tersedia"}</b></span>
 <span><small>Productive</small><b>${r.platinum?safe(r.platinum.productive)+"%":"Tidak tersedia"}</b></span>
 <span><small>Momentum Stream</small><b>${r.platinum?safe(r.platinum.momentum):"Tidak tersedia"}</b></span>
 <span><small>Vitranta</small><b>${r.platinum?"100 nilai dihitung":"Tidak tersedia"}</b></span>
 </div>
 <p class="note">Synergy, Productive, dan Momentum dihitung dari array Vitranta 100 tahun hasil rekonstruksi. Cocok dengan contoh historis yang diuji, tetapi bukan ukuran keberhasilan hidup.</p>
 ${interpretHtml}\n <h3>Gambaran struktur</h3>
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
 const m=personalMetrics(name,date,sex);
 const {a,t,h,c,besar,kecil,cReduced,f,ci,sv,co:cv}=m;
 const output=document.getElementById('pout');
 const previous=Array.from(output.children);
 output.insertAdjacentHTML('afterbegin',build({n:name,a,t,h,kecil,besar,sv,cv,catur:Object.values(c),cReduced,f,ci,wordCount:m.wordCount,platinum:m.platinum}));
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