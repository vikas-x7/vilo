import { latexController } from "@/modules/latex";

export async function GET(req: Request) {
  return latexController.getAll(req as any);
}

export async function POST(req: Request) {
  return latexController.create(req as any);
}
