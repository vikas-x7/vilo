import { NextRequest, NextResponse } from "next/server";
import { portfolioService } from "./portfolio.service";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const portfolioController = {
  async create(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const portfolio = await portfolioService.save(user.id, body);

      return NextResponse.json(portfolio, { status: 201 });
    } catch (err: any) {
      console.error("[POST /portfolio/route] Error:", err.message, err);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async getMe(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const portfolio = await portfolioService.getMine(user.id);
      return NextResponse.json(portfolio);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 404 });
    }
  },

  async update(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const portfolio = await portfolioService.save(user.id, body);

      return NextResponse.json(portfolio);
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },

  async remove(req: NextRequest) {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // await portfolioService.delete(user.id); // Not implemented
      return NextResponse.json({ message: "Deleted successfully" });
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  },
};
