
const $=id=>document.getElementById(id);
const groups={F:'DMVENW',M:'AJSHQZ',E:'BKTCLUFOX',I:'GPYIR'};
function red(n,p=[]){n=Math.abs(n);while(n>=10&&!p.includes(n))n=String(n).split('').reduce((a,c)=>a+Number(c),0);return n}
function caturPersonal(name){const s=name.toUpperCase();return Object.fromEntries(Object.entries(groups).map(([k,chars])=>[k,[...s].filter(c=>chars.includes(c)).length]))}
function cohPersonal(c,sex){let a=['F','M','E','I'].map(k=>red(c[k]));let cnt=Array(10).fill(0);a.forEach(x=>cnt[x]++);
if(cnt[6]>=3)return '! 0.1 !';if(cnt[5]>=3)return '! 0.2 !';
if(cnt[6]===2&&a[2]===6&&sex===1)return '! 0.3 !';
if(cnt[6]===2&&a[2]===6)return '0.8';
if(cnt[0]>=3)return '! 0.4 !';if(a[0]===5&&a[2]===3)return '! 0.5 !';if(a[2]===6&&sex===1)return '! 0.5 !';if(cnt[0]>=1)return '! 0.6 !';
let mx=Math.max(...cnt);return (mx===1?.7:mx===2?.8:mx===3?.9:1).toFixed(1)}
function time(d){let [y,m,day]=d.split('-').map(Number);return red(day+m+y)}
function harani(n){let a=[...n.toUpperCase().replace(/\s/g,'')].map(c=>LETTER_VALUE[c]||0);if(!a.length)return '';const seed=a.slice();while(a.length<9)a.push(...seed.slice(0,9-a.length));a=a.slice(0,9);let h=[a[0]+8*a[1]+a[2],2*a[3]+7*a[4]+2*a[5],a[6]+8*a[7]+a[8]].map(x=>red(x));return red(h.reduce((x,y)=>x+y,0),[11,13])}
function cards(data){return `<div class="metrics">${data.map(([k,v])=>`<div class="metric"><small>${k}</small><b>${v}</b></div>`).join('')}</div>`}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function personal(){let n=$('pname').value.trim().replace(/\s+/g,' '),d=$('pdob').value,sex=+$('psex').value;if(!n||!d){$('pout').innerHTML='<div class="card warning">Isi nama dan tanggal lahir.</div>';return}
let a=acousticRoot(n),t=time(d),c=caturPersonal(n),co=cohPersonal(c,sex===3?1:sex),h=harani(n),f=[0,.8,.9,1,.7,.3][n.split(' ').length]??.2;
let ci=Object.values(c).filter(x=>Math.abs(a-x)===3).length;ci=ci===0?1:-ci;
let besarRaw=a+t,besar=red(besarRaw,[11,13,14,16]),om=a===22?4:a,kecilRaw=Math.abs(om-t),kecil=red(kecilRaw);
let cReduced=Object.values(c).map(v=>red(v));let components=n.split(' ').map(word=>{let total=[...word.toUpperCase()].reduce((v,ch)=>v+(LETTER_VALUE[ch]||0),0);return {word,total,reduced:[11,22].includes(total)?total:red(total)}});
$('pout').innerHTML=`<div class="card"><h2>${esc(n)}</h2>${cards([['Harani',h],['A.R.',a],['Time',t],['F / M / E / I',Object.values(c).join(' / ')],['Catur reduced',cReduced.join(' / ')],['f',f],['c.i',ci],['Coherence',co],['Besar',besar],['Kecil',kecil]])}<details style="margin-top:16px"><summary style="cursor:pointer;font-weight:700">Lihat langkah perhitungan</summary><p class="note">A.R. per komponen: ${components.map(x=>`${esc(x.word)}: ${x.total} → ${x.reduced}`).join(' · ')}<br>Time: ${esc(d)} → ${t}<br>Besar: ${a} + ${t} = ${besarRaw} → ${besar}<br>Kecil: |${om} − ${t}| = ${kecilRaw} → ${kecil}<br>Catur: ${Object.values(c).join(' / ')} → ${cReduced.join(' / ')}</p></details><p class="note">Synchronicity masih memerlukan porting tabel hitunginName dari Java asli. Vitranta/Synergy/Productive/Momentum untuk nama baru belum diaktifkan. Nilai yang belum tervalidasi tidak diisi otomatis.</p></div>`}

function brand(){let n=$('bname').value.trim(),i=+$('btype').value;if(!n){$('bout').innerHTML='<div class="card warning">Isi nama brand.</div>';return}let r=brandExact(n,i);
$('bout').innerHTML=`<div class="card"><h2>${esc(r.name)}</h2><p class="note">${esc(r.type)}</p>${cards([['A.R.',r.ar],['Coherence',r.coherence],['Match',r.match],['Sell Power',r.sellPower],['F / M / E / I / A',r.caturRaw.join(' / ')],['Reduced Catur',r.caturReduced.join(' / ')],['First 1/4/8 position',r.first184]])}<p class="note">Menggunakan modul BrandName v1.1.2 hasil rekonstruksi bytecode. Bukan jaminan keberhasilan merek.</p></div>`}
function lifemap(){let n=$('lname').value.trim(),d=$('ldob').value;if(!n||!d){$('lout').innerHTML='<div class="card warning">Isi nama dan tanggal lahir.</div>';return}
$('lout').innerHTML=`<div class="card"><h2>${esc(n)}</h2><p>Tanggal lahir: ${esc(d)}</p><p class="warning">Grafik belum tersedia untuk input ini. Mesin Vitranta perlu dipindahkan dari class Java asli agar 100 nilai dihitung, bukan diperkirakan.</p><button id="copytolife">Gunakan di Personal</button></div>`;
$('copytolife').onclick=()=>{$('pname').value=n;$('pdob').value=d;switchTab('personal')}}
function switchTab(tab){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id===tab))}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
SCS_BRAND_CATEGORIES.forEach((name,i)=>{let o=document.createElement('option');o.value=i;o.textContent=name;$('btype').append(o)});
$('pcalc').onclick=personal;$('bcalc').onclick=brand;$('lcalc').onclick=lifemap;
