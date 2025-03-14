import { latexRepository } from "./latex.repository";

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

  async delete(userId: number, id: number) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return latexRepository.delete(id);
  },
};
