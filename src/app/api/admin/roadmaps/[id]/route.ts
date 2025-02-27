import { roadmapController } from "@/modules/roadmap";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return roadmapController.adminDelete(req, params.id);
}
