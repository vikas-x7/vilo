/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowRoundForward, IoMdDocument } from "react-icons/io";
import { SiFuturelearn } from "react-icons/si";

export const Hero = () => (
  <section className="relative flex flex-col items-center justify-center text-center overflow-hidden mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 lg:px-8">
    <div className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-0 border border-stone-300 rounded-sm overflow-hidden shadow-sm">
        <span className="px-3 sm:px-4 py-1.5 text-xs text-black bg-[#f0ede7] border-r border-stone-300">
          Introducing vilo
        </span>
        <a
          href="#"
          className="px-3 sm:px-4 py-1.5 text-xs font-mono font-semibold text-white hover:bg-stone-700 transition-colors flex gap-1.5 items-center justify-center"
        >
          Try now <IoIosArrowRoundForward />
        </a>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-[47px] font-bold text-[#E6ECEC] leading-[1.05] tracking-tight mb-6 mt-4">
        LaTeX Documents Developer <br /> Portfolios Learning Roadmaps
      </h1>

      <p className="text-sm text-[#9A9996] max-w-lg mx-auto">
        Write with precision, showcase with confidence, and learn with clarity —
        all inside one focused platform built for developers.
      </p>
    </div>

    <div className="relative w-full max-w-6xl mt-12 sm:mt-16 md:mt-20 px-0">
      <img
        className="w-full rounded-sm"
        src="https://i.pinimg.com/736x/21/ce/52/21ce5263171481886a153ad6ab9d9c92.jpg"
        alt=""
      />
      <img
        className="absolute w-[calc(100%-4.5rem)] rounded-lg"
        style={{
          left: "2.25rem",
          right: "2.25rem",
          top: "6%",
          width: "calc(100% - 4.5rem)",
          borderRadius: "8px",
        }}
        src="https://res.cloudinary.com/dyv9kenuj/image/upload/v1771953075/Screenshot_from_2026-02-24_22-40-59_esdabd.png"
        alt=""
      />
    </div>

    {/* Section Heading */}
    <div className="w-full max-w-6xl text-start mt-32 sm:mt-40 md:mt-52 mb-6 px-2">
      <h1 className="text-lg sm:text-xl md:text-[23px] text-[#E6ECEC]/90">
        All the Essential Tools to Create Professional Documents, Showcase{" "}
        <br />
        Projects and Follow Structured Learning Paths
      </h1>
    </div>

    <div className="flex flex-col sm:flex-row justify-center gap-1 mt-6 mb-24 w-full max-w-6xl">
      <div className="w-full sm:w-64 md:w-72 h-72 sm:h-80 rounded-sm overflow-hidden relative shrink-0">
        <img
          src="https://i.pinimg.com/736x/ca/eb/4d/caeb4de0657fb92409b28549d36cabdc.jpg"
          alt="visual"
          className="w-full h-full object-cover opacity-50"
        />
        <h1 className="absolute bottom-6 left-6 text-white text-[16px]">
          Platform Features
        </h1>
      </div>

      <a
        href="#"
        className="w-full sm:w-64 md:w-72 bg-[#1B1913] text-[#EDECEC] text-sm text-start rounded-sm border border-[#393732]/20 p-6 flex flex-col justify-between transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center">
            <IoMdDocument size={34} />
          </div>
          <span className="text-xs text-[#E6ECEC]/30">/01</span>
        </div>
        <h3 className="mt-6 text-base text-[#E6ECEC]/90">LaTex Documents</h3>
        <ul className="mt-6 space-y-2 text-xs text-[#E6ECEC]/30">
          <li>✓ Structured LaTeX editing</li>
          <li>✓ Live preview</li>
          <li>✓ Professional templates</li>
          <li>✓ Clean PDF export</li>
          <li>✓ Smart formatting support</li>
        </ul>
        <div className="mt-6 text-xs flex items-center gap-1">
          Learn more <span>↗</span>
        </div>
      </a>

      {/* Card 2 */}
      <a
        href="#"
        className="w-full sm:w-64 md:w-72 bg-[#1B1913] text-[#EDECEC] text-sm text-start rounded-sm border border-[#393732]/20 p-6 flex flex-col justify-between transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center">
            <SiFuturelearn size={25} />
          </div>
          <span className="text-xs text-[#E6ECEC]/30">/02</span>
        </div>
        <h3 className="mt-6 text-base text-[#E6ECEC]/90">Learning Roadmaps</h3>
        <ul className="mt-6 space-y-2 text-xs text-[#E6ECEC]/30">
          <li>✓ Follow structured roadmaps</li>
          <li>✓ Track your progress</li>
          <li>✓ Bookmark key topics</li>
          <li>✓ Organized learning paths</li>
          <li>✓ Step-by-step guidance</li>
        </ul>
        <div className="mt-6 text-xs flex items-center gap-1">
          Learn more <span>↗</span>
        </div>
      </a>

      <a
        href="#"
        className="w-full sm:w-64 md:w-72 bg-[#1B1913] text-[#EDECEC] text-sm text-start rounded-sm border border-[#393732]/20 p-6 flex flex-col justify-between transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center">
            <CiGlobe size={25} />
          </div>
          <span className="text-xs text-[#E6ECEC]/30">/03</span>
        </div>
        <h3 className="mt-6 text-base text-[#E6ECEC]/90">Deployed Portfolio</h3>
        <ul className="mt-6 space-y-2 text-xs text-[#E6ECEC]/30">
          <li>✓ Build structured portfolios</li>
          <li>✓ Showcase real projects</li>
          <li>✓ Highlight skills clearly</li>
          <li>✓ Clean, modern layouts</li>
          <li>✓ Deploy in one click</li>
        </ul>
        <div className="mt-6 text-xs flex items-center gap-1">
          Learn more <span>↗</span>
        </div>
      </a>
    </div>

    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mb-16 mt-16 px-2">
      <div className="flex-col text-start w-full md:max-w-xl">
        <h2 className="text-2xl sm:text-3xl text-[#EDECEC] mb-2">
          We bring everything you need to build and grow into one place.
        </h2>
        <p className="mb-8 text-[#E6ECEC]/30 mt-3 text-sm sm:text-base">
          Create professional resumes, showcase your projects clearly, and grow
          with structured learning paths all inside one focused and easy-to-use
          platform.
        </p>
        <Link
          href="/login"
          className="px-5 py-1.5 bg-[#F0EDE7] text-black text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors font-mono tracking-wide"
        >
          Get started now
        </Link>
      </div>

      <div className="flex relative justify-center w-full md:w-auto">
        <img
          className="w-full max-w-xs sm:max-w-sm md:w-112.5 opacity-30
            mask-[radial-gradient(circle_at_center,black_5%,transparent_100%)]
            [-webkit-mask-image:radial-gradient(circle_at_center,black_5%,transparent_100%)]
            [mask-repeat:no-repeat]
            [mask-size:100%_100%]"
          src="https://cdn.prod.website-files.com/6812d02840d393aa2c663370/6847f9fe57cfb544f7d5818a_hero-home.svg"
          alt="Hero Background"
        />
      </div>
    </div>

    <div className="w-full max-w-6xl rounded-sm bg-[#1B1913] border border-[#393732]/20 mb-16 flex flex-col items-center justify-center py-16 px-6 mt-20 sm:mt-32 md:mt-40 text-center">
      <h1 className="text-[#E6ECEC]/80 mb-4 text-sm sm:text-base">
        Build Your Profile, Showcase Your Work, and Grow With Direction
      </h1>
      <Link
        href="/login"
        className="px-5 py-1.5 bg-[#F0EDE7] text-black text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors font-mono tracking-wide"
      >
        Try now
      </Link>
    </div>
  </section>
);
