import { create } from "zustand";

interface RoadmapUIState {
  search: string;
  setSearch: (value: string) => void;
}

export const useRoadmapStore = create<RoadmapUIState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));
