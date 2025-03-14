import { latexController } from "@/modules/latex";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return latexController.compile(req);
}
