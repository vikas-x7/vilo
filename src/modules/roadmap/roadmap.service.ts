import { roadmapRepository } from "./roadmap.repository";
import { CreateRoadmapInput } from "./validation";
import { AuthUser } from "@/lib/auth";

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
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
      ...dto,
      slug,
    });
  },

  async update(user: AuthUser, slug: string, dto: Partial<CreateRoadmapInput>) {
    if (!user.isAdmin) {
      throw new Error("Unauthorized");
    }

    return roadmapRepository.update(slug, dto);
  },

  async delete(user: AuthUser, slug: string) {
    if (!user.isAdmin) {
      throw new Error("Unauthorized");
    }

    return roadmapRepository.delete(slug);
  },
};
