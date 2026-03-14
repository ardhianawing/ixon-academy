import { NextRequest } from "next/server";
import { requireAuth, ok, err, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id: eventId } = await params;
  const { teamName, teamMembers } = await req.json().catch(() => ({}));

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return notFound("Event");

  if (event.status !== "upcoming") return err("Pendaftaran sudah ditutup");
  if (new Date() > event.registrationDeadline) return err("Deadline pendaftaran sudah lewat");
  if (event.currentParticipants >= event.maxParticipants) return err("Event sudah penuh");

  // Check tier requirement
  const tierOrder = ["FREE", "SILVER", "GOLD", "PLATINUM"];
  const userTierIdx = tierOrder.indexOf(user.tier);
  const requiredTierIdx = tierOrder.indexOf(event.tierRequired);
  if (userTierIdx < requiredTierIdx) {
    return err(`Event ini membutuhkan tier ${event.tierRequired}`, 403);
  }

  const existing = await prisma.eventRegistration.findUnique({
    where: { eventId_userId: { eventId, userId: user.id } },
  });
  if (existing) return err("Kamu sudah terdaftar di event ini");

  const [registration] = await prisma.$transaction([
    prisma.eventRegistration.create({
      data: {
        eventId,
        userId: user.id,
        teamName: teamName ?? null,
        teamMembers: teamMembers ?? null,
      },
    }),
    prisma.event.update({
      where: { id: eventId },
      data: { currentParticipants: { increment: 1 } },
    }),
  ]);

  return ok(registration, 201);
}
