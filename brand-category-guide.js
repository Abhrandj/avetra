// AVETRA Extended UI guidance only. Does not alter SCS Classic tables or engine.
(function(){
  const field=document.getElementById('btype');
  const guide=document.getElementById('constructionGuide');
  const note=document.getElementById('constructionGuideNote');
  const compare=document.getElementById('compareConstruction');
  if(!field||!guide||!note||!compare)return;
  const mappings={property:19,service:22};
  guide.addEventListener('change',function(){
    if(this.value in mappings){field.value=String(mappings[this.value]);note.textContent='Kategori SCS Classic yang dipilih: '+field.options[field.selectedIndex].text+'. Ini hanya pemetaan pembanding AVETRA, bukan kategori Kontraktor & Konstruksi asli.';}
    else note.textContent='Pilih pendekatan Property atau Service, atau gunakan daftar kategori Classic secara langsung.';
  });
  field.addEventListener('change',function(){if(guide.value){guide.value='';note.textContent='Kategori Classic dipilih langsung. Panduan usaha tidak mengubah hasil perhitungan.';}});
  compare.addEventListener('click',function(){
    const name=document.getElementById('bname').value.trim(),target=document.getElementById('constructionCompareOut');
    if(!name){target.textContent='Isi nama brand terlebih dahulu.';return;}
    const rows=[19,22].map(i=>{const r=brandExact(name,i);return '<tr><td>'+esc(r.type)+'</td><td>'+esc(r.ar)+'</td><td>'+esc(r.coherence)+'</td><td>'+esc(r.ar===11?'Tidak tersedia':r.match)+'</td><td>'+esc(r.ar===11?'Tidak dapat dihitung':r.sellPower)+'</td></tr>';}).join('');
    target.innerHTML='<div class="card"><h3>Perbandingan kategori Classic: '+esc(name)+'</h3><div style="overflow-x:auto"><table style="width:100%;text-align:left;border-spacing:10px"><thead><tr><th>Kategori</th><th>A.R.</th><th>Coherence</th><th>MATCH</th><th>Sell Power</th></tr></thead><tbody>'+rows+'</tbody></table></div><p class="note">Perbandingan dua kategori SCS Classic yang sudah ada. Tidak ada kategori atau matriks baru. Ini bukan prediksi keberhasilan usaha.</p></div>';
  });
})();
