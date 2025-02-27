import { NextRequest, NextResponse } from "next/server";
import { roadmapService } from "./roadmap.service";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createRoadmapSchema } from "./roadmap.validator";

export const roadmapController = {
  async adminCreate(req: NextRequest) {
    try {
      const body = await req.json();
      const validatedData = createRoadmapSchema.parse(body);
      const roadmap = await roadmapService.adminCreate(
        validatedData.title,
        validatedData.data,
      );
      return NextResponse.json(roadmap, { status: 201 });
    } catch (err: any) {
      if (err.name === "ZodError") {
        return NextResponse.json({ message: err.errors }, { status: 400 });
      }
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async adminGetAll() {
    try {
      const roadmaps = await roadmapService.adminGetAll();
      return NextResponse.json(roadmaps);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async adminDelete(req: NextRequest, id: string) {
    try {
      await roadmapService.adminDelete(Number(id));
      return NextResponse.json({ message: "Deleted successfully" });
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async getAll(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const roadmaps = await roadmapService.getAllForUser(user.id);
      return NextResponse.json(roadmaps);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async getSingle(req: NextRequest, id: string) {
    try {
      const user = await getCurrentUser(req);
      if (!user)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const roadmap = await roadmapService.getSingleForUser(
        user.id,
        Number(id),
      );
      return NextResponse.json(roadmap);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 404 });
    }
  },

  async bookmark(req: NextRequest, id: string) {
    try {
      const user = await getCurrentUser(req);
      if (!user)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const result = await roadmapService.bookmark(user.id, Number(id));
      return NextResponse.json(result);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async removeBookmark(req: NextRequest, id: string) {
    try {
      const user = await getCurrentUser(req);
      if (!user)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      await roadmapService.removeBookmark(user.id, Number(id));
      return NextResponse.json({ message: "Bookmark removed" });
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async myBookmarks(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const roadmaps = await roadmapService.getMyBookmarks(user.id);
      return NextResponse.json(roadmaps);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },
};
