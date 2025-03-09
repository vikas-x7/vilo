import { prisma } from "@/lib/prisma";
import { PortfolioData } from "./portfolio.types";

export const portfolioRepository = {
  async findByUserId(userId: number) {
    return prisma.portfolio.findUnique({
      where: { userId },
    });
  },

  async upsert(userId: number, data: PortfolioData) {
    return prisma.portfolio.upsert({
      where: { userId },
      update: {
        data: data as any,
        isPublished: false,
      },
      create: {
        userId,
        data: data as any,
      },
    });
  },

  async publish(userId: number) {
    return prisma.portfolio.update({
      where: { userId },
      data: {
        isPublished: true,
      },
    });
  },

  async findPublishedByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
      include: { portfolio: true },
    });
  },
};
