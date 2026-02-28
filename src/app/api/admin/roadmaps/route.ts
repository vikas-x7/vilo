import { NextRequest } from "next/server";
import { roadmapController } from "@/modules/roadmap/roadmap.controller";

export async function POST(req: NextRequest) {
  const data = await roadmapController.create(req);
  return Response.json(data);
}
