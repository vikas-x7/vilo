import { NextRequest, NextResponse } from "next/server";
import { latexService } from "./latex.service";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { latexAssistantRequestSchema } from "./latex.validator";

function createErrorResponse(error: unknown, status: number) {
  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status });
  }

  return NextResponse.json({ message: "Internal Server Error" }, { status });
}

export const latexController = {
  async getAll(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const docs = await latexService.getAll(user.id);
      return NextResponse.json(docs);
    } catch (error: unknown) {
      return createErrorResponse(error, 400);
    }
  },

  async getById(req: NextRequest, id: string) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const doc = await latexService.getById(user.id, Number(id));
      return NextResponse.json(doc);
    } catch (error: unknown) {
      return createErrorResponse(error, 404);
    }
  },

  async create(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const doc = await latexService.create(user.id, body.title, body.content);

      return NextResponse.json(doc, { status: 201 });
    } catch (error: unknown) {
      return createErrorResponse(error, 400);
    }
  },

  async update(req: NextRequest, id: string) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const doc = await latexService.update(user.id, Number(id), {
        title: body.title,
      });

      return NextResponse.json(doc);
    } catch (error: unknown) {
      return createErrorResponse(error, 400);
    }
  },

  async saveVersion(req: NextRequest, id: string) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const version = await latexService.saveNewVersion(
        user.id,
        Number(id),
        body.content,
      );

      return NextResponse.json(version);
    } catch (error: unknown) {
      return createErrorResponse(error, 400);
    }
  },

  async compile(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const result = await latexService.compile(body.content, body.compiler);

      if (result.ok) {
        return new NextResponse(result.body, {
          status: result.status,
          headers: {
            "Content-Type": result.contentType,
            "Cache-Control": "no-store",
          },
        });
      }

      return NextResponse.json(result.body, {
        status: result.status,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          { message: error.message },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { message: "Compilation failed" },
        { status: 500 },
      );
    }
  },

  async assistant(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const parsed = latexAssistantRequestSchema.parse(body);
      const result = await latexService.assist(parsed);

      return NextResponse.json(result);
    } catch (error: unknown) {
      return createErrorResponse(error, 400);
    }
  },

  async remove(req: NextRequest, id: string) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      await latexService.delete(user.id, Number(id));
      return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: unknown) {
      return createErrorResponse(error, 400);
    }
  },
};
