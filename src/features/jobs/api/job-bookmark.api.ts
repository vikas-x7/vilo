import { api } from "@/lib/axios";
import {
  JobBookmarkItem,
  JobBookmarkPayload,
} from "../types/jobs.types";

export const jobBookmarkApi = {
  async list() {
    const res = await api.get<JobBookmarkItem[]>("/job-bookmarks");
    return res.data;
  },

  async save(payload: JobBookmarkPayload) {
    const res = await api.post<JobBookmarkItem>("/job-bookmarks", payload);
    return res.data;
  },

  async remove(source: string, externalId: string) {
    const res = await api.delete<JobBookmarkItem>("/job-bookmarks", {
      data: { source, externalId },
    });

    return res.data;
  },
};
