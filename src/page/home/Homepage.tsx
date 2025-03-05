/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowRoundForward, IoMdDocument } from "react-icons/io";
import { SiFuturelearn } from "react-icons/si";

export const Hero = () => (
  <section className="relative flex flex-col items-center justify-center  text-center overflow-hidden mt-30">
    <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
      <div className="flex items-center gap-0  border border-stone-300 rounded-sm overflow-hidden shadow-sm">
        <span className="px-4 py-1.5 text-xs  text-black bg-[#f0ede7] border-r border-stone-300">
          Introducing vilo
        </span>
        <a
          href="#"
          className="px-4 py-1.5 text-xs font-mono font-semibold text-white  hover:bg-stone-700 transition-colors flex gap-1.5 items-center justify-center"
        >
          Try now <IoIosArrowRoundForward />
        </a>
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[50px] font-bold text-[#E6ECEC] leading-[1.05] tracking-tight mb-6 mt-4">
        LaTeX Documents Developer Portfolios Learning Roadmaps
      </h1>

      <p className="text-sm sm:text-[14px] text-[#9A9996] ">
        Write with precision, showcase with confidence, and learn with clarity -
        all inside <br /> one focused platform built for developers.
      </p>
    </div>
    <div className="relative w-fit mt-20">
      <img
        className="w-6xl rounded-sm"
        src="https://i.pinimg.com/736x/21/ce/52/21ce5263171481886a153ad6ab9d9c92.jpg"
        alt=""
      />

      <img
        className="absolute top-6 left-9 right-9 bottom-0 w-auto mt-9"
        style={{
          left: "2.25rem",
          right: "2.25rem",
          top: "1.5rem",
          width: "calc(100% - 4.5rem)",
          borderRadius: "8px",
        }}
        src="https://res.cloudinary.com/dyv9kenuj/image/upload/v1771953075/Screenshot_from_2026-02-24_22-40-59_esdabd.png"
        alt=""
      />
    </div>
    <div className="mt-60 w-6xl text-start">
      <h1 className="text-[23px] text-[#E6ECEC]/90  mb-10">
        All the Essential Tools to Create Professional Documents, Showcase{" "}
        <br />
        Projects and Follow Structured Learning Paths
      </h1>
    </div>
    <div className="flex flex-col sm:flex-row  gap-2 mt-10 mb-40">
      <div className="w-72 h-80 rounded-sm overflow-hidden relative">
        <img
          src="https://i.pinimg.com/736x/ca/eb/4d/caeb4de0657fb92409b28549d36cabdc.jpg"
          alt="visual"
          className="w-full h-full object-cover opacity-50"
        />

        <h1 className="absolute bottom-6 left-6 text-white text-[16px]">
          Our Services
        </h1>
      </div>
      <a
        href="#"
        className="w-72 bg-[#1B1913] text-[#EDECEC] text-sm text-start rounded-sm border border-[#393732]/20 p-6 flex flex-col justify-between  transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="w-8 h-8 rounded-sm flex items-center=justify-center">
            <IoMdDocument size={34} />
          </div>
          <span className="text-xs text-[#E6ECEC]/30">/01</span>
        </div>

        <h3 className="mt-6 text-base text-[#E6ECEC]/90 ">LaTex Documents</h3>

        <ul className="mt-6 space-y-2 text-xs text-[#E6ECEC]/30">
          <li>✓ Structured LaTeX editing</li>
          <li>✓ Live preview</li>
          <li>✓ Professional templates</li>
          <li>✓ Clean PDF export</li>
          <li>✓ Smart formatting support</li>
        </ul>

        {/* Bottom Link */}
        <div className="mt-6 text-xs flex items-center gap-1">
          Learn more <span>↗</span>
        </div>
      </a>
      <a
        href="#"
        className="w-72 bg-[#1B1913] text-[#EDECEC] text-sm text-start rounded-sm border border-[#393732]/20 p-6 flex flex-col justify-between  transition-all"
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

        {/* Bottom Link */}
        <div className="mt-6 text-xs flex items-center gap-1">
          Learn more <span>↗</span>
        </div>
      </a>
      <a
        href="#"
        className="w-72 bg-[#1B1913] text-[#EDECEC] text-sm text-start rounded-sm border border-[#393732]/20 p-6 flex flex-col justify-between  transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="w-8 h-8  rounded-sm flex items-center justify-center">
            <CiGlobe size={25} />
          </div>
          <span className="text-xs text-[#E6ECEC]/30">/03</span>
        </div>

        <h3 className="mt-6 text-base text-[#E6ECEC]/90 ">
          Deployed Portfolio
        </h3>

        <ul className="mt-6 space-y-2 text-xs text-[#E6ECEC]/30">
          <li>✓ Build structured portfolios</li>
          <li>✓ Showcase real projects</li>
          <li>✓ Highlight skills clearly</li>
          <li>✓ Clean, modern layouts</li>
          <li>✓ Deploy in one click</li>
        </ul>

        {/* Bottom Link */}
        <div className="mt-6 text-xs flex items-center gap-1">
          Learn more <span>↗</span>
        </div>
      </a>
    </div>

    <div className="w-6xl mx-auto flex items-center justify-between gap-12 mb-20 mt-20 ">
      <div className="flex-col  text-start ">
        <h2 className="text-3xl text-[#EDECEC] max-w-xl  mb-2">
          We bring everything you need to build and grow into one place.
        </h2>
        <p className="mb-10 text-[#E6ECEC]/30 mt-3">
          Create professional resumes, showcase your projects clearly, and grow{" "}
          <br />
          with structured learning paths all inside one focused and easy-to-use
          platform.
        </p>
        <Link
          href="/login"
          className="px-5 py-1  bg-[#F0EDE7] text-black text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors font-mono tracking-wide"
        >
          Getstat now
        </Link>
      </div>

      <div className="flex relative  justify-center">
        <img
          className="w-112.5
  mask-[radial-gradient(circle_at_center,black_5%,transparent_100%)]
  [-webkit-mask-image:radial-gradient(circle_at_center,black_5%,transparent_100%)]
  mask-no-repeat
  mask-size-[100%_100%] opacity-30"
          src="https://cdn.prod.website-files.com/6812d02840d393aa2c663370/6847f9fe57cfb544f7d5818a_hero-home.svg"
          alt="Hero Background"
        />
      </div>
    </div>

    <div className="w-6xl h-65 rounded-sm bg-[#1B1913] border border-[#393732]/20 mb-20 flex flex-col items-center justify-center mt-50">
      <h1 className="text-[#E6ECEC]/80 mb-4">
        Build Your Profile, Showcase Your Work, and Grow With Direction
      </h1>

      <Link
        href="/login"
        className="px-5 py-1  bg-[#F0EDE7] text-black text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors font-mono tracking-wide"
      >
        Try now
      </Link>
    </div>
  </section>
);
