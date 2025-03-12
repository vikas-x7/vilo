import { create } from "zustand";
import { PortfolioData } from "../types/portfolio.types";

interface PortfolioState {
    data: PortfolioData | null;
    setData: (data: PortfolioData) => void;
    updateField: <K extends keyof PortfolioData>(
        key: K,
        value: PortfolioData[K]
    ) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null,

    setData: (data) => set({ data }),

    updateField: (key, value) =>
        set((state) => ({
            data: state.data ? { ...state.data, [key]: value } : null,
        })),
}));
