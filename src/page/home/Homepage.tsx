/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

export const Hero = () => (
  <section className="relative flex flex-col items-center justify-center  text-center overflow-hidden mt-30">
    <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
      <div className="flex items-center gap-0  border border-stone-300 rounded-sm overflow-hidden shadow-sm">
        <span className="px-4 py-1.5 text-xs  text-black bg-[#f0ede7] border-r border-stone-300">
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
      <h1 className="text-[20px] text-[#EDECEC]/70 ">
        All the Essential Tools to Create Professional Documents, Showcase{" "}
        <br />
        Projects and Follow Structured Learning Paths
      </h1>
    </div>
    <div className="flex flex-col sm:flex-row  gap-2 mt-10 mb-40">
      <p className="px-8 py-2 w-70 h-75 bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm transition-colors border border-[#393732]/20 text-start ">
        <h1>Latex</h1>
      </p>
      <a
        href="#"
        className="px-8 py-2 w-70 h-75 bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm  transition-colors border border-[#393732]/20"
      >
        Get Started Free
      </a>
      <a
        href="#"
        className="px-8 py-2 w-70 h-75 bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm  transition-colors border border-[#393732]/20"
      >
        Get Started Free
      </a>
      <a
        href="#"
        className="px-8 py-2 w-70 h-75 bg-[#1B1913] text-[#EDECEC] text-sm rounded-sm transition-colors border border-[#393732]/20"
      >
        Get Started Free
      </a>
    </div>

    <div className="w-6xl mx-auto flex items-center justify-between gap-12 mb-20 mt-20 ">
      <div className="flex-col  text-start ">
        <h2 className="text-3xl text-[#EDECEC] max-w-xl  mb-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit et
          corporis voluptatem inventore, aperiam.
        </h2>
        <p className="mb-10 text-white/20">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
          corporis voluptatem inventore, numquam minima? Amet saepe
          aperiam.{" "}
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
      <h1 className="text-white mb-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam
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
