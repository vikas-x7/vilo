import { NextRequest } from "next/server";
import { roadmapController } from "@/modules/roadmap/roadmap.controller";

interface Params {
  params: { slug: string };
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const data = await roadmapController.update(req, params.slug);
  return Response.json(data);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const data = await roadmapController.delete(params.slug);
  return Response.json(data);
}
