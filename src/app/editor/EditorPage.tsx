"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Editor, { loader, type BeforeMount } from "@monaco-editor/react";
import { api } from "@/lib/axios";
import { Sparkles, WandSparkles, X } from "lucide-react";
import * as monacoEditor from "monaco-editor";
import { latexTemplatePresets } from "@/modules/latex/latex.templates";
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

type LatexAssistantAction = "generate" | "fix";

interface LatexAssistantResponse {
  action: LatexAssistantAction;
  title: string;
  latexCode: string;
  summary: string;
  nextSteps: string[];
  model: string;
}

loader.config({ monaco: monacoEditor });

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

const compilerOptions: Compiler[] = [
  "pdflatex",
  "xelatex",
  "lualatex",
  "platex",
  "uplatex",
  "context",
];

function getInitialDocument(templateId: string | null) {
  const preset = templateId ? latexTemplatePresets[templateId] : undefined;

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

function getApiErrorMessage(error: unknown) {
  if (error && typeof error === "object") {
    const responseData = (error as { response?: { data?: unknown } }).response
      ?.data;

    if (responseData && typeof responseData === "object") {
      const record = responseData as Record<string, unknown>;
      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }

      if (typeof record.error === "string" && record.error.trim()) {
        return record.error;
      }
    }

    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return "The AI request could not be completed. Please try again.";
}

const configureLatexEditor: BeforeMount = (monaco) => {
  if (
    !monaco.languages
      .getLanguages()
      .some((language: { id: string }) => language.id === "latex")
  ) {
    monaco.languages.register({ id: "latex" });

    monaco.languages.setMonarchTokensProvider("latex", {
      tokenizer: {
        root: [
          [/%.*$/, "comment"],
          [/\\[a-zA-Z@]+/, "keyword"],
          [/\$(?:\\.|[^$\\])+\$/, "string"],
          [/[{}[\]()]/, "@brackets"],
          [/\b\d+(\.\d+)?\b/, "number"],
          [/[&_^~]/, "operator"],
          [/[^\\%{}[\]$&_^~]+/, "identifier"],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration("latex", {
      comments: { lineComment: "%" },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: "$", close: "$" },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: "$", close: "$" },
      ],
    });
  }

  monaco.editor.defineTheme("vilo-monaco", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955" },
      { token: "keyword", foreground: "C586C0" },
      { token: "string", foreground: "CE9178" },
      { token: "number", foreground: "B5CEA8" },
      { token: "operator", foreground: "D4D4D4" },
      { token: "identifier", foreground: "D4D4D4" },
    ],
    colors: {
      "editor.background": "#0C0B08",
      "editor.foreground": "#D4D4D4",
      "editorLineNumber.foreground": "#5B554B",
      "editorLineNumber.activeForeground": "#C8C1B7",
      "editor.lineHighlightBackground": "#17130F",
      "editor.selectionBackground": "#264F78",
      "editor.inactiveSelectionBackground": "#3A3D41",
      "editorCursor.foreground": "#F4EFE7",
      "editorIndentGuide.background1": "#201C16",
      "editorIndentGuide.activeBackground1": "#413A2E",
      "editorGutter.background": "#0C0B08",
    },
  });
};

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
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
  const [assistantPrompt, setAssistantPrompt] = useState("");
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<LatexAssistantResponse | null>(null);
  const previousPreviewUrlRef = useRef<string | null>(null);
  const isBootstrappingRef = useRef(true);

  const clearPreview = () => {
    if (previousPreviewUrlRef.current) {
      URL.revokeObjectURL(previousPreviewUrlRef.current);
      previousPreviewUrlRef.current = null;
    }

    setPreviewUrl(null);
  };

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
        setAiError(null);
        setAiResult(null);
      } catch (error) {
        console.error("Failed to load latex document:", error);

        if (!cancelled) {
          setStatusTone("error");
          setStatusMessage(
            "The document could not be loaded. Please reopen it from the dashboard.",
          );
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
      setStatusMessage("The document could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const applyAssistantResult = (result: LatexAssistantResponse) => {
    const nextTitle =
      result.action === "fix"
        ? docTitle.trim() || result.title
        : result.title.trim() || docTitle.trim() || "Untitled Document";

    setDocTitle(nextTitle);
    setLatexCode(result.latexCode);
    setIsDirty(true);
    setAiError(null);
    setAiResult(result);
    clearPreview();
    setCompileLogs("");
    setStatusTone("success");
    setStatusMessage(
      result.action === "fix"
        ? "The AI updated the code. Compile it again to verify the fix."
        : "The AI generated a new LaTeX document and inserted it into the editor.",
    );
  };

  const runAssistant = async (action: LatexAssistantAction) => {
    if (action === "generate" && !assistantPrompt.trim()) {
      setAiError("Describe the kind of LaTeX document you want first.");
      setIsAiPanelOpen(true);
      return;
    }

    if (action === "fix" && !compileLogs.trim()) {
      setAiError("The AI fix action is available after a compile error appears.");
      setIsAiPanelOpen(true);
      return;
    }

    try {
      setIsAiWorking(true);
      setAiError(null);
      setIsAiPanelOpen(true);

      const response = await api.post<LatexAssistantResponse>(
        "/latex/assistant",
        action === "fix"
          ? {
              action,
              prompt: assistantPrompt.trim() || undefined,
              compiler,
              currentTitle: docTitle,
              currentContent: latexCode,
              compileLogs,
            }
          : {
              action,
              prompt: assistantPrompt.trim(),
              compiler,
              currentTitle: docTitle,
              currentContent: latexCode,
            },
      );

      applyAssistantResult(response.data);
    } catch (error) {
      const message = getApiErrorMessage(error);
      setAiError(message);
      setStatusTone("error");
      setStatusMessage(message);
    } finally {
      setIsAiWorking(false);
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
      clearPreview();
      setStatusTone("error");
      setStatusMessage(errorState.message);
      setCompileLogs(errorState.logs);
      setIsAiPanelOpen(true);
    } catch (error) {
      console.error("Failed to compile latex document:", error);
      clearPreview();
      setStatusTone("error");
      setStatusMessage(
        "The compilation request could not reach the service. Please check your network or configuration.",
      );
      setCompileLogs(error instanceof Error ? error.message : "");
      setIsAiPanelOpen(true);
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

  const previewSrc = previewUrl ? buildPreviewSource(previewUrl, zoom) : null;
  const canFixWithAi = Boolean(compileLogs.trim());

  return (
    <div className="relative flex flex-col h-screen  font-gothic overflow-hidden text-white">
      <div className="flex items-center justify-between px-4  border-b border-white/5 shrink-0 h-11 gap-4">
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
            onClick={() => setIsAiPanelOpen((value) => !value)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-white/45 bg-white/5 border border-white/8 hover:border-white/20 hover:text-white/80 rounded-sm transition-all outline-none"
          >
            <Sparkles size={13} />
            {isAiPanelOpen ? "Hide AI" : "AI Assist"}
          </button>
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
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              {statusTone === "error" && <FiAlertCircle size={12} />}
              <span>{statusMessage}</span>
            </div>

            {statusTone === "error" && canFixWithAi ? (
              <button
                type="button"
                onClick={() => void runAssistant("fix")}
                disabled={isAiWorking}
                className="shrink-0 rounded-sm border border-red-300/20 bg-red-300/10 px-2.5 py-1 text-[11px] text-red-100 transition hover:bg-red-300/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAiWorking ? "AI fixing..." : "Fix with AI"}
              </button>
            ) : null}
          </div>
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        <div
          className="flex-1 flex min-w-0 overflow-hidden border-r border-white/5"
          style={{ maxWidth: "50%" }}
        >
          <div className="relative h-full w-full overflow-hidden bg-[#0C0B08]">
            <Editor
              beforeMount={configureLatexEditor}
              height="100%"
              language="latex"
              loading={
                <div className="flex h-full items-center justify-center text-sm text-white/30">
                  <BiLoaderAlt size={18} className="mr-2 animate-spin" />
                  Loading editor...
                </div>
              }
              onChange={(value) => handleCodeChange(value ?? "")}
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 13.5,
                lineHeight: 26,
                fontLigatures: true,
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                lineNumbers: "on",
                lineNumbersMinChars: 3,
                glyphMargin: false,
                folding: true,
                renderLineHighlight: "line",
                contextmenu: true,
                overviewRulerBorder: false,
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                padding: {
                  top: 18,
                  bottom: 18,
                },
                scrollbar: {
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                },
                tabSize: 2,
                insertSpaces: true,
                wordWrap: "off",
              }}
              theme="vilo-monaco"
              value={latexCode}
              width="100%"
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
                        The PDF generated by LaTeX-on-HTTP will appear here after you compile.
                      </p>
                    </div>
                  </div>

                  {compileLogs ? (
                    <pre className="text-[11px] leading-relaxed whitespace-pre-wrap break-words text-red-200/80 bg-black/20 border border-red-500/10 rounded-sm p-4 overflow-auto max-h-[420px]">
                      {compileLogs}
                    </pre>
                  ) : (
                    <div className="h-[360px] border border-dashed border-white/10 rounded-sm flex items-center justify-center text-center text-white/20 text-xs px-6">
                      Use the `Compile` button to view the live PDF preview for
                      the current document.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAiPanelOpen ? (
        <div className="absolute right-4 top-16 z-20 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#171510]/95 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-orange-200/60">
                Latex AI
              </p>
              <h3 className="mt-1 text-sm font-semibold text-white/85">
                Generate or fix code
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsAiPanelOpen(false)}
              className="rounded-full p-1 text-white/35 transition hover:bg-white/5 hover:text-white/70"
            >
              <X size={16} />
            </button>
          </div>

          <p className="mt-3 text-xs leading-5 text-white/45">
            Describe the LaTeX document you want, or let AI fix the current code
            after a compilation error.
          </p>

          <textarea
            value={assistantPrompt}
            onChange={(event) => setAssistantPrompt(event.target.value)}
            placeholder="Example: Create a clean one-page resume with education, skills, projects, and experience."
            className="mt-4 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75 outline-none transition placeholder:text-white/20 focus:border-white/20"
          />

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => void runAssistant("generate")}
              disabled={isAiWorking}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F0EDE7] px-4 py-2.5 text-sm font-semibold text-[#18130D] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAiWorking ? (
                <BiLoaderAlt size={14} className="animate-spin" />
              ) : (
                <Sparkles size={14} />
              )}
              Generate LaTeX
            </button>

            <button
              type="button"
              onClick={() => void runAssistant("fix")}
              disabled={isAiWorking || !canFixWithAi}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isAiWorking ? (
                <BiLoaderAlt size={14} className="animate-spin" />
              ) : (
                <WandSparkles size={14} />
              )}
              Fix Error
            </button>
          </div>

          {!canFixWithAi ? (
            <p className="mt-2 text-[11px] text-white/30">
              The `Fix Error` button becomes available after a compile error appears.
            </p>
          ) : null}

          {aiError ? (
            <p className="mt-3 rounded-2xl border border-red-400/15 bg-red-950/20 px-3 py-2 text-xs text-red-200/85">
              {aiError}
            </p>
          ) : null}

          {aiResult ? (
            <div className="mt-4 rounded-2xl border border-white/8 bg-black/25 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                  Last AI update
                </p>
                <span className="text-[11px] text-white/35">{aiResult.model}</span>
              </div>

              <p className="mt-2 text-sm font-medium text-white/85">
                {aiResult.summary}
              </p>

              {aiResult.nextSteps.length ? (
                <div className="mt-3 space-y-2">
                  {aiResult.nextSteps.map((step, index) => (
                    <p key={`${step}-${index}`} className="text-xs leading-5 text-white/50">
                      {index + 1}. {step}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
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
