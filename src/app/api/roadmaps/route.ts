import { roadmapController } from "@/modules/roadmap/roadmap.controller";

export async function GET() {
  const data = await roadmapController.getAll();
  return Response.json(data);
}
