import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/prisma";

export const roadmapRepository = {
  findAll() {
    return prisma.roadmap.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.roadmap.findUnique({
      where: { slug },
    });
  },

  create(data: Prisma.RoadmapCreateInput) {
    return prisma.roadmap.create({ data });
  },

  update(slug: string, data: Prisma.RoadmapUpdateInput) {
    return prisma.roadmap.update({
      where: { slug },
      data,
    });
  },

  delete(slug: string) {
    return prisma.roadmap.delete({
      where: { slug },
    });
  },
};
