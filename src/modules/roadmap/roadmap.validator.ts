import { z } from "zod";

export const createRoadmapSchema = z.object({
    title: z.string().min(1, "Title is required"),
    data: z.record(z.string(), z.any()).or(z.array(z.any())),
});

export type CreateRoadmapInput = z.infer<typeof createRoadmapSchema>;
