import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  await prisma.notification.updateMany({
    where: { userId: user.id, isRead: false },
    data: { isRead: true, readAt: new Date() },
  });

  return ok({ read: true });
}
