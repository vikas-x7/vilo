import axios from "axios";
import { api } from "@/lib/axios";
import type { SafeUser } from "@/modules/auth/auth.types";
import { loginSchema, registerSchema } from "@/modules/auth/auth.validator";
import { z } from "zod";

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

interface AuthResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

function getAuthErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.response?.data?.errors) {
      return "Validation Error: Please check your inputs.";
    }

    return error.response?.data?.error || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export const authService = {
  login: async (data: LoginInput) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      return response.data;
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(error, "Something went wrong during login"),
      );
    }
  },
  register: async (data: RegisterInput) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      return response.data;
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(error, "Something went wrong during registration"),
      );
    }
  },
  me: async (): Promise<AuthResponse<SafeUser>> => {
    try {
      const response = await api.get<AuthResponse<SafeUser>>("/auth/me");
      return response.data;
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(
          error,
          "Something went wrong while fetching your profile",
        ),
      );
    }
  },
};
