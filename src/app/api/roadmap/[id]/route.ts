import { roadmapController } from "@/modules/roadmap";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return roadmapController.getSingle(req, params.id);
}
