import { NextRequest } from "next/server";
import { bookmarkController } from "@/modules/bookmark/bookmark.controller";

export async function GET() {
  const data = await bookmarkController.getUserBookmarks();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const data = await bookmarkController.add(req);
  return Response.json(data);
}

export async function DELETE(req: NextRequest) {
  const data = await bookmarkController.remove(req);
  return Response.json(data);
}
