"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Sub-component to read search params
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
        // Optionally load different starter code based on templateId
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
        <div className="flex flex-col h-full bg-gray-50 p-4 gap-4 overflow-hidden">
            {/* Editor Header */}
            <div className="flex justify-between items-center bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/latex" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold text-gray-800 leading-tight">
                            {templateId ? `New ${templateId.split('-')[0].charAt(0).toUpperCase() + templateId.split('-')[0].slice(1)}` : "Untitled Document"}
                        </h1>
                        <p className="text-xs text-gray-500">Unsaved changes</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 outline-none hover:bg-gray-50 rounded-lg transition-colors">
                        Save
                    </button>
                    <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 outline-none rounded-lg transition-colors shadow-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Compile
                    </button>
                </div>
            </div>

            {/* Editor Main Content: Split Pane */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
                {/* Left Pane: Plain Text Area (Source) */}
                <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50/80 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">Source (LaTeX)</span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto relative bg-[#1e1e1e]">
                        {/* Adding line numbers illusion & dark theme wrapper for aesthetics */}
                        <div className="absolute inset-y-0 left-0 w-12 bg-[#252526] border-r border-[#333] flex flex-col text-right pr-2 py-4 text-xs text-gray-500 font-mono select-none pointer-events-none">
                            {Array.from({ length: 50 }).map((_, i) => (
                                <div key={i} className="leading-6">{i + 1}</div>
                            ))}
                        </div>
                        <textarea
                            className="w-full h-full min-h-[500px] pl-16 pr-4 py-4 resize-none outline-none font-mono text-[14px] leading-6 text-gray-300 bg-transparent"
                            value={latexCode}
                            onChange={(e) => setLatexCode(e.target.value)}
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Right Pane: Complete Editor / Preview */}
                <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50/80 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">Preview (PDF)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 transition-colors" title="Zoom Out">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <span className="text-xs font-medium text-gray-500">100%</span>
                            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 transition-colors" title="Zoom In">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="h-4 w-px bg-gray-300 mx-1"></div>
                            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 transition-colors" title="Download PDF">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-200 p-4 md:p-8 overflow-auto flex justify-center items-start">
                        {/* Mock PDF Page */}
                        <div className="bg-white shadow-lg w-full max-w-[800px] aspect-[1/1.414] p-8 md:p-16 flex flex-col relative transition-transform duration-300">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-100 to-transparent flex items-start justify-end p-2 border-b border-l border-gray-100/50 rounded-bl-xl shadow-sm opacity-50"></div>

                            <div className="flex-1 border-2 border-dashed border-gray-200/60 rounded-xl flex flex-col items-center justify-center text-gray-400 gap-4 bg-gray-50/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div className="text-center px-4">
                                    <p className="text-gray-600 font-medium text-lg">Compiled Document Preview</p>
                                    <p className="text-sm mt-2 text-gray-400 max-w-sm">Click the <strong>Compile</strong> button above to render your LaTeX source into a PDF document.</p>
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
        <Suspense fallback={
            <div className="flex h-full items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        }>
            <EditorPanel />
        </Suspense>
    );
}
