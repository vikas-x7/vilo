import { generateText } from "ai";
import type { AuthUser } from "@/lib/auth";
import { getGeminiModelName, getGeminiProvider } from "@/lib/gemini";
import type { Prisma } from "@/lib/prisma";
import { roadmapRepository } from "./roadmap.repository";
import type {
  CreateRoadmapInput,
  ExplainRoadmapNodeInput,
} from "./roadmap.validator";

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function toRoadmapJson(data: CreateRoadmapInput["data"]) {
  return data as Prisma.InputJsonValue;
}

export const roadmapService = {
  async getAll() {
    return roadmapRepository.findAll();
  },

  async getBySlug(slug: string) {
    const roadmap = await roadmapRepository.findBySlug(slug);
    if (!roadmap) {
      throw new Error("Roadmap not found");
    }
    return roadmap;
  },

  async create(user: AuthUser, dto: CreateRoadmapInput) {
    if (!user.isAdmin) {
      throw new Error("Unauthorized");
    }

    const slug = generateSlug(dto.title);

    return roadmapRepository.create({
      slug,
      title: dto.title,
      description: dto.description,
      data: toRoadmapJson(dto.data),
    });
  },

  async update(user: AuthUser, slug: string, dto: Partial<CreateRoadmapInput>) {
    if (!user.isAdmin) {
      throw new Error("Unauthorized");
    }

    const updatePayload: Prisma.RoadmapUpdateInput = {
      ...(dto.title ? { title: dto.title } : {}),
      ...(dto.description ? { description: dto.description } : {}),
      ...(dto.data ? { data: toRoadmapJson(dto.data) } : {}),
    };

    return roadmapRepository.update(slug, updatePayload);
  },

  async delete(user: AuthUser, slug: string) {
    if (!user.isAdmin) {
      throw new Error("Unauthorized");
    }

    return roadmapRepository.delete(slug);
  },

  async explainNode(dto: ExplainRoadmapNodeInput) {
    const modelName = getGeminiModelName();
    const relatedTopics = dto.relatedTopics?.slice(0, 6) ?? [];
    const prompt = [
      `Roadmap: ${dto.roadmapTitle}`,
      dto.roadmapDescription
        ? `Roadmap description: ${dto.roadmapDescription}`
        : "",
      `Selected topic: ${dto.nodeTitle}`,
      dto.nodeSummary ? `Topic details: ${dto.nodeSummary}` : "",
      relatedTopics.length
        ? `Nearby topics in this roadmap: ${relatedTopics.join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const { text } = await generateText({
      model: getGeminiProvider()(modelName),
      system: `You are an AI roadmap tutor for beginners.
Explain the selected topic in simple English without heavy jargon.
Keep the answer practical and concise.
Return plain text with exactly these section titles:
What it is
Why it matters
Quick example
Learn next`,
      prompt,
    });

    return {
      explanation: text.trim(),
      model: modelName,
    };
  },
};
