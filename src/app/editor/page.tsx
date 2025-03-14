"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";
import {
  BiArrowBack,
  BiDownload,
  BiLoaderAlt,
  BiMinus,
  BiPlay,
  BiPlus,
  BiSave,
} from "react-icons/bi";
import { FiAlertCircle, FiFileText } from "react-icons/fi";

type Compiler =
  | "pdflatex"
  | "xelatex"
  | "lualatex"
  | "platex"
  | "uplatex"
  | "context";

interface LatexVersion {
  id: number;
  content: string;
  createdAt: string;
}

interface LatexDocument {
  id: number;
  title: string;
  updatedAt: string;
  versions: LatexVersion[];
}

const DEFAULT_LATEX = `\\documentclass{article}
\\usepackage{graphicx}

\\title{My LaTeX Document}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
Start writing your document here...

\\end{document}`;

const TEMPLATE_PRESETS = {
  "resume-standard": {
    title: "Professional Resume",
    content: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.7in]{geometry}
\\begin{document}
\\section*{John Doe}
Email: john@example.com

\\section*{Experience}
Start writing here...
\\end{document}`,
  },
  "research-ieee": {
    title: "Research Paper",
    content: `\\documentclass[conference]{IEEEtran}
\\title{My Research Paper}
\\author{Author Name}
\\begin{document}
\\maketitle
\\section{Introduction}
Start writing here...
\\end{document}`,
  },
  "report-tech": {
    title: "Technical Report",
    content: `\\documentclass{report}
\\title{Technical Report}
\\author{Author Name}
\\begin{document}
\\maketitle
\\chapter{Overview}
Start writing here...
\\end{document}`,
  },
  "presentation-beamer": {
    title: "Presentation",
    content: `\\documentclass{beamer}
\\title{Slide Deck}
\\author{Author Name}
\\begin{document}
\\frame{\\titlepage}
\\begin{frame}{Agenda}
Start writing here...
\\end{frame}
\\end{document}`,
  },
  "cover-letter": {
    title: "Cover Letter",
    content: `\\documentclass{letter}
\\signature{John Doe}
\\begin{document}
\\begin{letter}{Hiring Manager}
\\opening{Dear Hiring Manager,}
I am excited to apply...
\\closing{Sincerely,}
\\end{letter}
\\end{document}`,
  },
  assignment: {
    title: "Homework Assignment",
    content: `\\documentclass{article}
\\title{Homework Assignment}
\\author{Student Name}
\\begin{document}
\\maketitle
\\section*{Question 1}
Write your answer here...
\\end{document}`,
  },
} satisfies Record<string, { title: string; content: string }>;

const compilerOptions: Compiler[] = [
  "pdflatex",
  "xelatex",
  "lualatex",
  "platex",
  "uplatex",
  "context",
];

type TemplatePresetKey = keyof typeof TEMPLATE_PRESETS;

function getInitialDocument(templateId: string | null) {
  const preset = templateId
    ? TEMPLATE_PRESETS[templateId as TemplatePresetKey]
    : undefined;

  if (preset) {
    return preset;
  }

  return {
    title: "Untitled Document",
    content: DEFAULT_LATEX,
  };
}

function getDisplayError(payload: unknown) {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const message =
      (typeof record.message === "string" && record.message) ||
      (typeof record.error === "string" && record.error) ||
      (typeof record.detail === "string" && record.detail) ||
      "Compilation failed";

    return {
      message,
      logs: JSON.stringify(payload, null, 2),
    };
  }

  if (typeof payload === "string" && payload.trim()) {
    return {
      message: "Compilation failed",
      logs: payload,
    };
  }

  return {
    message: "Compilation failed",
    logs: "",
  };
}

function extractSuggestedTitle(content: string, fallback: string) {
  const titleMatch = content.match(/\\title\{([^}]*)\}/);

  if (titleMatch?.[1]?.trim()) {
    return titleMatch[1].trim();
  }

  const firstSectionMatch = content.match(/\\section\*?\{([^}]*)\}/);

  if (firstSectionMatch?.[1]?.trim()) {
    return firstSectionMatch[1].trim();
  }

  return fallback.trim() || "Untitled Document";
}

function buildPreviewSource(previewUrl: string, zoom: number) {
  return `${previewUrl}#toolbar=0&navpanes=0&zoom=${zoom}`;
}

function EditorPanel({
  docId,
  templateId,
}: {
  docId: string | null;
  templateId: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const initialDocument = getInitialDocument(templateId);
  const initialDocumentId =
    docId && /^\d+$/.test(docId) ? Number(docId) : null;

  const [zoom, setZoom] = useState(80);
  const [compiler, setCompiler] = useState<Compiler>("pdflatex");
  const [documentId, setDocumentId] = useState<number | null>(initialDocumentId);
  const [docTitle, setDocTitle] = useState(initialDocument.title);
  const [latexCode, setLatexCode] = useState(initialDocument.content);
  const [isDirty, setIsDirty] = useState(!initialDocumentId);
  const [isLoadingDoc, setIsLoadingDoc] = useState(Boolean(initialDocumentId));
  const [isSaving, setIsSaving] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error" | null>(
    null,
  );
  const [compileLogs, setCompileLogs] = useState("");
  const previousPreviewUrlRef = useRef<string | null>(null);
  const isBootstrappingRef = useRef(true);

  useEffect(() => {
    return () => {
      if (previousPreviewUrlRef.current) {
        URL.revokeObjectURL(previousPreviewUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!documentId) {
      isBootstrappingRef.current = false;
      return;
    }

    let cancelled = false;

    const loadDocument = async () => {
      try {
        setIsLoadingDoc(true);
        const response = await api.get<LatexDocument>(`/latex/${documentId}`);

        if (cancelled) {
          return;
        }

        const latestContent = response.data.versions[0]?.content || DEFAULT_LATEX;

        setDocTitle(response.data.title || "Untitled Document");
        setLatexCode(latestContent);
        setIsDirty(false);
        setStatusTone(null);
        setStatusMessage("");
        setCompileLogs("");
      } catch (error) {
        console.error("Failed to load latex document:", error);

        if (!cancelled) {
          setStatusTone("error");
          setStatusMessage("Document load nahi hua. Please dashboard se dobara open karo.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingDoc(false);
          isBootstrappingRef.current = false;
        }
      }
    };

    void loadDocument();

    return () => {
      cancelled = true;
    };
  }, [documentId]);

  const handleTitleChange = (value: string) => {
    setDocTitle(value);

    if (!isBootstrappingRef.current) {
      setIsDirty(true);
    }
  };

  const handleCodeChange = (value: string) => {
    setLatexCode(value);

    if (!isBootstrappingRef.current) {
      setIsDirty(true);
    }
  };

  const handleSave = async () => {
    const resolvedTitle = docTitle.trim() || extractSuggestedTitle(
      latexCode,
      initialDocument.title,
    );

    try {
      setIsSaving(true);

      if (documentId) {
        await api.patch(`/latex/${documentId}`, { title: resolvedTitle });
        await api.put(`/latex/${documentId}`, { content: latexCode });
      } else {
        const response = await api.post<LatexDocument>("/latex", {
          title: resolvedTitle,
          content: latexCode,
        });

        setDocumentId(response.data.id);
        router.replace(`${pathname}?doc=${response.data.id}`);
      }

      setDocTitle(resolvedTitle);
      setIsDirty(false);
      setStatusTone("success");
      setStatusMessage("Document saved successfully.");
    } catch (error) {
      console.error("Failed to save latex document:", error);
      setStatusTone("error");
      setStatusMessage("Document save nahi hua. Please dobara try karo.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompile = async () => {
    try {
      setIsCompiling(true);
      setStatusTone(null);
      setStatusMessage("");
      setCompileLogs("");

      const userId =
        typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

      const response = await fetch("/api/latex/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userId ? { "x-user-id": userId } : {}),
        },
        body: JSON.stringify({
          content: latexCode,
          compiler,
        }),
      });

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/pdf")) {
        const pdfBlob = await response.blob();
        const nextPreviewUrl = URL.createObjectURL(pdfBlob);

        if (previousPreviewUrlRef.current) {
          URL.revokeObjectURL(previousPreviewUrlRef.current);
        }

        previousPreviewUrlRef.current = nextPreviewUrl;
        setPreviewUrl(nextPreviewUrl);
        setStatusTone("success");
        setStatusMessage("Compilation complete. PDF preview ready.");
        return;
      }

      const rawPayload = await response.text();
      let parsedPayload: unknown = rawPayload;

      try {
        parsedPayload = JSON.parse(rawPayload);
      } catch {
        // keep raw text if response is not json
      }

      const errorState = getDisplayError(parsedPayload);
      setPreviewUrl(null);
      setStatusTone("error");
      setStatusMessage(errorState.message);
      setCompileLogs(errorState.logs);
    } catch (error) {
      console.error("Failed to compile latex document:", error);
      setPreviewUrl(null);
      setStatusTone("error");
      setStatusMessage(
        "Compilation service tak request nahi gayi. Network/config once check kar lo.",
      );
      setCompileLogs(error instanceof Error ? error.message : "");
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) {
      return;
    }

    const anchor = document.createElement("a");
    anchor.href = previewUrl;
    anchor.download = `${(docTitle || "document").replace(/\s+/g, "-").toLowerCase()}.pdf`;
    anchor.click();
  };

  const lineCount = Math.max(80, latexCode.split("\n").length + 10);
  const previewSrc = previewUrl ? buildPreviewSource(previewUrl, zoom) : null;

  return (
    <div className="flex flex-col h-screen bg-[#0F0E09] font-gothic overflow-hidden text-white">
      <div className="flex items-center justify-between px-4 bg-[#1B1913] border-b border-white/5 shrink-0 h-11 gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Link
            href="/dashboard/latex"
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/30 hover:text-white/70 transition-colors"
          >
            <BiArrowBack size={15} />
          </Link>
          <div className="h-3.5 w-px bg-white/8" />
          <input
            value={docTitle}
            onChange={(event) => handleTitleChange(event.target.value)}
            placeholder="Untitled Document"
            className="bg-transparent text-[13px] text-white/60 min-w-0 flex-1 outline-none border-b border-transparent focus:border-white/20 pb-0.5"
          />
          <span className="text-[10px] text-white/20 border border-white/8 px-1.5 py-0.5 rounded-sm shrink-0">
            {isLoadingDoc
              ? "loading"
              : isSaving
                ? "saving"
                : isDirty
                  ? "unsaved"
                  : "saved"}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-1 justify-center">
          <button
            onClick={() => setZoom((value) => Math.max(40, value - 10))}
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors"
          >
            <BiMinus size={12} />
          </button>
          <span className="text-[11px] text-white/30 w-10 text-center tabular-nums">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom((value) => Math.min(200, value + 10))}
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors"
          >
            <BiPlus size={12} />
          </button>
          <div className="h-3 w-px bg-white/10 mx-2" />
          <select
            value={compiler}
            onChange={(event) => setCompiler(event.target.value as Compiler)}
            className="bg-white/5 border border-white/10 rounded-sm px-2 py-1 text-[11px] text-white/55 outline-none focus:border-white/20"
          >
            {compilerOptions.map((option) => (
              <option key={option} value={option} className="bg-[#1B1913]">
                {option}
              </option>
            ))}
          </select>
          <div className="h-3 w-px bg-white/10 mx-2" />
          <button
            onClick={handleDownload}
            disabled={!previewUrl}
            className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors disabled:opacity-40"
            title="Download PDF"
          >
            <BiDownload size={13} />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving || isLoadingDoc}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-white/45 bg-white/5 border border-white/8 hover:border-white/20 hover:text-white/80 rounded-sm transition-all outline-none disabled:opacity-50"
          >
            {isSaving ? (
              <BiLoaderAlt size={13} className="animate-spin" />
            ) : (
              <BiSave size={13} />
            )}
            Save
          </button>
          <button
            onClick={handleCompile}
            disabled={isCompiling || isLoadingDoc}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-black/80 bg-[#F0EDE7] hover:bg-white rounded-sm transition-all outline-none disabled:opacity-60"
          >
            {isCompiling ? (
              <BiLoaderAlt size={13} className="animate-spin" />
            ) : (
              <BiPlay size={13} />
            )}
            {isCompiling ? "Compiling..." : "Compile"}
          </button>
        </div>
      </div>

      {(statusMessage || compileLogs) && (
        <div
          className={`px-4 py-2 border-b text-[11px] ${
            statusTone === "error"
              ? "bg-red-950/20 border-red-500/10 text-red-200/80"
              : "bg-white/[0.02] border-white/5 text-white/45"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusTone === "error" && <FiAlertCircle size={12} />}
            <span>{statusMessage}</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        <div
          className="flex-1 flex min-w-0 overflow-hidden border-r border-white/5"
          style={{ maxWidth: "50%" }}
        >
          <div className="relative w-full bg-[#0C0B08] overflow-hidden flex">
            <div
              className="shrink-0 w-11 flex flex-col items-end py-5 pr-3 text-[12px] font-mono select-none pointer-events-none overflow-hidden"
              style={{
                color: "rgba(255,255,255,0.12)",
                background: "#0C0B08",
                borderRight: "1px solid rgba(255,255,255,0.04)",
                lineHeight: "1.6rem",
              }}
            >
              {Array.from({ length: lineCount }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    height: "1.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <textarea
              className="flex-1 resize-none outline-none bg-transparent text-white/60 font-mono py-5 px-4 overflow-auto"
              style={{
                fontSize: "13.5px",
                lineHeight: "1.6rem",
                caretColor: "rgba(255,255,255,0.6)",
              }}
              value={latexCode}
              onChange={(event) => handleCodeChange(event.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="w-px bg-white/5 shrink-0" />

        <div
          className="flex-1 flex flex-col min-w-0"
          style={{ maxWidth: "50%" }}
        >
          <div className="flex-1 bg-[#1a1a1a] overflow-auto px-4 py-6">
            {isLoadingDoc ? (
              <div className="h-full flex items-center justify-center text-white/30 text-sm">
                <BiLoaderAlt size={18} className="animate-spin mr-2" />
                Loading document...
              </div>
            ) : previewSrc ? (
              <div className="h-full flex justify-center items-start">
                <iframe
                  title="Compiled PDF preview"
                  src={previewSrc}
                  className="w-full h-full min-h-[840px] bg-white shadow-[0_4px_40px_rgba(0,0,0,0.8)] rounded-sm"
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="w-full max-w-xl min-h-[480px] bg-[#11100c] border border-white/5 rounded-sm p-6 text-left">
                  <div className="flex items-center gap-3 text-white/65 mb-4">
                    <div className="w-10 h-10 rounded-sm bg-white/[0.04] border border-white/8 flex items-center justify-center">
                      <FiFileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">PDF Preview</p>
                      <p className="text-[11px] text-white/30">
                        Compile dabate hi LaTeX-on-HTTP se generated PDF yahan show hoga.
                      </p>
                    </div>
                  </div>

                  {compileLogs ? (
                    <pre className="text-[11px] leading-relaxed whitespace-pre-wrap break-words text-red-200/80 bg-black/20 border border-red-500/10 rounded-sm p-4 overflow-auto max-h-[420px]">
                      {compileLogs}
                    </pre>
                  ) : (
                    <div className="h-[360px] border border-dashed border-white/10 rounded-sm flex items-center justify-center text-center text-white/20 text-xs px-6">
                      Current document ka live PDF preview dekhne ke liye
                      `Compile` button use karo.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorLoader() {
  const searchParams = useSearchParams();
  const docId = searchParams.get("doc");
  const templateId = searchParams.get("template");
  const editorKey = `${docId || "new"}:${templateId || "blank"}`;

  return <EditorPanel key={editorKey} docId={docId} templateId={templateId} />;
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
      <EditorLoader />
    </Suspense>
  );
}
