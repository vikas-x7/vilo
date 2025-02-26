import { portfolioController } from "@/modules/portfolio/portfolio.controller";

export async function GET() {
  return portfolioController.get();
}
