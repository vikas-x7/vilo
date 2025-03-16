import { NextRequest } from "next/server";
import { latexController } from "@/modules/latex";

export async function POST(req: NextRequest) {
  return latexController.assistant(req);
}
