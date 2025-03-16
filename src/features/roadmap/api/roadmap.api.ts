import { api } from "@/lib/axios";
import type {
  RoadmapDetail,
  RoadmapExplainRequest,
  RoadmapExplainResponse,
  RoadmapListItem,
} from "../types/roadmap.types";

export const roadmapApi = {
  getAll: async (): Promise<RoadmapListItem[]> => {
    const res = await api.get("/roadmaps");
    return res.data;
  },

  getBySlug: async (slug: string): Promise<RoadmapDetail> => {
    const res = await api.get(`/roadmaps/${slug}`);
    return res.data;
  },

  explainNode: async (
    payload: RoadmapExplainRequest,
  ): Promise<RoadmapExplainResponse> => {
    const res = await api.post("/roadmaps/explain", payload);
    return res.data;
  },
};
