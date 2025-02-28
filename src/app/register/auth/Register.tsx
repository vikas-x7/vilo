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
            // You can redirect to login or dashboard directly depending on API behavior
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
        <div style={{ maxWidth: 400, margin: "100px auto" }}>
            <h2>Register</h2>

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

                {registerMutation.isError && (
                    <p style={{ color: "red", marginBottom: 12 }}>
                        {(registerMutation.error as Error).message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    style={{ width: "100%", padding: 10, marginBottom: 12 }}
                >
                    {registerMutation.isPending ? "Registering..." : "Register"}
                </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 12 }}>
                <p>
                    Already have an account?{" "}
                    <Link href="/login" style={{ color: "blue", textDecoration: "underline" }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
