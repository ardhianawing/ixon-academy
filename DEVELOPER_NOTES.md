# IXON Academy — Developer Notes

Catatan sesi development untuk referensi session berikutnya.

---

## Session 1 — 2026-03-14: Backend Foundation (Phase 0-3)

### Yang Dikerjakan
- **Database**: Setup PostgreSQL di VPS production, push Prisma schema → 36 tabel terbuat
- **Auth**: Update `src/lib/auth.ts` — NextAuth connect ke DB nyata via bcrypt (sebelumnya pakai demo accounts)
- **Prisma v7 Adapter**: Update `src/lib/prisma.ts` pakai `PrismaPg` adapter (Prisma v7 tidak support `url` di schema, wajib pakai driver adapter)
- **API Helper**: Buat `src/lib/api.ts` — helper `ok()`, `err()`, `unauthorized()`, `forbidden()`, `notFound()`, `requireAuth()`, `requireRole()`

### API Routes yang Dibuat
| File | Endpoint | Keterangan |
|------|----------|------------|
| `api/auth/register/route.ts` | POST /api/auth/register | Register user baru |
| `api/player/profile/route.ts` | GET/PUT /api/player/profile | Profile player |
| `api/player/dashboard/route.ts` | GET /api/player/dashboard | Dashboard data (player, missions, notifs) |
| `api/player/talent-score/route.ts` | GET /api/player/talent-score | Talent signal scores |
| `api/courses/route.ts` | GET /api/courses | Course catalog + user progress |
| `api/courses/[id]/route.ts` | GET /api/courses/:id | Detail course + modules + lessons |
| `api/lessons/[id]/route.ts` | GET /api/lessons/:id | Detail lesson (gated by tier) |
| `api/lessons/[id]/complete/route.ts` | POST /api/lessons/:id/complete | Mark lesson selesai + update course progress |
| `api/quizzes/[id]/route.ts` | GET /api/quizzes/:id | Soal quiz (tanpa jawaban benar) |
| `api/quizzes/[id]/submit/route.ts` | POST /api/quizzes/:id/submit | Submit jawaban + hitung score |
| `api/posts/route.ts` | GET/POST /api/posts | Community feed (POST: tier SILVER+) |
| `api/posts/[id]/route.ts` | GET /api/posts/:id | Detail post + replies threaded |
| `api/posts/[id]/replies/route.ts` | POST /api/posts/:id/replies | Tambah reply |
| `api/posts/[id]/react/route.ts` | POST /api/posts/:id/react | Toggle reaction |
| `api/posts/[id]/report/route.ts` | POST /api/posts/:id/report | Report post |
| `api/evaluations/submit/route.ts` | POST /api/evaluations/submit | Submit gameplay untuk evaluasi |
| `api/evaluations/my-submissions/route.ts` | GET /api/evaluations/my-submissions | History submission user |
| `api/evaluations/[id]/rate/route.ts` | POST /api/evaluations/:id/rate | Rating review dari coach |
| `api/coach/queue/route.ts` | GET /api/coach/queue | Antrian review coach |
| `api/coach/review/[id]/submit/route.ts` | POST /api/coach/review/:id/submit | Submit review + credit wallet |
| `api/coach/wallet/route.ts` | GET /api/coach/wallet | Saldo & transaksi wallet coach |
| `api/missions/daily/route.ts` | GET /api/missions/daily | Daily missions (auto-assign jika belum ada) |
| `api/missions/[id]/complete/route.ts` | POST /api/missions/:id/complete | Selesaikan mission + award XP |
| `api/wellness/checkin/route.ts` | POST /api/wellness/checkin | Check-in wellness harian |
| `api/wellness/history/route.ts` | GET /api/wellness/history | History wellness |
| `api/events/route.ts` | GET /api/events | List event |
| `api/events/[id]/register/route.ts` | POST /api/events/:id/register | Daftar event (cek tier) |
| `api/scouting/talent-board/route.ts` | GET /api/scouting/talent-board | Talent board (SCOUTING/ADMIN only) |
| `api/leaderboard/route.ts` | GET /api/leaderboard | Leaderboard XP/talent/attitude |
| `api/career/pathways/route.ts` | GET /api/career/pathways | Career pathway catalog |
| `api/career/pathways/[id]/enroll/route.ts` | POST /api/career/pathways/:id/enroll | Enroll pathway |
| `api/notifications/route.ts` | GET /api/notifications | List notifikasi |
| `api/notifications/[id]/read/route.ts` | POST /api/notifications/:id/read | Mark read |
| `api/notifications/read-all/route.ts` | POST /api/notifications/read-all | Mark all read |
| `api/admin/dashboard-stats/route.ts` | GET /api/admin/dashboard-stats | Stats admin dashboard |
| `api/admin/users/route.ts` | GET /api/admin/users | User management + search/filter |
| `api/admin/moderation/queue/route.ts` | GET /api/admin/moderation/queue | Queue laporan komunitas |

### Perubahan Config
- `package.json`: Tambah `@prisma/adapter-pg` dan `pg` sebagai dependencies
- `prisma/schema.prisma`: Tambah `previewFeatures = ["driverAdapters"]` di generator
- `prisma.config.ts`: Hapus import `defineConfig` dari `prisma/config` (tidak tersedia di production image)
- `Dockerfile`: Tambah copy `prisma.config.ts` dan `node_modules/dotenv` ke runner stage
- `docker-compose.dev.yml`: Dibuat untuk dev lokal (postgres + redis dengan port exposed)

### Catatan Teknis Penting
- **Prisma v7**: Tidak support `url` di `schema.prisma`. Wajib pakai `prisma.config.ts` + `PrismaPg` adapter
- **Production build**: Container tidak include `prisma` package (devDep), jadi `prisma.config.ts` tidak boleh import dari `prisma/config`
- **DB di VPS**: PostgreSQL jalan via Docker (`ixon-academy-postgres-1`), credentials di `.env` production
- **Schema push**: Kalau update schema, jalankan dari dalam container: `docker compose exec app npx prisma db push`
- **Disk VPS**: Server 38GB, sempat penuh saat session ini. Rutin `docker builder prune -af` setelah build

---

## Session 2 — 2026-03-14: CI/CD + Seed Data

### Yang Dikerjakan

**CI/CD GitHub Actions:**
- File: `.github/workflows/deploy.yml`
- Trigger: push ke branch `main`
- Flow: git pull → npm install (update lock) → docker compose build → docker compose up -d → image prune
- Secrets yang harus ada di GitHub repo: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`
- VPS perlu di-init sebagai git repo: `git init && git remote add origin ... && git fetch && git reset --hard origin/main`

**Seed Data:**
- Fix `prisma/seed.ts` pakai `PrismaPg` adapter (Prisma v7)
- Tambah user SCOUTING (Scout EVOS)
- Cara jalankan seed di production:
  ```bash
  docker run --rm \
    --network ixon-academy_internal \
    -v $(pwd):/app -w /app \
    -e DATABASE_URL='postgresql://ixon_admin:IxonAcademy2026!@postgres:5432/ixon_academy' \
    node:20-alpine \
    sh -c 'npm install --silent && npx prisma generate && npx tsx prisma/seed.ts'
  ```

**Data yang terseed:**
| Data | Jumlah |
|------|--------|
| Users | 9 (TENSAI, PhoenixBlade, ShadowFF, IXONReaper, AceHunter, Coach Alex, Admin IXON, Scout EVOS, Sari Parent) |
| Games | 2 (MLBB, Free Fire) |
| Players | 5 |
| Courses | 6 (dengan modules, lessons, quizzes) |
| Lessons | 46 |
| Community Posts | 5 (dengan replies & reactions) |
| Events | 3 |
| Daily Missions | 12 |
| Career Pathways | 3 |

**Demo Accounts (semua password: `ixon2026`):**
| Email | Role | Tier |
|-------|------|------|
| tensai@ixon.gg | PLAYER | GOLD |
| phoenix@ixon.gg | PLAYER | PLATINUM |
| shadow@ixon.gg | PLAYER | SILVER |
| reaper@ixon.gg | PLAYER | GOLD |
| ace@ixon.gg | PLAYER | GOLD |
| coach.alex@ixon.gg | COACH | PLATINUM |
| admin@ixon.gg | ADMIN | PLATINUM |
| scout@ixon.gg | SCOUTING | PLATINUM |
| sari.parent@ixon.gg | PARENT | GOLD |

### Belum Dikerjakan (Next Session)
- [ ] `POST /api/auth/forgot-password`
- [ ] `GET /api/user/reputation`
- [ ] `GET /api/user/course-progress`
- [ ] `GET /api/evaluations/:id` (detail satu submission)
- [ ] `GET /api/coach/review/:submissionId` (detail submission untuk coach)
- [ ] `GET /api/coach/performance` (statistik performa coach)
- [ ] `POST /api/coach/wallet/withdraw`
- [ ] `GET /api/events/:id` dan `GET /api/events/:id/results`
- [ ] `POST /api/scouting/shortlist/:playerId`
- [ ] `POST /api/scouting/invite/:playerId`
- [ ] `GET /api/career/pathways/:id`
- [ ] `GET /api/career/certifications`
- [ ] `GET /api/membership/plans` + upgrade/pause/cancel
- [ ] `GET /api/parent/children` + report + progress
- [ ] `PUT /api/admin/users/:id`
- [ ] `POST /api/admin/moderation/:id/action`
- [ ] `GET /api/admin/coaches`, coach applications
- [ ] `GET /api/search`
- [ ] `GET /api/referral/my-code` + stats
- [ ] `GET/PUT /api/settings`
- [ ] Seed data (games, courses, missions, events)
- [ ] Connect frontend pages ke API (replace mock data)
