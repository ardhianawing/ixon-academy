import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { namaAsli, phone, email, password, role } = body;

  if (!namaAsli || !phone || !email || !password) {
    return err("namaAsli, phone, email, dan password wajib diisi");
  }

  const existingPhone = await prisma.user.findUnique({ where: { phone } });
  if (existingPhone) return err("Nomor HP sudah terdaftar");

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) return err("Email sudah terdaftar");

  const passwordHash = await bcrypt.hash(password, 10);

  const allowedRoles = ["PLAYER", "COACH", "PARENT"] as const;
  const userRole = allowedRoles.includes(role) ? role : "PLAYER";

  const user = await prisma.user.create({
    data: {
      namaAsli,
      phone,
      email,
      passwordHash,
      role: userRole,
    },
    select: {
      id: true,
      namaAsli: true,
      phone: true,
      email: true,
      role: true,
      tier: true,
      createdAt: true,
    },
  });

  return ok(user, 201);
}
