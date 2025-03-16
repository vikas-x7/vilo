import { generateObject } from "ai";
import { getGeminiModelName, getGeminiProvider } from "@/lib/gemini";
import { latexRepository } from "./latex.repository";
import {
  compilerSchema,
  type LatexAssistantRequestInput,
  type LatexAssistantResponse,
  latexAssistantOutputSchema,
} from "./latex.validator";

const LATEX_ON_HTTP_URL =
  process.env.LATEX_ON_HTTP_URL || "https://latex.ytotech.com/builds/sync";

const allowedCompilers = new Set([
  "pdflatex",
  "xelatex",
  "lualatex",
  "platex",
  "uplatex",
  "context",
]);

function sanitizeLatexCode(content: string) {
  return content
    .trim()
    .replace(/^```(?:latex)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function ensureStandaloneDocument(content: string) {
  if (
    !content.includes("\\documentclass") ||
    !content.includes("\\begin{document}") ||
    !content.includes("\\end{document}")
  ) {
    throw new Error(
      "AI could not return a complete LaTeX document. Please try again.",
    );
  }
}

function getSafeCompiler(compiler?: string) {
  return compilerSchema.safeParse(compiler).success ? compiler : "pdflatex";
}

function buildAssistantPrompt(input: LatexAssistantRequestInput) {
  const compiler = getSafeCompiler(input.compiler);

  if (input.action === "generate") {
    return [
      "Task: Create a complete standalone LaTeX document.",
      `Preferred compiler: ${compiler}`,
      `User request: ${input.prompt}`,
      input.currentTitle ? `Current title: ${input.currentTitle}` : "",
      input.currentContent
        ? `Existing LaTeX for context:\n${input.currentContent}`
        : "",
      "Use common TeX packages only and avoid niche dependencies unless the user explicitly needs them.",
      "Do not use markdown code fences.",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  return [
    "Task: Fix the provided LaTeX so it compiles successfully.",
    `Preferred compiler: ${compiler}`,
    input.currentTitle ? `Current title: ${input.currentTitle}` : "",
    input.prompt ? `User note: ${input.prompt}` : "",
    `Current LaTeX:\n${input.currentContent}`,
    `Compilation logs:\n${input.compileLogs}`,
    "Preserve the user's intent and structure whenever possible.",
    "If a package or command is causing failure, replace it with a more compatible option.",
    "Return the corrected full document only through the schema fields.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export const latexService = {
  async getAll(userId: number) {
    return latexRepository.findAllByUserId(userId);
  },

  async getById(userId: number, id: number) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return doc;
  },

  async create(userId: number, title: string, content: string) {
    return latexRepository.create(userId, title, content);
  },

  async update(userId: number, id: number, data: { title?: string }) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return latexRepository.update(id, data);
  },

  async saveNewVersion(userId: number, id: number, content: string) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return latexRepository.createVersion(id, content);
  },

  async compile(content: string, compiler = "pdflatex") {
    if (!content.trim()) {
      throw new Error("Document content is required");
    }

    const selectedCompiler = allowedCompilers.has(compiler)
      ? compiler
      : "pdflatex";

    const response = await fetch(LATEX_ON_HTTP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf, application/json",
      },
      body: JSON.stringify({
        compiler: selectedCompiler,
        resources: [
          {
            main: true,
            content,
          },
        ],
        options: {
          response: {
            log_files_on_failure: true,
          },
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(120000),
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/pdf")) {
      return {
        ok: true,
        status: response.status,
        contentType,
        body: await response.arrayBuffer(),
      };
    }

    const errorPayload = contentType.includes("application/json")
      ? await response.json()
      : { message: await response.text() };

    return {
      ok: false,
      status: response.status || 422,
      contentType: "application/json",
      body: errorPayload,
    };
  },

  async assist(input: LatexAssistantRequestInput): Promise<LatexAssistantResponse> {
    const modelName = getGeminiModelName();
    const { object } = await generateObject({
      model: getGeminiProvider()(modelName),
      schema: latexAssistantOutputSchema,
      schemaName: "latex_assistant_response",
      system: `You are an expert LaTeX assistant for beginners.
Always return a complete standalone LaTeX document.
Prefer widely available packages and simple, reliable document structures.
Do not wrap LaTeX in markdown fences.
Keep the summary short and practical.
nextSteps should contain actionable follow-up suggestions.`,
      prompt: buildAssistantPrompt(input),
    });

    const latexCode = sanitizeLatexCode(object.latexCode);
    ensureStandaloneDocument(latexCode);

    return {
      action: input.action,
      model: modelName,
      title: object.title.trim(),
      latexCode,
      summary: object.summary.trim(),
      nextSteps: object.nextSteps,
    };
  },

  async delete(userId: number, id: number) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return latexRepository.delete(id);
  },
};
