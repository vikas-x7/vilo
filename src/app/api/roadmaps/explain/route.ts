import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { roadmapController } from "@/modules/roadmap/roadmap.controller";

export async function POST(req: NextRequest) {
  try {
    const data = await roadmapController.explain(req);
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid roadmap explanation request.",
          details: error.flatten(),
        },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
