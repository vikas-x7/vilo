import { prisma } from "@/lib/prisma";
import { RegisterInput } from "./auth.types";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function createUser(data: RegisterInput & { username: string }) {
  return prisma.user.create({
    data,
  });
}
