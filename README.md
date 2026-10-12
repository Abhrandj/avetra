# AVETRA v2.1 • Obstacle 3

Pembaruan dari AVETRA v2.0. Menambahkan indikator **Obstacle 3 (O:3)** pada Personal / Platinum, tanpa mengubah mesin lain.

## Rumus

- A.R. = acousticRoot(nama), Time = time(tanggal lahir).
- ARk = 4 jika A.R. = 22; selain itu ARk = A.R.
- KecilRaw = abs(ARk - Time).
- Kecil = reduksi digit KecilRaw.
- Jika Kecil = 3, tampilkan **O:3**; selain itu **Tidak terdeteksi**.

## Golden tests dari screenshot

- Kobe Bryant, 1978-08-23: A.R. 5, Time 2, Kecil 3, O:3 tampil.
- Kobe Bean Bryant, 1978-08-23: A.R. 9, Time 2, Kecil 7, O:3 tidak tampil.

## Batas interpretasi

Obstacle 3 merupakan label simbolis sistem Arkand, bukan prediksi cedera, cacat, kecelakaan atau kematian. Semua modul dan keterbatasan AVETRA v2.0 tetap berlaku.

## Deploy

Upload seluruh isi ZIP ke root GitHub Pages, lalu refresh Safari. Cache PWA dinaikkan ke `avetra-v2.1-1`.

---

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


## v2.2: Kamus Interpretasi SCS (Tahap 1)
Tab Kamus SCS berisi 11 Harani, 12 Acoustic Root, 9 Time, ambang Synchronicity/Coherence, dan Obstacle 3. JSON/JS terpisah agar mudah diaudit. Tahap 1 belum mengimplementasikan pembacaan gabungan atau deskripsi tiap nilai SV/CV. Interpretasi historis, bukan prediksi ilmiah.


## v2.3 Interpretation Engine (Tahap 2)
Laporan gabungan di Personal otomatis setelah Hitung Personal. Menunjukkan klasifikasi Harani dasar, A.R., Time, ambang SV/CV, O:3, kekuatan dan indikator perhatian. Tidak mengubah nilai Harani karena indikator merah. Rujukan disertakan. Link sumber berwarna cyan. Semua proses lokal dan offline.


## v2.4 Laporan Terpadu Mobile
Ringkasan Interpretasi ditampilkan lebih dulu. Analisis Mendalam dapat dibuka untuk menampilkan hasil numerik, rumus, arti struktur, FMEI dan sumber tanpa pengulangan di layar utama. Tidak ada perubahan algoritma SCS.


## v2.4.1 — Platinum metrics restored
Ringkasan menampilkan kembali Harani, A.R., Time, F/M/E/I, Catur reduced, f, c.i, Besar, Kecil, SV, CV, dan O:3. Synergy/Productive/Momentum/Vitranta diberi status belum tervalidasi. Detail rumus tetap dalam Analisis Mendalam. Tidak ada perubahan rumus.


## v2.4.2 — Audit f, c.i dan Catur
Personal dan Ringkasan Interpretasi sekarang menggunakan fungsi `personalMetrics` yang sama. Perbaikan penting: pemisahan jumlah kata memakai `/\\s+/` dengan benar; tiga kata menghasilkan f=1.0. c.i dan Catur juga diambil dari sumber hitung yang sama, bukan dihitung dua kali. Synergy/Productive/Momentum/Vitranta tetap diberi status belum tervalidasi, tanpa angka buatan.
