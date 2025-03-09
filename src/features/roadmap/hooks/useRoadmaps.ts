import { useQuery } from "@tanstack/react-query";
import { roadmapApi } from "../api/roadmap.api";

export const useRoadmaps = () =>
  useQuery({
    queryKey: ["roadmaps"],
    queryFn: roadmapApi.getAll,
  });
