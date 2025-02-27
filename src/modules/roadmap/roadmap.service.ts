import { roadmapRepository } from "./roadmap.repository";
import { CreateRoadmapInput } from "./roadmap.validator";
import { Prisma } from "@/lib/prisma";

export const roadmapService = {
  async adminCreate(title: string, data: Prisma.InputJsonValue) {
    return roadmapRepository.create(title, data);
  },

  async adminGetAll() {
    return roadmapRepository.findAll();
  },

  async adminDelete(id: number) {
    return roadmapRepository.delete(id);
  },

  async getAllForUser(userId: number) {
    const roadmaps = await roadmapRepository.findAll();
    const bookmarks = await roadmapRepository.getUserBookmarks(userId);

    const bookmarkedSet = new Set(bookmarks.map((b: { roadmapId: number }) => b.roadmapId));

    return roadmaps.map((r: any) => ({
      ...r,
      isBookmarked: bookmarkedSet.has(r.id),
    }));
  },

  async getSingleForUser(userId: number, id: number) {
    const roadmap = await roadmapRepository.findById(id);
    if (!roadmap) throw new Error("Roadmap not found");

    const bookmarks = await roadmapRepository.getUserBookmarks(userId);
    const bookmarkedSet = new Set(bookmarks.map((b: { roadmapId: number }) => b.roadmapId));

    return {
      ...roadmap,
      isBookmarked: bookmarkedSet.has(roadmap.id),
    };
  },

  async bookmark(userId: number, roadmapId: number) {
    return roadmapRepository.createBookmark(userId, roadmapId);
  },

  async removeBookmark(userId: number, roadmapId: number) {
    return roadmapRepository.removeBookmark(userId, roadmapId);
  },

  async getMyBookmarks(userId: number) {
    const rows = await roadmapRepository.getBookmarkedRoadmaps(userId);
    return rows.map((r: any) => r.roadmap);
  },
};
