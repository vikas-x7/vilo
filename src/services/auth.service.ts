import axios from "axios";
import { loginSchema, registerSchema } from "@/modules/auth/auth.validator";
import { z } from "zod";

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const authService = {
    login: async (data: LoginInput) => {
        try {
            const response = await axios.post("/api/auth/login", data);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            if (error.response?.data?.errors) {
                throw new Error("Validation Error: Please check your inputs.");
            }
            throw new Error(
                error.response?.data?.error ||
                error.message ||
                "Something went wrong during login"
            );
        }
    },
    register: async (data: RegisterInput) => {
        try {
            const response = await axios.post("/api/auth/register", data);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            if (error.response?.data?.errors) {
                throw new Error("Validation Error: Please check your inputs.");
            }
            throw new Error(
                error.response?.data?.error ||
                error.message ||
                "Something went wrong during registration"
            );
        }
    },
};
