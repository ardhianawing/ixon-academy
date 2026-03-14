import { NextRequest } from "next/server";
import { requireRole, ok, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await requireRole("ADMIN");
  if (!user) return forbidden();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const tier = searchParams.get("tier");
  const role = searchParams.get("role");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;

  const users = await prisma.user.findMany({
    where: {
      ...(search && {
        OR: [
          { namaAsli: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
        ],
      }),
      ...(tier && { tier: tier as never }),
      ...(role && { role: role as never }),
    },
    select: {
      id: true,
      namaAsli: true,
      phone: true,
      email: true,
      role: true,
      tier: true,
      createdAt: true,
      _count: { select: { players: true, submissions: true } },
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prisma.user.count({
    where: {
      ...(search && {
        OR: [
          { namaAsli: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(tier && { tier: tier as never }),
      ...(role && { role: role as never }),
    },
  });

  return ok({ users, total, page, limit });
}
