(function(){
const $=id=>document.getElementById(id);
const original=window.lifemap;
function run(){const name=$('lname').value.trim(),date=$('ldob').value;if(!name||!date){$('lout').innerHTML='<div class="card warning">Isi nama dan tanggal lahir terlebih dahulu.</div>';return}try{const v=AVETRA_VITRANTA.vitranta(name);$('vvalues').value=v.join(', ');$('vcalc').click();$('lout').scrollIntoView({behavior:'smooth',block:'start'});}catch(e){$('lout').innerHTML='<div class="card warning">'+e.message+'</div>'}}
$('lcalc').onclick=run;
const old=$('lcalc').closest('.card');const note=old.querySelector('.note');if(note)note.textContent='Masukkan nama (maksimal 9 kata) dan tanggal lahir. Mesin Vitranta menghitung 100 nilai otomatis menggunakan port fungsi Java Platinum asli.';
const manual=$('vvalues').closest('.card');manual.querySelector('h3').textContent='Mode audit: 100 nilai Vitranta manual';manual.querySelector('.note').textContent='Opsional: untuk memeriksa array hasil software lama, tempel 100 angka lalu analisis. Untuk penggunaan biasa, cukup klik Hitung Life Map di atas.';
})();
