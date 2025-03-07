// src/modules/portfolio/portfolio.service.ts

import { portfolioRepository } from "./portfolio.repository";
import { prisma } from "@/lib/prisma";
import { PortfolioData, DeployResponse } from "./portfolio.types";

export const portfolioService = {
  async save(userId: number, data: PortfolioData) {
    return portfolioRepository.upsert(userId, data);
  },

  async getMine(userId: number) {
    return portfolioRepository.findByUserId(userId);
  },

  async deploy(userId: number): Promise<DeployResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.username) {
      throw new Error("Username not set");
    }

    const portfolio = await portfolioRepository.findByUserId(userId);

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    if (!portfolio.data) {
      throw new Error("Portfolio data missing");
    }

    await portfolioRepository.publish(userId);

    return {
      url: `http://localhost:3000/${user.username}`,
    };
  },

  async getPublic(username: string) {
    const user = await portfolioRepository.findPublishedByUsername(username);

    if (!user || !user.portfolio) {
      throw new Error("Portfolio not found");
    }

    if (!user.portfolio.isPublished) {
      throw new Error("Portfolio not published");
    }

    return user.portfolio;
  },
};
