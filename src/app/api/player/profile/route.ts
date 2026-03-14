import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, err, unauthorized, requireAuth } from "@/lib/api";

export async function GET() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      namaAsli: true,
      phone: true,
      email: true,
      avatarUrl: true,
      role: true,
      tier: true,
      onboardingDone: true,
      createdAt: true,
      players: {
        include: { game: true },
      },
      reputation: true,
    },
  });

  if (!profile) return err("User tidak ditemukan", 404);
  return ok(profile);
}

export async function PUT(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const body = await req.json();
  const { namaAsli, avatarUrl, onboardingDone } = body;

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(namaAsli && { namaAsli }),
      ...(avatarUrl !== undefined && { avatarUrl }),
      ...(onboardingDone !== undefined && { onboardingDone }),
    },
    select: {
      id: true,
      namaAsli: true,
      phone: true,
      email: true,
      avatarUrl: true,
      role: true,
      tier: true,
      onboardingDone: true,
    },
  });

  return ok(updated);
}
