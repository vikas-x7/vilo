import { z } from "zod";

export const reactFlowNodeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.record(z.unknown()),
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
