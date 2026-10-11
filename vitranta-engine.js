/* AVETRA v1.5: direct Java bytecode reconstruction.
   SCSClass.cekVirac repeats letter's Pythagorean value that many times,
   then cycles the expanded sequence over 100 positions.
   hitungVitranta sums each word's sequence and reduces preserving 11/13/14/16/19/22.
   The year passed to cekVirac is unused in original bytecode. */
(function(){
const allowed=new Set([11,13,14,16,19,22]);
const letterValue=c=>{let n=c.charCodeAt(0)-65;return n>=0&&n<26?(n%9)+1:0};
function reduce(n){while(n>9&&!allowed.has(n))n=String(n).split('').reduce((a,d)=>a+(+d),0);return n}
function vitra(name){
 const words=name.trim().toUpperCase().split(/\s+/).filter(Boolean);
 if(!words.length||words.length>9)throw Error('Gunakan 1 sampai 9 komponen nama.');
 if(words.some(w=>!/^[A-Z]+$/.test(w)))throw Error('Nama hanya boleh berisi huruf A–Z dan spasi.');
 const cycles=words.map(w=>[...w].flatMap(c=>Array(letterValue(c)).fill(letterValue(c))));
 return Array.from({length:100},(_,i)=>reduce(cycles.reduce((sum,cycle)=>sum+cycle[i%cycle.length],0)));
}
window.AVETRA_VITRANTA=vitra;
const btn=document.getElementById('lcalc');
btn.onclick=function(){
 const name=document.getElementById('lname').value.trim(),dob=document.getElementById('ldob').value;
 if(!name||!dob){document.getElementById('lout').innerHTML='<div class="card warning">Masukkan nama dan tanggal lahir terlebih dahulu.</div>';return}
 try{
 const vals=vitra(name);
 document.getElementById('vvalues').value=vals.join(', ');
 document.getElementById('vcalc').click();
 }catch(e){document.getElementById('lout').innerHTML='<div class="card warning">'+e.message+'</div>'}
};
})();
