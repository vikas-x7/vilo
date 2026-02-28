import { prisma } from "@/lib/prisma";

export const bookmarkRepository = {
  add(userId: number, roadmapId: number) {
    return prisma.roadmapBookmark.create({
      data: { userId, roadmapId },
    });
  },

  remove(userId: number, roadmapId: number) {
    return prisma.roadmapBookmark.delete({
      where: {
        userId_roadmapId: { userId, roadmapId },
      },
    });
  },

  findUserBookmarks(userId: number) {
    return prisma.roadmapBookmark.findMany({
      where: { userId },
      include: { roadmap: true },
    });
  },
};
