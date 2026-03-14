import { NextRequest } from "next/server";
import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const game = searchParams.get("game");

  const events = await prisma.event.findMany({
    where: {
      ...(status && { status }),
      ...(game && { gameId: game }),
    },
    include: {
      game: { select: { id: true, title: true, slug: true, iconUrl: true } },
      _count: { select: { registrations: true } },
    },
    orderBy: { startDate: "asc" },
  });

  return ok(events);
}
