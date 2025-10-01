# Credit Card Catalogue App (CRUD Node.js + React + PostgresSQL)

## Judul Project

Credit Card Catalogue App (CRUD Node.js + React + PostgresSQL)

## Deskripsi Singkat

Aplikasi ini menampilkan informasi kartu kredit dari berbagai bank/institusi, termasuk fitur, biaya tahunan, dan keterangan lebih lanjut.

Tech Stack: Node.js Express sebagai backend, React sebagai frontend, serta Prisma sebagi ORM dan PostgresSQL sebagai database.

### Lingkup Unit Kompetensi yang Didukung

- Membuat Kode Program Sesuai Spesifikasi
- Menggunakan SQL (atau query DB setara)
- Membuat Aplikasi User Interface pada Aplikasi Web
- Melakukan Debugging
- Melakukan Pengujian Program
- Menggunakan Library/Framework Pemrograman

### Langkah Instalasi & Menjalankan Aplikasi

Prasyarat

- Node.js (v20+)
- PostgresSQL (v14+)

Setup Server

```bash
cd server
npm install
cp .env.example .env

npx prisma db push
npx prisma generate
npx prisma db seed

npm run start
```

Setup Client

```bash
cd client
npm install
cp .env.example .env

npm run start
```

### Struktur Project

- server  → API Node.js Express
- server/prisma → Database Schema
- client  → UI React
- client/src/components  → Reusable UI Components
- client/src/pages  → Page Components

### Cara Uji Aplikasi

Uji API:

- GET: <http://localhost:5000/api/cards> → ambil list kartu kredit
- POST: <http://localhost:5000/api/cards> → tambah kartu kredit baru
- GET: <http://localhost:5000/api/cards/:id> → ambil detail kartu kredit
- PATCH: <http://localhost:5000/api/cards/:id> → update kartu kredit
- DELETE: <http://localhost:5000/api/cards/:id> → hapus kartu kredit

Uji UI:

- Buka <http://localhost:3000>
- Lihat daftar kartu kredit
- Mencoba melakukan operasi CRUD
