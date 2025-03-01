/* eslint-disable @next/next/no-img-element */
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

export const Hero = () => (
  <section className="relative flex flex-col items-center justify-center  text-center overflow-hidden mt-30">
    <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
      <div className="flex items-center gap-0  border border-stone-300 rounded-sm overflow-hidden shadow-sm">
        <span className="px-4 py-1.5 text-xs font-mono text-black bg-[#f0ede7] border-r border-stone-300">
          Introducing vilo
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

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[50px] font-bold text-[#EDECEC] leading-[1.05] tracking-tight mb-6 mt-4">
        LaTeX Documents Developer Portfolios Learning Roadmaps
      </h1>

      <p className="text-sm sm:text-[14px] text-[#9A9996] ">
        Write with precision, showcase with confidence, and learn with clarity -
        all inside <br /> one focused platform built for developers.
      </p>

      {/* CTA Buttons */}
    </div>
    <div>
      <img
        className="w-6xl mt-30 rounded-sm"
        src="https://i.pinimg.com/736x/21/ce/52/21ce5263171481886a153ad6ab9d9c92.jpg"
        alt=""
      />
    </div>
    <div className="mt-60 w-6xl text-white text-start">
      <h1 className="text-2xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing
        <br />
        architecto beatae repellat facilis laboriosam quidem atque voluptate
      </h1>
    </div>
    <div className="flex flex-col sm:flex-row  gap-2 mt-10 mb-90">
      <a
        href="#"
        className="px-8 py-2 w-[280px] h-[300px] bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm hover:bg-stone-700 transition-colors"
      >
        Get Started Free
      </a>
      <a
        href="#"
        className="px-8 py-2 w-[280px] h-[300px] bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm hover:bg-stone-700 transition-colors"
      >
        Get Started Free
      </a>
      <a
        href="#"
        className="px-8 py-2 w-[280px] h-[300px] bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm hover:bg-stone-700 transition-colors"
      >
        Get Started Free
      </a>
      <a
        href="#"
        className="px-8 py-2 w-[280px] h-[300px] bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm hover:bg-stone-700 transition-colors"
      >
        Get Started Free
      </a>
    </div>
  </section>
);
