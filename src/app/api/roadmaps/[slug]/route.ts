import { roadmapController } from "@/modules/roadmap/roadmap.controller";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: Params) {
  const { slug } = await params;
  const data = await roadmapController.getBySlug(slug);
  return Response.json(data);
}
