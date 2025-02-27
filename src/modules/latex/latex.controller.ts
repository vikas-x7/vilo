import { NextRequest, NextResponse } from "next/server";
import { latexService } from "./latex.service";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const latexController = {
  async getAll(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const docs = await latexService.getAll(user.id);
      return NextResponse.json(docs);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
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
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 404 });
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
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
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
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
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
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
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
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },
};
