import { portfolioController } from "@/modules/portfolio/portfolio.controller";

export async function POST(req: Request) {
  return portfolioController.create(req as any);
}

export async function GET(req: Request) {
  return portfolioController.getMe(req as any);
}

export async function PUT(req: Request) {
  return portfolioController.update(req as any);
}

export async function DELETE(req: Request) {
  return portfolioController.remove(req as any);
}