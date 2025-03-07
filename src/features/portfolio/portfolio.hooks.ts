import { useQuery, useMutation } from "@tanstack/react-query";
import { portfolioApi } from "./portfolio.api";
import { usePortfolioStore } from "./portfolio.store";
import { PortfolioData } from "./types";

export function usePortfolioQuery() {
    const setData = usePortfolioStore((s) => s.setData);

    return useQuery<PortfolioData | null, Error>({
        queryKey: ["portfolio"],
        queryFn: async () => {
            const data = await portfolioApi.getMine();
            if (data) setData(data);
            return data;
        },
    });
}

export function useSavePortfolio() {
    const data = usePortfolioStore((s) => s.data);

    return useMutation<void, Error>({
        mutationFn: async () => {
            if (!data) throw new Error("No portfolio data");
            await portfolioApi.save(data);
        },
    });
}

export function useDeployPortfolio() {
    return useMutation<{ url: string }, Error, void>({
        mutationFn: async () => await portfolioApi.deploy(),
    });
}
