import { z } from "zod";

const compilerSchema = z.enum([
  "pdflatex",
  "xelatex",
  "lualatex",
  "platex",
  "uplatex",
  "context",
]);

const latexAssistantOutputSchema = z.object({
  title: z.string().trim().min(1).max(150),
  latexCode: z.string().min(1),
  summary: z.string().trim().min(1).max(600),
  nextSteps: z.array(z.string().trim().min(1).max(200)).max(5),
});

export const latexAssistantRequestSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("generate"),
    prompt: z.string().trim().min(8).max(2000),
    compiler: compilerSchema.optional(),
    currentTitle: z.string().trim().max(150).optional(),
    currentContent: z.string().max(40000).optional(),
  }),
  z.object({
    action: z.literal("fix"),
    prompt: z.string().trim().max(1000).optional(),
    compiler: compilerSchema.optional(),
    currentTitle: z.string().trim().max(150).optional(),
    currentContent: z.string().trim().min(1).max(40000),
    compileLogs: z.string().trim().min(1).max(20000),
  }),
]);

export type LatexAssistantRequestInput = z.infer<
  typeof latexAssistantRequestSchema
>;

export type LatexAssistantResponse = z.infer<typeof latexAssistantOutputSchema> & {
  action: LatexAssistantRequestInput["action"];
  model: string;
};

export { compilerSchema, latexAssistantOutputSchema };
