import { prisma, Prisma } from "@/lib/prisma";

export const roadmapRepository = {
  create(title: string, data: Prisma.InputJsonValue) {
    return prisma.roadmap.create({
      data: { title, data },
    });
  },

  findAll() {
    return prisma.roadmap.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: number) {
    return prisma.roadmap.findUnique({
      where: { id },
    });
  },

  delete(id: number) {
    return prisma.roadmap.delete({
      where: { id },
    });
  },

  getUserBookmarks(userId: number) {
    return prisma.roadmapBookmark.findMany({
      where: { userId },
      select: { roadmapId: true },
    });
  },

  createBookmark(userId: number, roadmapId: number) {
    return prisma.roadmapBookmark.create({
      data: { userId, roadmapId },
    });
  },

  removeBookmark(userId: number, roadmapId: number) {
    return prisma.roadmapBookmark.delete({
      where: {
        userId_roadmapId: {
          userId,
          roadmapId,
        },
      },
    });
  },

  getBookmarkedRoadmaps(userId: number) {
    return prisma.roadmapBookmark.findMany({
      where: { userId },
      include: { roadmap: true },
    });
  },
};
