import { NextRequest } from "next/server";
import { bookmarkService } from "./bookmark.service";
import { bookmarkValidation } from "./validation";
import { getAuthUser } from "@/lib/auth";

export const bookmarkController = {
  async getUserBookmarks() {
    const user = await getAuthUser();
    return bookmarkService.getUserBookmarks(user);
  },

  async add(req: NextRequest) {
    const user = await getAuthUser();
    const body = await req.json();

    const parsed = bookmarkValidation.parse(body);

    return bookmarkService.add(user, parsed.roadmapId);
  },

  async remove(req: NextRequest) {
    const user = await getAuthUser();
    const body = await req.json();

    const parsed = bookmarkValidation.parse(body);

    return bookmarkService.remove(user, parsed.roadmapId);
  },
};
