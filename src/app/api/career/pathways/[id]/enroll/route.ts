import { requireAuth, ok, err, unauthorized, notFound, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  if (user.tier === "FREE") return forbidden();

  const { id: pathwayId } = await params;

  const pathway = await prisma.careerPathway.findUnique({
    where: { id: pathwayId, isPublished: true },
  });

  if (!pathway) return notFound("Career Pathway");

  const existing = await prisma.careerEnrollment.findUnique({
    where: { userId_pathwayId: { userId: user.id, pathwayId } },
  });

  if (existing) return err("Kamu sudah terdaftar di pathway ini");

  const enrollment = await prisma.careerEnrollment.create({
    data: { userId: user.id, pathwayId },
  });

  return ok(enrollment, 201);
}
