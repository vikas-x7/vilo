import { prisma } from "@/lib/prisma";

export const latexRepository = {
  findAllByUserId(userId: number) {
    return prisma.latex.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        versions: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
  },

  findById(id: number) {
    return prisma.latex.findUnique({
      where: { id },
      include: {
        versions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },

  create(userId: number, title: string, content: string) {
    return prisma.latex.create({
      data: {
        userId,
        title,
        versions: {
          create: {
            content,
          },
        },
      },
      include: {
        versions: true,
      },
    });
  },

  update(id: number, data: { title?: string }) {
    return prisma.latex.update({
      where: { id },
      data,
      include: {
        versions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },

  createVersion(latexId: number, content: string) {
    return prisma.latexVersion.create({
      data: {
        latexId,
        content,
      },
    });
  },

  delete(id: number) {
    return prisma.latex.delete({
      where: { id },
    });
  },
};
