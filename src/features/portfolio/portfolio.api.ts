import { api } from "@/lib/axios";
import { PortfolioData } from "./types";
import { adaptPortfolioToFrontend, adaptPortfolioToBackend } from "./portfolio.adapter";

export const portfolioApi = {
    async getMine(): Promise<PortfolioData | null> {
        try {
            const res = await api.get("/portfolio/me");
            if (res.data) {
                // res.data is likely the Portfolio Prisma object which contains data
                return adaptPortfolioToFrontend(res.data.data, res.data.user?.username || "");
            }
            return null;
        } catch (e) {
            // Return null instead of throwing if not found
            return null;
        }
    },

    async save(data: PortfolioData): Promise<void> {
        const backendData = adaptPortfolioToBackend(data);
        await api.post("/portfolio", { data: backendData });
    },

    async deploy(): Promise<{ url: string }> {
        const res = await api.post<{ url: string }>("/portfolio/deploy");
        return res.data;
    },
};
