import { api } from "@/lib/axios";
import { JobsQueryParams, JobsResponse } from "../types/jobs.types";

export const jobsApi = {
  async list(params: JobsQueryParams = {}) {
    const res = await api.get<JobsResponse>("/jobs", {
      params: {
        page: params.page ?? 1,
        ...(params.remote ? { remote: "true" } : {}),
      },
    });

    return res.data;
  },
};
