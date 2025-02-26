import { portfolioRepository } from "./portfolio.repository";

export const portfolioService = {
  async create(userId: number, data: any) {
    const existing = await portfolioRepository.findByUserId(userId);
    if (existing) {
      throw new Error("Portfolio already exists");
    }
    return portfolioRepository.create(userId, data);
  },

  async getMe(userId: number) {
    const portfolio = await portfolioRepository.findByUserId(userId);
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }
    return portfolio;
  },

  async update(userId: number, data: any) {
    const existing = await portfolioRepository.findByUserId(userId);
    if (!existing) {
      throw new Error("Portfolio not found");
    }
    return portfolioRepository.update(userId, data);
  },

  async delete(userId: number) {
    const existing = await portfolioRepository.findByUserId(userId);
    if (!existing) {
      throw new Error("Portfolio not found");
    }
    return portfolioRepository.delete(userId);
  },
};
