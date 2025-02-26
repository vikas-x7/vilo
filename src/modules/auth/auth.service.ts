import type { User } from "@/lib/prisma";
import { findUserByEmail, findUserById, createUser } from "./auth.repository";

import { RegisterInput, LoginInput, SafeUser } from "./auth.types";

function sanitizeUser(user: User): SafeUser {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function registerUser(data: RegisterInput): Promise<SafeUser> {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await createUser(data);

  return sanitizeUser(user);
}

export async function loginUser(data: LoginInput): Promise<SafeUser> {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.password !== data.password) {
    throw new Error("Invalid email or password");
  }

  return sanitizeUser(user);
}

export async function getCurrentUser(userId: number): Promise<SafeUser> {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return sanitizeUser(user);
}
