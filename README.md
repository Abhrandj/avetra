AVETRA v1.8 • Mobile UI & Interpretation Cleanup

Unggah semua file ZIP ke root repository GitHub Pages, menimpa file lama.
- Satu menu Match & Partner (tanpa duplikasi modul perbandingan lama pada build ini).
- Interpretasi skor dalam Bahasa Indonesia, teks Inggris sumber tetap tersedia di Detail Rekonstruksi.
- Kartu hasil responsif untuk Safari iPhone, input tanggal dan tombol diperjelas.
- FMEI menampilkan nilai asli dan reduksi (contoh Mental 12 → 3).
- Matriks SCS Match dan Partner tidak diubah.
- Koreksi parsing Coherence bertanda seru (mis. "! 0.5 !") pada Match/Partner.
- Service worker cache v1.8-1.

Jika iPhone masih menampilkan tampilan lama, tutup tab Safari lalu buka kembali dan refresh.
Interpretasi numerologi adalah deskripsi metode historis, bukan prediksi ilmiah.

AVETRA v1.9 • Cabalistic Arti Nama
- Tab baru Arti Nama, pembaruan otomatis saat mengetik.
- Tabel huruf historis dan makna terpisah dari mesin Platinum.
- Jumlah langsung dan jumlah per kata, transparan tanpa skor buatan.
- Penguraian total besar dan persentase positif belum direkonstruksi.
- Tidak mengubah modul SCS yang sudah ada.


## v2.0 Penguraian Arti Nama (eksperimental)
- Menampilkan penguraian nilai posisi (mis. 222 = 200 + 20 + 2) dan arti setiap komponen.
- Total >1390 memakai hipotesis pemotongan digit terdepan; belum dikonfirmasi universal.
- Alternatif penguraian hingga tiga komponen yang ada di tabel; pilihan tidak merekonstruksi algoritma asli.
- Simulasi persentase = ceil(jumlah makna positif / jumlah makna tersedia × 100); kategori positif/netral/negatif adalah penilaian editorial awal yang bisa diubah per komponen. BUKAN skor situs asli.
- Tidak mengubah engine SCS/Harani/Match/Partner.
- Validasi referensi: HITLER 222 -> 200+20+2; SUHARTO 529 -> 500+20+9; JONI 699 -> 600+90+9. Angka persentase referensi situs belum direplikasi.
