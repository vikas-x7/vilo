import { roadmapController } from "@/modules/roadmap";
import { NextRequest } from "next/server";

export async function GET() {
  return roadmapController.adminGetAll();
}

export async function POST(req: NextRequest) {
  return roadmapController.adminCreate(req);
}
