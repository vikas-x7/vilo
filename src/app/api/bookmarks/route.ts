import { NextRequest } from "next/server";
import { bookmarkController } from "@/modules/bookmark/bookmark.controller";

export async function GET(req: NextRequest) {
  try {
    return Response.json(await bookmarkController.getUserBookmarks(req));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return Response.json(
      { success: false, message },
      { status: message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return Response.json(await bookmarkController.add(req));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return Response.json(
      { success: false, message },
      { status: message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    return Response.json(await bookmarkController.remove(req));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return Response.json(
      { success: false, message },
      { status: message === "Unauthorized" ? 401 : 500 },
    );
  }
}
