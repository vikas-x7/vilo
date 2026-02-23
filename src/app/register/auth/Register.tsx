"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/modules/auth/auth.validator";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      router.push("/login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const result = registerSchema.safeParse({ email, password });
    if (!result.success) {
      setValidationError(result.error.issues[0]?.message || "Invalid input");
      return;
    }

    registerMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {validationError && (
            <p className="text-sm text-red-500">{validationError}</p>
          )}

          {registerMutation.isError && (
            <p className="text-sm text-red-500">
              {(registerMutation.error as Error).message}
            </p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-medium underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
