import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function getCurrentUser(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: Number(userId) },
  });
}
export async function getAuthUser() {
  return {
    id: 1,
    isAdmin: true, // force admin for now
  };
}
