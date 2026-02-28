import { roadmapController } from "@/modules/roadmap/roadmap.controller";

interface Params {
  params: { slug: string };
}

export async function GET(_: Request, { params }: Params) {
  const data = await roadmapController.getBySlug(params.slug);
  return Response.json(data);
}
