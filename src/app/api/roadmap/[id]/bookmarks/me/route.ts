import { roadmapController } from "@/modules/roadmap";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return roadmapController.myBookmarks(req);
}
