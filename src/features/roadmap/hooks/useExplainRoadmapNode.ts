import { useMutation } from "@tanstack/react-query";
import { roadmapApi } from "../api/roadmap.api";
import type {
  RoadmapExplainRequest,
  RoadmapExplainResponse,
} from "../types/roadmap.types";

export const useExplainRoadmapNode = () =>
  useMutation<RoadmapExplainResponse, Error, RoadmapExplainRequest>({
    mutationFn: roadmapApi.explainNode,
  });
