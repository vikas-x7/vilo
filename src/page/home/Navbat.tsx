"use client";

import Link from "next/link";
import { useState } from "react";
import { GiRoundShield } from "react-icons/gi";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-10 py-4 w-7xl border-x border-[#38352e] font-gothic font">
      <div className="flex items-center gap-2 text-white ">
        <GiRoundShield size={25} /> Vilo
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Home", "About ", "Feature", "Pricing"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm font-medium text-white hover:text-stone-900 transition-colors tracking-wide font-mono"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/login"
          className="px-5 py-1 bg-[#F0EDE7] text-black text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors font-mono tracking-wide"
        >
          Login
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
