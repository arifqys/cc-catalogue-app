# Log Debugging Credit Card Catalogue App

## Log Error Backend (Node.js)

### 1. Database Connection Error

**Error:**

```bash
Error: Can't reach database server at localhost:5432

Please make sure your database server is running at localhost:5432.
```

**Penyebab:**

- PostgreSQL server tidak berjalan
- Konfigurasi DATABASE_URL salah
- Port 5432 tidak tersedia

**Solusi:**

```bash
# 1. Start PostgreSQL service
brew services start postgresql
# atau
sudo service postgresql start

# 2. Check DATABASE_URL in .env
DATABASE_URL="postgresql://username:password@localhost:5432/cc_catalogue"

# 3. Test connection
npx prisma db push
```

### 2. Prisma Schema Error

**Error:**

```bash
Error: Schema validation error
Field "Card" at line 10: The field `id` is required but missing.
```

**Penyebab:**

- Schema tidak sinkron dengan database
- Migration belum dijalankan

**Solusi:**

```bash
# 1. Reset database
npx prisma db push --force-reset

# 2. Generate Prisma client
npx prisma generate

# 3. Seed database
npx prisma db seed
```

## Log Error Frontend (React)

### 1. API Connection Error

**Error:**

```bash
Error: Network Error
    at createError (axios.js:1234)
    at XMLHttpRequest.handleError (axios.js:1234)
```

**Penyebab:**

- Backend server tidak berjalan
- URL API salah
- Network connectivity issue

**Solusi:**

- Cek env REACT_APP_API_BASE_URL dan pastikan server berjalan