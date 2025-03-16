import { NextRequest } from "next/server";
import { roadmapService } from "./roadmap.service";
import {
  createRoadmapValidation,
  explainRoadmapNodeValidation,
  updateRoadmapValidation,
} from "./roadmap.validator";
import { getCurrentUser } from "@/lib/getCurrentUser";

function requireUser(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export const roadmapController = {
  async getAll() {
    return roadmapService.getAll();
  },

  async getBySlug(slug: string) {
    return roadmapService.getBySlug(slug);
  },

  async create(req: NextRequest) {
    const user = requireUser(await getCurrentUser(req));
    const body = await req.json();

    const parsed = createRoadmapValidation.parse(body);

    return roadmapService.create(user, parsed);
  },

  async update(req: NextRequest, slug: string) {
    const user = requireUser(await getCurrentUser(req));
    const body = await req.json();

    const parsed = updateRoadmapValidation.parse(body);

    return roadmapService.update(user, slug, parsed);
  },

  async delete(req: NextRequest, slug: string) {
    const user = requireUser(await getCurrentUser(req));
    return roadmapService.delete(user, slug);
  },

  async explain(req: NextRequest) {
    const body = await req.json();
    const parsed = explainRoadmapNodeValidation.parse(body);

    return roadmapService.explainNode(parsed);
  },
};
