import { meController } from "@/modules/auth/auth.controller";

export async function GET(req: Request) {
  return meController(req);
}
