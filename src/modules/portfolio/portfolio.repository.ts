import { prisma } from "@/lib/prisma";

export const portfolioRepository = {
  findByUserId(userId: number) {
    return prisma.portfolio.findUnique({
      where: { userId },
    });
  },

  create(userId: number, data: any) {
    return prisma.portfolio.create({
      data: {
        userId,
        data,
      },
    });
  },

  update(userId: number, data: any) {
    return prisma.portfolio.update({
      where: { userId },
      data: {
        data,
      },
    });
  },

  delete(userId: number) {
    return prisma.portfolio.delete({
      where: { userId },
    });
  },
};
