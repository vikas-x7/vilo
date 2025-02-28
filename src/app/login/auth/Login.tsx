"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/modules/auth/auth.validator";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setValidationError(result.error.issues[0]?.message || "Invalid input");
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {validationError && (
          <p style={{ color: "red", marginBottom: 12 }}>{validationError}</p>
        )}

        {loginMutation.isError && (
          <p style={{ color: "red", marginBottom: 12 }}>
            {(loginMutation.error as Error).message}
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          style={{ width: "100%", padding: 10, marginBottom: 12 }}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: 12 }}>
        <p>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "blue", textDecoration: "underline" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
