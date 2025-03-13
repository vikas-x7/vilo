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
    const setData = usePortfolioStore((s) => s.setData);

    return useMutation<PortfolioData, Error, PortfolioData>({
        mutationFn: async (data: PortfolioData) => {
            return portfolioApi.save(data);
        },
        onSuccess: (savedData) => {
            setData(savedData);
            queryClient.setQueryData(["portfolio"], savedData);
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });
}

export function useDeployPortfolio() {
    const queryClient = useQueryClient();
    const setData = usePortfolioStore((s) => s.setData);

    return useMutation<PortfolioData, Error, void>({
        mutationFn: async () => await portfolioApi.deploy(),
        onSuccess: (deployedData) => {
            setData(deployedData);
            queryClient.setQueryData(["portfolio"], deployedData);
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
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
