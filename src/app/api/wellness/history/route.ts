import { NextRequest } from "next/server";
import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") ?? "30");

  const from = new Date();
  from.setDate(from.getDate() - days);

  const history = await prisma.wellnessCheckin.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: from },
    },
    orderBy: { createdAt: "desc" },
  });

  return ok(history);
}
