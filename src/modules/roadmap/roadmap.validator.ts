import { z } from "zod";

export const reactFlowNodeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.record(z.string(), z.unknown()),
});

export const reactFlowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
});

export const createRoadmapValidation = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  data: z.object({
    nodes: z.array(reactFlowNodeSchema),
    edges: z.array(reactFlowEdgeSchema),
  }),
});

export const updateRoadmapValidation = createRoadmapValidation.partial();

export type CreateRoadmapInput = z.infer<typeof createRoadmapValidation>;

export const explainRoadmapNodeValidation = z.object({
  roadmapTitle: z.string().trim().min(2),
  roadmapDescription: z.string().trim().max(500).optional(),
  nodeId: z.string().trim().min(1),
  nodeTitle: z.string().trim().min(1),
  nodeSummary: z.string().trim().max(700).optional(),
  relatedTopics: z.array(z.string().trim().min(1)).max(8).optional(),
});

export type ExplainRoadmapNodeInput = z.infer<
  typeof explainRoadmapNodeValidation
>;
