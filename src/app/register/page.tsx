"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/modules/auth/auth.validator";
import Link from "next/link";
import { BiLogoGithub } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GiRoundShield } from "react-icons/gi";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-stretch bg-[#14120B] font-gothic">
      {/* Left — Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden h-screen">
        <img
          src="https://i.pinimg.com/736x/f6/60/fd/f660fdc0be1bc9faa08799fe28424dae.jpg"
          alt="Register visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-between px-8 py-12 h-screen">
        {/* Spacer top */}
        <div />

        {/* Center content */}
        <div className="w-full max-w-md text-white">
          {/* Title */}
          <h1 className="text-[15px] sm:text-[25px] tracking-tight mb-2 text-white flex items-center gap-2">
            <GiRoundShield size={35} />
            Create an account
          </h1>

          {/* Subtitle */}
          <p className="text-[11px] text-white/40 mb-7 max-w-xs leading-relaxed">
            Access your tasks, notes, and projects anytime.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">
                Your email
              </label>
              <input
                type="email"
                placeholder="natalia.brak@knmstudio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-white/10 bg-white/5 rounded-sm px-4 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">
                Create password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-white/10 bg-white/5 rounded-sm px-4 py-2 pr-16 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors text-xs font-semibold tracking-wide"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Errors */}
            {validationError && (
              <p className="text-xs text-red-400">{validationError}</p>
            )}
            {registerMutation.isError && (
              <p className="text-xs text-red-400">
                {(registerMutation.error as Error).message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-[#F0EDE7] text-black/80 hover:bg-[#F0EDE7]/90 rounded-sm py-2 text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-1"
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/25 whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Continue with Google"
              className="w-1/2 py-2 border border-white/10 bg-white/5 rounded-sm text-sm text-white/50 hover:border-white/25 hover:text-white/80 hover:bg-white/10 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <FcGoogle /> Google
              </span>
            </button>
            <button
              type="button"
              aria-label="Continue with GitHub"
              className="w-1/2 py-2 border border-white/10 bg-white/5 rounded-sm text-sm text-white/50 hover:border-white/25 hover:text-white/80 hover:bg-white/10 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <BiLogoGithub /> Github
              </span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-white/30 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-white/90 hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Terms & Conditions — Bottom */}
        <div className="w-full max-w-md">
          <div className="border-t border-white/5 pt-4">
            <h2 className="text-[12px] text-white/30 mb-1">
              Terms & Conditions
            </h2>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              By accessing this website, you agree to follow all applicable laws
              and our terms of service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
