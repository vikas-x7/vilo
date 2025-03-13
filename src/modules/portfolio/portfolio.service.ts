// src/modules/portfolio/portfolio.service.ts

import { portfolioRepository } from "./portfolio.repository";
import { PortfolioData, SavePortfolioInput } from "./portfolio.types";

function normalizeUsername(username: string) {
  return username
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createDefaultPortfolioData(
  user: { username: string; email: string },
  current?: Partial<PortfolioData>,
): PortfolioData {
  return {
    userImage: current?.userImage ?? "",
    name: current?.name ?? user.username,
    subHeading: current?.subHeading ?? "",
    skills: current?.skills ?? [],
    workExperience: current?.workExperience ?? [],
    hackathons: current?.hackathons ?? [],
    projects: current?.projects ?? [],
    education: current?.education ?? [],
    contact: {
      email: current?.contact?.email ?? user.email,
      phone: current?.contact?.phone,
      github: current?.contact?.github,
      linkedin: current?.contact?.linkedin,
      twitter: current?.contact?.twitter,
      website: current?.contact?.website,
    },
  };
}

export const portfolioService = {
  async save(userId: number, input: SavePortfolioInput) {
    const owner = await portfolioRepository.findOwnerById(userId);

    if (!owner) {
      throw new Error("User not found");
    }

    const normalizedUsername = normalizeUsername(input.username);

    if (!normalizedUsername) {
      throw new Error("Please enter a valid username");
    }

    const usernameOwner =
      normalizedUsername === owner.username
        ? owner
        : await portfolioRepository.findOwnerByUsername(normalizedUsername);

    if (usernameOwner && usernameOwner.id !== userId) {
      throw new Error("This username is already taken");
    }

    if (normalizedUsername !== owner.username) {
      await portfolioRepository.updateUsername(userId, normalizedUsername);
    }

    return portfolioRepository.upsert(userId, input.data, input.isPublic);
  },

  async getMine(userId: number) {
    return portfolioRepository.findByUserId(userId);
  },

  async deploy(userId: number) {
    const portfolio = await portfolioRepository.findByUserId(userId);

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    if (!portfolio.data) {
      throw new Error("Portfolio data missing");
    }

    return portfolioRepository.markDeployed(userId);
  },

  async getPublic(username: string) {
    const portfolio = await portfolioRepository.findPublicByUsername(username);

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    return portfolio;
  },

  async saveAvatar(userId: number, file: File) {
    const owner = await portfolioRepository.findOwnerById(userId);

    if (!owner) {
      throw new Error("User not found");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const existingPortfolio = await portfolioRepository.findByUserId(userId);
    const existingData = existingPortfolio?.data as Partial<PortfolioData> | null;
    const nextData = createDefaultPortfolioData(owner, existingData ?? undefined);

    nextData.userImage = dataUrl;

    await portfolioRepository.saveAvatar(userId, nextData);

    return {
      url: dataUrl,
    };
  },
};
