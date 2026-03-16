# IXON.TRB ACADEMY — Step-by-Step Development Guide

**Untuk digunakan dengan Claude Code**
**Tech Stack:** Next.js 14 (App Router) + TypeScript + Prisma + PostgreSQL + Redis + Socket.io + Tailwind/Shadcn
**Games:** MLBB + Free Fire
**Referensi lengkap:** IXON Academy - Development Plan.md (2.787 baris, 32 page specs)

---

## CARA PAKAI

Setiap step di bawah ini adalah 1 sesi Claude Code. Copy prompt-nya, jalankan, test, lalu lanjut ke step berikutnya. Jangan skip — setiap step bergantung pada step sebelumnya.

**Sebelum mulai:** Pastikan Development Plan (.md) ada di project root sebagai referensi. Claude Code bisa membacanya saat butuh detail spesifik.

---

## PHASE 0: FOUNDATION (Week 1-2)

### Step 0.1 — Project Init & Docker

```
Buat project Next.js 14 (App Router) dengan TypeScript untuk IXON.TRB Academy.
Setup Docker Compose dengan service: nextjs, postgresql, redis, nginx.

Tech stack:
- Next.js 14+ App Router
- TypeScript strict mode
- PostgreSQL 16
- Redis 7
- Nginx reverse proxy

Buat docker-compose.yml, Dockerfile, nginx/conf.d/ixon.conf.
Pastikan `docker compose up` berjalan dan Next.js bisa diakses di localhost.

Referensi: Section 2.2 di Development Plan untuk Docker architecture.
```

### Step 0.2 — Design System & UI Foundation

```
Setup design system IXON.TRB Academy:

1. Install & config Tailwind CSS + Shadcn/UI
2. Buat file design tokens:
   - Colors: Dark Blue (#0A0F1C) primary, Gold (#C8A94E) accent, Silver accents
   - ROG Armoury Crate aesthetic — futuristik, gelap, premium
3. Buat layout components:
   - MainLayout (sidebar desktop, bottom nav mobile)
   - Navbar (logo IXON.TRB, game switcher placeholder, user menu)
   - Sidebar (navigation items per role)
   - PageShell (header + content area)
4. Responsive breakpoints: mobile-first (375px → 768px → 1024px → 1440px)
5. Install Framer Motion untuk animasi, Recharts untuk charts, Lucide untuk icons

Referensi: Section 3 di Development Plan untuk color palette, typography, spacing.
```

### Step 0.3 — Prisma Schema & Database

```
Setup Prisma ORM dengan PostgreSQL untuk IXON.TRB Academy.

Buat schema.prisma dengan tabel:
- User (id, name, email, phone, password, role, tier, gameId, createdAt)
- Player (userId, nickname, rank, role, heroPool, attitudeScore, talentScore, gameId)
- Game (id, title, slug, status) — seed: MLBB + Free Fire
- Subscription (userId, tier: FREE/SILVER/GOLD/PLATINUM, startDate, endDate, status)
- Course, Module, Lesson, Quiz, QuizAttempt
- CommunityPost, Comment, Reaction, Report
- Evaluation, CoachReview (rubricScores JSON, feedbackText, improvementPlan)
- CoachWallet (balance, totalEarned)
- Event, EventRegistration
- TalentBoard (talentScore, skillSignal, mindsetSignal, commitmentSignal)
- DailyMission, MissionCompletion, Badge, UserBadge
- Referral (referrerId, refereeId, code, status, rewardGiven)
- MentorProfile, MentorSession
- Notification

Jalankan: npx prisma migrate dev --name init
Buat seed.ts dengan mock data (5 players, 6 courses, 5 community posts, 3 events, 3 mentors).

Penting: Semua modul game-specific harus punya relasi ke Game model (gameId). 
Filter by game harus ada di setiap query.

Referensi: Section 4 di Development Plan untuk full schema + Section 9 untuk mock data.
```

### Step 0.4 — Auth System

```
Setup NextAuth.js v5 untuk IXON.TRB Academy.

1. Credentials provider (phone/email + password)
2. Register flow 4 langkah:
   - Step 1: Nama asli + email + password
   - Step 2: Nomor HP + OTP verification (mock OTP untuk dev: selalu "123456")
   - Step 3: Pilih game (MLBB / Free Fire) + nickname + rank + role
   - Step 4: Agreement (ToS + Privacy Policy checkbox)
3. Login page (email/phone + password)
4. Session management: role-based (PLAYER, COACH, SCOUTING, ADMIN, PARENT)
5. Middleware: protect routes berdasarkan role dan tier
6. Halaman: /register, /verify-otp, /login, /logout

UX message di register: "Identitas asli diperlukan karena setiap data pemain dapat menjadi bagian dari proses scouting dan trial profesional."

Referensi: Section 5.2 di Development Plan untuk auth page spec.
```

### Step 0.5 — Landing Page

```
Buat landing page IXON.TRB Academy di route / (root).

Sections:
1. Hero: "Dari Gamer Menjadi Profesional" — CTA Register + demo video placeholder
2. "Mengapa IXON.TRB?" — 4 cards: Kurikulum Terstruktur, Evaluasi Coach Pro, Scouting Berbasis Data, Jalur Karir Nyata
3. Player Journey: 8 tahap visual (Entry → Trial) dengan animasi step
4. Games: MLBB + Free Fire cards dengan MAU stats
5. Membership tiers: Free/Silver/Gold/Platinum dengan feature comparison
6. Testimonials placeholder
7. FAQ accordion
8. Footer: links, social media, legal

Style: Dark futuristic (ROG Armoury Crate vibe), gold accents, smooth scroll animations via Framer Motion.

Referensi: Section 5.1 di Development Plan.
```

### Step 0.6 — Player Dashboard

```
Buat player dashboard di /dashboard (protected route, semua authenticated users).

Layout:
1. Welcome bar: "Selamat datang, [name]!" + tier badge + game badge
2. Stats row: Talent Score (circular progress), Level, XP, Streak count
3. Skill radar chart (Recharts): 5 aspek — Mechanical, Game Sense, Hero Mastery, Teamwork, Mental
4. Daily Missions panel: 3 misi hari ini + progress bar + streak counter
5. Quick Actions grid: Belajar, Submit Gameplay, Komunitas, Leaderboard
6. Recent Activity feed: 5 item terakhir
7. Upgrade CTA (untuk Free/Silver): highlight fitur yang terkunci

Data dari Prisma: player profile, subscription tier, mission completions.

Referensi: Section 5.3 di Development Plan.
```

---

## PHASE 1: ACADEMY / LMS (Week 3-5)

### Step 1.1 — Course Catalog & Filters

```
Buat halaman Academy di /academy (Silver+ access).

1. Filter bar: Game (MLBB/FF) + Level (Beginner/Intermediate/Advanced/Expert) + Category
2. Course grid: cards dengan thumbnail, title, module count, lesson count, difficulty badge, progress %
3. Search bar
4. Free members: bisa lihat catalog tapi CTA "Upgrade ke Silver untuk akses"

Seed 6 courses: 3 MLBB (Jungle Mastery, Mid Lane Domination, Draft Strategy), 3 FF (Survival Tactics, Sniper Guide, Squad Coordination).

Referensi: Section 5.5 di Development Plan.
```

### Step 1.2 — Course Detail & Lesson Player

```
Buat halaman course detail di /academy/[courseId] dan lesson player di /academy/[courseId]/[lessonId].

Course detail:
- Hero banner + title + description
- Module list (accordion) dengan lesson items + completion checkmarks
- Progress bar overall
- "Mulai Belajar" / "Lanjutkan" CTA

Lesson player:
- Video player (untuk dev: placeholder HTML5 video, nanti Bunny.net)
- Watermark overlay: nama user + timestamp (semi-transparan)
- Lesson title + description di bawah video
- Navigation: prev/next lesson
- Quiz button (jika lesson punya quiz)

Progress tracking: update lesson completion di database setelah video selesai (80% watched).

Referensi: Section 5.5 di Development Plan.
```

### Step 1.3 — Quiz System

```
Buat quiz system terintegrasi dengan lesson.

1. Quiz page: /academy/[courseId]/quiz/[quizId]
2. Format: multiple choice (4 opsi), 5-10 pertanyaan per quiz
3. Timer optional
4. Hasil: skor %, jawaban benar/salah, penjelasan per soal
5. Simpan attempt di QuizAttempt table
6. Passing score: 70%
7. Badge: "Quiz Master" jika pass 10 quiz berturut-turut
8. Feed ke Player Profile (rata-rata quiz score)

Referensi: Section 5.5 di Development Plan.
```

---

## PHASE 2: COMMUNITY (Week 5-7)

### Step 2.1 — Community Feed

```
Buat komunitas di /community.

1. Post feed: card per post — author (avatar, name, tier badge, game badge), content, timestamp, reactions, comment count
2. Game filter tabs: All / MLBB / Free Fire
3. Sort: Terbaru / Terpopuler / Trending
4. Tag system: Discussion, Tips, Question, Highlight, Bug Report
5. Create post button (Silver+ only)
6. Free members: bisa lihat feed + react/vote, TIDAK bisa post/reply — CTA "Upgrade ke Silver"

Referensi: Section 5.6 di Development Plan.
```

### Step 2.2 — Post Detail, Reply, Moderation

```
Buat post detail di /community/[postId].

1. Full post content + author info
2. Reply threading (1 level deep)
3. Reaction system: 👍 Helpful, 🔥 Fire, 💡 Insightful, 😂 Funny
4. Report button → modal dengan alasan
5. Keyword filter: auto-flag post/reply yang mengandung kata kasar (bahasa Indonesia + l33tspeak)
6. Attitude Score: +1 per helpful reaction received, -5 per valid report
7. Reputation badge: "Helpful", "Expert [Role]", "Clean Player" (90 hari tanpa report)

Admin actions: hapus post, mute user (24h/7d/permanent), view reports queue.

Referensi: Section 5.6 + Section 12 di Development Plan (Community Moderation Architecture).
```

---

## PHASE 3: EVALUATION (Week 7-10)

### Step 3.1 — Gameplay Submission (Player Side)

```
Buat submission flow di /evaluation (Gold+ access).

1. Submit page: upload gameplay link (YouTube/Google Drive) + pilih hero + pilih aspek yang ingin di-review
2. Queue status: posisi antrian, estimasi waktu, SLA countdown
3. History: daftar semua submission + status (pending/in-review/completed)
4. Review result detail: rubrik 5 aspek (bar chart), overall score, feedback teks, improvement plan
5. Rating form: 4 aspek (1-5 bintang) setelah terima review — Kejelasan, Relevansi, Actionability, Overall

Free/Silver: CTA "Upgrade ke Gold untuk evaluasi coach profesional"

Referensi: Section 5.7 di Development Plan.
```

### Step 3.2 — Coach Dashboard & Review Interface

```
Buat coach dashboard di /coach (COACH role only).

1. Queue page (/coach/queue): daftar submission yang di-assign, SLA countdown per item, filter by game/role
2. Review interface (/coach/review/[evaluationId]):
   - Video embed di kiri (atau link)
   - Rubrik form di kanan: 5 aspek (slider 1-5 + komentar per aspek)
     * Mechanical Skill (25%)
     * Game Sense / Macro (25%)
     * Hero Mastery (20%)
     * Teamwork & Communication (15%)
     * Mental & Attitude (15%)
   - Feedback teks (minimum 150 kata — auto-validate)
   - Improvement Plan (minimum 2 action items)
   - Submit button (disabled sampai semua aspek terisi + min 150 kata)
   - Timer: mulai saat coach buka review (minimum 8 menit — auto-flag jika kurang)
3. Performance page (/coach/performance):
   - CQS Score (Coach Quality Score) = (Avg Rating × 0.5) + (Rubrik Completeness × 0.3) + (Audit Score × 0.2)
   - Total reviews, avg review time, rating distribution
   - Status badge: Excellent (4.0+) / Good (3.0-3.9) / Warning (2.0-2.9)
4. Wallet page (/coach/wallet): saldo, history, withdrawal request

Auto-assignment: Spesialisasi Role → Current Load → CQS → Availability.

Referensi: Section 5.7 + Section 5.14 (Coach Dashboard) di Development Plan.
```

---

## PHASE 4: GAMIFICATION + MONETIZATION (Week 10-12)

### Step 4.1 — Daily Missions, XP, Leaderboard, Badges

```
Buat sistem gamifikasi:

1. Daily Missions (/dashboard — panel):
   - 3 misi per hari (rotating): "Selesaikan 1 lesson", "Post di komunitas", "Review 1 quiz", dll
   - Streak counter (7-day visual)
   - XP reward per misi + streak bonus

2. Leaderboard (/leaderboard):
   - Tab: Overall / MLBB / Free Fire
   - Top 3 highlighted (1st gold, 2nd silver, 3rd bronze)
   - Ranking table: rank, avatar, name, Talent Score, game badge
   - "Posisi kamu: #XX" sticky bar

3. Badge system:
   - Profile badges collection
   - Categories: Streak (7-day, 30-day), Quiz (Master), Community (Helpful, Clean Player), Evaluation (First Review)
   - Badge popup notification saat earned

4. Talent Score calculation:
   - Skill Signal (40%): avg evaluation score + tournament results
   - Mindset Signal (30%): attitude score - toxicity flags
   - Commitment Signal (30%): login consistency + LMS progress + mission completion
   - Auto-recalculate daily via background job (BullMQ + Redis)

Referensi: Section 5.8-5.10 di Development Plan.
```

### Step 4.2 — Membership & Payment

```
Buat membership system:

1. Pricing page (/membership):
   - 4 tier cards: Free / Silver Rp49K / Gold Rp99K / Platinum Rp199K
   - Feature comparison table
   - Gold highlighted "Paling Populer"
   - Student discount badge (30% off)
   - Toggle: Bulanan / 3 Bulan (diskon 15%) / 6 Bulan (diskon 25%)

2. Checkout flow:
   - Redirect ke payment page (Midtrans Snap — mock untuk dev)
   - Webhook handler: POST /api/payment/webhook
   - Setelah success: update subscription tier, unlock features

3. Feature gating middleware:
   - Cek tier di setiap protected route
   - Show upgrade CTA + preview untuk fitur yang terkunci
   - Grace period 3 hari setelah expired sebelum downgrade

4. Student discount verification (/settings/student-discount):
   - Upload foto KTM atau verify email .ac.id
   - Admin approval queue
   - Setelah verified: 30% discount otomatis

Referensi: Section 5.11 + 5.26 di Development Plan.
```

---

## PHASE 5: SCOUTING + EVENTS (Week 12-16)

### Step 5.1 — Talent Board & Scouting

```
Buat scouting system (SCOUTING role only):

1. Talent Board (/scouting/talent-board):
   - Table: semua pemain sorted by Talent Score descending
   - Columns: Rank, Name, Game, Talent Score (color coded: green 85+, yellow 70-84, red <70), Skill/Mindset/Commitment breakdown
   - Filter: Game, min score, role
   - Scouting threshold: 85 (green highlight)
   - Actions per player: View Profile, Shortlist, Invite Trial

2. Shortlist (/scouting/shortlist):
   - Saved players with notes
   - Invite trial button → sends notification + updates player status

3. Player side: "Talent Score" section di profile dengan breakdown + threshold indicator

Referensi: Section 5.9 di Development Plan.
```

### Step 5.2 — Events

```
Buat events system:

1. Event list (/events):
   - Cards: tournament name, date, game, type (tournament/scrim), status (upcoming/live/completed), registration count
   - Filter: Game / Type / Status
   - Register button (tier-gated: scrim = Platinum only)

2. Event detail (/events/[eventId]):
   - Banner, description, rules, schedule
   - Participant list
   - Results/bracket (after completion)

3. Admin: create event, manage registrations, input results

Referensi: Section 5.9 di Development Plan.
```

---

## PHASE 6: NEW MODULES (Week 16-24)

### Step 6.1 — Career Pathways

```
Buat career pathway di /career:

1. Program catalog: cards dengan title, duration, price, description, "Coming Soon" badge untuk yang belum ready
2. Active programs: IXON Certified Coach (Rp 3,5 juta), Esports Analyst (Rp 3 juta), Content Creator Bootcamp (Rp 2,5 juta)
3. Coming soon: Digital Marketing, Graphic Design, Video Production
4. Detail page: curriculum outline, instructor info, outcome/certification, enroll CTA

Referensi: Section 5.20 di Development Plan.
```

### Step 6.2 — Mental Performance & Physical Wellness

```
1. Mental Performance (/mental):
   - Content library (articles/video): Tilt Management, Performance Anxiety, Burnout Prevention, Focus Techniques
   - Self-assessment tools (questionnaires)
   - Tips of the day

2. Physical Wellness (/wellness):
   - Daily check-in: jam tidur, olahraga (ya/tidak), kondisi fisik (1-5)
   - Streak tracking
   - Tips ergonomi gamer
   - Weekly summary chart

Referensi: Section 5.17 + 5.18 di Development Plan.
```

### Step 6.3 — Mentorship & Alumni

```
Buat mentorship system:

1. Mentor Directory (/mentorship):
   - Mentor cards: avatar, name, ex-team, specialization tags, rating, availability status
   - Filter: Game / Specialization / Availability
   - Session types: 1-on-1 Review, Group Session, AMA, Shadow Session

2. Mentor detail (/mentorship/[mentorId]):
   - Full bio, career history, reviews
   - Available slots calendar
   - Book session CTA

3. Mentor side (/mentor/dashboard):
   - Upcoming sessions, past sessions, reviews received

Mock data: 3 mentors (RRQ Lemon, EVOS Wannn, ONIC Sanz — placeholder names).

Referensi: Section 5.19 di Development Plan.
```

### Step 6.4 — Parent Portal

```
Buat parent portal di /parent (PARENT role):

1. Dashboard: child's progress overview
   - Jam belajar per minggu
   - Rata-rata quiz score
   - Attitude Score
   - Talent Score trend (line chart)
2. Activity log: lesson completions, community activity, evaluations
3. Weekly report (auto-generated summary)
4. Link: parent mendapat invite link dari child, register dengan role PARENT

Referensi: Section 5.16 di Development Plan.
```

### Step 6.5 — Referral / Affiliate Program

```
Buat referral system:

1. Referral page (/referral):
   - Unique referral code + link per user
   - Share buttons: WhatsApp, Discord, copy link
   - Stats: total invited, registered, subscribed, rewards earned
   - Leaderboard: top referrers bulan ini

2. Mechanism:
   - Referrer: 7 hari Silver gratis per successful referral (yang subscribe)
   - Referee: 7 hari Silver gratis saat register via referral link
   - KOL tier: 15-20% komisi subscription bulan pertama (tracked via referral code)

3. Database: Referral table (referrerId, refereeId, code, status, rewardType, rewardGiven)
4. Attribution: referral code di URL → simpan di cookie 30 hari → attribute saat register

Referensi: Section 5.25 + Section 19 di Blueprint v1.3.
```

---

## PHASE 7: ADMIN + POLISH (Week 20-24)

### Step 7.1 — Admin Panel

```
Buat admin panel di /admin (ADMIN role):

1. Dashboard: total users, DAU, MAU, MRR, conversion rates, alert cards (SLA breaches, pending reports, flagged reviews)
2. User management: list, search, view profile, change role/tier, ban
3. Content management: courses CRUD, events CRUD
4. Coach management: list coaches, view CQS, approve applications
5. Moderation: reported posts queue, banned users list, appeal queue
6. Analytics:
   - Conversion funnel: Guest → Free → Silver → Gold → Platinum (visual funnel)
   - Retention curve (D1, D7, D30)
   - Revenue chart (MRR over time)
   - User growth chart

Referensi: Section 5.12 + 5.13 di Development Plan.
```

### Step 7.2 — Settings, Search, Game Switcher

```
1. Settings (/settings):
   - Profile edit
   - Appearance (theme toggle jika ada)
   - Notification preferences (WA on/off, email on/off, in-app on/off)
   - Privacy (profile visibility, data export)
   - Account (change password, delete account — hard delete sesuai UU PDP)

2. Global Search (/search):
   - Search bar di navbar → dropdown hasil
   - Search across: courses, community posts, players, events, mentors
   - PostgreSQL full-text search (tsvector)

3. Game Switcher:
   - Toggle di navbar: MLBB | Free Fire
   - Simpan preferensi di localStorage + user profile
   - Semua feed, catalog, leaderboard filter by selected game

Referensi: Section 5.22 + 5.21 + 5.15 di Development Plan.
```

### Step 7.3 — Onboarding, Notifications, Polish

```
1. Onboarding flow (setelah register):
   - 3-5 step guided tour
   - Pilih tujuan: "Jadi pro player" / "Improve skill" / "Explore karir esports"
   - Rekomendasi fitur berdasarkan tujuan
   - Isi profil (hero pool, rank)

2. Notification system:
   - In-app notifications (bell icon di navbar, dropdown list)
   - Real-time via Socket.io (new review, new reply, mention, mission reminder)
   - WhatsApp integration (mock untuk dev — log ke console)
   - Notification preferences di settings

3. Polish:
   - Loading skeletons di semua page
   - Empty states di semua section ("Belum ada review", "Komunitas masih sepi", dll)
   - Error states (404, 500, unauthorized)
   - Mobile responsive semua pages
   - Smooth page transitions (Framer Motion)

Referensi: Section 5.27-5.32 di Development Plan.
```

---

## PHASE 8: SECURITY + DEPLOYMENT (Week 24-26)

### Step 8.1 — Content Security & Hardening

```
1. Video security:
   - Signed URL (expire 2 jam)
   - Referer lock (hanya dari domain IXON.TRB)
   - Watermark overlay (username + timestamp)
   - Session concurrency limit (1 device)

2. Security hardening:
   - Rate limiting (API routes)
   - CSRF protection
   - XSS sanitization (DOMPurify)
   - SQL injection prevention (Prisma parameterized queries — already safe)
   - Input validation (Zod schemas)
   - Helmet headers

3. Data protection:
   - AES-256 encryption at rest untuk nama, phone, email
   - Hard delete support (/settings → Delete My Account)
   - Data export (GDPR-style, UU PDP compliance)

Referensi: Section 5.30 + Section 21 di Blueprint v1.3.
```

### Step 8.2 — Production Deployment

```
Deploy ke production VPS:

1. Setup dedicated VPS (4-8 vCPU, 16GB RAM)
2. Install Docker + Docker Compose
3. Setup domain: academy.ixon.id → Nginx → Next.js container
4. SSL: Certbot Let's Encrypt auto-renew
5. docker compose -f docker-compose.prod.yml up -d
6. Prisma migrate deploy (production)
7. Seed initial data (games, admin user, sample courses)
8. Setup backup cron: pg_dump daily → offsite storage
9. Setup monitoring: uptime check, error logging
10. Test semua flow: register → login → belajar → submit → review → scouting

Referensi: Appendix (Deployment Checklist) di Development Plan.
```

---

## CHECKLIST FINAL

Setelah semua phase selesai, verifikasi:

- [ ] Register → login → dashboard berfungsi (MLBB + FF)
- [ ] Academy: browse → watch → quiz → progress tracking
- [ ] Community: read (Free) → post (Silver+) → react → report → moderation
- [ ] Evaluation: submit (Gold+) → coach review → rubrik → feedback → rating
- [ ] Gamification: daily missions → streak → XP → leaderboard → badges
- [ ] Scouting: Talent Score calculated → Talent Board → shortlist → invite trial
- [ ] Membership: pricing → payment → tier upgrade → feature gating
- [ ] Referral: share link → register → reward
- [ ] Career: browse programs → detail → enroll CTA
- [ ] Mental + Wellness: content → self-assessment → check-in
- [ ] Mentorship: browse → book → session
- [ ] Parent portal: view child progress → reports
- [ ] Admin: dashboard → user mgmt → moderation → analytics
- [ ] Settings: edit profile → notifications → delete account
- [ ] Game switcher: toggle MLBB/FF → all feeds filter
- [ ] Mobile responsive: semua pages
- [ ] Performance: skeleton loading, lazy load, caching
- [ ] Security: rate limit, encryption, signed URLs, watermark
