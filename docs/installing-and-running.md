# Installation

---

## Table of Contents

- [Installation](#installation)
  - [Table of Contents](#table-of-contents)
  - [Comfortable development](#comfortable-development)
  - [Quick run](#quick-run)
  - [Links](#links)

---

## Comfortable development

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/FamManh/locaze.git
   ```

1. Go to apps folder, and copy `.env-example` as `.env`.

   ```bash
   cd locaze/apps/server
   cp .env.example .env

   cd locaze/apps/web
   cp .env.example .env
   ```

1. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

   Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

1. Run additional container:

   ```bash
   pnpm db:up
   ```

1. Install dependency

   ```bash
   pnpm install
   ```

1. Run migrations

   ```bash
   pnpm migration:run
   ```

1. Run seeds

   ```bash
   pnpm seed:run
   ```

1. Run app in dev mode

   ```bash
   pnpm start:dev
   ```

1. Open http://localhost:6868

---

## Quick run

If you want quick run your app, you can use following commands:

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/FamManh/locaze.git
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd locaze
   cp .env.example .env
   ```

1. Run containers

   ```bash
   docker compose up -d
   ```

1. For check status run

   ```bash
   docker compose logs
   ```

1. Open http://localhost:6868

---

## Links

- Swagger (API docs): http://localhost:6868/api/docs
- Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080

---
