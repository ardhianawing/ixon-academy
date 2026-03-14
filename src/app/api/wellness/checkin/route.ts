import { NextRequest } from "next/server";
import { requireAuth, ok, err, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const body = await req.json();
  const { sleepHours, exerciseToday, screenBreaks, mood, handWristPain, eyeStrain, notes } = body;

  if (sleepHours === undefined || exerciseToday === undefined || mood === undefined) {
    return err("sleepHours, exerciseToday, dan mood wajib diisi");
  }

  if (mood < 1 || mood > 5) return err("mood harus antara 1-5");

  const checkin = await prisma.wellnessCheckin.create({
    data: {
      userId: user.id,
      sleepHours,
      exerciseToday,
      screenBreaks: screenBreaks ?? 0,
      mood,
      handWristPain: handWristPain ?? false,
      eyeStrain: eyeStrain ?? false,
      notes: notes ?? null,
    },
  });

  return ok(checkin, 201);
}
