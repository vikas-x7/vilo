import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "../api/portfolio.api";
import { usePortfolioStore } from "../store/portfolio.store";
import { PortfolioData } from "../types/portfolio.types";

export function usePortfolioQuery() {
    const setData = usePortfolioStore((s) => s.setData);

    return useQuery<PortfolioData | null, Error>({
        queryKey: ["portfolio"],
        queryFn: async () => {
            const data = await portfolioApi.getMine();
            if (data) setData(data);
            return data;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
    });
}

export function useSavePortfolio() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, PortfolioData>({
        mutationFn: async (data: PortfolioData) => {
            await portfolioApi.save(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });
}

export function useDeployPortfolio() {
    return useMutation<{ url: string }, Error, void>({
        mutationFn: async () => await portfolioApi.deploy(),
    });
}

export function useUploadPortfolioImage() {
    return useMutation<{ url: string }, Error, FormData>({
        mutationFn: async (formData: FormData) => {
            const res = await portfolioApi.uploadImage(formData);
            return res;
        },
    });
}
