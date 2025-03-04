"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BiDownload,
  BiMinus,
  BiPlus,
  BiArrowBack,
  BiPlay,
  BiSave,
} from "react-icons/bi";

function EditorPanel() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  const [zoom, setZoom] = useState(80);

  const [latexCode, setLatexCode] = useState(`\\documentclass{article}
\\usepackage{graphicx}

\\title{My LaTeX Document}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
Start writing your document here...

\\end{document}`);

  useEffect(() => {
    if (templateId === "resume-standard") {
      setLatexCode(`\\documentclass[11pt,a4paper]{article}
\\begin{document}
\\section*{John Doe - Resume}
\\end{document}`);
    } else if (templateId === "research-ieee") {
      setLatexCode(`\\documentclass[conference]{IEEEtran}
\\begin{document}
\\title{My Research Paper}
\\maketitle
\\end{document}`);
    }
  }, [templateId]);

  const docTitle = templateId
    ? `New ${templateId.split("-")[0].charAt(0).toUpperCase() + templateId.split("-")[0].slice(1)}`
    : "Untitled Document";

  const lineCount = Math.max(80, latexCode.split("\n").length + 10);

  return (
    <div className="flex flex-col h-screen bg-[#0F0E09] font-gothic overflow-hidden text-white">
      {/* ── Single Top Bar ── */}
      <div className="flex items-center justify-between px-4 bg-[#1B1913] border-b border-white/5 shrink-0 h-11">
        {/* Left — back + title */}
        <div className="flex items-center gap-3 flex-1">
          <Link
            href="/dashboard/latex"
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/30 hover:text-white/70 transition-colors"
          >
            <BiArrowBack size={15} />
          </Link>
          <div className="h-3.5 w-px bg-white/8" />
          <p className="text-[13px] text-white/60">{docTitle}</p>
          <span className="text-[10px] text-white/20 border border-white/8 px-1.5 py-0.5 rounded-sm">
            unsaved
          </span>
        </div>

        {/* Center — zoom controls (preview side) */}
        <div className="flex items-center gap-1 flex-1 justify-center">
          <button
            onClick={() => setZoom((z) => Math.max(40, z - 10))}
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors"
          >
            <BiMinus size={12} />
          </button>
          <span className="text-[11px] text-white/30 w-10 text-center tabular-nums">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors"
          >
            <BiPlus size={12} />
          </button>
          <div className="h-3 w-px bg-white/10 mx-2" />
          <button
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors"
            title="Download PDF"
          >
            <BiDownload size={13} />
          </button>
        </div>

        {/* Right — save + compile */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-white/45 bg-white/5 border border-white/8 hover:border-white/20 hover:text-white/80 rounded-sm transition-all outline-none">
            <BiSave size={13} /> Save
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-black/80 bg-[#F0EDE7] hover:bg-white rounded-sm transition-all outline-none">
            <BiPlay size={13} /> Compile
          </button>
        </div>
      </div>

      {/* ── Editor + Preview ── */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT — Code Editor */}
        <div
          className="flex-1 flex min-w-0 overflow-hidden border-r border-white/5"
          style={{ maxWidth: "50%" }}
        >
          <div className="relative w-full bg-[#0C0B08] overflow-hidden flex">
            {/* Line numbers */}
            <div
              className="shrink-0 w-11 flex flex-col items-end py-5 pr-3 text-[12px] font-mono select-none pointer-events-none overflow-hidden"
              style={{
                color: "rgba(255,255,255,0.12)",
                background: "#0C0B08",
                borderRight: "1px solid rgba(255,255,255,0.04)",
                lineHeight: "1.6rem",
              }}
            >
              {Array.from({ length: lineCount }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: "1.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              className="flex-1 resize-none outline-none bg-transparent text-white/60 font-mono py-5 px-4 overflow-auto"
              style={{
                fontSize: "13.5px",
                lineHeight: "1.6rem",
                caretColor: "rgba(255,255,255,0.6)",
              }}
              value={latexCode}
              onChange={(e) => setLatexCode(e.target.value)}
              spellCheck="false"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-white/5 shrink-0 flex flex-col items-center justify-center relative">
          <div className="absolute flex flex-col gap-1">
            <div className="w-4 h-4 bg-[#1B1913] border border-white/8 rounded-full flex items-center justify-center text-white/20 cursor-pointer hover:text-white/50 transition-colors text-[7px]">
              ◀
            </div>
            <div className="w-4 h-4 bg-[#1B1913] border border-white/8 rounded-full flex items-center justify-center text-white/20 cursor-pointer hover:text-white/50 transition-colors text-[7px]">
              ▶
            </div>
          </div>
        </div>

        {/* RIGHT — PDF Preview */}
        <div
          className="flex-1 flex flex-col min-w-0"
          style={{ maxWidth: "50%" }}
        >
          <div className="flex-1 bg-[#1a1a1a] overflow-auto flex justify-center items-start py-6 px-4">
            <div
              style={{
                width: "595px",
                minHeight: "842px",
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                flexShrink: 0,
                marginBottom: `${(zoom / 100 - 1) * 842}px`,
              }}
              className="bg-white shadow-[0_4px_40px_rgba(0,0,0,0.8)]"
            >
              <div className="px-12 py-10 font-serif text-black leading-relaxed space-y-4">
                {/* Name + Contact */}
                <div className="text-center pb-3 border-b border-black/15">
                  <h1 className="text-[22px] font-bold tracking-wide">
                    Vikas Pal
                  </h1>
                  <p className="text-[11px] text-black/50 mt-1.5">
                    vikaspal9131 &nbsp;|&nbsp; vikaspal &nbsp;|&nbsp; Portfolio
                    &nbsp;|&nbsp; vikaspal.icu@gmail.com &nbsp;|&nbsp; +91
                    9131953741
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest border-b border-black/20 pb-1 mb-2">
                    Education
                  </h2>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-[13px]">
                        Chameli Devi Group of Institution
                      </p>
                      <p className="text-[12px] text-black/70">
                        Bachelor of Technology in Computer Science and
                        Information Technology
                      </p>
                    </div>
                    <div className="text-right text-[12px] text-black/60 shrink-0 ml-6">
                      <p>Indore, India</p>
                      <p>2022 – 2026</p>
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest border-b border-black/20 pb-1 mb-2">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        role: "Full Stack Developer",
                        company: "Krip AI",
                        period: "Jun 2025 – Sep 2025",
                        location: "Remote",
                        points: [
                          "Improved application reliability by fixing 13+ frontend bugs and UI issues, enhancing cross-browser compatibility and user experience.",
                          "Enhanced a production-ready frontend with React.js and Tailwind CSS, improving performance and delivering a smoother, user-friendly experience.",
                          "Contributed to backend improvements by optimizing data delivery and reducing response time of two APIs by 20% for faster performance.",
                        ],
                      },
                      {
                        role: "Backend AI Engineer Intern",
                        company: "IlegalAdvice",
                        period: "Feb 2025 – May 2025",
                        location: "Remote",
                        points: [
                          "Developed an AI-driven case summarization feature leveraging LLMs, able to process 600+ page PDFs and cut legal review time by 60%, improving overall efficiency.",
                          "Implemented an AI legal dictionary using LLMs to identify and explain complex legal terms with contextual clarity.",
                          "Handled feature enhancements and resolved 20+ bugs, improving platform performance and making the codebase more stable.",
                        ],
                      },
                    ].map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline">
                          <p className="font-bold text-[13px]">{exp.role}</p>
                          <p className="text-[11px] text-black/50">
                            {exp.period}
                          </p>
                        </div>
                        <div className="flex justify-between mb-1">
                          <p className="font-bold text-[12px]">{exp.company}</p>
                          <p className="text-[11px] text-black/50">
                            {exp.location}
                          </p>
                        </div>
                        <ul className="list-disc ml-5 space-y-1">
                          {exp.points.map((pt, j) => (
                            <li
                              key={j}
                              className="text-[11.5px] text-black/75 leading-snug"
                            >
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest border-b border-black/20 pb-1 mb-2">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        name: "SnappyGit",
                        tech: "Express.js, Node.js, Firebase, JavaScript",
                        points: [
                          "Built a robust platform to make GitHub profiles look active, professional, and engaging in under 1 minute.",
                          "Enabled users to push up to 10 past commits per day with a single click, creating a realistic GitHub history.",
                          "Gained 60+ Peerlist upvotes, 1.1K+ Twitter impressions, and 100+ real users with strong engagement.",
                          "Integrated Google and GitHub authentication, supporting 1,000+ users with secure and easy access.",
                        ],
                      },
                      {
                        name: "Nexora",
                        tech: "Python, Flask, TailwindCSS, Firebase, JavaScript",
                        points: [
                          "Developed an AI-powered resume analysis web application using Flask, boosting ATS compatibility by 85% and improving keyword optimization by 60%.",
                          "System capable of handling 200+ concurrent users, delivering resume analysis results in under 10 seconds.",
                        ],
                      },
                    ].map((proj, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="font-bold text-[12.5px]">
                            {proj.name} —{" "}
                            <span className="font-normal">{proj.tech}</span>
                          </p>
                          <p className="text-[11px] text-blue-600 shrink-0 ml-4">
                            Website | Code
                          </p>
                        </div>
                        <ul className="list-disc ml-5 space-y-1">
                          {proj.points.map((pt, j) => (
                            <li
                              key={j}
                              className="text-[11.5px] text-black/75 leading-snug"
                            >
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest border-b border-black/20 pb-1 mb-2">
                    Skills
                  </h2>
                  <div className="space-y-1 text-[12px] text-black/75">
                    <p>
                      <span className="font-bold">Languages:</span> JavaScript,
                      TypeScript, Python, C++, SQL
                    </p>
                    <p>
                      <span className="font-bold">Frameworks:</span> React.js,
                      Next.js, Node.js, Express.js, Flask, TailwindCSS
                    </p>
                    <p>
                      <span className="font-bold">Tools:</span> Git, Docker,
                      Firebase, PostgreSQL, MongoDB, Redis
                    </p>
                    <p>
                      <span className="font-bold">Concepts:</span> REST APIs,
                      LLMs, System Design, CI/CD, Agile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LatexEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center bg-[#0F0E09]">
          <div className="animate-spin rounded-full h-5 w-5 border border-white/10 border-t-white/40" />
        </div>
      }
    >
      <EditorPanel />
    </Suspense>
  );
}
