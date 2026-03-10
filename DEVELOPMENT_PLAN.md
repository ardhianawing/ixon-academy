# IXON ACADEMY — Development Plan & Technical Specification

**Dokumen ini adalah panduan lengkap untuk membangun aplikasi IXON Academy.**
**Digunakan sebagai referensi utama saat development melalui Claude Code.**

---

## DAFTAR ISI

1. Overview & Design Philosophy
2. Tech Stack & Project Structure
3. Design System
4. Database Schema (Prisma)
5. Halaman & Fitur — Detail Per Module (32 sections)
6. Role & Permission Matrix
7. API Endpoints
8. Third-Party Integrations
9. Mock Data Specification
10. Build Priority & Phases

---

# 1. OVERVIEW & DESIGN PHILOSOPHY

## 1.1 Apa yang Dibangun

Aplikasi web (responsive, mobile-first) untuk platform pembinaan esports yang mencakup:
- Player-facing app (belajar, komunitas, evaluasi, profil, turnamen)
- Coach dashboard (review queue, rubrik, wallet, performa)
- Scouting dashboard (talent board, shortlist, invite)
- Admin panel (CMS, moderasi, analytics, coach management)
- Parent portal (progress anak, laporan)

## 1.2 Design Philosophy

**Hybrid Modern** — bukan full dark gaming, bukan full corporate. Interface yang:
- Bersih, nyaman, mudah dibaca
- Modern dan premium tanpa berlebihan
- Dark mode sebagai default dengan opsi light mode
- Aksen warna emas/gold (brand IXON) sebagai highlight
- Rounded corners, spacing yang generous, typography yang jelas
- Micro-interactions yang halus (hover, transitions) tapi tidak berlebihan

**Inspirasi vibe:** Notion meets Discord meets Duolingo — clean productivity tool yang terasa engaging dan tidak membosankan.

## 1.3 Target User & Device

- Primary: Mobile web (Android, 360-414px width)
- Secondary: Tablet & Desktop
- Target browser: Chrome Android (90%+ user base)
- Koneksi: harus smooth di 3G/4G Indonesia
- HP spesifikasi rendah harus tetap usable

---

# 2. TECH STACK & PROJECT STRUCTURE

## 2.1 Tech Stack (Final)

**Developer:** Solo dev + Claude Code. Stack dipilih untuk maximizing produktivitas Claude Code.
**Deployment:** Self-hosted VPS (existing server untuk prototype, migrasi ke server lebih besar nanti).
**Prinsip:** Dockerized dari awal agar migrasi semudah `docker compose up -d`.

```
FRAMEWORK & LANGUAGE
- Next.js 14+ (App Router) — Full-stack: SSR + API Routes + Server Actions
- TypeScript — Type safety, Claude Code menulis kode lebih presisi
- Node.js 20 LTS — Runtime

DATABASE & CACHE
- PostgreSQL 16 — Primary database (lebih powerful dari MySQL: JSONB, full-text search, better concurrency)
- Prisma — Type-safe ORM, auto-generated types, migration tools, seeding
- Redis 7 — Session store, cache (leaderboard TTL 5min, profile 1hr), job queue

UI & FRONTEND
- Tailwind CSS 3+ — Utility-first, Claude Code terbaik di sini
- Shadcn/UI — Production-ready component library
- Framer Motion — Micro-interactions & page transitions
- Recharts — Data visualization (radar, line, bar, area charts)
- Lucide React — Icon set

REAL-TIME
- Socket.io — WebSocket untuk notifikasi, community feed live, event live score
- Self-hosted di VPS, tanpa dependency external

BACKGROUND JOBS
- BullMQ + Redis — Async job queue untuk:
  - WhatsApp notification dispatch
  - Email dispatch
  - Talent Score recalculation
  - Coach auto-assignment
  - Daily mission reset

INFRASTRUCTURE (VPS)
- Ubuntu 24.04 LTS
- Docker + Docker Compose — WAJIB dari hari pertama (untuk migrasi mudah)
- Nginx — Reverse proxy, SSL termination, static files, rate limiting
- PM2 — Process manager (Next.js + BullMQ workers)
- Let's Encrypt (Certbot) — Free SSL, auto-renew

EXTERNAL SERVICES (hanya yang wajib)
- Bunny.net Stream — Video hosting (HLS, anti-download, CDN global)
- Midtrans — Primary payment gateway (QRIS, VA, e-wallet)
- Xendit — Fallback payment gateway
- Fonnte/Wablas — WhatsApp gateway (OTP, notifications)
- Resend/Mailgun — Transactional email (fallback dari WA)
```

## 2.2 Docker Architecture (Migrasi-Ready)

```yaml
# docker-compose.yml
services:
  app:
    build: ./Dockerfile
    ports: ["3000:3000"]
    depends_on: [postgres, redis]
    env_file: .env
    volumes:
      - ./uploads:/app/uploads  # persistent file storage
    restart: unless-stopped

  worker:
    build: ./Dockerfile
    command: node dist/workers/index.js
    depends_on: [postgres, redis]
    env_file: .env
    restart: unless-stopped

  socketio:
    build: ./Dockerfile
    command: node dist/socket/index.js
    ports: ["3001:3001"]
    depends_on: [redis]
    env_file: .env
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ixon_academy
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    volumes:
      - redisdata:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./certbot:/etc/letsencrypt
      - ./uploads:/var/www/uploads
    depends_on: [app, socketio]
    restart: unless-stopped

volumes:
  pgdata:
  redisdata:
```

**Migrasi ke server baru:**
```bash
# Di server lama
docker compose down
pg_dump ixon_academy > backup.sql
tar -czf uploads.tar.gz uploads/
scp backup.sql uploads.tar.gz docker-compose.yml .env user@new-server:~/ixon/

# Di server baru
cd ~/ixon
docker compose up -d postgres redis
docker compose exec postgres psql -U $DB_USER -d ixon_academy < backup.sql
tar -xzf uploads.tar.gz
docker compose up -d
# Selesai. Ganti DNS pointing, done.
```

## 2.3 Nginx Config

```nginx
# /nginx/conf.d/ixon.conf
upstream nextjs {
    server app:3000;
}
upstream socketio {
    server socketio:3001;
}

server {
    listen 80;
    server_name academy.ixon.id;  # subdomain IXON
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name academy.ixon.id;

    ssl_certificate /etc/letsencrypt/live/academy.ixon.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/academy.ixon.id/privkey.pem;

    # Next.js app
    location / {
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.io
    location /socket.io/ {
        proxy_pass http://socketio;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    # Static uploads
    location /uploads/ {
        alias /var/www/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Rate limiting for API
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://nextjs;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    client_max_body_size 100M;  # untuk upload gameplay video
}
```

## 2.4 Environment Variables (.env)

```bash
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://academy.ixon.id
NEXT_PUBLIC_SOCKET_URL=https://academy.ixon.id

# Database
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/ixon_academy
DB_USER=ixon_admin
DB_PASSWORD=<strong-password>

# Redis
REDIS_URL=redis://redis:6379

# Auth
NEXTAUTH_SECRET=<random-32-char>
NEXTAUTH_URL=https://academy.ixon.id

# Bunny.net
BUNNY_API_KEY=<key>
BUNNY_LIBRARY_ID=<id>
BUNNY_CDN_URL=https://cdn.ixonacademy.b-cdn.net

# Payment
MIDTRANS_SERVER_KEY=<key>
MIDTRANS_CLIENT_KEY=<key>
MIDTRANS_IS_PRODUCTION=false
XENDIT_SECRET_KEY=<key>

# WhatsApp
FONNTE_API_KEY=<key>
FONNTE_SENDER=628xxxxxxxxxx

# Email (fallback)
RESEND_API_KEY=<key>
EMAIL_FROM=noreply@academy.ixon.id
```

## 2.5 Project Structure

```
/app
  /(auth)
    /login
    /register
    /verify-otp
  /(player)
    /dashboard
    /profile
    /profile/export
    /academy
      /[courseId]
      /[courseId]/[lessonId]
    /community
      /[postId]
    /evaluation
      /submit
      /history
      /[reviewId]
    /events
      /[eventId]
    /leaderboard
    /missions
    /membership
    /membership/student-verify
    /marketplace
    /wellness
    /mental
    /mentorship
      /[mentorId]
      /my-sessions
    /referral
    /settings
    /search
    /become-coach
  /(coach)
    /dashboard
    /queue
    /review/[submissionId]
    /wallet
    /performance
  /(scouting)
    /talent-board
    /shortlist
    /invite/[playerId]
  /(admin)
    /dashboard
    /users
    /content
    /moderation
    /coaches
    /analytics
  /(parent)
    /dashboard
    /child/[childId]
    /reports
  /(career)
    /pathways
    /[pathwayId]
    /certification
  /(public)
    /landing
    /about
    /pricing

/components
  /ui (shadcn components)
  /layout (sidebar, navbar, footer)
  /player (profile card, talent score, etc)
  /academy (video player, quiz, progress)
  /community (post card, reply, report)
  /evaluation (rubric form, review card)
  /charts (radar, line, bar)
  /gamification (badge, mission card, xp bar)

/lib
  /api
  /hooks
  /utils
  /constants
  /mock-data
```

---

# 3. DESIGN SYSTEM

## 3.1 Color Palette

```css
/* Brand */
--gold:          #D4A843
--gold-light:    #F0DCA0
--gold-dark:     #A07D2E

/* Background (Dark Mode - Default) */
--bg-primary:    #0B1120
--bg-secondary:  #111827
--bg-card:       #1A2332
--bg-elevated:   #1F2D3D
--bg-hover:      #253447

/* Background (Light Mode) */
--bg-primary-l:  #F8FAFC
--bg-secondary-l:#FFFFFF
--bg-card-l:     #FFFFFF
--bg-elevated-l: #F1F5F9

/* Text */
--text-primary:  #F1F5F9
--text-secondary:#94A3B8
--text-muted:    #64748B
--text-primary-l:#0F172A
--text-secondary-l:#475569

/* Accent */
--accent-blue:   #3B82F6
--accent-green:  #10B981
--accent-red:    #EF4444
--accent-purple: #8B5CF6
--accent-orange: #F59E0B

/* Tier Colors */
--tier-free:     #94A3B8
--tier-silver:   #C0C0C0
--tier-gold:     #D4A843
--tier-platinum: #7C3AED

/* Game Colors */
--mlbb:          #3B82F6
--freefire:      #F59E0B
```

## 3.2 Typography

```css
/* Heading: Satoshi atau Plus Jakarta Sans (modern, clean, sedikit personality) */
/* Body: Inter (readability) */
/* Mono: JetBrains Mono (stats, scores) */

--font-heading: 'Plus Jakarta Sans', sans-serif
--font-body:    'Inter', sans-serif
--font-mono:    'JetBrains Mono', monospace

/* Scale */
--text-xs:   0.75rem   /* 12px - captions */
--text-sm:   0.875rem  /* 14px - secondary text */
--text-base: 1rem      /* 16px - body */
--text-lg:   1.125rem  /* 18px - emphasis */
--text-xl:   1.25rem   /* 20px - card titles */
--text-2xl:  1.5rem    /* 24px - section headers */
--text-3xl:  1.875rem  /* 30px - page titles */
--text-4xl:  2.25rem   /* 36px - hero text */
```

## 3.3 Spacing & Layout

```css
/* Border Radius */
--radius-sm: 6px
--radius-md: 10px
--radius-lg: 16px
--radius-xl: 24px
--radius-full: 9999px

/* Shadows (dark mode - subtle glow) */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.3)
--shadow-md: 0 4px 12px rgba(0,0,0,0.4)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.5)
--shadow-gold: 0 0 20px rgba(212,168,67,0.15)

/* Container */
--max-width: 1280px
--sidebar-width: 260px
--navbar-height: 64px
--bottom-nav-height: 64px  /* mobile */
```

## 3.4 Component Patterns

**Cards:** bg-card, rounded-lg, border border-white/5, shadow-sm, p-4-6, hover:bg-hover transition
**Buttons Primary:** bg-gold, text-dark, font-semibold, rounded-lg, hover:bg-gold-light
**Buttons Secondary:** bg-transparent, border border-gold, text-gold, rounded-lg
**Badges/Tags:** px-2 py-0.5, rounded-full, text-xs font-medium
**Input:** bg-bg-elevated, border border-white/10, rounded-lg, focus:ring-gold
**Avatar:** rounded-full, border-2 border-gold
**Progress Bar:** h-2, rounded-full, bg-bg-elevated, inner bg-gradient gold

---

# 4. DATABASE SCHEMA (Prisma)

## 4.1 Core Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── AUTH & USERS ────────────────────────────────────

enum UserRole {
  PLAYER
  COACH
  SCOUTING
  ADMIN
  PARENT
}

enum Tier {
  FREE
  SILVER
  GOLD
  PLATINUM
}

model User {
  id                String    @id @default(cuid())
  namaAsli          String    @map("nama_asli")
  phone             String    @unique
  email             String    @unique
  passwordHash      String    @map("password_hash")
  avatarUrl         String?   @map("avatar_url")
  role              UserRole  @default(PLAYER)
  tier              Tier      @default(FREE)
  trialEligibility  Boolean   @default(true) @map("trial_eligibility")
  emailVerifiedAt   DateTime? @map("email_verified_at")
  phoneVerifiedAt   DateTime? @map("phone_verified_at")
  parentUserId      String?   @map("parent_user_id")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  // Relations
  parentUser        User?     @relation("ParentChild", fields: [parentUserId], references: [id])
  children          User[]    @relation("ParentChild")
  players           Player[]
  subscriptions     Subscription[]
  posts             CommunityPost[]
  replies           CommunityReply[]
  reactions         CommunityReaction[]
  reports           CommunityReport[]   @relation("Reporter")
  reputation        UserReputation?
  submissions       EvaluationSubmission[]
  coachProfile      CoachProfile?
  coachWallet       CoachWallet?
  missions          UserMission[]
  wellnessCheckins  WellnessCheckin[]
  careerEnrollments CareerEnrollment[]
  notifications     Notification[]
  eventRegistrations EventRegistration[]

  @@map("users")
}

// ─── GAMES & PLAYERS ─────────────────────────────────

model Game {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  iconUrl   String?  @map("icon_url")
  status    String   @default("active") // active | inactive
  createdAt DateTime @default(now()) @map("created_at")

  players   Player[]
  courses   Course[]
  posts     CommunityPost[]
  events    Event[]
  coachProfiles CoachProfile[]

  @@map("games")
}

model Player {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  gameId            String  @map("game_id")
  nickname          String
  serverId          String? @map("server_id")
  rank              String
  roleIngame        String  @map("role_ingame")
  heroPool          Json    @default("[]") @map("hero_pool")
  talentScore       Float   @default(0) @map("talent_score")
  skillSignal       Float   @default(0) @map("skill_signal")
  mindsetSignal     Float   @default(0) @map("mindset_signal")
  commitmentSignal  Float   @default(0) @map("commitment_signal")
  attitudeScore     Float   @default(100) @map("attitude_score")
  xp                Int     @default(0)
  level             Int     @default(1)
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  user              User    @relation(fields: [userId], references: [id])
  game              Game    @relation(fields: [gameId], references: [id])
  submissions       EvaluationSubmission[]
  talentBoard       TalentBoard?
  eventResults      EventResult[]

  @@unique([userId, gameId])
  @@index([talentScore])
  @@index([gameId, rank])
  @@map("players")
}

// ─── SUBSCRIPTIONS ───────────────────────────────────

model Subscription {
  id            String   @id @default(cuid())
  userId        String   @map("user_id")
  tier          Tier
  startDate     DateTime @map("start_date")
  endDate       DateTime @map("end_date")
  status        String   @default("active") // active | paused | expired | cancelled
  paymentMethod String?  @map("payment_method")
  amount        Int      @default(0)
  currency      String   @default("IDR")
  createdAt     DateTime @default(now()) @map("created_at")

  user          User     @relation(fields: [userId], references: [id])

  @@index([userId, status])
  @@map("subscriptions")
}

// ─── LMS ─────────────────────────────────────────────

enum CourseCategory {
  HARD_SKILL
  SOFT_SKILL
  MENTAL
  WELLNESS
  CAREER
}

enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
  ALL
}

model Course {
  id                String         @id @default(cuid())
  gameId            String?        @map("game_id") // null = cross-game
  title             String
  description       String
  thumbnailUrl      String?        @map("thumbnail_url")
  level             CourseLevel
  category          CourseCategory
  totalLessons      Int            @default(0) @map("total_lessons")
  totalDurationMin  Int            @default(0) @map("total_duration_min")
  isPublished       Boolean        @default(false) @map("is_published")
  isFreePreview     Boolean        @default(false) @map("is_free_preview")
  sortOrder         Int            @default(0) @map("sort_order")
  createdAt         DateTime       @default(now()) @map("created_at")
  updatedAt         DateTime       @updatedAt @map("updated_at")

  game              Game?          @relation(fields: [gameId], references: [id])
  modules           Module[]
  progress          UserCourseProgress[]

  @@map("courses")
}

model Module {
  id        String   @id @default(cuid())
  courseId   String  @map("course_id")
  title     String
  sortOrder Int     @default(0) @map("sort_order")

  course    Course  @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lessons   Lesson[]

  @@map("modules")
}

model Lesson {
  id              String  @id @default(cuid())
  moduleId        String  @map("module_id")
  title           String
  description     String?
  videoUrl        String? @map("video_url")
  videoDurationSec Int?   @map("video_duration_sec")
  contentMarkdown String? @map("content_markdown")
  sortOrder       Int     @default(0) @map("sort_order")
  isFreePreview   Boolean @default(false) @map("is_free_preview")
  createdAt       DateTime @default(now()) @map("created_at")

  module          Module  @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  quiz            Quiz?
  userProgress    UserLessonProgress[]

  @@map("lessons")
}

model Quiz {
  id              String   @id @default(cuid())
  lessonId        String   @unique @map("lesson_id")
  title           String
  passScorePct    Int      @default(70) @map("pass_score_pct")
  timeLimitMin    Int?     @map("time_limit_min")

  lesson          Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  questions       QuizQuestion[]

  @@map("quizzes")
}

model QuizQuestion {
  id               String @id @default(cuid())
  quizId           String @map("quiz_id")
  questionText     String @map("question_text")
  options          Json   // ["option A", "option B", "option C", "option D"]
  correctAnswerIdx Int    @map("correct_answer_idx")
  explanation      String?
  sortOrder        Int    @default(0) @map("sort_order")

  quiz             Quiz   @relation(fields: [quizId], references: [id], onDelete: Cascade)

  @@map("quiz_questions")
}

model UserCourseProgress {
  id               String   @id @default(cuid())
  userId           String   @map("user_id")
  courseId          String   @map("course_id")
  lessonsCompleted Int      @default(0) @map("lessons_completed")
  quizScoreAvg     Float?   @map("quiz_score_avg")
  status           String   @default("in_progress") // in_progress | completed
  startedAt        DateTime @default(now()) @map("started_at")
  completedAt      DateTime? @map("completed_at")

  course           Course   @relation(fields: [courseId], references: [id])

  @@unique([userId, courseId])
  @@map("user_course_progress")
}

model UserLessonProgress {
  id             String    @id @default(cuid())
  userId         String    @map("user_id")
  lessonId       String    @map("lesson_id")
  watchedSeconds Int       @default(0) @map("watched_seconds")
  isCompleted    Boolean   @default(false) @map("is_completed")
  completedAt    DateTime? @map("completed_at")

  lesson         Lesson    @relation(fields: [lessonId], references: [id])

  @@unique([userId, lessonId])
  @@map("user_lesson_progress")
}

// ─── COMMUNITY ───────────────────────────────────────

model CommunityPost {
  id            String   @id @default(cuid())
  userId        String   @map("user_id")
  gameId        String?  @map("game_id")
  category      String   // discussion | question | highlight | guide | meta | mental
  title         String
  content       String
  reactionsCount Int     @default(0) @map("reactions_count")
  repliesCount  Int      @default(0) @map("replies_count")
  viewsCount    Int      @default(0) @map("views_count")
  reportsCount  Int      @default(0) @map("reports_count")
  isPinned      Boolean  @default(false) @map("is_pinned")
  isLocked      Boolean  @default(false) @map("is_locked")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  user          User     @relation(fields: [userId], references: [id])
  game          Game?    @relation(fields: [gameId], references: [id])
  replies       CommunityReply[]
  reactions     CommunityReaction[]
  reports       CommunityReport[]

  @@index([gameId, category])
  @@index([createdAt])
  @@map("community_posts")
}

model CommunityReply {
  id            String   @id @default(cuid())
  postId        String   @map("post_id")
  userId        String   @map("user_id")
  content       String
  reactionsCount Int     @default(0) @map("reactions_count")
  reportsCount  Int      @default(0) @map("reports_count")
  parentReplyId String?  @map("parent_reply_id")
  createdAt     DateTime @default(now()) @map("created_at")

  post          CommunityPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  user          User          @relation(fields: [userId], references: [id])
  parentReply   CommunityReply?  @relation("ReplyThread", fields: [parentReplyId], references: [id])
  childReplies  CommunityReply[] @relation("ReplyThread")

  @@map("community_replies")
}

model CommunityReaction {
  id             String   @id @default(cuid())
  userId         String   @map("user_id")
  reactableType  String   @map("reactable_type") // post | reply
  reactableId    String   @map("reactable_id")
  type           String   // like | insightful | fire
  createdAt      DateTime @default(now()) @map("created_at")

  user           User     @relation(fields: [userId], references: [id])
  post           CommunityPost? @relation(fields: [reactableId], references: [id])

  @@unique([userId, reactableType, reactableId])
  @@map("community_reactions")
}

model CommunityReport {
  id              String   @id @default(cuid())
  reporterUserId  String   @map("reporter_user_id")
  reportableType  String   @map("reportable_type") // post | reply
  reportableId    String   @map("reportable_id")
  reason          String
  description     String?
  status          String   @default("pending") // pending | reviewed | dismissed | actioned
  reviewedBy      String?  @map("reviewed_by")
  createdAt       DateTime @default(now()) @map("created_at")

  reporter        User     @relation("Reporter", fields: [reporterUserId], references: [id])
  post            CommunityPost? @relation(fields: [reportableId], references: [id])

  @@map("community_reports")
}

model UserReputation {
  id              String @id @default(cuid())
  userId          String @unique @map("user_id")
  totalScore      Int    @default(0) @map("total_score")
  helpfulCount    Int    @default(0) @map("helpful_count")
  reportCount     Int    @default(0) @map("report_count")
  badges          Json   @default("[]")
  cleanDaysStreak Int    @default(0) @map("clean_days_streak")
  updatedAt       DateTime @updatedAt @map("updated_at")

  user            User   @relation(fields: [userId], references: [id])

  @@map("user_reputation")
}

// ─── EVALUATIONS ─────────────────────────────────────

model EvaluationSubmission {
  id               String    @id @default(cuid())
  playerId         String    @map("player_id")
  gameId           String    @map("game_id")
  gameplayUrl      String    @map("gameplay_url")
  gameplayDesc     String?   @map("gameplay_desc")
  heroPlayed       String    @map("hero_played")
  matchContext     String    @map("match_context") // ranked | scrim | tournament
  status           String    @default("queued") // queued | assigned | in_review | completed | revision_requested
  assignedCoachId  String?   @map("assigned_coach_id")
  priority         String    @default("normal") // normal | priority
  submittedAt      DateTime  @default(now()) @map("submitted_at")
  assignedAt       DateTime? @map("assigned_at")
  completedAt      DateTime? @map("completed_at")

  player           Player    @relation(fields: [playerId], references: [id])
  user             User      @relation(fields: [playerId], references: [id], map: "submission_user")
  review           EvaluationReview?

  @@index([status, assignedCoachId])
  @@map("evaluation_submissions")
}

model EvaluationReview {
  id                 String   @id @default(cuid())
  submissionId       String   @unique @map("submission_id")
  coachId            String   @map("coach_id")
  mechanicalScore    Int      @map("mechanical_score") // 1-5
  gameSenseScore     Int      @map("game_sense_score")
  heroMasteryScore   Int      @map("hero_mastery_score")
  teamworkScore      Int      @map("teamwork_score")
  mentalScore        Int      @map("mental_score")
  feedbackText       String   @map("feedback_text")
  improvementPlan    Json     @map("improvement_plan") // ["action item 1", "action item 2"]
  reviewDurationMin  Int      @map("review_duration_min")
  wordCount          Int      @map("word_count")
  status             String   @default("submitted") // draft | submitted | flagged
  createdAt          DateTime @default(now()) @map("created_at")

  submission         EvaluationSubmission @relation(fields: [submissionId], references: [id])
  rating             EvaluationRating?

  @@map("evaluation_reviews")
}

model EvaluationRating {
  id            String   @id @default(cuid())
  reviewId      String   @unique @map("review_id")
  playerId      String   @map("player_id")
  clarity       Int      // 1-5
  relevance     Int      // 1-5
  actionability Int      // 1-5
  satisfaction  Int      // 1-5
  comment       String?
  createdAt     DateTime @default(now()) @map("created_at")

  review        EvaluationReview @relation(fields: [reviewId], references: [id])

  @@map("evaluation_ratings")
}

// ─── COACH ───────────────────────────────────────────

model CoachProfile {
  id              String  @id @default(cuid())
  userId          String  @unique @map("user_id")
  gameId          String  @map("game_id")
  specialization  Json    @default("[]") // ["Jungler", "Gold Laner"]
  bio             String?
  experienceYears Int     @default(0) @map("experience_years")
  cqsScore        Float   @default(3.0) @map("cqs_score")
  totalReviews    Int     @default(0) @map("total_reviews")
  avgRating       Float   @default(0) @map("avg_rating")
  isAvailable     Boolean @default(true) @map("is_available")
  maxDailyReviews Int     @default(5) @map("max_daily_reviews")
  createdAt       DateTime @default(now()) @map("created_at")

  user            User    @relation(fields: [userId], references: [id])
  game            Game    @relation(fields: [gameId], references: [id])

  @@map("coach_profiles")
}

model CoachWallet {
  id              String   @id @default(cuid())
  userId          String   @unique @map("user_id")
  balance         Int      @default(0) // in IDR
  totalEarned     Int      @default(0) @map("total_earned")
  totalWithdrawn  Int      @default(0) @map("total_withdrawn")
  lastWithdrawalAt DateTime? @map("last_withdrawal_at")

  user            User     @relation(fields: [userId], references: [id])
  transactions    CoachTransaction[]

  @@map("coach_wallets")
}

model CoachTransaction {
  id          String   @id @default(cuid())
  walletId    String   @map("wallet_id")
  type        String   // review_payment | quality_bonus | withdrawal
  amount      Int
  referenceId String?  @map("reference_id")
  description String?
  createdAt   DateTime @default(now()) @map("created_at")

  wallet      CoachWallet @relation(fields: [walletId], references: [id])

  @@map("coach_transactions")
}

// ─── EVENTS ──────────────────────────────────────────

model Event {
  id                  String   @id @default(cuid())
  gameId              String   @map("game_id")
  title               String
  description         String
  type                String   // tournament | scrim | workshop | ama
  format              String   // 5v5 | squad | solo | 1v1
  startDate           DateTime @map("start_date")
  endDate             DateTime @map("end_date")
  registrationDeadline DateTime @map("registration_deadline")
  maxParticipants     Int      @map("max_participants")
  currentParticipants Int      @default(0) @map("current_participants")
  tierRequired        Tier     @map("tier_required")
  status              String   @default("upcoming") // upcoming | registration | live | completed | cancelled
  prizeDescription    String?  @map("prize_description")
  createdAt           DateTime @default(now()) @map("created_at")

  game                Game     @relation(fields: [gameId], references: [id])
  registrations       EventRegistration[]
  results             EventResult[]

  @@map("events")
}

model EventRegistration {
  id          String   @id @default(cuid())
  eventId     String   @map("event_id")
  userId      String   @map("user_id")
  teamName    String?  @map("team_name")
  teamMembers Json?    @map("team_members")
  status      String   @default("registered") // registered | confirmed | checked_in | eliminated | winner
  createdAt   DateTime @default(now()) @map("created_at")

  event       Event    @relation(fields: [eventId], references: [id])
  user        User     @relation(fields: [userId], references: [id])

  @@unique([eventId, userId])
  @@map("event_registrations")
}

model EventResult {
  id               String @id @default(cuid())
  eventId          String @map("event_id")
  playerId         String @map("player_id")
  placement        Int?
  kills            Int    @default(0)
  deaths           Int    @default(0)
  assists          Int    @default(0)
  performanceScore Float? @map("performance_score")
  notes            String?
  createdAt        DateTime @default(now()) @map("created_at")

  event            Event  @relation(fields: [eventId], references: [id])
  player           Player @relation(fields: [playerId], references: [id])

  @@map("event_results")
}

// ─── SCOUTING ────────────────────────────────────────

model TalentBoard {
  id               String    @id @default(cuid())
  playerId         String    @unique @map("player_id")
  talentScore      Float     @map("talent_score")
  skillSignal      Float     @map("skill_signal")
  mindsetSignal    Float     @map("mindset_signal")
  commitmentSignal Float     @map("commitment_signal")
  isShortlisted    Boolean   @default(false) @map("is_shortlisted")
  shortlistedBy    String?   @map("shortlisted_by")
  trialStatus      String    @default("none") // none | invited | scheduled | completed | passed | rejected
  notes            String?
  updatedAt        DateTime  @updatedAt @map("updated_at")

  player           Player    @relation(fields: [playerId], references: [id])
  invitations      TrialInvitation[]

  @@index([talentScore(sort: Desc)])
  @@map("talent_board")
}

model TrialInvitation {
  id            String   @id @default(cuid())
  talentBoardId String   @map("talent_board_id")
  invitedBy     String   @map("invited_by")
  message       String
  trialDate     DateTime @map("trial_date")
  trialLocation String?  @map("trial_location")
  status        String   @default("sent") // sent | accepted | declined | completed
  result        String?  // passed | failed
  createdAt     DateTime @default(now()) @map("created_at")

  talentBoard   TalentBoard @relation(fields: [talentBoardId], references: [id])

  @@map("trial_invitations")
}

// ─── GAMIFICATION ────────────────────────────────────

model DailyMission {
  id          String  @id @default(cuid())
  title       String
  description String
  type        String  // login | complete_lesson | post_community | complete_quiz | watch_video | wellness_checkin
  xpReward    Int     @map("xp_reward")
  gameId      String? @map("game_id")
  isActive    Boolean @default(true) @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")

  userMissions UserMission[]

  @@map("daily_missions")
}

model UserMission {
  id          String    @id @default(cuid())
  userId      String    @map("user_id")
  missionId   String    @map("mission_id")
  date        DateTime  @db.Date
  status      String    @default("assigned") // assigned | completed
  completedAt DateTime? @map("completed_at")

  user        User         @relation(fields: [userId], references: [id])
  mission     DailyMission @relation(fields: [missionId], references: [id])

  @@unique([userId, missionId, date])
  @@map("user_missions")
}

// ─── WELLNESS ────────────────────────────────────────

model WellnessCheckin {
  id             String   @id @default(cuid())
  userId         String   @map("user_id")
  sleepHours     Float    @map("sleep_hours")
  exerciseToday  Boolean  @map("exercise_today")
  screenBreaks   Int      @default(0) @map("screen_breaks")
  mood           Int      // 1-5
  handWristPain  Boolean  @default(false) @map("hand_wrist_pain")
  eyeStrain      Boolean  @default(false) @map("eye_strain")
  notes          String?
  createdAt      DateTime @default(now()) @map("created_at")

  user           User     @relation(fields: [userId], references: [id])

  @@index([userId, createdAt])
  @@map("wellness_checkins")
}

// ─── CAREER PATHWAYS ─────────────────────────────────

model CareerPathway {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  description     String
  icon            String
  durationWeeks   Int      @map("duration_weeks")
  price           Int      // in IDR
  requirements    Json     @default("[]")
  outcomes        Json     @default("[]")
  isPublished     Boolean  @default(false) @map("is_published")
  createdAt       DateTime @default(now()) @map("created_at")

  enrollments     CareerEnrollment[]
  certifications  CareerCertification[]

  @@map("career_pathways")
}

model CareerEnrollment {
  id              String    @id @default(cuid())
  userId          String    @map("user_id")
  pathwayId       String    @map("pathway_id")
  status          String    @default("enrolled") // enrolled | in_progress | completed | certified
  progressPercent Int       @default(0) @map("progress_percent")
  enrolledAt      DateTime  @default(now()) @map("enrolled_at")
  completedAt     DateTime? @map("completed_at")

  user            User           @relation(fields: [userId], references: [id])
  pathway         CareerPathway  @relation(fields: [pathwayId], references: [id])

  @@unique([userId, pathwayId])
  @@map("career_enrollments")
}

model CareerCertification {
  id                String    @id @default(cuid())
  userId            String    @map("user_id")
  pathwayId         String    @map("pathway_id")
  certificateNumber String    @unique @map("certificate_number")
  issuedAt          DateTime  @map("issued_at")
  esiVerified       Boolean   @default(false) @map("esi_verified")
  esiVerifiedAt     DateTime? @map("esi_verified_at")

  pathway           CareerPathway @relation(fields: [pathwayId], references: [id])

  @@map("career_certifications")
}

// ─── NOTIFICATIONS ───────────────────────────────────

model Notification {
  id        String    @id @default(cuid())
  userId    String    @map("user_id")
  type      String    // review_complete | reply | mention | mission | level_up | tier_expiring | event | trial_invite
  title     String
  body      String
  data      Json?
  channel   String    @default("in_app") // whatsapp | sms | email | in_app
  isRead    Boolean   @default(false) @map("is_read")
  sentAt    DateTime  @default(now()) @map("sent_at")
  readAt    DateTime? @map("read_at")

  user      User      @relation(fields: [userId], references: [id])

  @@index([userId, isRead])
  @@map("notifications")
}

// ─── PAYMENTS ────────────────────────────────────────

model Payment {
  id               String   @id @default(cuid())
  userId           String   @map("user_id")
  gateway          String   // midtrans | xendit
  type             String   // subscription | one_time | career_program
  amount           Int
  currency         String   @default("IDR")
  status           String   @default("pending") // pending | paid | failed | refunded
  gatewayReference String?  @map("gateway_reference")
  metadata         Json?
  createdAt        DateTime @default(now()) @map("created_at")

  @@index([userId, status])
  @@map("payments")
}

// ─── PARENT PORTAL ───────────────────────────────────

model ParentLink {
  id            String   @id @default(cuid())
  parentUserId  String   @map("parent_user_id")
  childUserId   String   @map("child_user_id")
  consentGiven  Boolean  @default(false) @map("consent_given")
  consentDate   DateTime? @map("consent_date")
  createdAt     DateTime @default(now()) @map("created_at")

  @@unique([parentUserId, childUserId])
  @@map("parent_links")
}
```

---

# 5. HALAMAN & FITUR — DETAIL PER MODULE

## 5.1 LANDING PAGE (Public)

**Route:** `/`

**Sections:**
1. **Hero Section** — Headline besar: "Dari Gamer Menjadi Profesional". Subtext tentang platform pembinaan esports pertama di Indonesia. CTA: "Mulai Gratis" dan "Lihat Demo". Background: subtle gradient dark + gold particles atau geometric shapes.

2. **Supported Games** — Logo MLBB + Free Fire dengan badge "Active". Logo game lain (HOK, Tekken, PES) dengan badge "Coming Soon" yang di-gray-out.

3. **Bagaimana Cara Kerjanya** — 4 step visual: Daftar → Belajar → Dievaluasi → Di-scout. Illustrasi atau icon per step.

4. **Fitur Utama** — Grid 6 cards: Kurikulum Terstruktur, Evaluasi Coach, Talent Scouting, Komunitas Kompetitif, Jalur Karir, Mental & Wellness. Masing-masing dengan icon, headline, 1 kalimat deskripsi.

5. **Statistik** — Counter animasi: "35 Juta+ Pemain MLBB Indonesia", "192 Juta Gamer Indonesia", "0 Platform Pembinaan Terstruktur... Sampai Sekarang."

6. **Tier Pricing** — 4 kolom: Free / Silver / Gold / Platinum. Highlight Gold sebagai "Most Popular". Fitur per tier, harga, CTA.

7. **Testimonial/Social Proof** — Mock testimonials dari pemain (mock data).

8. **Footer** — Links, social media, "Didukung oleh IXON Esport", logo ESI kecil.

---

## 5.2 AUTH PAGES

### Register (`/register`)
- Step 1: Nama Asli, Email, Nomor HP, Password
- Step 2: OTP Verification (input 6 digit, countdown timer 60 detik)
- Step 3: Game Selection (MLBB / Free Fire / Keduanya)
- Step 4: Game Profile (Nickname, Server, Rank, Role, Hero Pool top 3-5)
- UX message di atas form: "Identitas asli diperlukan karena setiap data pemain dapat menjadi bagian dari proses scouting dan trial profesional."
- Progress bar di atas showing step 1/4 → 4/4

### Login (`/login`)
- Phone number + password (primary)
- Email + password (secondary)
- "Lupa Password" link
- Social login opsional

---

## 5.3 PLAYER DASHBOARD (`/dashboard`)

**Layout:** Sidebar (desktop) / Bottom nav (mobile) + Top navbar

### Sidebar Navigation (Desktop)
```
🏠 Dashboard
📚 Academy
💬 Komunitas
📋 Evaluasi
🏆 Events
🔍 Leaderboard
🎯 Misi Harian
🧠 Mental & Wellness
🤝 Mentorship
💼 Jalur Karir
👤 Profil
⭐ Membership
🎁 Referral
🛒 Marketplace
⚙️ Pengaturan
```

### Bottom Nav (Mobile) — 5 item
```
🏠 Home | 📚 Academy | 💬 Forum | 📋 Review | 👤 Profil
```

### Dashboard Content

**Section 1: Welcome Bar**
- "Selamat datang, [Nickname]!" 
- Tier badge (Gold ⭐), Game badge (MLBB 🔵 / FF 🟡)
- Quick stats: Level, XP bar, Talent Score

**Section 2: Daily Missions (3 cards horizontal scroll)**
- Setiap misi: icon, judul, XP reward, progress bar, checkbox
- Contoh: "✅ Login hari ini (+10 XP)", "📚 Selesaikan 1 lesson (+25 XP)", "💬 Berikan 1 reply di forum (+15 XP)"
- Countdown: "Reset dalam 14:32:05"

**Section 3: Quick Actions (4 buttons grid)**
- "Lanjutkan Belajar" (ke course terakhir)
- "Submit Gameplay" (ke evaluation submit)
- "Lihat Review Terbaru" (ke evaluation history)
- "Forum Trending" (ke community)

**Section 4: Progress Overview**
- Mini radar chart (5 skill dimensions)
- Talent Score trend (sparkline last 6 months)
- "Rank: Mythic Glory | Talent Score: 78/100"

**Section 5: Recent Activity Feed**
- "Coach Alex memberikan review untuk gameplay #12 — 2 jam lalu"
- "Kamu naik ke Level 14! — 5 jam lalu"
- "Misi 'Selesaikan Quiz' tercapai — kemarin"

**Section 6: Upcoming Events**
- Card per event: judul, tanggal, tipe, slot tersisa, CTA "Daftar"

---

## 5.4 PLAYER PROFILE (`/profile`)

**Header:**
- Avatar besar, nama asli (kecil), nickname (besar)
- Tier badge, game badge(s), level badge
- "Member sejak Jan 2026"
- Edit profile button

**Tab Navigation:**
1. **Overview** — Radar chart 5 dimensi, Talent Score dengan breakdown (Skill/Mindset/Commitment), rank history, stats summary
2. **Evaluasi** — Daftar semua review dari coach, sortable by date/score. Setiap review card: coach name, tanggal, skor per aspek (mini bar chart), ringkasan feedback
3. **Academy** — Courses in progress, completed courses, quiz scores, total watch time, certificates earned
4. **Komunitas** — Post/reply history, reputation score, badges earned
5. **Events** — Tournament history, placement, performance stats
6. **Badges** — Semua badge yang dimiliki (grid), grayed out badges yang belum (motivasi)

**Talent Score Section (prominent):**
- Large circle with score (e.g., 78)
- Breakdown:
  - Skill Signal: 82 (40%) — dari evaluasi + event results
  - Mindset Signal: 75 (30%) — dari reputasi komunitas - toxicity
  - Commitment Signal: 72 (30%) — dari login consistency + LMS progress + missions
- Trend chart (6 bulan terakhir)
- "Threshold scouting: 85. Kamu butuh 7 poin lagi."

---

## 5.5 ACADEMY / LMS

### Course Catalog (`/academy`)
- **Filter bar:** Game (MLBB/FF/All), Level (Beginner→Expert), Category (Hard Skill/Soft Skill/Mental/Wellness/Career), Status (All/In Progress/Completed)
- **Course cards grid (2 kolom mobile, 3 desktop):**
  - Thumbnail/emoji, title, game badge, level badge
  - Progress bar (jika sudah mulai)
  - Lesson count, total duration
  - Lock icon jika tier tidak cukup
  - "Free Preview" badge jika ada preview lesson

### Course Detail (`/academy/[courseId]`)
- Course header: title, description, instructor/coach name, level, duration, lesson count
- Progress bar overall
- Module list (accordion):
  - Module 1: Fundamental
    - ✅ Lesson 1.1: Pengenalan Role Jungler (8:30) — completed
    - ✅ Lesson 1.2: Pathing Dasar (12:15) — completed
    - ▶️ Lesson 1.3: Timing Objective (10:45) — current
    - 🔒 Lesson 1.4: Quiz Modul 1
  - Module 2: Intermediate (locked if Module 1 not complete)

### Lesson Player (`/academy/[courseId]/[lessonId]`)
- **Video player** (full width mobile, 70% width desktop)
  - Custom controls, progress bar, playback speed
  - Watermark overlay (nama user + timestamp semi-transparan)
  - No download button
- **Below video:**
  - Lesson title + description
  - "Tandai Selesai" button
  - Next lesson button
  - Related discussion thread link (ke community)
- **Sidebar (desktop):** Lesson list for quick navigation
- **Quiz view:** Multiple choice, timer, score, pass/fail, retry

---

## 5.6 COMMUNITY (`/community`)

### Feed View
- **Tab:** Semua | MLBB | Free Fire | Soft Skills | Mental | Off-Topic
- **Sort:** Terbaru | Trending | Most Liked
- **Create Post button** (hanya Silver+, tooltip untuk Free: "Upgrade ke Silver untuk posting")
- **Post cards:**
  - Author avatar, nickname, tier badge, reputation badge
  - Post title (bold), preview 2 baris
  - Category tag, game tag
  - Stats: 💬 12 replies, ❤️ 34 likes, 👁️ 128 views
  - Timestamp: "2 jam lalu"
  - Reaction buttons (untuk Free Member: like/vote saja)

### Post Detail (`/community/[postId]`)
- Full post content
- Reaction bar: 👍 Like, 💡 Insightful, 🔥 Fire
- Reply list (threaded)
- Reply input (Silver+)
- Report button (icon kecil)
- Related posts sidebar

### Free Member Restrictions
- Bisa baca semua post
- Bisa react/vote
- TIDAK bisa post atau reply
- Banner di atas: "Ingin ikut berdiskusi? Upgrade ke Silver untuk mulai posting."

---

## 5.7 EVALUATION

### Submit Gameplay (`/evaluation/submit`) — Gold+
- Form:
  - Game: MLBB / Free Fire (dropdown)
  - Hero/Character played
  - Match context (ranked, scrim, tournament)
  - Gameplay URL (YouTube/Google Drive link) atau upload
  - Deskripsi singkat: "Apa yang ingin kamu tingkatkan?"
  - Priority option (bayar extra untuk review lebih cepat)
- Setelah submit: status card "Menunggu assignment... Estimasi review: 24-48 jam"

### Review History (`/evaluation/history`)
- List semua submissions, sorted by date
- Status badges: Queued (kuning), In Review (biru), Completed (hijau)
- Click untuk lihat review detail

### Review Detail (`/evaluation/[reviewId]`)
- **Header:** Hero, tanggal, coach name + foto
- **Skor rubrik:** 5 bars horizontal
  - Mechanical Skill: ████░ 4/5
  - Game Sense: ███░░ 3/5
  - Hero Mastery: ████░ 4/5
  - Teamwork: ███░░ 3/5
  - Mental: ████░ 4/5
- **Feedback text** (formatted markdown)
- **Improvement Plan:**
  - ☑️ Action item 1: "Fokus latihan timing retribution di Turtle/Lord..."
  - ☑️ Action item 2: "Review replay sendiri minimal 1x sebelum submit lagi..."
- **Rate this review:** 4 aspek × 5 bintang
- **Comparison:** "vs Review sebelumnya" (mini trend chart per aspek)

---

## 5.8 EVENTS (`/events`)

### Event List
- **Tab:** Upcoming | Live | Completed
- **Event cards:**
  - Title, game badge, format badge (5v5/Squad/Solo)
  - Date & time
  - Tier required badge
  - Participant count: "24/32 slot"
  - Status badge
  - CTA: "Daftar" / "Lihat Bracket" / "Lihat Hasil"

### Event Detail (`/events/[eventId]`)
- Event info: description, rules, format, prizes
- Registration form (jika upcoming)
- Bracket view (jika tournament)
- Leaderboard (jika completed)
- Live score (jika live — real-time via WebSocket)

---

## 5.9 SCOUTING (Talent Board)

### For Players (read-only glimpse)
- Di profil: "Talent Score: 78/100. Threshold scouting: 85."
- Progress indicator ke threshold
- "Pemain dengan Talent Score ≥85 otomatis masuk Talent Board dan dapat dilihat oleh tim scouting IXON Esport."

### For Scouting Role (`/scouting/talent-board`)
- **Table/grid of players** sorted by Talent Score descending
- Filters: Game, Rank, Role, Score range
- Per player row:
  - Avatar, nickname, rank, role
  - Talent Score (large, color-coded: green ≥85, yellow 70-84, red <70)
  - Breakdown mini-bars (Skill/Mindset/Commitment)
  - Quick actions: View Profile, Add to Shortlist, Invite Trial
- **Shortlist tab:** Saved players for further review
- **Invite Trial:** Form with message, trial date, location

---

## 5.10 GAMIFICATION

### Daily Missions (`/missions`)
- 3 daily missions (rotating)
- Weekly challenge (bonus XP)
- Mission completion animations (confetti, XP pop)
- Streak counter: "🔥 7 hari berturut-turut!"

### Leaderboard (`/leaderboard`)
- **Tab:** Talent Score | XP | Community Reputation
- **Filter:** Game, Role, Rank tier, Timeframe (weekly/monthly/all-time)
- Top 3 highlighted (gold/silver/bronze)
- User's own position highlighted: "Kamu di posisi #47"
- Tier-based leaderboard option (hanya dibandingkan dengan rank setara)

### Badges & Achievements
- Displayed di profil
- Categories: Learning, Community, Competition, Consistency, Special
- Contoh: "🎓 First Course Completed", "🔥 7-Day Streak", "⭐ Clean Player (90 hari tanpa report)", "🏆 Tournament Winner", "📝 First Evaluation"

### XP & Level System
- XP earned from: lessons, quizzes, missions, community posts, evaluations
- Level up: visual celebration, unlocks (profile frame, badge)
- XP bar always visible di dashboard dan navbar

---

## 5.11 MENTAL & WELLNESS (`/mental` & `/wellness`)

### Mental Performance
- **Content library:** Articles/videos tentang tilt management, performance anxiety, focus techniques, burnout prevention
- **Self-assessment:** Quick check-in mood/stress level (1-5 scale)
- **Tips of the day:** Rotating mental performance tips
- Format: card-based, bisa bookmark

### Physical Wellness
- **Daily check-in form:**
  - Tidur berapa jam? (slider 0-12)
  - Olahraga hari ini? (yes/no)
  - Istirahat mata? (yes/no)
  - Kondisi tangan/pergelangan? (fine/uncomfortable/painful)
  - Mood overall (1-5 emoji scale)
- **Streak tracker:** "🏃 5 hari check-in berturut-turut"
- **Tips & micro-content:** Ergonomi, sleep hygiene, stretching exercises (dengan ilustrasi)
- **Wellness Score** (optional, bisa pengaruhi Talent Score di masa depan)

---

## 5.12 CAREER PATHWAY (`/career`)

### Pathway Catalog
- Cards per pathway:
  - 🎙️ Coach Certification (3 bulan, Rp 3-5 juta)
  - 📊 Game Analyst (3 bulan, Rp 3-5 juta)
  - 🎤 Caster & Broadcasting (2 bulan, Rp 2-3 juta)
  - 👔 Team Manager / Operations (3 bulan, Rp 5-8 juta)
  - 🎪 Event Organizer (2 bulan, Rp 3-5 juta)
  - 📱 Content Creator (2 bulan, Rp 3-5 juta)
- Each card: icon, title, duration, price, key outcomes, "Pelajari Selengkapnya"

### Pathway Detail (`/career/[pathwayId]`)
- Overview: deskripsi, siapa yang cocok, prerequisites
- Kurikulum outline (modules & lessons)
- Outcomes: "Setelah lulus, kamu bisa..."
- Sertifikasi: "IXON Academy Certificate — Verified by ESI" (dengan badge)
- Testimonials (mock)
- CTA: "Daftar Sekarang" dengan opsi pembayaran

### Certification View
- Digital certificate card (shareable)
- Certificate number
- ESI verification badge (jika applicable)
- Skills acquired list
- "Tambahkan ke LinkedIn" button

---

## 5.13 MEMBERSHIP (`/membership`)

### Pricing Page
- 4 tier columns: Free / Silver / Gold / Platinum
- Current tier highlighted with "Tier Kamu Sekarang" badge
- Feature comparison checklist
- Gold highlighted as "Paling Populer" (decoy effect)
- CTA per tier: "Upgrade Sekarang"
- Student discount badge: "Diskon 30% untuk Pelajar"
- Micro-pricing option di bawah: "Belum siap langganan? Coba 1 Review = Rp XX.000"

### Subscription Management
- Current plan details
- Next billing date
- Upgrade/downgrade options
- Pause subscription (retain, don't lose)
- Cancel (with retention flow: "Yakin? Kamu akan kehilangan...")
- Payment history

---

## 5.14 PARENT PORTAL (`/parent`)

### Parent Dashboard
- Login terpisah (linked ke akun anak melalui parent_links)
- **Overview per anak:**
  - Nama, game, tier, level
  - Learning hours this week (chart)
  - Course progress summary
  - Quiz scores
  - Community behavior: attitude score, any reports?
  - Talent Score trend
- **Weekly Report** (auto-generated):
  - "Minggu ini, [Nama] menyelesaikan 3 lessons, mengerjakan 2 quiz (rata-rata 85%), dan aktif di komunitas dengan 0 report."
- **Career information section:** Artikel tentang karir esports yang legitimate, earning potential, success stories
- **Time management data:** Jam aktif per hari di platform
- UX note: bahasa formal dan reassuring, bukan bahasa gamer

---

## 5.15 COACH DASHBOARD (`/coach`)

### Queue (`/coach/queue`)
- List submissions yang di-assign ke coach ini
- Priority sorting: overdue first, then priority reviews, then normal
- Per submission: player name, game, hero, submitted time, SLA countdown
- "Start Review" button

### Review Interface (`/coach/review/[submissionId]`)
- **Left panel:** Video player (gameplay)
- **Right panel:** Review form
  - 5 aspek rubrik: slider 1-5 per aspek + comment per aspek
  - Feedback text (rich text editor, minimum 150 kata counter)
  - Improvement plan (2+ action items, add/remove)
  - Timer: sudah berapa menit reviewing (minimum 8 menit)
  - "Submit Review" (disabled jika belum meet minimum requirements)
  - Auto-save draft

### Wallet (`/coach/wallet`)
- Balance besar di atas
- "Request Withdrawal" button
- Transaction history: review payments, bonuses, withdrawals
- Earning chart (monthly)

### Performance (`/coach/performance`)
- CQS Score (besar, color-coded)
- Breakdown: Avg Player Rating, Rubrik Completeness, Audit Score
- Rating distribution chart
- Total reviews completed
- Avg review time
- Alerts jika ada flag (review terlalu cepat, rating rendah berturut-turut)

---

## 5.16 ADMIN PANEL (`/admin`)

### Dashboard (`/admin/dashboard`)
- Key metrics: Total users, DAU, MAU, MRR, conversion rates
- Charts: User growth, Revenue trend, Active coaches, Review volume
- Alerts: SLA breaches, flagged reviews, reported posts

### User Management (`/admin/users`)
- Search, filter by tier/game/role
- User detail: full profile, subscription history, moderation history
- Actions: change tier, ban, warn, view as user

### Content Management (`/admin/content`)
- Course CRUD
- Lesson CRUD with video upload
- Quiz management
- Community post moderation

### Moderation (`/admin/moderation`)
- Reported posts queue
- Auto-flagged content (keyword filter hits)
- User warning/ban management
- Moderation log

### Coach Management (`/admin/coaches`)
- Coach list with CQS scores
- Review audit queue (10% random selection)
- Hiring pipeline status
- Capacity planning view

### Analytics (`/admin/analytics`)
- Funnel: Guest → Free → Silver → Gold → Platinum (with conversion rates)
- Cohort analysis
- Churn analysis
- LMS engagement: most/least popular courses, completion rates
- Community health: posts/day, toxicity rate, report response time
- Evaluation metrics: avg turnaround, SLA compliance, avg rating

---

## 5.17 NOTIFICATIONS

### In-App Notification Center (bell icon di navbar)
- Dropdown list of recent notifications
- Unread count badge
- Types:
  - Review selesai → link ke review
  - Reply di post → link ke post
  - Mention → link ke post
  - Mission completed → dashboard
  - Level up → profile
  - Tier expiring → membership
  - Event reminder → event
  - Trial invitation → profile (Scouting)

### WhatsApp Notifications (backend)
- Templates sesuai blueprint v1.2 (OTP, review selesai, pengingat bayar, daily mission, undangan trial)
- Max 5/hari, quiet hours 22:00-08:00 WIB
- Fallback: WA → SMS → Email → In-App

---

## 5.18 MARKETPLACE (`/marketplace`)

### Product List
- Categories: Voucher Diamond, Merchandise, Konten Premium
- Product cards: image, title, price, "Beli" CTA
- Simple cart & checkout flow

---

## 5.19 ALUMNI NETWORK & MENTORSHIP (`/mentorship`)

### Mentor Directory
- **Grid/list of available mentors:**
  - Photo, nickname, ex-team (e.g., "Ex-IXON Esport MLBB"), role, years of experience
  - Specialization tags: "Jungling", "Draft Strategy", "Mental Coaching", "Career Transition"
  - Rating (dari mentee sebelumnya)
  - Availability status: "Available" / "Fully Booked"
  - CTA: "Request Mentoring Session"
- **Filter:** Game, Specialization, Availability, Rating

### Mentor Profile (`/mentorship/[mentorId]`)
- Bio lengkap, career history, achievements
- Expertise areas
- Testimonials dari mentee
- Available session types:
  - 🎯 1-on-1 Session (30 min, voice/video) — focused topic
  - 👥 Group Mentoring (1 mentor + 5 mentee, 60 min) — weekly
  - ❓ AMA (Ask Me Anything) — public di community, terjadwal
  - 👁️ Shadow Session — mentee mengamati mentor bermain/coaching (spectate mode)
- Calendar booking widget

### My Mentoring (`/mentorship/my-sessions`)
- Upcoming sessions (card per session: mentor, date/time, topic, join link)
- Past sessions (with notes, rating)
- "Become a Mentor" CTA (untuk ex-pro / senior players yang eligible)

### Become a Mentor Flow
- Application form: experience, specialization, availability hours/week
- Review oleh admin
- Onboarding: guidelines, code of conduct
- Compensation: per-session payment atau reputation/badge reward

---

## 5.20 GAME SWITCHER

### UI Behavior
- **Game selector di navbar/sidebar:** Icon MLBB 🔵 dan FF 🟡 (toggle pills)
- Switching game mengubah konteks seluruh app:
  - Dashboard menunjukkan stats untuk game yang dipilih
  - Academy menampilkan courses untuk game tersebut
  - Community default filter ke game tersebut
  - Leaderboard filter ke game tersebut
  - Profile menunjukkan player profile untuk game tersebut
- **Cross-game sections** tidak terpengaruh: Mental, Wellness, Soft Skills, Career, Parent Portal
- **Jika user hanya punya 1 game profile:** Tidak tampilkan switcher, auto-select
- **Jika user punya 2 game profiles:** Switcher selalu visible, terakhir dipilih di-remember (localStorage)
- **Badge count per game di switcher:** "3 misi" / "1 review baru"

---

## 5.21 GLOBAL SEARCH (`/search`)

### Search Bar
- Positioned di navbar (icon 🔍, expand on click di mobile)
- Keyboard shortcut: Ctrl+K / Cmd+K (desktop)
- Debounced search (300ms)
- Instant results dropdown saat typing (max 5 per category)

### Search Results Page
- **Tab categories:**
  - 📚 Courses (title, description match)
  - 💬 Forum Posts (title, content match)
  - 👤 Players (nickname match)
  - 🏆 Events (title match)
  - 🎓 Career Pathways (title match)
- Results per tab: thumbnail/icon, title, snippet with highlighted match, metadata
- PostgreSQL full-text search (`tsvector`, `tsquery`) untuk performa

---

## 5.22 SETTINGS (`/settings`)

### Sections:

**Account**
- Edit nama, email, phone
- Change password
- Linked game profiles (manage MLBB/FF profiles)

**Appearance**
- Dark mode / Light mode toggle (default: dark)
- Compact mode (less spacing — untuk HP layar kecil)

**Notifications**
- Toggle per tipe: Review selesai, Community replies, Daily missions, Events, Promotions
- Channel preference: WhatsApp / Email / In-App only
- Quiet hours setting

**Privacy**
- Profile visibility: Public / Members only / Private
- Show on leaderboard: Yes / No
- Show on Talent Board: Yes / No (default Yes, bisa opt-out)

**Parental**
- Link ke akun orang tua (generate invite code)
- Consent management

**Data & Akun**
- Download my data (GDPR/UU PDP compliance)
- **Delete account** (hard delete, dengan konfirmasi berlapis: ketik "HAPUS AKUN SAYA")
- Deactivate (soft, bisa reaktivasi dalam 30 hari)

**About**
- App version
- Terms of Service link
- Privacy Policy link
- Contact support

---

## 5.23 CV ESPORTS / PROFILE EXPORT

### Generate CV (`/profile/export`)
- **Preview card (shareable):**
  - Player avatar, nickname, real name (opsional)
  - Game(s), Rank, Role
  - Talent Score (large, with breakdown)
  - Top 3 skills (dari radar chart)
  - Badges earned (top 5)
  - Stats: courses completed, reviews received, event participations
  - Certifications (jika ada, dari Career Pathway)
  - QR code linking ke public profile
- **Export options:**
  - 📸 Download as Image (PNG) — untuk share di WA/IG/Twitter
  - 📄 Download as PDF
  - 🔗 Copy shareable link (public profile URL)
  - 📋 Copy to clipboard (text format — untuk paste ke form lamaran)
- **Public Profile URL:** `academy.ixon.id/player/[nickname]` — viewable tanpa login

---

## 5.24 COACH APPLICATION FLOW

### For Applicants (`/become-coach`)
- **Landing section:** "Jadikan Pengalaman Gaming-mu Bernilai. Bergabung sebagai Coach IXON Academy."
- Benefits: flexible schedule, per-review payment, quality bonus, dashboard profesional
- Requirements: minimum rank, minimum playtime proof, willingness to follow rubric standards

### Application Form
- Step 1: Personal info (auto-fill dari existing account)
- Step 2: Game expertise — game, role specialization, rank proof (screenshot), years playing
- Step 3: Experience — pernah coaching sebelumnya? Tim apa? Atau ex-pro player?
- Step 4: Sample review — diberi gameplay recording, tulis review menggunakan rubrik IXON (ini sekaligus assessment)
- Submit → Status: "Under Review"

### Admin Side (`/admin/coach-applications`)
- Application queue
- Review sample review quality
- Approve / Reject with feedback
- Auto-create CoachProfile + CoachWallet on approval

### Coach Onboarding (post-approval)
- Welcome page: "Selamat! Kamu diterima sebagai Coach IXON Academy."
- Mandatory training checklist:
  - ✅ Baca panduan rubrik evaluasi
  - ✅ Tonton video training "Cara Memberikan Feedback yang Efektif"
  - ✅ Selesaikan 1 practice review (tidak dikirim ke player, di-review oleh Head Coach)
- Setelah checklist complete → akses ke Coach Dashboard terbuka

---

## 5.25 REFERRAL PROGRAM

### How It Works
- Setiap user punya unique referral code dan shareable link
- Located di: Profile page + Settings + dedicated `/referral` page
- **Reward structure:**
  - Referrer: 7 hari free upgrade ke tier berikutnya (atau XP bonus jika sudah max tier)
  - Referee: 7 hari free Silver (jika registrasi via referral link)
- **Tracking:** referral dashboard menunjukkan: link, total shares, signups, successful referrals

### UI
- Share card: "Ajak temanmu ke IXON Academy! Kamu dan temanmu masing-masing dapat 7 hari gratis."
- Share buttons: Copy Link, WhatsApp, Instagram Story
- Leaderboard referral (optional gamification)

---

## 5.26 STUDENT DISCOUNT VERIFICATION

### Flow (`/membership/student-verify`)
- **Option A: Email .ac.id**
  - Input email kampus → kirim verification link → click link → verified
  - Auto-apply 30% discount ke semua tiers
  
- **Option B: Upload Kartu Pelajar**
  - Upload foto kartu pelajar (KTM/kartu SMA)
  - Admin review (manual, queue di admin panel)
  - Approve → 30-50% discount applied
  - Reject → notifikasi dengan alasan + opsi re-upload

### Admin Side
- Student verification queue (`/admin/student-verifications`)
- View uploaded document, approve/reject

### Display
- "🎓 Student Discount" badge di pricing page
- "Punya email kampus? Dapatkan diskon hingga 50%!" banner di membership page

---

## 5.27 ONBOARDING FLOW (Post-Register)

### First-Time User Experience
Setelah register + OTP verified + game profile filled, user masuk ke onboarding flow:

**Step 1: Welcome Screen**
- "Selamat datang di IXON Academy, [Nickname]! 🎮"
- Animasi singkat yang menunjukkan journey: Belajar → Evaluasi → Kompetisi → Trial
- "Mulai Perjalananmu" CTA

**Step 2: Pilih Tujuanmu (personalisasi)**
- "Apa yang ingin kamu capai di IXON Academy?"
  - 🏆 "Saya ingin menjadi pro player" → prioritaskan LMS + Evaluation di dashboard
  - 🎓 "Saya ingin belajar dan improve" → prioritaskan LMS + Community
  - 💼 "Saya tertarik berkarir di industri esports" → prioritaskan Career Pathway
  - 🎯 "Saya ingin semuanya!" → default dashboard
- Jawaban ini mempengaruhi urutan menu dan content recommendation

**Step 3: Quick Tour (3 tooltips overlay)**
- Tooltip 1: "Ini Dashboard-mu. Lihat misi harian, progress, dan aktivitas terbaru."
- Tooltip 2: "Buka Academy untuk mulai belajar dari kurikulum terstruktur."
- Tooltip 3: "Talent Score-mu akan meningkat seiring aktivitasmu. Semakin tinggi, semakin besar peluang di-scout!"
- Skip option: "Lewati Tour"

**Step 4: First Mission**
- Auto-assign first mission: "Selesaikan profil kamu (+50 XP)"
- Guide: isi hero pool, bio singkat
- Completion → confetti animation → "Level 1! Perjalananmu dimulai."

**Step 5: Landing di Dashboard**
- Dashboard dengan semua sections, first mission highlighted
- Upgrade banner (soft, tidak aggressive): "Kamu sekarang di Free tier. Lihat apa yang bisa kamu buka dengan Silver."

---

## 5.28 WEEKLY DIGEST (WhatsApp + In-App)

### For Free Members (hook untuk upgrade)
Setiap Senin pagi (09:00 WIB) via WhatsApp:

**Template:**
```
🎮 IXON Academy Weekly Digest

📊 Minggu ini di komunitas:
• [Post title #1 — most liked] (87 likes)
• [Post title #2 — most discussed] (23 replies)
• [Post title #3 — trending]

🏆 Leaderboard highlight:
• #1 PhoenixBlade (Talent Score: 87)
• Posisi kamu: #47

📚 Course baru: "Advanced Rotation & Macro Play"

💬 Ingin ikut diskusi? Upgrade ke Silver →
[link ke membership page]
```

### In-App Version
- Notification card di dashboard setiap Senin
- Same content tapi dengan richer formatting (images, links)
- Archive: bisa lihat digest minggu-minggu sebelumnya

---

## 5.29 ERROR STATES & EMPTY STATES

### Empty States (per section)
Setiap section yang belum ada data harus punya empty state yang helpful, bukan blank.

- **Dashboard (new user):** Illustration + "Mulai petualanganmu! Selesaikan misi pertamamu." + CTA ke first mission
- **Academy (no courses started):** "Belum mulai belajar? Pilih course pertamamu." + CTA ke course catalog
- **Community (no posts):** "Forum masih sepi? Jadilah yang pertama!" (Silver+) / "Upgrade ke Silver untuk mulai posting." (Free)
- **Evaluation (no submissions):** "Belum pernah submit gameplay? Kirim rekamanmu dan dapatkan feedback dari coach profesional." + CTA
- **Evaluation (no reviews yet):** "Review sedang diproses... ⏳ Estimasi selesai: [time]"
- **Events (no upcoming):** "Belum ada event yang dijadwalkan. Stay tuned!" + "Aktifkan notifikasi agar tidak ketinggalan."
- **Leaderboard (user not ranked):** "Kamu belum masuk leaderboard. Selesaikan lebih banyak misi dan course untuk mulai ranking!"
- **Badges (none earned):** Ghost badges yang grayed out + "Selesaikan tantangan untuk membuka badge pertamamu."
- **Mentorship (no sessions):** "Belum punya mentor? Temukan mentor yang sesuai dengan tujuanmu." + CTA ke mentor directory

### Error States
- **Network error:** "Koneksi terputus. Cek internet kamu dan coba lagi." + Retry button
- **Server error (500):** "Terjadi kesalahan. Tim kami sudah diberitahu. Coba lagi dalam beberapa menit."
- **Not found (404):** "Halaman tidak ditemukan. Mungkin sudah dipindahkan atau dihapus." + "Kembali ke Dashboard"
- **Forbidden (403):** "Akses terbatas. Fitur ini membutuhkan [tier]. Upgrade sekarang?" + CTA upgrade
- **Session expired:** "Sesi kamu sudah berakhir. Silakan login kembali."

---

## 5.30 CONTENT SECURITY IMPLEMENTATION

### Video Watermark
- Overlay semi-transparan di atas video player (CSS positioned, bukan baked into video)
- Content: "{nickname} • {date} • IXON Academy"
- Position: rotating setiap 30 detik antara corners dan center
- Opacity: 0.15 (terlihat jika di-screenshot, tidak mengganggu viewing)

### Signed URL Flow
```
1. User request lesson page
2. Server checks: user authenticated? tier sufficient? session valid?
3. Server generates signed URL ke Bunny.net (expires: 2 jam)
4. Frontend receives signed URL, loads into video player
5. Bunny.net validates signature + expiry + referer (academy.ixon.id only)
6. Video streams via HLS (tidak bisa di-download)
```

### Session Concurrency
- Saat login: check if user sudah punya active session di device lain
- Jika ya: "Kamu sudah login di perangkat lain. Lanjutkan di sini? Perangkat lain akan di-logout."
- Enforce: max 1 concurrent session per user
- Implementation: Redis session store, check session count per user_id

---

## 5.31 RESPONSIVE LAYOUT SPEC

### Breakpoints
```
Mobile:   < 640px   — Bottom nav, single column, full-width cards
Tablet:   640-1024px — Bottom nav or sidebar (collapsible), 2-column grid
Desktop:  > 1024px   — Sidebar always visible, 2-3 column grid, wider cards
```

### Layout Differences

**Mobile (Primary — 70%+ users):**
- Bottom navigation (5 items: Home, Academy, Forum, Review, Profile)
- Hamburger menu for secondary nav (Events, Leaderboard, Missions, Career, etc.)
- Full-width cards, stacked vertically
- Video player: full width, 16:9
- Game switcher: horizontal pills di atas dashboard
- Search: icon di navbar, expand ke full-screen search overlay

**Tablet:**
- Collapsible sidebar (hamburger toggle)
- 2-column card grid
- Video player: 70% width with lesson sidebar

**Desktop:**
- Persistent sidebar (260px)
- 2-3 column card grid
- Video player: 65% width with lesson sidebar
- Coach review: split view (video left, rubric right)
- Admin: full data tables with pagination

---

## 5.32 REAL-TIME EVENTS (Socket.io)

### Channels & Events

```typescript
// ── NOTIFICATION CHANNEL (per user) ──
// Room: `user:{userId}`
socket.on('notification:new', (data: {
  id: string, type: string, title: string, body: string, data?: any
}) => {})

// ── COMMUNITY CHANNEL ──
// Room: `community` or `community:{gameId}`
socket.on('post:new', (data: { post: CommunityPost }) => {})
socket.on('reply:new', (data: { postId: string, reply: CommunityReply }) => {})
socket.on('reaction:update', (data: { postId: string, reactionsCount: number }) => {})

// ── EVALUATION CHANNEL (per user) ──
// Room: `evaluation:{userId}`
socket.on('submission:status', (data: { submissionId: string, status: string }) => {})
socket.on('review:complete', (data: { submissionId: string, reviewId: string }) => {})

// ── COACH CHANNEL ──
// Room: `coach:{coachId}`
socket.on('queue:new', (data: { submission: EvaluationSubmission }) => {})
socket.on('queue:update', (data: { queueLength: number }) => {})

// ── EVENT CHANNEL (per event) ──
// Room: `event:{eventId}`
socket.on('event:participant_join', (data: { eventId: string, count: number }) => {})
socket.on('event:live_score', (data: { eventId: string, scores: any }) => {})
socket.on('event:status_change', (data: { eventId: string, status: string }) => {})

// ── PRESENCE CHANNEL ──
// Room: `presence:coaches`
socket.on('coach:online', (data: { coachId: string }) => {})
socket.on('coach:offline', (data: { coachId: string }) => {})
```

### Connection Management
```typescript
// Auto-reconnect with exponential backoff
// Authenticate via JWT token on connection
// Join rooms based on user role:
//   - Player: user:{id}, community, evaluation:{id}
//   - Coach: user:{id}, coach:{id}, presence:coaches
//   - Scouting: user:{id}, talent-board
//   - Admin: user:{id}, admin
```

---

# 6. ROLE & PERMISSION MATRIX

| Feature | Guest | Free | Silver | Gold | Platinum | Coach | Scouting | Admin | Parent |
|---------|-------|------|--------|------|----------|-------|----------|-------|--------|
| Landing page | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Register/Login | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Community read | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Community react/vote | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Community post/reply | ❌ | ❌ | ✅* | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| LMS preview | ❌ | ✅** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| LMS full access | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Mini-quiz (1/week) | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Submit evaluation | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View own reviews | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Events view | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Events participate | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Scrim simulation | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Leaderboard view | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Daily missions | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Weekly digest (WA) | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Wellness check-in | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Mental content | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Career pathways | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Mentorship (mentee) | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Mentorship (mentor) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Game switcher | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Global search | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Settings | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CV Esports export | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Become a coach | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Referral program | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Student discount | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Mentorship (as mentee) | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Mentorship (as mentor) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| CV Export | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Public profile | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Global search | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Referral program | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Student discount | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Settings / Account | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Coach dashboard | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Coach application | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Talent Board | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Admin panel | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Parent dashboard | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Marketplace | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |

\* Silver: Post setelah 3 hari cooling period
\*\* Free: Hanya free preview lessons

---

# 7. API ENDPOINTS (Summary)

```
AUTH
POST   /api/auth/register
POST   /api/auth/verify-otp
POST   /api/auth/login
POST   /api/auth/forgot-password
POST   /api/auth/logout

PLAYER
GET    /api/player/profile
PUT    /api/player/profile
GET    /api/player/dashboard
GET    /api/player/talent-score
GET    /api/player/badges
GET    /api/player/activity-feed

ACADEMY
GET    /api/courses?game=&level=&category=
GET    /api/courses/:id
GET    /api/courses/:id/lessons
GET    /api/lessons/:id
POST   /api/lessons/:id/complete
GET    /api/quizzes/:id
POST   /api/quizzes/:id/submit
GET    /api/user/course-progress

COMMUNITY
GET    /api/posts?game=&category=&sort=
GET    /api/posts/:id
POST   /api/posts
POST   /api/posts/:id/replies
POST   /api/posts/:id/react
POST   /api/posts/:id/report
GET    /api/user/reputation

EVALUATION
POST   /api/evaluations/submit
GET    /api/evaluations/my-submissions
GET    /api/evaluations/:id
POST   /api/evaluations/:id/rate

COACH
GET    /api/coach/queue
GET    /api/coach/review/:submissionId
POST   /api/coach/review/:submissionId/submit
GET    /api/coach/wallet
POST   /api/coach/wallet/withdraw
GET    /api/coach/performance

EVENTS
GET    /api/events?status=&game=
GET    /api/events/:id
POST   /api/events/:id/register
GET    /api/events/:id/results

SCOUTING
GET    /api/scouting/talent-board?game=&role=&min_score=
POST   /api/scouting/shortlist/:playerId
POST   /api/scouting/invite/:playerId

GAMIFICATION
GET    /api/missions/daily
POST   /api/missions/:id/complete
GET    /api/leaderboard?type=&game=&timeframe=

WELLNESS
POST   /api/wellness/checkin
GET    /api/wellness/history
GET    /api/wellness/streak

CAREER
GET    /api/career/pathways
GET    /api/career/pathways/:id
POST   /api/career/pathways/:id/enroll
GET    /api/career/certifications

MEMBERSHIP
GET    /api/membership/plans
POST   /api/membership/upgrade
POST   /api/membership/pause
POST   /api/membership/cancel
GET    /api/membership/history

NOTIFICATIONS
GET    /api/notifications
POST   /api/notifications/:id/read
POST   /api/notifications/read-all

PARENT
GET    /api/parent/children
GET    /api/parent/children/:id/report
GET    /api/parent/children/:id/progress

ADMIN
GET    /api/admin/dashboard-stats
GET    /api/admin/users?search=&tier=&role=
PUT    /api/admin/users/:id
GET    /api/admin/moderation/queue
POST   /api/admin/moderation/:id/action
GET    /api/admin/coaches
GET    /api/admin/coach-applications
POST   /api/admin/coach-applications/:id/approve
POST   /api/admin/coach-applications/:id/reject
GET    /api/admin/student-verifications
POST   /api/admin/student-verifications/:id/approve
GET    /api/admin/analytics/:type

MENTORSHIP
GET    /api/mentorship/mentors?game=&specialization=
GET    /api/mentorship/mentors/:id
POST   /api/mentorship/sessions/request
GET    /api/mentorship/sessions/my
POST   /api/mentorship/sessions/:id/rate
POST   /api/mentorship/apply (become mentor)

SEARCH
GET    /api/search?q=&type= (type: courses|posts|players|events|pathways)

REFERRAL
GET    /api/referral/my-code
GET    /api/referral/stats
POST   /api/referral/validate/:code

SETTINGS
GET    /api/settings
PUT    /api/settings/profile
PUT    /api/settings/notifications
PUT    /api/settings/privacy
POST   /api/settings/delete-account
GET    /api/settings/export-data

STUDENT DISCOUNT
POST   /api/student/verify-email
POST   /api/student/upload-card
GET    /api/student/status

COACH APPLICATION
POST   /api/coach-application/submit
GET    /api/coach-application/status
GET    /api/coach-application/onboarding-checklist
POST   /api/coach-application/onboarding/:step/complete

CV EXPORT
GET    /api/profile/export/data
GET    /api/profile/export/image
GET    /api/profile/export/pdf
GET    /api/profile/public/:nickname
```

---

# 8. THIRD-PARTY INTEGRATIONS

| Service | Purpose | Priority |
|---------|---------|----------|
| Midtrans | Primary payment gateway (QRIS, VA, e-wallet) | P0 |
| Xendit | Fallback payment gateway | P1 |
| Bunny.net Stream | Video hosting (HLS, anti-download, signed URLs) | P0 |
| Fonnte/Wablas | WhatsApp gateway (OTP, notifications) | P0 |
| Socket.io | WebSocket (real-time notifications, live feed) — self-hosted | P0 |
| Resend/Mailgun | Transactional email (fallback dari WA) | P1 |
| Sentry | Error tracking | P1 |
| Cloudflare | CDN, DDoS protection (opsional, Nginx sudah cukup untuk MVP) | P2 |

---

# 9. MOCK DATA SPECIFICATION

Untuk prototype, gunakan mock data berikut:

## Players (5 mock users)
```json
[
  { "nickname": "TENSAI", "rank": "Mythic Glory", "role": "Jungler", "game": "MLBB", "tier": "Gold", "talentScore": 78, "level": 14 },
  { "nickname": "PhoenixBlade", "rank": "Mythic V", "role": "Gold Laner", "game": "MLBB", "tier": "Platinum", "talentScore": 87, "level": 22 },
  { "nickname": "ShadowFF", "rank": "Heroic", "role": "Rusher", "game": "Free Fire", "tier": "Silver", "talentScore": 61, "level": 8 },
  { "nickname": "IXONReaper", "rank": "Mythic IV", "role": "Roamer", "game": "MLBB", "tier": "Gold", "talentScore": 72, "level": 11 },
  { "nickname": "AceHunter", "rank": "Grandmaster", "role": "Sniper", "game": "Free Fire", "tier": "Gold", "talentScore": 69, "level": 9 }
]
```

## Courses (6 mock courses)
```json
[
  { "title": "Fundamental Jungling MLBB", "game": "MLBB", "level": "Beginner", "category": "hard_skill", "lessons": 12, "duration": "3 jam" },
  { "title": "Advanced Rotation & Macro Play", "game": "MLBB", "level": "Advanced", "category": "hard_skill", "lessons": 8, "duration": "4 jam" },
  { "title": "Free Fire: Survival Positioning", "game": "Free Fire", "level": "Beginner", "category": "hard_skill", "lessons": 10, "duration": "2.5 jam" },
  { "title": "Tilt Management & Mental Resilience", "game": null, "level": "All", "category": "mental", "lessons": 6, "duration": "1.5 jam" },
  { "title": "Public Speaking untuk Caster & Streamer", "game": null, "level": "All", "category": "soft_skill", "lessons": 8, "duration": "2 jam" },
  { "title": "Physical Wellness for Gamers", "game": null, "level": "All", "category": "wellness", "lessons": 5, "duration": "1 jam" }
]
```

## Community Posts (5 mock)
```json
[
  { "author": "PhoenixBlade", "title": "Tips Draft Pick Season 15 — Meta Jungler Terbaru", "game": "MLBB", "category": "guide", "replies": 23, "likes": 87, "views": 412, "time": "2 jam lalu" },
  { "author": "ShadowFF", "title": "Formasi terbaik untuk Squad Ranked Free Fire?", "game": "Free Fire", "category": "question", "replies": 15, "likes": 34, "views": 201, "time": "5 jam lalu" },
  { "author": "TENSAI", "title": "Review Coach Alex mengubah cara bermain saya", "game": "MLBB", "category": "discussion", "replies": 8, "likes": 56, "views": 324, "time": "1 hari lalu" },
  { "author": "IXONReaper", "title": "Cara mengatasi tilt setelah losing streak", "game": null, "category": "mental", "replies": 31, "likes": 112, "views": 567, "time": "2 hari lalu" },
  { "author": "AceHunter", "title": "Highlight gameplay saya di turnamen internal kemarin", "game": "Free Fire", "category": "highlight", "replies": 5, "likes": 28, "views": 156, "time": "3 hari lalu" }
]
```

## Events (3 mock)
```json
[
  { "title": "IXON Academy Cup Season 1", "game": "MLBB", "format": "5v5", "type": "tournament", "date": "25 Mar 2026", "tier": "Gold+", "slots": "24/32", "status": "upcoming" },
  { "title": "Weekly Scrim Session #12", "game": "MLBB", "format": "5v5", "type": "scrim", "date": "15 Mar 2026", "tier": "Platinum", "slots": "8/10", "status": "upcoming" },
  { "title": "Free Fire Squad Battle", "game": "Free Fire", "format": "Squad", "type": "tournament", "date": "20 Mar 2026", "tier": "Silver+", "slots": "16/20", "status": "registration" }
]
```

## Coach Review (1 detailed mock)
```json
{
  "coach": "Coach Alex",
  "player": "TENSAI",
  "hero": "Ling",
  "date": "10 Mar 2026",
  "scores": { "mechanical": 4, "gameSense": 3, "heroMastery": 4, "teamwork": 3, "mental": 4 },
  "feedback": "Mechanical skill Ling kamu sudah sangat solid — combo wall-dash dan timing ultimate sudah di atas rata-rata rank Mythic. Yang perlu ditingkatkan adalah game sense, terutama di area macro play. Kamu cenderung terlalu fokus farming di early game dan miss beberapa timing turtle yang krusial. Rotasi ke gold lane juga bisa lebih agresif di menit 3-5 ketika power spike Ling sudah tercapai. Secara teamwork, komunikasi shotcalling masih perlu ditingkatkan — beberapa teamfight terasa uncoordinated karena timing engage yang berbeda. Mental sangat baik, tidak terlihat tilt meskipun early game cukup sulit.",
  "improvementPlan": [
    "Latih timing rotasi: set timer setiap 2 menit untuk cek kondisi turtle/lord. Tonton replay pro player (Alberttt, Kairi) dan perhatikan kapan mereka meninggalkan farm untuk objective.",
    "Sebelum engage teamfight, selalu shotcall 'aku masuk dari [arah]' minimal 3 detik sebelumnya. Rekam 5 match berikutnya dan review apakah komunikasi ini sudah konsisten.",
    "Fokus improve game sense macro dari skor 3 ke 4 sebelum submit gameplay berikutnya. Rekomendasi: selesaikan course 'Advanced Rotation & Macro Play' terlebih dahulu."
  ]
}
```

## Career Pathways (3 mock)
```json
[
  { "title": "IXON Certified Coach", "duration": "3 bulan", "price": "Rp 3.500.000", "outcomes": ["Sertifikasi coach resmi", "Penempatan di IXON Academy", "Akses tools coaching profesional"], "icon": "🎙️" },
  { "title": "Esports Analyst Program", "duration": "3 bulan", "price": "Rp 3.000.000", "outcomes": ["Kemampuan analisis draft & meta", "Portfolio analisis profesional", "Pipeline ke tim esports"], "icon": "📊" },
  { "title": "Content Creator Bootcamp", "duration": "2 bulan", "price": "Rp 2.500.000", "outcomes": ["Skill streaming & content creation", "Personal brand yang kuat", "Monetisasi konten"], "icon": "📱" }
]
```

## Mentors (3 mock)
```json
[
  { "nickname": "Coach Alex", "realName": "Alexander Wijaya", "exTeam": "Ex-IXON Esport MLBB", "role": "Head Coach", "game": "MLBB", "specialization": ["Jungling", "Draft Strategy", "Macro Play"], "yearsExp": 4, "rating": 4.8, "sessionsCompleted": 47, "available": true, "bio": "Mantan pro player IXON Esport, 2 tahun pengalaman coaching di level MDL. Spesialisasi membina jungler dari Mythic ke Mythical Glory." },
  { "nickname": "Coach Rena", "realName": "Rena Maharani", "exTeam": "Ex-EVOS FF", "role": "Analyst & Coach", "game": "Free Fire", "specialization": ["Positioning", "Squad Coordination", "Clutch Mentality"], "yearsExp": 3, "rating": 4.6, "sessionsCompleted": 32, "available": true, "bio": "Mantan analyst EVOS Free Fire. Fokus pada decision-making di zone akhir dan squad synergy." },
  { "nickname": "Mentor Dika", "realName": "Andika Pratama", "exTeam": "Ex-RRQ", "role": "Career Mentor", "game": null, "specialization": ["Career Transition", "Personal Branding", "Mental Performance"], "yearsExp": 5, "rating": 4.9, "sessionsCompleted": 63, "available": false, "bio": "Mantan pro player yang sukses transisi ke career sebagai caster dan brand ambassador. Membantu 20+ ex-pro player menemukan karir baru." }
]
```

## Referral Stats (mock)
```json
{
  "code": "TENSAI2026",
  "link": "https://academy.ixon.id/ref/TENSAI2026",
  "totalShares": 15,
  "totalSignups": 7,
  "successfulReferrals": 4,
  "rewardsClaimed": 3,
  "rewardsAvailable": 1
}
```

## Onboarding Goal Options (mock)
```json
[
  { "id": "pro", "icon": "🏆", "label": "Saya ingin menjadi pro player", "description": "Fokus: kurikulum teknis, evaluasi coach, scouting pipeline", "dashboardPriority": ["academy", "evaluation", "scouting"] },
  { "id": "improve", "icon": "🎓", "label": "Saya ingin belajar dan improve", "description": "Fokus: kurikulum lengkap, komunitas diskusi, leaderboard", "dashboardPriority": ["academy", "community", "leaderboard"] },
  { "id": "career", "icon": "💼", "label": "Saya tertarik berkarir di industri esports", "description": "Fokus: jalur karir, sertifikasi, mentorship, soft skills", "dashboardPriority": ["career", "mentorship", "softskills"] },
  { "id": "all", "icon": "🎯", "label": "Saya ingin semuanya!", "description": "Dashboard default dengan semua fitur", "dashboardPriority": ["default"] }
]
```

## Empty States (mock copy)
```json
{
  "dashboard_new": { "title": "Mulai Petualanganmu!", "desc": "Selesaikan misi pertamamu untuk memulai.", "cta": "Lihat Misi", "illustration": "🚀" },
  "academy_empty": { "title": "Belum Mulai Belajar?", "desc": "Pilih course pertamamu dan mulai tingkatkan skill.", "cta": "Jelajahi Course", "illustration": "📚" },
  "community_free": { "title": "Ingin Ikut Berdiskusi?", "desc": "Upgrade ke Silver untuk mulai posting dan reply.", "cta": "Lihat Membership", "illustration": "💬" },
  "evaluation_empty": { "title": "Belum Submit Gameplay?", "desc": "Kirim rekaman gameplay-mu dan dapatkan feedback profesional.", "cta": "Submit Sekarang", "illustration": "🎮" },
  "events_empty": { "title": "Belum Ada Event", "desc": "Stay tuned! Event baru akan segera diumumkan.", "cta": "Aktifkan Notifikasi", "illustration": "🏆" },
  "mentorship_empty": { "title": "Belum Punya Mentor?", "desc": "Temukan mentor yang sesuai dengan tujuanmu.", "cta": "Cari Mentor", "illustration": "🤝" },
  "badges_empty": { "title": "Belum Ada Badge", "desc": "Selesaikan tantangan untuk membuka badge pertamamu.", "cta": "Lihat Misi", "illustration": "⭐" }
}
```

---

# 10. BUILD PRIORITY & PHASES

## Phase 0: Foundation (Week 1-2)
- [ ] Docker Compose setup (Next.js + PostgreSQL + Redis + Nginx)
- [ ] Prisma schema init + migration + seed mock data
- [ ] Next.js project setup (App Router, TypeScript, Tailwind, Shadcn/UI)
- [ ] Design system implementation (colors, typography, components)
- [ ] NextAuth.js setup (credentials provider, phone+password, OTP flow)
- [ ] Auth flow pages: register (4-step), OTP verify, login, logout
- [ ] Basic layout: sidebar/bottom nav, navbar, page shell
- [ ] Player profile CRUD
- [ ] Landing page
- [ ] Socket.io server setup (basic connection test)

## Phase 1: Content (Week 3-5)
- [ ] Academy: course catalog, course detail, lesson player
- [ ] Quiz system
- [ ] Progress tracking
- [ ] Video player with watermark overlay
- [ ] Bunny.net integration

## Phase 2: Community (Week 5-7)
- [ ] Community feed (list, filter, sort)
- [ ] Post detail, reply, threading
- [ ] Reaction system
- [ ] Report system
- [ ] Reputation scoring
- [ ] Keyword filter (automated moderation)
- [ ] Free member restrictions (read-only + react)

## Phase 3: Evaluation (Week 7-10)
- [ ] Submission flow
- [ ] Coach dashboard: queue, review interface
- [ ] Rubrik form (5 aspek + feedback + improvement plan)
- [ ] Auto-assignment algorithm
- [ ] Rating system (player → coach)
- [ ] CQS calculation
- [ ] Coach wallet
- [ ] SLA tracking & auto-flag

## Phase 4: Gamification + Monetization (Week 10-12)
- [ ] Daily missions system
- [ ] XP & leveling
- [ ] Badge system
- [ ] Leaderboard
- [ ] Talent Score calculation (Signal System)
- [ ] Membership tiers & feature gating
- [ ] Payment integration (Midtrans/Xendit)
- [ ] Subscription management

## Phase 5: Scouting + Events (Week 12-16)
- [ ] Talent Board
- [ ] Shortlist & invite flow
- [ ] Event creation & registration
- [ ] Tournament bracket/results
- [ ] Scrim lobby

## Phase 6: New Modules (Week 16-24)
- [ ] Mental Performance content library
- [ ] Physical Wellness check-in + streak
- [ ] Career Pathway catalog & enrollment
- [ ] Certification system + ESI badge
- [ ] Alumni Network / Mentorship (mentor directory, booking, sessions)
- [ ] Parent Portal (dashboard, reports, consent)
- [ ] Soft Skills LMS content
- [ ] Coach Application Flow (applicant side + admin review)
- [ ] CV Esports / Profile Export (image, PDF, shareable link)
- [ ] Student Discount Verification (email .ac.id + upload KTM)

## Phase 7: Polish & Infrastructure (Week 20-24)
- [ ] Admin panel (full CRUD, analytics, moderation)
- [ ] Settings page (appearance, notifications, privacy, data/account)
- [ ] Global Search (PostgreSQL full-text search)
- [ ] Referral Program (codes, tracking, rewards)
- [ ] Onboarding Flow (post-register guided experience)
- [ ] Game Switcher UI (navbar toggle, context switching)
- [ ] Weekly Digest system (content generation + WA dispatch)
- [ ] Empty states & error states (semua section)
- [ ] Content Security (watermark, signed URLs, session concurrency)
- [ ] Real-time events (Socket.io channels, reconnection)
- [ ] Responsive polish (mobile, tablet, desktop breakpoints)
- [ ] Notification infrastructure (WhatsApp + in-app)
- [ ] TWA packaging for Play Store
- [ ] Performance optimization (lazy loading, skeleton screens, caching)
- [ ] Security audit (XSS, CSRF, SQL injection, rate limiting)

## Phase 8: Documentation & Komisaris Deliverable (Week 24-26)
- [ ] Screenshot semua 42 halaman (lihat Appendix B) — mobile + desktop
- [ ] Update Dokumen Komisaris dengan screenshot real
- [ ] Update risk analysis dengan 33 risiko + mitigasi lengkap
- [ ] Final review narasi bisnis + data pasar (update angka terbaru)
- [ ] Compile Dokumen Komisaris Final (docx + PDF)

---

# APPENDIX: CATATAN PENTING

## Dual-Game Architecture
- Semua modul yang game-specific (LMS, Evaluation, Events, Leaderboard) harus memiliki filter game
- Rubrik evaluasi berbeda per game (MLBB: 5 aspek MOBA, FF: 5 aspek Battle Royale)
- Coach pool terpisah per game
- Community: ada forum per game + forum umum (cross-game: mental, soft skills, off-topic)
- Profil pemain bisa punya multiple game profiles (satu user, dua player entries)

## Rubrik Free Fire (Berbeda dari MLBB)
| Aspek | Bobot |
|-------|-------|
| Aim & Combat Skills | 25% |
| Positioning & Zone Rotation | 25% |
| Loot Management & Resource Efficiency | 20% |
| Squad Coordination & Communication | 15% |
| Clutch Decision-Making & Composure | 15% |

## Cross-Game Modules (Shared)
Modul berikut tidak game-specific dan bisa diakses oleh pemain game manapun:
- Mental Performance
- Physical Wellness
- Soft Skills
- Career Pathway
- Parent Portal
- Financial Literacy (future)
- English for Esports (future)

## ESI Integration Points
- Sertifikasi: badge "Verified by ESI" pada certificate (Phase 2, setelah validasi)
- Turnamen: sanctioning badge pada event yang di-endorse ESI
- Athlete registration: link ke database ESI (future)
- Semua ini opsional dan tidak blocking untuk launch

## Accessibility Notes
- Semua teks harus readable di layar HP kecil (minimum 14px body)
- Touch target minimum 44x44px
- Loading states untuk semua async operations
- Offline fallback message (bukan blank screen)
- Image lazy loading
- Skeleton screens saat loading (bukan spinner)

## Dockerfile

```dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

## Deployment Checklist (VPS)

```bash
# First-time setup pada VPS
1. Install Docker + Docker Compose
2. Clone repo
3. Copy .env.production ke .env
4. docker compose up -d
5. docker compose exec app npx prisma migrate deploy
6. docker compose exec app npx prisma db seed
7. Setup SSL: certbot certonly --webroot -w /var/www/certbot -d academy.ixon.id
8. Reload nginx: docker compose exec nginx nginx -s reload

# Subsequent deployments
1. git pull
2. docker compose build app worker socketio
3. docker compose up -d --no-deps app worker socketio
4. docker compose exec app npx prisma migrate deploy (jika ada migration baru)

# Database backup (cron daily)
docker compose exec postgres pg_dump -U ixon_admin ixon_academy | gzip > /backups/$(date +%Y%m%d).sql.gz
```

## Next.js Config Notes

```js
// next.config.js
module.exports = {
  output: 'standalone',     // Wajib untuk Docker deployment
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.ixonacademy.b-cdn.net' }, // Bunny CDN
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: '10mb' }, // untuk upload gameplay
  },
}
```

---

# APPENDIX B: SCREENSHOT MAPPING → DOKUMEN KOMISARIS

> Setelah app di-build, ambil screenshot dari halaman-halaman berikut.
> Setiap screenshot akan masuk ke section tertentu di **Dokumen Bisnis untuk Komisaris (Final)**.

## Dokumen Komisaris — Bab 3: Solusi IXON Academy

| Screenshot | Halaman App | Deskripsi |
|-----------|-------------|-----------|
| Landing Hero | `/` (section hero) | Menunjukkan first impression platform |
| Supported Games | `/` (section games) | MLBB + FF aktif, game lain coming soon |
| Pricing Tiers | `/membership` | 4 tier dengan fitur per tier |
| Onboarding Flow | `/register` (step 1-4) | Proses registrasi 4 langkah |

## Dokumen Komisaris — Bab 4A: Modul Inti

| Screenshot | Halaman App | Untuk Section |
|-----------|-------------|---------------|
| Player Dashboard | `/dashboard` | Overview fitur utama yang dilihat user setelah login |
| Talent Score Detail | `/profile` (tab overview) | Radar chart + score breakdown → Modul Player Profile |
| Game Switcher Active | Navbar (MLBB ↔ FF toggle) | Arsitektur dual-game |
| Course Catalog | `/academy` | Modul Academy/LMS — kurikulum terstruktur |
| Lesson Player | `/academy/[courseId]/[lessonId]` | Video player + watermark → LMS + Content Security |
| Quiz Interface | Quiz modal di lesson | Assessment system |
| Community Feed | `/community` | Modul Community — forum termoderasi |
| Community Post Detail | `/community/[postId]` | Reputation badges + threaded replies |
| Free Member Restriction | `/community` (sebagai Free user) | Upgrade CTA + read-only state |
| Submit Gameplay | `/evaluation/submit` | Modul Evaluation — submission flow |
| Coach Review Detail | `/evaluation/[reviewId]` | Rubrik 5 aspek + feedback + improvement plan (JANTUNG value proposition) |
| Review Comparison | `/evaluation/[reviewId]` (trend section) | Progress tracking antar review |
| Event List | `/events` | Modul Events — turnamen & scrim |
| Talent Board | `/scouting/talent-board` | Modul Scouting — talent discovery |
| Daily Missions | `/missions` | Gamifikasi — daily engagement |
| Leaderboard | `/leaderboard` | Gamifikasi — competitive ranking |
| Badges Grid | `/profile` (tab badges) | Achievement system |

## Dokumen Komisaris — Bab 4B: Modul Baru (Fase 2)

| Screenshot | Halaman App | Untuk Section |
|-----------|-------------|---------------|
| Career Pathway Catalog | `/career` | Jalur Karir — daftar program |
| Career Detail | `/career/[pathwayId]` | Detail program + outcomes + harga |
| Certification Card | `/career/certification` | Sertifikat IXON + badge ESI Verified |
| Mental Performance | `/mental` | Konten mental skills + self-assessment |
| Wellness Check-in | `/wellness` | Daily wellness form + streak |
| Soft Skills Courses | `/academy` (filter: soft_skill) | Public speaking, leadership, dll |
| Mentor Directory | `/mentorship` | Alumni Network — daftar mentor |
| Mentor Profile | `/mentorship/[mentorId]` | Session types + booking |
| Parent Dashboard | `/parent/dashboard` | Progress anak + weekly report |
| Parent Child Report | `/parent/child/[childId]` | Detail progress + behavior |

## Dokumen Komisaris — Bab 4C: Future Roadmap Visual

| Screenshot | Halaman App | Untuk Section |
|-----------|-------------|---------------|
| Career Catalog (full) | `/career` | Menunjukkan slot "Coming Soon" untuk Digital Marketing, Design, Programming |
| Course Catalog (full) | `/academy` | Menunjukkan cross-game courses + future game badges |

## Dokumen Komisaris — Bab 5: Model Bisnis

| Screenshot | Halaman App | Untuk Section |
|-----------|-------------|---------------|
| Membership Page | `/membership` | Pricing per tier |
| Career Pricing | `/career/[pathwayId]` | Program premium pricing |
| Coach Wallet | `/coach/wallet` | Earning model coach |
| Student Discount | `/settings/student-verify` | Verifikasi pelajar flow |

## Dokumen Komisaris — Bab 6: Keunggulan Kompetitif

| Screenshot | Halaman App | Untuk Section |
|-----------|-------------|---------------|
| Coach Review vs YouTube | Side-by-side mockup | IXON review detail vs video tutorial biasa |
| Talent Score System | `/profile` (talent section) | Data-driven scouting |
| Scouting Pipeline | `/scouting/talent-board` + `/scouting/invite` | Full pipeline visual |

## Dokumen Komisaris — Bab 8: Roadmap

| Screenshot | Halaman App | Untuk Section |
|-----------|-------------|---------------|
| Admin Analytics | `/admin/analytics` | Metrics dashboard yang akan di-track |

## Backstage Screenshots (untuk menunjukkan operasional)

| Screenshot | Halaman App | Tujuan |
|-----------|-------------|--------|
| Coach Queue | `/coach/queue` | Menunjukkan bagaimana coach bekerja |
| Coach Review Interface | `/coach/review/[id]` | Rubrik form + video side-by-side |
| Coach Performance | `/coach/performance` | CQS scoring + quality tracking |
| Admin Dashboard | `/admin/dashboard` | Overview operasional |
| Admin Moderation | `/admin/moderation` | Community health management |
| Admin User Management | `/admin/users` | Skala user management |

---

## Total: 42 screenshots yang dibutuhkan

**Workflow:**
1. Build semua halaman berdasarkan Dev Plan ini
2. Populate dengan mock data
3. Ambil screenshot setiap halaman (mobile + desktop)
4. Compile ke Dokumen Komisaris Final:
   - Narasi bisnis (sudah ada) +
   - Data pasar (sudah ada) +
   - Landasan ilmiah (sudah ada) +
   - 33 risiko + mitigasi (perlu update) +
   - 42 screenshot fitur real +
   - Competitive comparison visual

**Screenshot specification:**
- Format: PNG, 2x resolution (retina)
- Mobile: 390x844 (iPhone 14 viewport) — primary
- Desktop: 1440x900 — secondary
- Dark mode sebagai default
- Semua menggunakan mock data yang sudah di-spec di Section 9
- Annotate jika perlu (arrow, callout) menggunakan tool terpisah

