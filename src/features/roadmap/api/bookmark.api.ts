import { api } from "@/lib/axios";

export const bookmarkApi = {
  getAll: async () => {
    const res = await api.get("/bookmarks");
    return res.data;
  },

  add: async (roadmapId: number) => {
    const res = await api.post("/bookmarks", { roadmapId });
    return res.data;
  },

  remove: async (roadmapId: number) => {
    const res = await api.delete("/bookmarks", {
      data: { roadmapId },
    });
    return res.data;
  },
};
