import { requireAuth, ok, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id } = await params;

  const notif = await prisma.notification.findFirst({
    where: { id, userId: user.id },
  });

  if (!notif) return notFound("Notification");

  await prisma.notification.update({
    where: { id },
    data: { isRead: true, readAt: new Date() },
  });

  return ok({ read: true });
}
