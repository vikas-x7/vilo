import { latexRepository } from "./latex.repository";

export const latexService = {
  async getAll(userId: number) {
    return latexRepository.findAllByUserId(userId);
  },

  async getById(userId: number, id: number) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return doc;
  },

  async create(userId: number, title: string, content: string) {
    return latexRepository.create(userId, title, content);
  },

  async update(userId: number, id: number, data: { title?: string }) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return latexRepository.update(id, data);
  },

  async saveNewVersion(userId: number, id: number, content: string) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return latexRepository.createVersion(id, content);
  },

  async delete(userId: number, id: number) {
    const doc = await latexRepository.findById(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Document not found");
    }
    return latexRepository.delete(id);
  },
};

