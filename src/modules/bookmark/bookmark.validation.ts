import { z } from "zod";

export const bookmarkValidation = z.object({
  roadmapId: z.number(),
});

export type BookmarkInput = z.infer<typeof bookmarkValidation>;
