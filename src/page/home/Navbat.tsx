"use client";

import Link from "next/link";
import { useState } from "react";
import { GiRoundShield } from "react-icons/gi";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 w-full max-w-7xl mx-auto border-x border-[#38352e] font-mono">
      {/* Logo */}
      <div className="flex items-center gap-2 text-[#E6ECEC]">
        <GiRoundShield size={25} /> Helix AI
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {["Home", "About", "Feature", "Pricing"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm text-[#E6ECEC] hover:text-[#E6ECEC]/60 transition-colors tracking-wide font-mono"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/login"
          className="px-5 py-1 bg-[#F0EDE7] text-black text-sm font-medium rounded-sm hover:bg-stone-700 hover:text-white transition-colors font-mono tracking-wide"
        >
          Login
        </Link>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden p-2 flex flex-col justify-center items-center gap-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span
          className={`block w-5 h-0.5 bg-[#E6ECEC] transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-[#E6ECEC] transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-[#E6ECEC] transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1B1913] border-b border-[#38352e] px-6 py-5 flex flex-col gap-4 md:hidden z-50">
          {["Home", "About", "Feature", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-mono text-[#E6ECEC]/70 hover:text-[#E6ECEC] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <hr className="border-[#38352e]" />
          <Link
            href="/login"
            className="text-sm font-mono text-[#E6ECEC]/70 hover:text-[#E6ECEC] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 bg-[#F0EDE7] text-black text-sm font-mono text-center rounded-sm hover:bg-stone-300 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};
