import { api } from "@/lib/axios";
import { PortfolioData } from "../types/portfolio.types";
import { adaptPortfolioToFrontend, adaptPortfolioToBackend } from "../adapters/portfolio.adapter";

export const portfolioApi = {
    async getMine(): Promise<PortfolioData | null> {
        try {
            const res = await api.get("/portfolio/me");
            if (res.data) {
                return adaptPortfolioToFrontend(res.data.data, res.data.user?.username || "");
            }
            return null;
        } catch {
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

    async uploadImage(formData: FormData): Promise<{ url: string }> {
        const res = await api.post<{ url: string }>("/portfolio/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },
};
