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
 const html=`<div class="card combined-reading clean-analysis" id="combinedReading">
 <h2>Ringkasan Platinum · ${safe(r.n)}</h2>
 <p class="note">Pembacaan simbolik metode SCS, bukan prediksi ilmiah.</p>
 <div class="reading-status platinum-metrics">
 <span><small>Harani</small><b>${safe(r.h)}</b><small>${h?safe(h.status_dasar):'Belum diklasifikasi'}</small></span>
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
 <section class="clean-section" aria-label="Interpretasi nama">
 <h3>Interpretasi Nama</h3>
 <p><b>Harani ${safe(r.h)}</b>: ${h?safe(h.fase_pendek):'Interpretasi belum tersedia'}. ${h?'Fase panjang: '+safe(h.fase_panjang)+'.':''}</p>
 <p><b>Acoustic Root ${safe(r.a)}</b>: ${a?safe(a.arti):'Belum tersedia'}.</p>
 <p><b>Time ${safe(r.t)}</b>: ${t?safe(t.kekuatan):'Belum tersedia'}.</p>
 <p><b>Hubungan indikator:</b> ${sv!==null?'SV '+safe(r.sv):'SV belum tersedia'}, ${cv!==null?'CV '+safe(r.cv):'CV belum tersedia'}; ${signals.length?safe(signals.length+' indikator perhatian dalam pemeriksaan SV, CV, dan O:3.'):'tidak ada indikator perhatian dalam pemeriksaan SV, CV, dan O:3.'}</p>
 <details class="clean-subdetail"><summary>Interpretasi FMEI (Fisik, Mental, Emosi, Intuisi)</summary><div id="avetraFmeiContent"></div></details>
 </section>
 <details class="clean-section clean-accordion" id="avetraDeep"><summary>Analisis Mendalam · langkah perhitungan</summary>
 <div id="avetraDeepContent"></div>
 <details class="clean-subdetail"><summary>Rincian Synergy, Productive & Momentum</summary>${pNotes.length?'<ul>'+pNotes.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':'<p>Hasil agregat belum tersedia.</p>'}</details>
 <details class="clean-subdetail"><summary>Hubungan indikator dan c.i</summary><ul>${cNotes.map(x=>'<li>'+safe(x)+'</li>').join('')}</ul></details>
 </details>
 <details class="clean-section clean-accordion"><summary>Metodologi & Referensi</summary>
 <p>Synergy menghitung nilai Vitranta yang tidak termasuk 11, 13, dan 19. Productive memakai posisi 22–81; Momentum memakai posisi 19–58. Formula ini hasil rekonstruksi dari sampel historis, belum tervalidasi independen sebagai model prediksi.</p>
 <p>Angka tidak dapat digunakan untuk menyimpulkan moralitas, penyakit, kecelakaan, kematian, atau kepastian karier.</p>
 <p><a href="${safe(d.sources.dasar)}" target="_blank" rel="noopener noreferrer">Referensi Arkand Bagian 1</a> · <a href="${safe(d.sources.detail)}" target="_blank" rel="noopener noreferrer">Bagian 2</a></p>
 </details>
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
 // Legacy modules still run first. Extract only their unique content,
 // then replace the output completely to prevent duplicate metric cards.
 const oldCards=Array.from(output.children);
 const original=oldCards.find(n=>n.querySelector('.metrics'));
 const interpretation=oldCards.find(n=>n.querySelector('h2')?.textContent.startsWith('Arti Struktur Nama'));
 const steps=original?.querySelector('details');
 const obstacle=original?.querySelector('.obstacle-panel');
 const methodNote=original?.querySelector('p.note:last-child');
 output.innerHTML=build({n:name,a,t,h,kecil,besar,sv,cv,catur:Object.values(c),cReduced,f,ci,wordCount:m.wordCount,platinum:m.platinum});
 const deepPanel=document.getElementById('avetraDeep');
 if(deepPanel)deepPanel.open=false; // start each new report with the deep analysis collapsed
 const deep=document.getElementById('avetraDeepContent');
 if(deep){
  if(obstacle){const h3=document.createElement('h3');h3.textContent='Obstacle 3 (O:3)';deep.appendChild(h3);deep.appendChild(obstacle);}
  if(steps){
   const h3=document.createElement('h3');h3.textContent='Langkah perhitungan';deep.appendChild(h3);
   // Avoid nested accordions: parent "Analisis Mendalam" already controls visibility.
   Array.from(steps.children).filter(n=>n.tagName!=='SUMMARY').forEach(n=>deep.appendChild(n));
  }
  if(methodNote)deep.appendChild(methodNote);
  if(interpretation){
   const fmei=document.getElementById('avetraFmeiContent');
   if(fmei){
    // The sourced FMEI text is retained only once, in its dedicated panel.
    const headings=Array.from(interpretation.querySelectorAll('h3,h4'));
    const fmeiHeading=headings.find(n=>/FMEI|Composition of Character/i.test(n.textContent));
    if(fmeiHeading){
     let n=fmeiHeading.nextElementSibling;
     while(n && !/Synchronicity dan Coherence/i.test(n.textContent||'')){
      const next=n.nextElementSibling;
      fmei.appendChild(n);
      n=next;
     }
    }
    if(!fmei.children.length)fmei.textContent='Rincian FMEI belum tersedia.';
   }
  }
 }

}
const btn=document.getElementById('pcalc');
if(btn)btn.addEventListener('click',run);
})();