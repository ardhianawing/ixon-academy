import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function unauthorized() {
  return err("Unauthorized", 401);
}

export function forbidden() {
  return err("Forbidden", 403);
}

export function notFound(resource = "Resource") {
  return err(`${resource} not found`, 404);
}

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) return null;
  return session.user;
}

export async function requireRole(...roles: string[]) {
  const user = await requireAuth();
  if (!user) return null;
  if (!roles.includes(user.role)) return null;
  return user;
}
