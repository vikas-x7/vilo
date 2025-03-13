import { Prisma, prisma } from "@/lib/prisma";
import { PortfolioData } from "./portfolio.types";

const portfolioInclude = {
  user: {
    select: {
      id: true,
      username: true,
      email: true,
    },
  },
} as const;

export const portfolioRepository = {
  async findByUserId(userId: number) {
    return prisma.portfolio.findUnique({
      where: { userId },
      include: portfolioInclude,
    });
  },

  async upsert(userId: number, data: PortfolioData, isPublic: boolean) {
    return prisma.portfolio.upsert({
      where: { userId },
      update: {
        data: data as unknown as Prisma.InputJsonValue,
        isPublic,
      },
      create: {
        userId,
        data: data as unknown as Prisma.InputJsonValue,
        isPublic,
      },
      include: portfolioInclude,
    });
  },

  async markDeployed(userId: number) {
    return prisma.portfolio.update({
      where: { userId },
      data: {
        isDeployed: true,
      },
      include: portfolioInclude,
    });
  },

  async saveAvatar(userId: number, data: PortfolioData) {
    return prisma.portfolio.upsert({
      where: { userId },
      update: {
        data: data as unknown as Prisma.InputJsonValue,
      },
      create: {
        userId,
        data: data as unknown as Prisma.InputJsonValue,
        isPublic: true,
      },
      include: portfolioInclude,
    });
  },

  async findPublicByUsername(username: string) {
    return prisma.portfolio.findFirst({
      where: {
        isDeployed: true,
        isPublic: true,
        user: {
          is: {
            username,
          },
        },
      },
      include: portfolioInclude,
    });
  },

  async findOwnerById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  },

  async findOwnerByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
      },
    });
  },

  async updateUsername(userId: number, username: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  },
};
