"use client";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-[#14120B] backdrop-blur-sm ">
      <div className="flex items-center gap-2 text-white">vilo</div>

      <div className="hidden md:flex items-center gap-8">
        {["Solutions", "Use Cases", "Developers", "Resources", "Pricing"].map(
          (item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-white hover:text-stone-900 transition-colors tracking-wide font-mono"
            >
              {item}
            </a>
          ),
        )}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/login"
          className="px-5 py-2 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors font-mono tracking-wide"
        >
          Get Started
        </Link>
      </div>

      <button
        className="md:hidden p-2 text-stone-700"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-5 h-0.5 bg-stone-700 mb-1"></div>
        <div className="w-5 h-0.5 bg-stone-700 mb-1"></div>
        <div className="w-5 h-0.5 bg-stone-700"></div>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#f0ede7] border-b border-stone-200 px-6 py-4 flex flex-col gap-4 md:hidden">
          {["Solutions", "Use Cases", "Developers", "Resources", "Pricing"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-mono text-stone-600 hover:text-stone-900"
              >
                {item}
              </a>
            ),
          )}
          <hr className="border-stone-200" />
          <a href="#" className="text-sm font-mono text-stone-600">
            Login
          </a>
          <a
            href="#"
            className="px-5 py-2 bg-stone-900 text-white text-sm font-mono text-center rounded-sm"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export const Hero = () => (
  <section className="relative min-h-[calc(100vh-64px)] bg-[#14120B] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
    <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
      <div className="flex items-center gap-0 mb-8 border border-stone-300 rounded-sm overflow-hidden shadow-sm">
        <span className="px-4 py-1.5 text-xs font-mono text-black bg-[#f0ede7] border-r border-stone-300">
          Introducing Orren
        </span>
        <a
          href="#"
          className="px-4 py-1.5 text-xs font-mono font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors flex items-center gap-1.5"
        >
          Try now
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 fill-none stroke-current"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-[#EDECEC] leading-[1.05] tracking-tight mb-6 font-mono">
        Meet your first
        <br />
        autonomous builder.
      </h1>

      <p className="text-sm sm:text-base text-stone-500 font-mono max-w-md leading-relaxed">
        Orren helps teams deploy AI operators that plan, execute, and scale
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-10">
        <a
          href="#"
          className="px-8 py-3 bg-stone-900 text-white text-sm font-mono font-semibold rounded-sm hover:bg-stone-700 transition-colors"
        >
          Get Started Free
        </a>
        <a
          href="#"
          className="px-8 py-3 border border-stone-300 text-stone-700 text-sm font-mono font-semibold rounded-sm hover:border-stone-500 hover:text-stone-900 transition-colors"
        >
          View Demo
        </a>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-stone-400 to-transparent opacity-30" />
  </section>
);
