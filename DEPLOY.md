# Handoff deploy Elsewhere

## Konfigurasi yang sudah disiapkan

- Supabase: `ousvoecocjewzqnznnlw`.
- WhatsApp Business: `6287890345028`.
- Malaysia trip: kargo fashion dan non-fashion Rp90.000/kg.
- Semua varian existing dan varian baru: preorder tanpa batas. Status trip dan publikasi produk tetap harus diaktifkan oleh owner/editor.
- Kurs otomatis: job Supabase mengecek setiap jam (menit 7), sumber gratis memperbarui data harian. Pesanan lama menyimpan harga saat checkout.

## Sebelum mengubah database

Simpan backup database dari Supabase/pg_dump, termasuk schema, policies dan data. Salin juga objek Storage bila membutuhkan pemulihan file. Jangan commit backup, `.env.local`, database password atau service-role key. Export hasil query JSON saja bukan pengganti backup database penuh.

Perubahan ini belum diterapkan ke database live. Jangan menjalankan migrasi pertama jauh sebelum deploy: migrasi mencabut akses tabel mentah anonymous yang digunakan frontend lama.

## Urutan aktivasi

1. Gabungkan branch integrasi ke repository/branch yang dipakai project Vercel temanmu. Pastikan Vercel mengakses repository tersebut.
2. Siapkan environment Vercel (Production dan Preview jika dipakai):
   - `VITE_SUPABASE_URL=https://ousvoecocjewzqnznnlw.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: salin publishable key dari Supabase Project Settings → API Keys. Jangan gunakan secret/service-role key.
   - `VITE_WHATSAPP_NUMBER=6287890345028`
3. Gunakan konfigurasi `vercel.json`: build `npm run build:vercel`, output `dist-vercel`, Node 22.13+; jangan pilih preset Next.js. Environment dibaca saat build, jadi rebuild bila berubah.
4. Saat siap deploy, admin Supabase menjalankan file berikut satu per satu dalam urutan ini melalui SQL Editor. Hentikan bila ada error:
   - `supabase/migrations/202609120001_commerce.sql`
   - `supabase/migrations/202609130001_preorder_and_rates.sql`
   - `supabase/migrations/202609130002_scheduled_rates.sql`
   File terakhir mengaktifkan HTTP dan pg_cron, membuat dua jadwal, lalu mengambil kurs pertama. Setup dibatalkan jika kurs Malaysia tidak tersedia; perbaiki penyebab lalu ulangi file terakhir. Jangan mengulangi migrasi yang sudah berhasil.
5. Deploy frontend yang cocok segera setelah migrasi; atur Supabase Auth Site URL ke domain live dan Redirect URLs untuk `/dashboard` agar reset password kembali ke dashboard.
6. Login sebagai owner/editor, pilih Malaysia trip, ubah Planning ke Open PO. Pastikan produk Ready sudah dipublish dan varian aktif dengan harga/berat benar. Migrasi tidak mempublikasikan draft secara otomatis.

## Verifikasi setelah deploy

Di SQL Editor admin:

```sql
select public.commerce_rate_status('MYR');
select jobname, schedule, active from cron.job
where jobname in ('elsewhere-hourly-rates','elsewhere-expire-unpaid');
select j.jobname, d.status, d.return_message, d.start_time
from cron.job_run_details d join cron.job j on j.jobid=d.jobid
where j.jobname like 'elsewhere-%'
order by d.start_time desc limit 10;
```

Rate harus positif, timestamp sumber belum lewat 48 jam dan kedua job aktif. Riwayat job baru muncul setelah jadwal berjalan. Bila refresh gagal, cek peringatan/error provider; refresh bisa dicoba admin dengan `select public.commerce_refresh_rates();`.

Buka `/` tanpa login, pesan varian preorder stok nol, pastikan pesanan muncul di `/dashboard`. Coba ulang permintaan yang sama saat jaringan gagal: tidak boleh membuat duplikat. Catat lalu verifikasi pembayaran; konfirmasi, beli, tiba, kemas, lunasi dan isi kurir/resi sebelum kirim. Gunakan data uji yang bisa direkonsiliasi, jangan menghapus catatan pembayaran terverifikasi. Pastikan akun nonmember tidak bisa melihat pesanan atau receipt.

## Batasan dan rollback

`npm test`, `npm run typecheck`, dan `npm run build:vercel` memverifikasi source. Tes database memakai PGlite dengan auth/storage dan HTTP/cron stand-in; koneksi provider serta ekstensi dan scheduler Supabase tetap perlu diverifikasi live. Tes ini tidak membuktikan konkurensi multi-session PostgreSQL.

Pembatasan pesanan: 3/nomor/15 menit, 10/nomor/24 jam, 60 total/menit. Pesanan baru tanpa catatan pembayaran dibatalkan setelah 48 jam pada jadwal per jam. Ini bukan CAPTCHA. Pembayaran dan resi masih manual, ongkir domestik dikonfirmasi terpisah.

Untuk rollback, hentikan checkout, simpan semua pesanan/pembayaran baru dan rekonsiliasi sebelum memulihkan schema/policies dari backup. Jangan drop tabel transaksi. Frontend lama saja tidak cocok dengan policies baru. Admin dapat menonaktifkan job melalui `cron.unschedule('elsewhere-hourly-rates')` dan `cron.unschedule('elsewhere-expire-unpaid')`; kurs otomatis tidak akan refresh dan checkout berhenti setelah kurs terlalu lama.
