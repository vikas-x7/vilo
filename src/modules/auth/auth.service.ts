import type { User } from "@/lib/prisma";
import {
  findUserByEmail,
  findUserById,
  findUserByUsername,
  createUser,
} from "./auth.repository";

import { RegisterInput, LoginInput, SafeUser } from "./auth.types";

function sanitizeUser(user: User): SafeUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createUsernameBase(email: string) {
  const localPart = email.split("@")[0] ?? "user";
  const slug = localPart
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "user";
}

async function generateUniqueUsername(email: string) {
  const baseUsername = createUsernameBase(email);
  let username = baseUsername;
  let suffix = 1;

  while (await findUserByUsername(username)) {
    suffix += 1;
    username = `${baseUsername}-${suffix}`;
  }

  return username;
}

export async function registerUser(data: RegisterInput): Promise<SafeUser> {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const username = await generateUniqueUsername(data.email);
  const user = await createUser({ ...data, username });

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
