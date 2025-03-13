import {
  PortfolioApiResponse,
  PortfolioData,
  PortfolioOwner,
} from "./portfolio.types";

interface PortfolioResponseSource {
  id: number;
  data: unknown;
  isPublic: boolean;
  isDeployed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function buildPortfolioUrl(origin: string, username: string) {
  return `${origin.replace(/\/$/, "")}/${username}`;
}

export function createPortfolioResponse({
  portfolio,
  user,
  origin,
}: {
  portfolio: PortfolioResponseSource | null;
  user: PortfolioOwner;
  origin: string;
}): PortfolioApiResponse {
  return {
    user,
    portfolio: portfolio
      ? {
          id: portfolio.id,
          data: portfolio.data as PortfolioData,
          isPublic: portfolio.isPublic,
          isDeployed: portfolio.isDeployed,
          createdAt: portfolio.createdAt,
          updatedAt: portfolio.updatedAt,
        }
      : null,
    deploymentUrl: buildPortfolioUrl(origin, user.username),
  };
}
