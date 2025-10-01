# Changelog Credit Card Catalogue App

Semua perubahan penting pada aplikasi ini akan didokumentasikan dalam file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan proyek ini mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-01

### Added

- **Fitur CRUD Lengkap**: Implementasi Create, Read, Update, Delete untuk kartu kredit
- **Backend API**:
  - Endpoint GET `/api/cards` untuk mengambil daftar kartu kredit
  - Endpoint POST `/api/cards` untuk menambah kartu kredit baru
  - Endpoint GET `/api/cards/:id` untuk mengambil detail kartu kredit
  - Endpoint PATCH `/api/cards/:id` untuk mengupdate kartu kredit
  - Endpoint DELETE `/api/cards/:id` untuk menghapus kartu kredit
- **Frontend React**:
  - Halaman daftar kartu kredit (`CardList`)
  - Halaman detail kartu kredit (`CardDetail`)
  - Form untuk menambah/mengedit kartu kredit (`CardForm`)
  - Header navigasi (`Header`)
- **Database Schema**:
  - Model `Card` dengan field: id, name, imageUrl, features, description, annualFee, applyLink
  - Timestamp otomatis (createdAt, updatedAt)
- **Validasi Data**:
  - Validasi field wajib (name, imageUrl, description, applyLink)
