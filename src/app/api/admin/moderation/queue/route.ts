import { requireRole, ok, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireRole("ADMIN");
  if (!user) return forbidden();

  const reports = await prisma.communityReport.findMany({
    where: { status: "pending" },
    include: {
      reporter: { select: { id: true, namaAsli: true } },
    },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  return ok(reports);
}
