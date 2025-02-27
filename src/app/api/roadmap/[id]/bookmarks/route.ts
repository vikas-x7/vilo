import { roadmapController } from "@/modules/roadmap";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return roadmapController.bookmark(req, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return roadmapController.removeBookmark(req, params.id);
}
