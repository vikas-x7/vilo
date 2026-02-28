import { AuthUser } from "@/lib/auth";
import { bookmarkRepository } from "./bookmark.repository";

export const bookmarkService = {
  async add(user: AuthUser, roadmapId: number) {
    return bookmarkRepository.add(user.id, roadmapId);
  },

  async remove(user: AuthUser, roadmapId: number) {
    return bookmarkRepository.remove(user.id, roadmapId);
  },

  async getUserBookmarks(user: AuthUser) {
    return bookmarkRepository.findUserBookmarks(user.id);
  },
};
