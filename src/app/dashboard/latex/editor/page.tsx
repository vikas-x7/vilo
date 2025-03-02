"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GiRoundShield } from "react-icons/gi";
import {
  BiCode,
  BiFile,
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

  return (
    <div className="flex flex-col h-full bg-[#14120B] p-4 gap-4 overflow-hidden font-gothic">
      {/* Editor Header */}
      <div className="flex justify-between items-center bg-[#1B1913] px-4 py-3 border border-white/5 rounded-sm shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/latex"
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/40 hover:text-white/80 transition-colors"
          >
            <BiArrowBack size={16} />
          </Link>
          <div className="h-4 w-px bg-white/5" />
          <div className="flex items-center gap-2">
            <GiRoundShield size={16} className="text-white/30" />
            <div className="flex flex-col">
              <h1 className="text-sm text-white/80 leading-tight">
                {templateId
                  ? `New ${templateId.split("-")[0].charAt(0).toUpperCase() + templateId.split("-")[0].slice(1)}`
                  : "Untitled Document"}
              </h1>
              <p className="text-[10px] text-white/25">Unsaved changes</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-white/50 bg-white/5 border border-white/10 hover:border-white/20 hover:text-white/80 rounded-sm transition-all outline-none flex items-center gap-1.5">
            <BiSave size={13} />
            Save
          </button>
          <button className="px-3 py-1.5 text-xs font-semibold text-black/80 bg-[#F0EDE7] hover:bg-[#F0EDE7]/90 rounded-sm transition-all flex items-center gap-1.5 outline-none">
            <BiPlay size={13} />
            Compile
          </button>
        </div>
      </div>

      {/* Split Pane */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Left — Source */}
        <div className="flex-1 flex flex-col bg-[#1B1913] border border-white/5 rounded-sm overflow-hidden">
          <div className="bg-[#14120B] border-b border-white/5 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <BiCode size={14} className="text-white/30" />
              <span className="text-xs text-white/40">Source (LaTeX)</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-auto relative bg-[#0F0E09]">
            <div className="absolute inset-y-0 left-0 w-10 bg-[#14120B] border-r border-white/5 flex flex-col text-right pr-2 py-4 text-[10px] text-white/15 font-mono select-none pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              className="w-full h-full min-h-[500px] pl-14 pr-4 py-4 resize-none outline-none font-mono text-[13px] leading-6 text-white/60 bg-transparent"
              value={latexCode}
              onChange={(e) => setLatexCode(e.target.value)}
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right — Preview */}
        <div className="flex-1 flex flex-col bg-[#1B1913] border border-white/5 rounded-sm overflow-hidden">
          <div className="bg-[#14120B] border-b border-white/5 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <BiFile size={14} className="text-white/30" />
              <span className="text-xs text-white/40">Preview (PDF)</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 hover:bg-white/5 rounded-sm text-white/30 hover:text-white/60 transition-colors"
                title="Zoom Out"
              >
                <BiMinus size={13} />
              </button>
              <span className="text-[10px] text-white/25 px-1">100%</span>
              <button
                className="p-1.5 hover:bg-white/5 rounded-sm text-white/30 hover:text-white/60 transition-colors"
                title="Zoom In"
              >
                <BiPlus size={13} />
              </button>
              <div className="h-3.5 w-px bg-white/10 mx-1" />
              <button
                className="p-1.5 hover:bg-white/5 rounded-sm text-white/30 hover:text-white/60 transition-colors"
                title="Download PDF"
              >
                <BiDownload size={13} />
              </button>
            </div>
          </div>

          {/* Mock PDF */}
          <div className="flex-1 bg-[#0F0E09] p-6 overflow-auto flex justify-center items-start">
            <div className="bg-white/90 shadow-2xl w-full max-w-[700px] aspect-[1/1.414] p-10 md:p-16 flex flex-col">
              <div className="flex-1 border border-dashed border-black/10 rounded-sm flex flex-col items-center justify-center text-black/30 gap-4 bg-black/[0.02]">
                <BiFile size={40} className="opacity-20" />
                <div className="text-center px-4">
                  <p className="text-black/40 text-sm font-medium">
                    Compiled Document Preview
                  </p>
                  <p className="text-xs mt-1.5 text-black/25 max-w-xs">
                    Click <strong>Compile</strong> to render your LaTeX source
                    into a PDF.
                  </p>
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
        <div className="flex h-full items-center justify-center bg-[#14120B]">
          <div className="animate-spin rounded-full h-6 w-6 border-b border-white/20" />
        </div>
      }
    >
      <EditorPanel />
    </Suspense>
  );
}
