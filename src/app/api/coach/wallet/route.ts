import { requireRole, ok, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireRole("COACH");
  if (!user) return forbidden();

  const wallet = await prisma.coachWallet.findUnique({
    where: { userId: user.id },
    include: {
      transactions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  return ok(wallet ?? { balance: 0, totalEarned: 0, totalWithdrawn: 0, transactions: [] });
}
