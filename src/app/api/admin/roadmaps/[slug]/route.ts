import { NextRequest } from "next/server";
import { roadmapController } from "@/modules/roadmap/roadmap.controller";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const data = await roadmapController.update(req, slug);
  return Response.json(data);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const data = await roadmapController.delete(req, slug);
  return Response.json(data);
}
