import Link from "next/link";
import React from "react";
import { GiRoundShield } from "react-icons/gi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#14120B] text-white overflow-hidden font-gothic">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1B1913] border-r border-white/5 hidden md:flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 ">
          <h2 className="text-lg tracking-tight text-white/90 flex items-center gap-2">
            <GiRoundShield size={25} /> Vilo
          </h2>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mx-4" />

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 mt-4 text-sm">
          <Link
            href="/dashboard/portfolio"
            className="px-4 py-2.5 text-white/50 hover:text-white/90 hover:bg-white/5 rounded-sm transition-all duration-200"
          >
            Portfolio
          </Link>
          <Link
            href="/dashboard/latex"
            className="px-4 py-2.5 text-white/50 hover:text-white/90 hover:bg-white/5 rounded-sm transition-all duration-200"
          >
            LaTeX
          </Link>
          <Link
            href="/dashboard/roadmap"
            className="px-4 py-2.5 text-white/50 hover:text-white/90 hover:bg-white/5 rounded-sm transition-all duration-200"
          >
            Roadmap
          </Link>
          <Link
            href="/dashboard/profile"
            className="px-4 py-2.5 text-white/50 hover:text-white/90 hover:bg-white/5 rounded-sm transition-all duration-200"
          >
            Profile
          </Link>
        </nav>

        {/* Bottom — Terms */}
        <div className="mt-auto px-4 pb-6">
          <div className="border-t border-white/5 pt-4">
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              By accessing this dashboard, you agree to our terms of service.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
