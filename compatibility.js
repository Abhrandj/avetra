// AVETRA 1.7: deterministic reconstructions of Arkand SCS Match 1.1.0 and Partner 1.0.0.
(function(){
'use strict';
const $=id=>document.getElementById(id);
const MATCH=[[70, 70, 70, 10, 10, 70, 70, 40, 70], [80, 100, 50, 70, 10, 100, 70, 90, 100], [70, 40, 10, 40, 70, 90, 40, 10, 100], [10, 80, 40, 100, 40, 100, 70, 70, 70], [10, 70, 70, 30, 10, 40, 50, 60, 40], [70, 100, 100, 100, 40, 100, 40, 40, 100], [70, 70, 40, 70, 40, 40, 100, 40, 100], [30, 40, 10, 70, 60, 40, 40, 30, 40], [70, 100, 100, 70, 60, 90, 100, 30, 100]];
const HIGH=[[90, 100, 100, 80, 50, 100, 90, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100], [90, 100, 100, 90, 100, 100, 100, 100, 100], [80, 100, 90, 100, 70, 100, 100, 100, 100], [50, 100, 100, 70, 60, 100, 80, 100, 100], [100, 100, 100, 100, 100, 100, 90, 100, 80], [90, 100, 100, 100, 80, 90, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 60], [100, 100, 100, 100, 100, 80, 100, 60, 100]];
const LOW=[[65, 65, 65, 65, 40, 65, 65, 65, 65], [65, 65, 65, 65, 65, 65, 65, 65, 65], [65, 65, 65, 65, 65, 65, 65, 65, 65], [65, 65, 65, 65, 60, 65, 65, 65, 65], [40, 65, 65, 60, 50, 65, 65, 65, 65], [65, 65, 65, 65, 65, 65, 65, 65, 65], [65, 65, 65, 65, 65, 65, 65, 65, 65], [65, 65, 65, 65, 65, 65, 65, 65, 50], [65, 65, 65, 65, 65, 65, 65, 50, 65]];
const MESSAGES={
  0:['Worst','Negative couple. Deteriorating health and finance. Generates painful feelings.'],
  10:['Worst','Negative couple. Deteriorating health and finance. Generates painful feelings.'],
  20:['Worse','Negative couple. Generates painful feelings.'],
  30:['Worse','Negative couple. Generates painful feelings.'],
  40:['Hard','Hard to keep a long lasting marriage. Generates painful feelings.'],
  50:['Hard','Hard to keep a long lasting marriage. Generates painful feelings.'],
  60:['Good','Good couple.'],70:['Good','Good couple.'],80:['Good','Good couple.'],
  90:['Ideal','Ideal couple.'],100:['Best - Ideal','Best and Ideal couple.']
};
const PARTNER_MESSAGES={
  40:['Worst','No understanding nor positive synergy. Betrayal. Lost opportunity.'],
  50:['Worse','No understanding nor positive synergy. Lost opportunity.'],
  60:['Hard','It is hard to build an understanding and positive synergy. Lost opportunity.'],
  65:['Little Good','A good understanding between these persons. Low profit opportunity.'],
  70:['Good','A good understanding between these persons. High profit opportunity.'],
  80:['Good','A good understanding between these persons. High profit opportunity.'],
  90:['Ideal','An ideal synergy. Both support each other. High profit opportunity.'],
  100:['Best - Ideal','Best and Ideal synergy. Both support each other. High profit opportunity.']
};
const escapeHtml=x=>String(x).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function getPerson(k){
 const name=$('name'+k).value.trim(),dob=$('dob'+k).value,sex=+$('sex'+k).value;
 if(!dob||name.length<4)throw Error('Isi nama masing-masing minimal 4 karakter dan tanggal lahir.');
 const c=caturPersonal(name),coh=Number(cohPersonal(c,sex)),t=time(dob);
 if(!Number.isFinite(coh)||!Number.isInteger(t)||t<1||t>9)throw Error('Time atau Coherence belum valid untuk input ini.');
 return {name,dob,sex,coh,t};
}
function run(mode){
 const out=$('compatOut');try{
 const a=getPerson('A'),b=getPerson('B');
 const male=a.sex===0?a:b,female=a.sex===0?b:a;
 const isMatch=mode==='match';
 const band=(male.coh>=.6||female.coh>=.6)?'HIGH':'LOW';
 const score=isMatch?(a.sex===b.sex?0:MATCH[male.t-1][female.t-1]):(band==='HIGH'?HIGH:LOW)[male.t-1][female.t-1];
 const [classification,meaning]=(isMatch?MESSAGES:PARTNER_MESSAGES)[score]||['Tidak tersedia','Tidak tersedia'];
 const extra=score<=50?"Universe is running in a fix grand system. Please don't try to against it. Wise is a man who synchronized with nature.":isMatch?'Having the propitious time to do marriage is one of the secrets of a happy family.':'Having the propitious time to do any activity is one of the secret to generate high profit';
 out.innerHTML=`<div class="card"><span class="badge">${isMatch?'SCS MATCH v1.1.0':'SCS PARTNER v1.0.0'}</span><h2>${escapeHtml(a.name)} &amp; ${escapeHtml(b.name)}</h2><div class="result">${score}% · ${escapeHtml(classification)}</div><p>${escapeHtml(meaning)}</p><p class="note">${escapeHtml(extra)}</p><div class="metrics"><div class="metric">Time Male<b>${male.t}</b></div><div class="metric">Time Female<b>${female.t}</b></div><div class="metric">Matriks<b>${isMatch?'MATCH':band}</b></div><div class="metric">Coherence A<b>${a.coh}</b></div><div class="metric">Coherence B<b>${b.coh}</b></div></div><details><summary>Detail rekonstruksi</summary><p>Lookup baris Time Male ${male.t}, kolom Time Female ${female.t}. ${isMatch?'Match memakai satu matriks 9×9; Coherence tidak menentukan skor.':'Partner memakai matriks '+band+' berdasarkan aturan salah satu Coherence ≥ 0,6.'} ${isMatch&&a.sex===b.sex?'Override 0% untuk input dengan sex sama sesuai UI versi asli.':''}</p></details><p class="note">Skor mereproduksi aturan perangkat lunak lama, bukan probabilitas keberhasilan hubungan, keuntungan, atau kesehatan.</p></div>`;
 }catch(e){out.innerHTML=`<div class="card warning">${escapeHtml(e.message)}</div>`}
}
const section=document.createElement('section');section.className='panel';section.id='compatibility';
section.innerHTML=`<div class="card"><h2>SCS Match & Partner</h2><p class="note">Dua engine hasil rekonstruksi bytecode Arkand. Match untuk pasangan; Partner untuk sinergi kerja sama. Interpretasi historis, bukan prediksi ilmiah.</p><div class="grid"><div><h3>Orang A</h3><label for="nameA">Nama</label><input id="nameA" placeholder="Minimal 4 karakter"><label for="dobA">Tanggal lahir</label><input id="dobA" type="date"><label for="sexA">Jenis kelamin</label><select id="sexA"><option value="0">Male</option><option value="1">Female</option></select></div><div><h3>Orang B</h3><label for="nameB">Nama</label><input id="nameB" placeholder="Minimal 4 karakter"><label for="dobB">Tanggal lahir</label><input id="dobB" type="date"><label for="sexB">Jenis kelamin</label><select id="sexB"><option value="1">Female</option><option value="0">Male</option></select></div></div><div class="actions"><button class="go" id="runMatch">Hitung SCS Match</button><button class="go" id="runPartner">Hitung SCS Partner</button><button id="copyPersonal">Salin input Personal ke A</button></div></div><div id="compatOut" aria-live="polite"></div>`;
$('lifemap').after(section);
const tab=document.createElement('button');tab.className='tab';tab.dataset.tab='compatibility';tab.textContent='Match & Partner';document.querySelector('.tabs').append(tab);tab.onclick=()=>switchTab('compatibility');
$('runMatch').onclick=()=>run('match');$('runPartner').onclick=()=>run('partner');
$('copyPersonal').onclick=()=>{$('nameA').value=$('pname').value;$('dobA').value=$('pdob').value;$('sexA').value=$('psex').value==='1'?'1':'0'};
window.AVETRACompatibility={MATCH,HIGH,LOW};
})();
