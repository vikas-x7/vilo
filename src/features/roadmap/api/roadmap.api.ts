import { api } from "@/lib/axios";
import { RoadmapListItem, RoadmapDetail } from "../types/roadmap.types";

export const roadmapApi = {
  getAll: async (): Promise<RoadmapListItem[]> => {
    const res = await api.get("/roadmaps");
    return res.data;
  },

  getBySlug: async (slug: string): Promise<RoadmapDetail> => {
    const res = await api.get(`/roadmaps/${slug}`);
    return res.data;
  },
};
