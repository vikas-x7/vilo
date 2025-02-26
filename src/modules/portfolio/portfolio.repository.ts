import { prisma } from "@/lib/prisma";

export const portfolioRepository = {
  async data() {
    const data = await prisma;
  },
};
