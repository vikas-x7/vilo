import { NextRequest } from "next/server";
import { bookmarkService } from "./bookmark.service";
import { bookmarkValidation } from "./bookmark.validation";
import { getCurrentUser } from "@/lib/getCurrentUser";

function requireUser(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export const bookmarkController = {
  async getUserBookmarks(req: NextRequest) {
    const user = requireUser(await getCurrentUser(req));
    return bookmarkService.getUserBookmarks(user);
  },

  async add(req: NextRequest) {
    const user = requireUser(await getCurrentUser(req));
    const body = await req.json();

    const parsed = bookmarkValidation.parse(body);

    return bookmarkService.add(user, parsed.roadmapId);
  },

  async remove(req: NextRequest) {
    const user = requireUser(await getCurrentUser(req));
    const body = await req.json();

    const parsed = bookmarkValidation.parse(body);

    return bookmarkService.remove(user, parsed.roadmapId);
  },
};
