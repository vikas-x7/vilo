import { api } from "@/lib/axios";
import { PortfolioData } from "../types/portfolio.types";
import { PortfolioApiResponse } from "@/modules/portfolio/portfolio.types";
import { adaptPortfolioToFrontend, adaptPortfolioToBackend } from "../adapters/portfolio.adapter";

function parsePortfolioResponse(res: PortfolioApiResponse): PortfolioData {
    return adaptPortfolioToFrontend(res.portfolio?.data, {
        username: res.user.username,
        email: res.user.email,
        isPublic: res.portfolio?.isPublic ?? true,
        isDeployed: res.portfolio?.isDeployed ?? false,
        deployedUrl: res.portfolio?.isDeployed ? res.deploymentUrl : "",
    });
}

export const portfolioApi = {
    async getMine(): Promise<PortfolioData | null> {
        try {
            const res = await api.get<PortfolioApiResponse>("/portfolio/me");
            return parsePortfolioResponse(res.data);
        } catch {
            return null;
        }
    },

    async save(data: PortfolioData): Promise<PortfolioData> {
        const backendData = adaptPortfolioToBackend(data);
        const res = await api.post<PortfolioApiResponse>("/portfolio", {
            username: data.username,
            isPublic: data.isPublic,
            data: backendData,
        });
        return parsePortfolioResponse(res.data);
    },

    async deploy(): Promise<PortfolioData> {
        const res = await api.post<PortfolioApiResponse>("/portfolio/deploy");
        return parsePortfolioResponse(res.data);
    },

    async uploadImage(formData: FormData): Promise<{ url: string }> {
        const res = await api.post<{ url: string }>("/portfolio/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },
};
