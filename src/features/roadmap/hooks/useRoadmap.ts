import { useQuery } from "@tanstack/react-query";
import { roadmapApi } from "../api/roadmap.api";

export const useRoadmap = (slug: string) =>
  useQuery({
    queryKey: ["roadmap", slug],
    queryFn: () => roadmapApi.getBySlug(slug),
    enabled: !!slug,
  });
