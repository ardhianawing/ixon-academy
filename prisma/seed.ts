import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding IXON Academy database...");

  // ─── CLEANUP ────────────────────────────────────────
  console.log("Cleaning existing data...");
  await prisma.evaluationRating.deleteMany();
  await prisma.evaluationReview.deleteMany();
  await prisma.evaluationSubmission.deleteMany();
  await prisma.coachTransaction.deleteMany();
  await prisma.coachWallet.deleteMany();
  await prisma.coachProfile.deleteMany();
  await prisma.userLessonProgress.deleteMany();
  await prisma.userCourseProgress.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.communityReaction.deleteMany();
  await prisma.communityReport.deleteMany();
  await prisma.communityReply.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.userReputation.deleteMany();
  await prisma.trialInvitation.deleteMany();
  await prisma.talentBoard.deleteMany();
  await prisma.eventResult.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.userMission.deleteMany();
  await prisma.dailyMission.deleteMany();
  await prisma.wellnessCheckin.deleteMany();
  await prisma.careerCertification.deleteMany();
  await prisma.careerEnrollment.deleteMany();
  await prisma.careerPathway.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.parentLink.deleteMany();
  await prisma.player.deleteMany();
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();

  // ─── PASSWORD HASH ──────────────────────────────────
  const passwordHash = await bcrypt.hash("ixon2026", 10);

  // ─── GAMES ──────────────────────────────────────────
  console.log("Creating games...");
  const mlbb = await prisma.game.create({
    data: {
      title: "Mobile Legends: Bang Bang",
      slug: "mlbb",
      iconUrl: "/icons/mlbb.png",
      status: "active",
    },
  });

  const freefire = await prisma.game.create({
    data: {
      title: "Free Fire",
      slug: "free-fire",
      iconUrl: "/icons/freefire.png",
      status: "active",
    },
  });

  // ─── USERS ──────────────────────────────────────────
  console.log("Creating users...");

  const userTensai = await prisma.user.create({
    data: {
      namaAsli: "Raka Pratama",
      phone: "+6281234567001",
      email: "tensai@ixon.gg",
      passwordHash,
      role: "PLAYER",
      tier: "GOLD",
      onboardingDone: true,
      emailVerifiedAt: new Date("2025-11-01"),
      phoneVerifiedAt: new Date("2025-11-01"),
    },
  });

  const userPhoenix = await prisma.user.create({
    data: {
      namaAsli: "Dimas Saputra",
      phone: "+6281234567002",
      email: "phoenixblade@ixon.gg",
      passwordHash,
      role: "PLAYER",
      tier: "PLATINUM",
      onboardingDone: true,
      emailVerifiedAt: new Date("2025-10-15"),
      phoneVerifiedAt: new Date("2025-10-15"),
    },
  });

  const userShadow = await prisma.user.create({
    data: {
      namaAsli: "Budi Santoso",
      phone: "+6281234567003",
      email: "shadowff@ixon.gg",
      passwordHash,
      role: "PLAYER",
      tier: "SILVER",
      onboardingDone: true,
      emailVerifiedAt: new Date("2025-12-01"),
      phoneVerifiedAt: new Date("2025-12-01"),
    },
  });

  const userReaper = await prisma.user.create({
    data: {
      namaAsli: "Fajar Nugroho",
      phone: "+6281234567004",
      email: "ixonreaper@ixon.gg",
      passwordHash,
      role: "PLAYER",
      tier: "SILVER",
      onboardingDone: true,
      emailVerifiedAt: new Date("2025-11-20"),
      phoneVerifiedAt: new Date("2025-11-20"),
    },
  });

  const userParent = await prisma.user.create({
    data: {
      namaAsli: "Ibu Sari Widodo",
      phone: "+6281234567006",
      email: "sari.parent@ixon.gg",
      passwordHash,
      role: "PARENT",
      tier: "FREE",
      onboardingDone: true,
      emailVerifiedAt: new Date("2026-01-05"),
      phoneVerifiedAt: new Date("2026-01-05"),
    },
  });

  const userAce = await prisma.user.create({
    data: {
      namaAsli: "Andi Widodo",
      phone: "+6281234567005",
      email: "acehunter@ixon.gg",
      passwordHash,
      role: "PLAYER",
      tier: "FREE",
      onboardingDone: false,
      parentUserId: userParent.id,
    },
  });

  const userCoach = await prisma.user.create({
    data: {
      namaAsli: "Alex Wijaya",
      phone: "+6281234567010",
      email: "coach.alex@ixon.gg",
      passwordHash,
      role: "COACH",
      tier: "PLATINUM",
      onboardingDone: true,
      emailVerifiedAt: new Date("2025-09-01"),
      phoneVerifiedAt: new Date("2025-09-01"),
    },
  });

  const userAdmin = await prisma.user.create({
    data: {
      namaAsli: "Admin IXON",
      phone: "+6281234567099",
      email: "admin@ixon.gg",
      passwordHash,
      role: "ADMIN",
      tier: "PLATINUM",
      onboardingDone: true,
      emailVerifiedAt: new Date("2025-01-01"),
      phoneVerifiedAt: new Date("2025-01-01"),
    },
  });

  const userScout = await prisma.user.create({
    data: {
      namaAsli: "Scout EVOS",
      phone: "+6281234567098",
      email: "scout@ixon.gg",
      passwordHash,
      role: "SCOUTING",
      tier: "PLATINUM",
      onboardingDone: true,
      emailVerifiedAt: new Date("2025-01-01"),
      phoneVerifiedAt: new Date("2025-01-01"),
    },
  });

  // ─── PARENT LINK ────────────────────────────────────
  await prisma.parentLink.create({
    data: {
      parentUserId: userParent.id,
      childUserId: userAce.id,
      consentGiven: true,
      consentDate: new Date("2026-01-05"),
    },
  });

  // ─── PLAYERS ────────────────────────────────────────
  console.log("Creating players...");

  const playerTensai = await prisma.player.create({
    data: {
      userId: userTensai.id,
      gameId: mlbb.id,
      nickname: "TENSAI",
      serverId: "5234",
      rank: "Mythical Glory",
      roleIngame: "Jungler",
      heroPool: ["Ling", "Fanny", "Hayabusa", "Lancelot", "Gusion"],
      talentScore: 78,
      skillSignal: 82,
      mindsetSignal: 74,
      commitmentSignal: 78,
      attitudeScore: 92,
      xp: 4520,
      level: 12,
    },
  });

  const playerPhoenix = await prisma.player.create({
    data: {
      userId: userPhoenix.id,
      gameId: mlbb.id,
      nickname: "PhoenixBlade",
      serverId: "5234",
      rank: "Mythical Honor",
      roleIngame: "Gold Laner",
      heroPool: ["Claude", "Beatrix", "Brody", "Wanwan"],
      talentScore: 87,
      skillSignal: 90,
      mindsetSignal: 84,
      commitmentSignal: 86,
      attitudeScore: 95,
      xp: 7800,
      level: 18,
    },
  });

  const playerShadow = await prisma.player.create({
    data: {
      userId: userShadow.id,
      gameId: freefire.id,
      nickname: "ShadowFF",
      serverId: "ID-2234",
      rank: "Grandmaster",
      roleIngame: "Rusher",
      heroPool: ["Alok", "Chrono", "K"],
      talentScore: 65,
      skillSignal: 68,
      mindsetSignal: 62,
      commitmentSignal: 64,
      attitudeScore: 88,
      xp: 2100,
      level: 7,
    },
  });

  const playerReaper = await prisma.player.create({
    data: {
      userId: userReaper.id,
      gameId: mlbb.id,
      nickname: "IXONReaper",
      serverId: "5234",
      rank: "Mythic",
      roleIngame: "EXP Laner",
      heroPool: ["Esmeralda", "Yu Zhong", "Paquito", "Chou", "Thamuz"],
      talentScore: 72,
      skillSignal: 75,
      mindsetSignal: 70,
      commitmentSignal: 72,
      attitudeScore: 90,
      xp: 3200,
      level: 10,
    },
  });

  const playerAce = await prisma.player.create({
    data: {
      userId: userAce.id,
      gameId: mlbb.id,
      nickname: "AceHunter",
      serverId: "5234",
      rank: "Legend",
      roleIngame: "Roamer",
      heroPool: ["Khufra", "Atlas", "Tigreal"],
      talentScore: 45,
      skillSignal: 48,
      mindsetSignal: 42,
      commitmentSignal: 44,
      attitudeScore: 85,
      xp: 980,
      level: 4,
    },
  });

  // ─── SUBSCRIPTIONS ─────────────────────────────────
  console.log("Creating subscriptions...");

  await prisma.subscription.create({
    data: {
      userId: userTensai.id,
      tier: "GOLD",
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-05-01"),
      status: "active",
      paymentMethod: "gopay",
      amount: 149_000,
      currency: "IDR",
    },
  });

  await prisma.subscription.create({
    data: {
      userId: userPhoenix.id,
      tier: "PLATINUM",
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-04-15"),
      status: "active",
      paymentMethod: "bank_transfer",
      amount: 299_000,
      currency: "IDR",
    },
  });

  await prisma.subscription.create({
    data: {
      userId: userShadow.id,
      tier: "SILVER",
      startDate: new Date("2026-02-10"),
      endDate: new Date("2026-05-10"),
      status: "active",
      paymentMethod: "ovo",
      amount: 79_000,
      currency: "IDR",
    },
  });

  await prisma.subscription.create({
    data: {
      userId: userReaper.id,
      tier: "SILVER",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-04-01"),
      status: "active",
      paymentMethod: "dana",
      amount: 79_000,
      currency: "IDR",
    },
  });

  // ─── COACH PROFILE ─────────────────────────────────
  console.log("Creating coach profile...");

  await prisma.coachProfile.create({
    data: {
      userId: userCoach.id,
      gameId: mlbb.id,
      specialization: ["Jungler", "Gold Laner"],
      bio: "Mantan pemain pro MLBB dengan 5 tahun pengalaman di kompetitif scene. Spesialisasi di jungle pathing dan gold lane macro. Sudah melatih 100+ murid dari Epic ke Mythical Glory.",
      experienceYears: 5,
      cqsScore: 4.2,
      totalReviews: 47,
      avgRating: 4.5,
      isAvailable: true,
      maxDailyReviews: 8,
    },
  });

  // ─── COACH WALLET & TRANSACTIONS ───────────────────
  console.log("Creating coach wallet...");

  const coachWallet = await prisma.coachWallet.create({
    data: {
      userId: userCoach.id,
      balance: 2_350_000,
      totalEarned: 8_500_000,
      totalWithdrawn: 6_150_000,
      lastWithdrawalAt: new Date("2026-02-28"),
    },
  });

  const txData = [
    { type: "review_payment", amount: 150_000, description: "Review pembayaran - Submission #EV001" },
    { type: "review_payment", amount: 150_000, description: "Review pembayaran - Submission #EV002" },
    { type: "bonus", amount: 500_000, description: "Bonus bulanan - Februari 2026 (Top Coach)" },
    { type: "review_payment", amount: 200_000, description: "Review premium - Submission #EV003" },
    { type: "review_payment", amount: 150_000, description: "Review pembayaran - Submission #EV004" },
  ];

  for (const tx of txData) {
    await prisma.coachTransaction.create({
      data: {
        walletId: coachWallet.id,
        type: tx.type,
        amount: tx.amount,
        description: tx.description,
      },
    });
  }

  // ─── COURSES ────────────────────────────────────────
  console.log("Creating courses...");

  // Course 1: Jungle Mastery
  const course1 = await prisma.course.create({
    data: {
      gameId: mlbb.id,
      title: "Jungle Mastery: Dari Noob ke Pro",
      description:
        "Pelajari teknik jungling dari dasar hingga advanced. Mulai dari farming pattern, ganking timing, hingga objective control. Cocok untuk pemain yang ingin naik rank sebagai jungler.",
      level: "INTERMEDIATE",
      category: "HARD_SKILL",
      totalLessons: 10,
      totalDurationMin: 180,
      isPublished: true,
      sortOrder: 1,
    },
  });

  const c1m1 = await prisma.module.create({
    data: { courseId: course1.id, title: "Fundamentals of Jungling", sortOrder: 1 },
  });
  const c1m1l1 = await prisma.lesson.create({
    data: { moduleId: c1m1.id, title: "Memahami Role Jungler di Meta Saat Ini", sortOrder: 1, videoDurationSec: 720, isFreePreview: true },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m1.id, title: "Farming Pattern: Red-Blue-Litho Route", sortOrder: 2, videoDurationSec: 900 },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m1.id, title: "Kapan Harus Gank vs Farm", sortOrder: 3, videoDurationSec: 840 },
  });
  const c1m1l4 = await prisma.lesson.create({
    data: { moduleId: c1m1.id, title: "Retribution Timing & Objective Secure", sortOrder: 4, videoDurationSec: 660 },
  });

  const c1m2 = await prisma.module.create({
    data: { courseId: course1.id, title: "Advanced Jungle Techniques", sortOrder: 2 },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m2.id, title: "Invade Strategy & Counter-Jungling", sortOrder: 1, videoDurationSec: 780 },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m2.id, title: "Map Awareness & Vision Control", sortOrder: 2, videoDurationSec: 900 },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m2.id, title: "Team Fight Positioning sebagai Jungler", sortOrder: 3, videoDurationSec: 720 },
  });

  const c1m3 = await prisma.module.create({
    data: { courseId: course1.id, title: "Hero Specific Guides", sortOrder: 3 },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m3.id, title: "Ling: Wall Combo & Timing", sortOrder: 1, videoDurationSec: 840 },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m3.id, title: "Fanny: Cable Mastery di Ranked", sortOrder: 2, videoDurationSec: 960 },
  });
  await prisma.lesson.create({
    data: { moduleId: c1m3.id, title: "Hayabusa: Split Push & Shadow Management", sortOrder: 3, videoDurationSec: 780 },
  });

  // Quiz for lesson 1 of course 1
  const quiz1 = await prisma.quiz.create({
    data: {
      lessonId: c1m1l1.id,
      title: "Quiz: Fundamentals Jungler",
      passScorePct: 70,
      timeLimitMin: 5,
    },
  });
  await prisma.quizQuestion.createMany({
    data: [
      {
        quizId: quiz1.id,
        questionText: "Apa tugas utama seorang Jungler di early game?",
        options: ["Push tower", "Farming dan securing buff", "Roaming ke semua lane", "AFK di jungle"],
        correctAnswerIdx: 1,
        explanation: "Di early game, jungler harus fokus farming buff dan jungle monster untuk mendapatkan gold dan level advantage.",
        sortOrder: 1,
      },
      {
        quizId: quiz1.id,
        questionText: "Kapan waktu terbaik untuk melakukan gank?",
        options: ["Saat musuh full HP di bawah tower", "Saat lane ally sedang push dan musuh overextend", "Hanya saat buff sudah respawn", "Tidak pernah, jungler harus farm terus"],
        correctAnswerIdx: 1,
        explanation: "Gank paling efektif saat musuh overextend dari tower dan ally lane siap untuk follow up.",
        sortOrder: 2,
      },
      {
        quizId: quiz1.id,
        questionText: "Retribution digunakan untuk apa?",
        options: ["Kill hero musuh", "Securing jungle objective (Lord/Turtle)", "Heal diri sendiri", "Speed boost"],
        correctAnswerIdx: 1,
        explanation: "Retribution digunakan untuk securing objective penting seperti Lord dan Turtle.",
        sortOrder: 3,
      },
    ],
  });

  // Quiz for retribution lesson
  const quiz1b = await prisma.quiz.create({
    data: {
      lessonId: c1m1l4.id,
      title: "Quiz: Retribution & Objective",
      passScorePct: 70,
      timeLimitMin: 5,
    },
  });
  await prisma.quizQuestion.createMany({
    data: [
      {
        quizId: quiz1b.id,
        questionText: "Berapa damage Retribution di level 1?",
        options: ["300", "480", "540", "720"],
        correctAnswerIdx: 1,
        explanation: "Retribution damage di level 1 adalah 480, dan meningkat seiring level hero.",
        sortOrder: 1,
      },
      {
        quizId: quiz1b.id,
        questionText: "Objective mana yang lebih prioritas di menit ke-8?",
        options: ["Buff musuh", "Turtle kedua", "Lord", "Minion lane"],
        correctAnswerIdx: 1,
        explanation: "Turtle kedua memberikan gold dan EXP bonus signifikan untuk seluruh tim.",
        sortOrder: 2,
      },
      {
        quizId: quiz1b.id,
        questionText: "Apa yang harus dilakukan sebelum take Lord?",
        options: ["Solo tanpa vision", "Pastikan minimal 2 musuh mati atau terlihat jauh", "Ambil saat HP sendiri low", "Tunggu sampai menit 20"],
        correctAnswerIdx: 1,
        explanation: "Lord hanya aman diambil saat musuh tidak bisa contest, idealnya 2+ musuh mati.",
        sortOrder: 3,
      },
    ],
  });

  // Course 2: Gold Lane Domination
  const course2 = await prisma.course.create({
    data: {
      gameId: mlbb.id,
      title: "Gold Lane Domination",
      description:
        "Master the gold lane with advanced laning techniques, wave management, and late game carry strategies. Learn from top gold laners in competitive scene.",
      level: "ADVANCED",
      category: "HARD_SKILL",
      totalLessons: 8,
      totalDurationMin: 150,
      isPublished: true,
      sortOrder: 2,
    },
  });

  const c2m1 = await prisma.module.create({
    data: { courseId: course2.id, title: "Gold Lane Fundamentals", sortOrder: 1 },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m1.id, title: "Wave Management & Last Hitting", sortOrder: 1, videoDurationSec: 840, isFreePreview: true },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m1.id, title: "Positioning & Trading di Lane", sortOrder: 2, videoDurationSec: 720 },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m1.id, title: "Itemization Gold Laner Meta S35", sortOrder: 3, videoDurationSec: 660 },
  });

  const c2m2 = await prisma.module.create({
    data: { courseId: course2.id, title: "Advanced Gold Lane Carry", sortOrder: 2 },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m2.id, title: "Split Push Timing & Rotation", sortOrder: 1, videoDurationSec: 780 },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m2.id, title: "Team Fight Positioning sebagai Carry", sortOrder: 2, videoDurationSec: 900 },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m2.id, title: "Claude Guide: Demond Hunter + DHS Combo", sortOrder: 3, videoDurationSec: 840 },
  });

  const c2m3 = await prisma.module.create({
    data: { courseId: course2.id, title: "Matchup & Counter Pick", sortOrder: 3 },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m3.id, title: "Counter Pick Gold Lane: Tier List", sortOrder: 1, videoDurationSec: 720 },
  });
  await prisma.lesson.create({
    data: { moduleId: c2m3.id, title: "Dealing with Aggressive Roamer Gank", sortOrder: 2, videoDurationSec: 660 },
  });

  // Course 3: Free Fire Battle Royale
  const course3 = await prisma.course.create({
    data: {
      gameId: freefire.id,
      title: "Free Fire Battle Royale Strategy",
      description:
        "Strategi lengkap bermain Free Fire dari landing spot, loot priority, hingga end zone positioning. Cocok untuk pemain baru yang ingin menguasai basic BR.",
      level: "BEGINNER",
      category: "HARD_SKILL",
      totalLessons: 9,
      totalDurationMin: 135,
      isPublished: true,
      sortOrder: 3,
    },
  });

  const c3m1 = await prisma.module.create({
    data: { courseId: course3.id, title: "Landing & Loot Strategy", sortOrder: 1 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m1.id, title: "Top 5 Landing Spot untuk Bermuda", sortOrder: 1, videoDurationSec: 600, isFreePreview: true },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m1.id, title: "Loot Priority: Senjata & Attachment", sortOrder: 2, videoDurationSec: 540 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m1.id, title: "Rotasi Aman di Early Game", sortOrder: 3, videoDurationSec: 480 },
  });

  const c3m2 = await prisma.module.create({
    data: { courseId: course3.id, title: "Combat & Gunfight", sortOrder: 2 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m2.id, title: "Aim Training: Drag Headshot Technique", sortOrder: 1, videoDurationSec: 720 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m2.id, title: "Gloo Wall Placement & Usage", sortOrder: 2, videoDurationSec: 600 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m2.id, title: "Peek & Fire: Advanced Movement", sortOrder: 3, videoDurationSec: 660 },
  });

  const c3m3 = await prisma.module.create({
    data: { courseId: course3.id, title: "End Zone & Winning", sortOrder: 3 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m3.id, title: "Zone Prediction & Rotation", sortOrder: 1, videoDurationSec: 540 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m3.id, title: "1v1 Clutch Situation Tips", sortOrder: 2, videoDurationSec: 600 },
  });
  await prisma.lesson.create({
    data: { moduleId: c3m3.id, title: "Character Skill Combo untuk End Game", sortOrder: 3, videoDurationSec: 480 },
  });

  // Course 4: Shotcalling (cross-game)
  const course4 = await prisma.course.create({
    data: {
      gameId: null,
      title: "Shotcalling & Team Communication",
      description:
        "Belajar cara menjadi shotcaller yang efektif. Komunikasi tim, decision making dalam pressure, dan leadership di dalam game. Applicable untuk semua game kompetitif.",
      level: "ALL",
      category: "SOFT_SKILL",
      totalLessons: 7,
      totalDurationMin: 120,
      isPublished: true,
      sortOrder: 4,
    },
  });

  const c4m1 = await prisma.module.create({
    data: { courseId: course4.id, title: "Dasar Komunikasi Tim", sortOrder: 1 },
  });
  await prisma.lesson.create({
    data: { moduleId: c4m1.id, title: "Kenapa Komunikasi Penting di Esports", sortOrder: 1, videoDurationSec: 600, isFreePreview: true },
  });
  await prisma.lesson.create({
    data: { moduleId: c4m1.id, title: "Callout System: Info yang Efektif", sortOrder: 2, videoDurationSec: 720 },
  });
  await prisma.lesson.create({
    data: { moduleId: c4m1.id, title: "Menghindari Toxic Communication", sortOrder: 3, videoDurationSec: 540 },
  });

  const c4m2 = await prisma.module.create({
    data: { courseId: course4.id, title: "Shotcalling Mastery", sortOrder: 2 },
  });
  await prisma.lesson.create({
    data: { moduleId: c4m2.id, title: "Decision Making Under Pressure", sortOrder: 1, videoDurationSec: 780 },
  });
  await prisma.lesson.create({
    data: { moduleId: c4m2.id, title: "Reading the Map & Making Calls", sortOrder: 2, videoDurationSec: 660 },
  });
  await prisma.lesson.create({
    data: { moduleId: c4m2.id, title: "Adapting Shotcall saat Losing", sortOrder: 3, videoDurationSec: 600 },
  });
  await prisma.lesson.create({
    data: { moduleId: c4m2.id, title: "Post-Game Review: Evaluasi Shotcall", sortOrder: 4, videoDurationSec: 540 },
  });

  // Course 5: Tilt Management
  const course5 = await prisma.course.create({
    data: {
      gameId: null,
      title: "Tilt Management & Mental Fortitude",
      description:
        "Kelola emosi dan mental saat bermain game kompetitif. Teknik mengatasi tilt, losing streak, dan menjaga performa konsisten. Wajib untuk setiap gamer serius.",
      level: "ALL",
      category: "MENTAL",
      totalLessons: 6,
      totalDurationMin: 90,
      isPublished: true,
      sortOrder: 5,
    },
  });

  const c5m1 = await prisma.module.create({
    data: { courseId: course5.id, title: "Understanding Tilt", sortOrder: 1 },
  });
  await prisma.lesson.create({
    data: { moduleId: c5m1.id, title: "Apa Itu Tilt & Kenapa Terjadi", sortOrder: 1, videoDurationSec: 600, isFreePreview: true },
  });
  await prisma.lesson.create({
    data: { moduleId: c5m1.id, title: "Trigger Tilt: Identifikasi Personal", sortOrder: 2, videoDurationSec: 540 },
  });
  await prisma.lesson.create({
    data: { moduleId: c5m1.id, title: "Breathing Technique untuk Reset Mental", sortOrder: 3, videoDurationSec: 480 },
  });

  const c5m2 = await prisma.module.create({
    data: { courseId: course5.id, title: "Building Mental Resilience", sortOrder: 2 },
  });
  await prisma.lesson.create({
    data: { moduleId: c5m2.id, title: "Growth Mindset di Gaming", sortOrder: 1, videoDurationSec: 660 },
  });
  await prisma.lesson.create({
    data: { moduleId: c5m2.id, title: "Dealing with Losing Streak", sortOrder: 2, videoDurationSec: 600 },
  });
  await prisma.lesson.create({
    data: { moduleId: c5m2.id, title: "Pre-Game Routine untuk Performa Optimal", sortOrder: 3, videoDurationSec: 540 },
  });

  // Course 6: Gamer Wellness
  const course6 = await prisma.course.create({
    data: {
      gameId: null,
      title: "Gamer Wellness: Body & Mind",
      description:
        "Jaga kesehatan fisik dan mental sebagai gamer. Peregangan, postur, istirahat mata, nutrisi, dan tidur yang baik. Karena performa terbaik dimulai dari tubuh yang sehat.",
      level: "ALL",
      category: "WELLNESS",
      totalLessons: 6,
      totalDurationMin: 75,
      isPublished: true,
      sortOrder: 6,
    },
  });

  const c6m1 = await prisma.module.create({
    data: { courseId: course6.id, title: "Physical Wellness for Gamers", sortOrder: 1 },
  });
  await prisma.lesson.create({
    data: { moduleId: c6m1.id, title: "Postur Duduk & Ergonomi Gaming Setup", sortOrder: 1, videoDurationSec: 480, isFreePreview: true },
  });
  await prisma.lesson.create({
    data: { moduleId: c6m1.id, title: "Peregangan Tangan & Pergelangan", sortOrder: 2, videoDurationSec: 360 },
  });
  await prisma.lesson.create({
    data: { moduleId: c6m1.id, title: "Eye Care: Aturan 20-20-20", sortOrder: 3, videoDurationSec: 300 },
  });

  const c6m2 = await prisma.module.create({
    data: { courseId: course6.id, title: "Nutrition & Sleep", sortOrder: 2 },
  });
  await prisma.lesson.create({
    data: { moduleId: c6m2.id, title: "Nutrisi untuk Gamer: Apa yang Harus Dimakan", sortOrder: 1, videoDurationSec: 540 },
  });
  await prisma.lesson.create({
    data: { moduleId: c6m2.id, title: "Sleep Hygiene: Tidur Berkualitas untuk Gamer", sortOrder: 2, videoDurationSec: 480 },
  });
  await prisma.lesson.create({
    data: { moduleId: c6m2.id, title: "Screen Time Management", sortOrder: 3, videoDurationSec: 420 },
  });

  // ─── COMMUNITY POSTS ───────────────────────────────
  console.log("Creating community posts...");

  const post1 = await prisma.communityPost.create({
    data: {
      userId: userTensai.id,
      gameId: mlbb.id,
      category: "discussion",
      title: "Tips Jungler Season 35 - Sharing Pengalaman",
      content:
        "Halo semua! Mau sharing pengalaman main jungler di S35. Menurut gue, meta sekarang lebih ke arah early game aggression. Jungler harus bisa gank sebelum menit 3 supaya gold laner bisa snowball. Kalian gimana pengalamannya? Share dong tips kalian juga!",
      reactionsCount: 24,
      repliesCount: 8,
      viewsCount: 342,
    },
  });

  const post2 = await prisma.communityPost.create({
    data: {
      userId: userPhoenix.id,
      gameId: mlbb.id,
      category: "question",
      title: "Review Hero Baru Chip - Worth Buy?",
      content:
        "Chip baru rilis nih, ada yang udah coba? Menurut kalian worth ga buat dibeli? Gue liat skill set-nya kayaknya bagus buat support, tapi ga tau apakah viable di ranked. Mohon review-nya dari yang udah coba ya!",
      reactionsCount: 18,
      repliesCount: 12,
      viewsCount: 567,
    },
  });

  const post3 = await prisma.communityPost.create({
    data: {
      userId: userReaper.id,
      gameId: null,
      category: "mental",
      title: "Cara Mengatasi Tilt Setelah Losing Streak",
      content:
        "Kemarin losing streak 7 game berturut-turut dan hampir banting HP. Akhirnya gue coba teknik yang dipelajari dari course IXON: breathing 4-7-8 dan jalan keluar kamar dulu 15 menit. Ternyata beneran ngebantu. Ada yang punya tips lain ga?",
      reactionsCount: 45,
      repliesCount: 15,
      viewsCount: 890,
      isPinned: true,
    },
  });

  const post4 = await prisma.communityPost.create({
    data: {
      userId: userTensai.id,
      gameId: mlbb.id,
      category: "highlight",
      title: "Highlight: Comeback Epic di Ranked",
      content:
        "Barusan comeback dari 2-15 kill di ranked Mythical Glory! Enemy udah ambil 2 Lord tapi kita berhasil wipe mereka di base dan push balik. Ling gue main clean banget timing ult-nya. Video nanti di upload ya!",
      reactionsCount: 67,
      repliesCount: 22,
      viewsCount: 1203,
    },
  });

  const post5 = await prisma.communityPost.create({
    data: {
      userId: userPhoenix.id,
      gameId: mlbb.id,
      category: "guide",
      title: "Guide: Rotasi Gold Laner Early Game",
      content:
        "Banyak gold laner yang salah rotasi di early game. Ini guide singkat dari gue:\n\n1. Clear wave pertama secepatnya\n2. Cek mini map - kalau jungler musuh gank mid, push tower\n3. Jangan greedy, kalau HP < 50% recall\n4. Itemization pertama selalu Boots + Vampire Mallet\n5. Setelah item pertama jadi, baru bisa agresif trade\n\nSemoga membantu!",
      reactionsCount: 38,
      repliesCount: 9,
      viewsCount: 654,
    },
  });

  // Replies
  await prisma.communityReply.create({
    data: {
      postId: post1.id,
      userId: userPhoenix.id,
      content: "Setuju banget! Gue sebagai gold laner sangat berharap jungler gank early. Kalau jungler AFK farm, gold lane bisa kalah trade sama musuh.",
      reactionsCount: 8,
    },
  });

  await prisma.communityReply.create({
    data: {
      postId: post1.id,
      userId: userReaper.id,
      content: "Sebagai EXP laner, gue prefer jungler focus di gold lane dulu. EXP lane biasanya bisa sustain sendiri.",
      reactionsCount: 5,
    },
  });

  await prisma.communityReply.create({
    data: {
      postId: post2.id,
      userId: userTensai.id,
      content: "Gue udah coba Chip di Classic. Skill 2-nya lumayan buat crowd control tapi damage kurang. Lebih cocok jadi roamer daripada core.",
      reactionsCount: 12,
    },
  });

  await prisma.communityReply.create({
    data: {
      postId: post3.id,
      userId: userAce.id,
      content: "Gue juga sering tilt. Biasanya langsung stop main dan nonton YouTube dulu 30 menit. Baru main lagi kalau udah tenang.",
      reactionsCount: 15,
    },
  });

  await prisma.communityReply.create({
    data: {
      postId: post3.id,
      userId: userPhoenix.id,
      content: "Tips dari gue: set limit max 3 lose berturut-turut. Kalau udah 3x kalah, wajib stop. Ini aturan yang gue pakai dan terbukti rank gue naik lebih cepat.",
      reactionsCount: 22,
    },
  });

  await prisma.communityReply.create({
    data: {
      postId: post5.id,
      userId: userReaper.id,
      content: "Nice guide! Tapi menurut gue, item pertama tergantung hero. Kalau pakai Beatrix, lebih baik langsung War Axe.",
      reactionsCount: 6,
    },
  });

  // Reactions
  await prisma.communityReaction.create({
    data: { userId: userPhoenix.id, reactableType: "post", reactableId: post1.id, type: "like" },
  });
  await prisma.communityReaction.create({
    data: { userId: userReaper.id, reactableType: "post", reactableId: post1.id, type: "like" },
  });
  await prisma.communityReaction.create({
    data: { userId: userTensai.id, reactableType: "post", reactableId: post3.id, type: "like" },
  });
  await prisma.communityReaction.create({
    data: { userId: userAce.id, reactableType: "post", reactableId: post4.id, type: "fire" },
  });
  await prisma.communityReaction.create({
    data: { userId: userShadow.id, reactableType: "post", reactableId: post3.id, type: "like" },
  });

  // ─── EVENTS ─────────────────────────────────────────
  console.log("Creating events...");

  const event1 = await prisma.event.create({
    data: {
      gameId: mlbb.id,
      title: "IXON Weekly Scrim #12",
      description: "Scrim mingguan IXON untuk mengasah teamwork dan strategi. Format 5v5 custom lobby. Terbuka untuk tier Silver ke atas.",
      type: "scrim",
      format: "5v5",
      startDate: new Date("2026-03-15T19:00:00+07:00"),
      endDate: new Date("2026-03-15T22:00:00+07:00"),
      registrationDeadline: new Date("2026-03-14T23:59:00+07:00"),
      maxParticipants: 20,
      currentParticipants: 12,
      tierRequired: "SILVER",
      status: "upcoming",
      prizeDescription: "Top 3 mendapat XP bonus 500 dan badge Weekly Warrior",
    },
  });

  const event2 = await prisma.event.create({
    data: {
      gameId: mlbb.id,
      title: "IXON Rookie Tournament S1",
      description:
        "Tournament pertama IXON untuk pemain Gold tier! Format single elimination 5v5. Total hadiah Rp 5.000.000 + coaching session gratis dari Coach Alex.",
      type: "tournament",
      format: "5v5",
      startDate: new Date("2026-04-01T10:00:00+07:00"),
      endDate: new Date("2026-04-02T18:00:00+07:00"),
      registrationDeadline: new Date("2026-03-25T23:59:00+07:00"),
      maxParticipants: 40,
      currentParticipants: 16,
      tierRequired: "GOLD",
      status: "registration",
      prizeDescription: "Juara 1: Rp 3.000.000 + 3 bulan Platinum gratis. Juara 2: Rp 1.500.000. Juara 3: Rp 500.000",
    },
  });

  const event3 = await prisma.event.create({
    data: {
      gameId: mlbb.id,
      title: "1v1 Solo Showdown",
      description: "Adu skill 1v1 di mid lane! Siapa yang paling jago mechanical skill? Terbuka untuk semua tier.",
      type: "tournament",
      format: "1v1",
      startDate: new Date("2026-02-20T14:00:00+07:00"),
      endDate: new Date("2026-02-20T18:00:00+07:00"),
      registrationDeadline: new Date("2026-02-19T23:59:00+07:00"),
      maxParticipants: 32,
      currentParticipants: 32,
      tierRequired: "FREE",
      status: "completed",
      prizeDescription: "Juara 1: Badge Solo King + 1000 XP",
    },
  });

  // Event registrations
  await prisma.eventRegistration.create({
    data: { eventId: event1.id, userId: userTensai.id, status: "registered" },
  });
  await prisma.eventRegistration.create({
    data: { eventId: event1.id, userId: userReaper.id, status: "registered" },
  });
  await prisma.eventRegistration.create({
    data: { eventId: event2.id, userId: userTensai.id, teamName: "Team TENSAI", teamMembers: ["TENSAI", "PhoenixBlade", "IXONReaper", "AceHunter", "RandomPlayer"], status: "registered" },
  });

  // Event result for completed event
  await prisma.eventResult.create({
    data: {
      eventId: event3.id,
      playerId: playerTensai.id,
      placement: 2,
      kills: 12,
      deaths: 5,
      assists: 0,
      performanceScore: 85.5,
      notes: "Kalah di final melawan SniperKing. Performa konsisten sepanjang bracket.",
    },
  });

  // ─── EVALUATION ─────────────────────────────────────
  console.log("Creating evaluation review...");

  const submission = await prisma.evaluationSubmission.create({
    data: {
      playerId: playerTensai.id,
      userId: userTensai.id,
      gameplayUrl: "https://youtube.com/watch?v=example_tensai_gameplay",
      gameplayDesc: "Ranked game Mythical Glory - Ling jungle. Tim menang tapi saya rasa ada banyak yang bisa diperbaiki terutama di early game pathing.",
      heroPlayed: "Ling",
      matchContext: "Ranked Solo Queue - Mythical Glory 450 points",
      status: "completed",
      assignedCoachId: userCoach.id,
      priority: "normal",
      assignedAt: new Date("2026-03-01T10:00:00+07:00"),
      completedAt: new Date("2026-03-02T14:30:00+07:00"),
    },
  });

  const review = await prisma.evaluationReview.create({
    data: {
      submissionId: submission.id,
      coachId: userCoach.id,
      mechanicalScore: 4,
      gameSenseScore: 3,
      heroMasteryScore: 4,
      teamworkScore: 3,
      mentalScore: 4,
      feedbackText: `Hai TENSAI, terima kasih sudah submit gameplay-nya. Berikut analisis lengkap dari Coach Alex:

MECHANICAL SKILL (4/5): Eksekusi combo Ling kamu sudah sangat baik. Wall jump timing rata-rata tepat dan kamu berhasil masuk ke teamfight dengan angle yang benar di sebagian besar situasi. Yang perlu diperbaiki adalah S2 cancel animation — ada beberapa momen di mana kamu kehilangan 0.3-0.5 detik karena tidak memanfaatkan animation cancel dengan optimal.

GAME SENSE (3/5): Ini area yang paling perlu ditingkatkan. Di menit ke-2:30, kamu melakukan gank top lane padahal turtle akan spawn dalam 30 detik. Idealnya, kamu farming lithowanderer terlebih dahulu dan siap di turtle pit. Selain itu, di menit ke-8, kamu recall saat Lord area terbuka — padahal 2 musuh sudah terlihat mati di map. Itu adalah window Lord yang terlewat.

HERO MASTERY (4/5): Penggunaan ultimate Ling sudah baik, terutama di teamfight menit ke-12 dimana kamu berhasil dodge 3 skill sekaligus. Saran: latih lebih banyak combo S1-S2-AA-S1 untuk burst damage yang lebih tinggi.

TEAMWORK (3/5): Komunikasi dengan roamer masih kurang. Ada beberapa gank yang gagal karena timing masuk tidak sinkron dengan Atlas ult. Coba koordinasi lebih baik sebelum initiate.

MENTAL (4/5): Mentalmu cukup stabil sepanjang game. Bahkan saat tim tertinggal 3-8, kamu tetap farming dengan konsisten dan tidak melakukan play yang gegabah. Keep it up!`,
      improvementPlan: [
        {
          area: "Game Sense - Objective Timing",
          action: "Pasang timer mental untuk Turtle (setiap 2 menit) dan Lord (menit 8+). Sebelum recall atau gank, selalu cek apakah objective akan spawn dalam 30 detik.",
          deadline: "2 minggu",
        },
        {
          area: "Mechanical - Animation Cancel",
          action: "Latih S2 animation cancel di Practice Mode minimal 15 menit/hari. Target: bisa konsisten cancel dalam 0.1 detik.",
          deadline: "1 minggu",
        },
        {
          area: "Teamwork - Gank Coordination",
          action: "Sebelum gank, ping \"Attack\" 2x dan tunggu roamer response. Jangan initiate kalau roamer belum siap. Latih di Custom dengan teman.",
          deadline: "3 minggu",
        },
      ],
      reviewDurationMin: 45,
      wordCount: 320,
      status: "submitted",
    },
  });

  await prisma.evaluationRating.create({
    data: {
      reviewId: review.id,
      playerId: playerTensai.id,
      clarity: 5,
      relevance: 4,
      actionability: 4,
      satisfaction: 5,
      comment: "Review-nya sangat detail dan actionable. Gue langsung tau apa yang harus diperbaiki. Terima kasih Coach Alex!",
    },
  });

  // ─── DAILY MISSIONS ─────────────────────────────────
  console.log("Creating daily missions...");

  const missions = await Promise.all([
    prisma.dailyMission.create({
      data: { title: "Login Hari Ini", description: "Login ke IXON Academy hari ini", type: "login", xpReward: 10, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Selesaikan 1 Lesson", description: "Selesaikan minimal 1 lesson dari course manapun", type: "complete_lesson", xpReward: 25, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Berikan Reply di Forum", description: "Berikan minimal 1 reply di community forum", type: "post_community", xpReward: 15, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Selesaikan 1 Quiz", description: "Selesaikan quiz dengan skor minimal 70%", type: "complete_quiz", xpReward: 30, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Tonton 1 Video", description: "Tonton video lesson hingga selesai", type: "watch_video", xpReward: 15, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Wellness Check-in", description: "Isi wellness check-in harian untuk tracking kesehatan", type: "wellness_checkin", xpReward: 10, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Baca 1 Guide di Forum", description: "Baca minimal 1 guide post dari community", type: "read_guide", xpReward: 10, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Berikan Reaction di Post", description: "Berikan like/reaction di minimal 3 post", type: "give_reaction", xpReward: 5, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Review Replay Sendiri", description: "Tonton ulang 1 gameplay replay dan catat 3 kesalahan", type: "review_replay", xpReward: 35, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Latihan Hero di Practice Mode", description: "Latihan hero di practice mode minimal 10 menit", type: "practice_hero", xpReward: 20, gameId: mlbb.id, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Share Tips ke Teman", description: "Share minimal 1 tips ke sesama pemain di forum", type: "share_tips", xpReward: 15, isActive: true },
    }),
    prisma.dailyMission.create({
      data: { title: "Peregangan 5 Menit", description: "Lakukan peregangan tangan dan mata selama 5 menit", type: "stretching", xpReward: 10, isActive: true },
    }),
  ]);

  // Assign some missions to TENSAI for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.userMission.create({
    data: { userId: userTensai.id, missionId: missions[0].id, date: today, status: "completed", completedAt: new Date() },
  });
  await prisma.userMission.create({
    data: { userId: userTensai.id, missionId: missions[1].id, date: today, status: "assigned" },
  });
  await prisma.userMission.create({
    data: { userId: userTensai.id, missionId: missions[5].id, date: today, status: "completed", completedAt: new Date() },
  });
  await prisma.userMission.create({
    data: { userId: userTensai.id, missionId: missions[3].id, date: today, status: "assigned" },
  });

  // ─── CAREER PATHWAYS ────────────────────────────────
  console.log("Creating career pathways...");

  const pathway1 = await prisma.careerPathway.create({
    data: {
      title: "IXON Certified Coach",
      slug: "ixon-certified-coach",
      description:
        "Program sertifikasi coach esports resmi IXON Academy. Pelajari teknik coaching, review gameplay, mental coaching, dan komunikasi efektif. Lulusan mendapat sertifikat resmi dan bisa menjadi coach di platform IXON.",
      icon: "trophy",
      durationWeeks: 12,
      price: 3_500_000,
      requirements: ["Minimal rank Mythic di game yang dipilih", "Sudah menyelesaikan 3 course IXON", "Pengalaman bermain minimal 2 tahun"],
      outcomes: ["Sertifikat IXON Certified Coach", "Akses dashboard coach", "Bisa menerima review request", "Revenue sharing dari review"],
      isPublished: true,
    },
  });

  const pathway2 = await prisma.careerPathway.create({
    data: {
      title: "Esports Analyst Program",
      slug: "esports-analyst-program",
      description:
        "Program intensif untuk menjadi esports analyst profesional. Pelajari draft analysis, macro strategy breakdown, data-driven performance evaluation, dan presentation skill.",
      icon: "chart-bar",
      durationWeeks: 12,
      price: 3_000_000,
      requirements: ["Pemahaman meta game yang kuat", "Kemampuan analitis", "Familiar dengan statistik dasar"],
      outcomes: ["Sertifikat Esports Analyst", "Portfolio analisis 5 pertandingan pro", "Networking dengan tim esports", "Peluang magang di tim pro"],
      isPublished: true,
    },
  });

  const pathway3 = await prisma.careerPathway.create({
    data: {
      title: "Content Creator Bootcamp",
      slug: "content-creator-bootcamp",
      description:
        "Bootcamp untuk menjadi content creator gaming yang sukses. Dari editing video, thumbnail design, copywriting, hingga strategi growth di YouTube dan TikTok.",
      icon: "video",
      durationWeeks: 8,
      price: 2_500_000,
      requirements: ["Punya smartphone atau PC untuk editing", "Akun YouTube atau TikTok aktif", "Passion di gaming content"],
      outcomes: ["Portfolio 10 konten gaming", "Strategi growth YouTube/TikTok", "Monetization roadmap", "Komunitas creator IXON"],
      isPublished: true,
    },
  });

  // ─── USER REPUTATION ────────────────────────────────
  console.log("Creating user reputation records...");

  await prisma.userReputation.create({
    data: { userId: userTensai.id, totalScore: 450, helpfulCount: 32, reportCount: 0, badges: ["jungle_expert", "helpful_member", "early_adopter"], cleanDaysStreak: 45 },
  });
  await prisma.userReputation.create({
    data: { userId: userPhoenix.id, totalScore: 680, helpfulCount: 55, reportCount: 0, badges: ["gold_lane_master", "top_contributor", "guide_writer", "early_adopter"], cleanDaysStreak: 60 },
  });
  await prisma.userReputation.create({
    data: { userId: userShadow.id, totalScore: 180, helpfulCount: 12, reportCount: 0, badges: ["ff_pioneer"], cleanDaysStreak: 20 },
  });
  await prisma.userReputation.create({
    data: { userId: userReaper.id, totalScore: 320, helpfulCount: 22, reportCount: 0, badges: ["exp_warrior", "mental_advocate"], cleanDaysStreak: 35 },
  });
  await prisma.userReputation.create({
    data: { userId: userAce.id, totalScore: 50, helpfulCount: 3, reportCount: 0, badges: ["newcomer"], cleanDaysStreak: 5 },
  });

  // ─── TALENT BOARD ───────────────────────────────────
  console.log("Creating talent board entries...");

  await prisma.talentBoard.create({
    data: {
      playerId: playerTensai.id,
      talentScore: 78,
      skillSignal: 82,
      mindsetSignal: 74,
      commitmentSignal: 78,
      isShortlisted: false,
      trialStatus: "none",
      notes: "Strong jungler with consistent performance. Needs improvement on game sense and objective timing.",
    },
  });

  await prisma.talentBoard.create({
    data: {
      playerId: playerPhoenix.id,
      talentScore: 87,
      skillSignal: 90,
      mindsetSignal: 84,
      commitmentSignal: 86,
      isShortlisted: true,
      shortlistedBy: userAdmin.id,
      trialStatus: "invited",
      notes: "Top gold laner prospect. Excellent mechanical skill and consistency. Recommended for team trial.",
    },
  });

  await prisma.talentBoard.create({
    data: {
      playerId: playerReaper.id,
      talentScore: 72,
      skillSignal: 75,
      mindsetSignal: 70,
      commitmentSignal: 72,
      isShortlisted: false,
      trialStatus: "none",
      notes: "Solid EXP laner. Good sustain play but needs to work on split push decision making.",
    },
  });

  // ─── NOTIFICATIONS ──────────────────────────────────
  console.log("Creating notifications...");

  const notifData = [
    {
      type: "evaluation",
      title: "Review Selesai!",
      body: "Coach Alex sudah menyelesaikan review gameplay kamu. Cek hasilnya sekarang!",
      data: { submissionId: submission.id },
      isRead: true,
      sentAt: new Date("2026-03-02T14:30:00+07:00"),
      readAt: new Date("2026-03-02T15:00:00+07:00"),
    },
    {
      type: "mission",
      title: "Misi Harian Baru!",
      body: "4 misi harian baru sudah tersedia. Selesaikan untuk mendapatkan XP!",
      data: { missionCount: 4 },
      isRead: true,
      sentAt: new Date("2026-03-10T00:00:00+07:00"),
      readAt: new Date("2026-03-10T08:30:00+07:00"),
    },
    {
      type: "event",
      title: "Scrim Besok!",
      body: "IXON Weekly Scrim #12 akan dimulai besok pukul 19:00 WIB. Pastikan kamu siap!",
      data: { eventId: event1.id },
      isRead: false,
      sentAt: new Date("2026-03-14T10:00:00+07:00"),
    },
    {
      type: "community",
      title: "Post kamu dapat 20+ reactions!",
      body: "Post 'Tips Jungler Season 35' mendapat 24 reactions. Komunitas suka tips kamu!",
      data: { postId: post1.id },
      isRead: true,
      sentAt: new Date("2026-03-08T16:00:00+07:00"),
      readAt: new Date("2026-03-08T18:00:00+07:00"),
    },
    {
      type: "course",
      title: "Lanjutkan Course Kamu",
      body: "Kamu sudah 30% menyelesaikan 'Jungle Mastery'. Yuk lanjutkan belajar!",
      data: { courseId: course1.id },
      isRead: false,
      sentAt: new Date("2026-03-09T09:00:00+07:00"),
    },
    {
      type: "achievement",
      title: "Badge Baru: Jungle Expert!",
      body: "Selamat! Kamu mendapatkan badge Jungle Expert setelah menyelesaikan 5 lesson jungling.",
      data: { badge: "jungle_expert" },
      isRead: true,
      sentAt: new Date("2026-03-05T20:00:00+07:00"),
      readAt: new Date("2026-03-05T20:05:00+07:00"),
    },
    {
      type: "system",
      title: "Update Platform v1.2",
      body: "IXON Academy v1.2 sudah rilis! Fitur baru: Wellness Check-in, Career Pathways, dan improved Talent Board.",
      data: { version: "1.2" },
      isRead: false,
      sentAt: new Date("2026-03-07T12:00:00+07:00"),
    },
    {
      type: "wellness",
      title: "Jangan Lupa Wellness Check-in!",
      body: "Sudah 2 hari kamu belum wellness check-in. Yuk isi untuk tracking kesehatan gaming-mu.",
      data: null,
      isRead: false,
      sentAt: new Date("2026-03-10T07:00:00+07:00"),
    },
  ];

  for (const notif of notifData) {
    await prisma.notification.create({
      data: {
        userId: userTensai.id,
        type: notif.type,
        title: notif.title,
        body: notif.body,
        data: notif.data ?? undefined,
        isRead: notif.isRead,
        sentAt: notif.sentAt,
        readAt: notif.readAt ?? null,
      },
    });
  }

  // ─── USER COURSE PROGRESS ──────────────────────────
  console.log("Creating course progress for TENSAI...");

  await prisma.userCourseProgress.create({
    data: {
      userId: userTensai.id,
      courseId: course1.id,
      lessonsCompleted: 3,
      quizScoreAvg: 85.0,
      status: "in_progress",
      startedAt: new Date("2026-02-15"),
    },
  });

  // Lesson progress for TENSAI
  await prisma.userLessonProgress.create({
    data: { userId: userTensai.id, lessonId: c1m1l1.id, watchedSeconds: 720, isCompleted: true, completedAt: new Date("2026-02-15") },
  });

  // ─── WELLNESS CHECKINS ──────────────────────────────
  console.log("Creating wellness check-ins...");

  await prisma.wellnessCheckin.create({
    data: {
      userId: userTensai.id,
      sleepHours: 7.5,
      exerciseToday: true,
      screenBreaks: 3,
      mood: 4,
      handWristPain: false,
      eyeStrain: false,
      notes: "Hari ini cukup produktif. Main 5 game ranked dan menang 4.",
      createdAt: new Date("2026-03-07T22:00:00+07:00"),
    },
  });

  await prisma.wellnessCheckin.create({
    data: {
      userId: userTensai.id,
      sleepHours: 6.0,
      exerciseToday: false,
      screenBreaks: 1,
      mood: 3,
      handWristPain: true,
      eyeStrain: true,
      notes: "Kurang tidur dan kebanyakan main. Pergelangan tangan agak sakit. Besok harus istirahat lebih.",
      createdAt: new Date("2026-03-08T23:30:00+07:00"),
    },
  });

  await prisma.wellnessCheckin.create({
    data: {
      userId: userTensai.id,
      sleepHours: 8.0,
      exerciseToday: true,
      screenBreaks: 4,
      mood: 5,
      handWristPain: false,
      eyeStrain: false,
      notes: "Tidur nyenyak, olahraga pagi, dan main cuma 3 game. Performa di ranked jauh lebih baik!",
      createdAt: new Date("2026-03-09T21:00:00+07:00"),
    },
  });

  console.log("Seeding completed successfully!");
  console.log("─────────────────────────────────────────");
  console.log("Users created: 9 (5 players, 1 coach, 1 admin, 1 scout, 1 parent)");
  console.log("Games: 2 (MLBB, Free Fire)");
  console.log("Players: 5");
  console.log("Courses: 6 (with modules, lessons, quizzes)");
  console.log("Community posts: 5 (with replies & reactions)");
  console.log("Events: 3");
  console.log("Evaluation review: 1 (with rating)");
  console.log("Daily missions: 12");
  console.log("Career pathways: 3");
  console.log("Default password for all users: ixon2026");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
