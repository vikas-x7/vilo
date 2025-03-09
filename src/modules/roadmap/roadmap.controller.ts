import { NextRequest } from "next/server";
import { roadmapService } from "./roadmap.service";
import {
  createRoadmapValidation,
  updateRoadmapValidation,
} from "./roadmap.validator";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const roadmapController = {
  async getAll() {
    return roadmapService.getAll();
  },

  async getBySlug(slug: string) {
    return roadmapService.getBySlug(slug);
  },

  async create(req: NextRequest) {
    const user = await getCurrentUser(req);
    const body = await req.json();

    const parsed = createRoadmapValidation.parse(body);

    return roadmapService.create(user, parsed);
  },

  async update(req: NextRequest, slug: string) {
    const user = await getCurrentUser(req);
    const body = await req.json();

    const parsed = updateRoadmapValidation.parse(body);

    return roadmapService.update(user, slug, parsed);
  },

  async delete(req: NextRequest, slug: string) {
    const user = await getCurrentUser(req);
    return roadmapService.delete(user, slug);
  },
};
