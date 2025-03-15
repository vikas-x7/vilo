import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "../api/jobs.api";

export function useJobs(page: number, remoteOnly: boolean) {
  return useQuery({
    queryKey: ["jobs", page, remoteOnly],
    queryFn: () =>
      jobsApi.list({
        page,
        remote: remoteOnly,
      }),
    staleTime: 1000 * 60 * 5,
  });
}
