import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobBookmarkApi } from "../api/job-bookmark.api";

export function useJobBookmarks() {
  const queryClient = useQueryClient();

  const bookmarksQuery = useQuery({
    queryKey: ["job-bookmarks"],
    queryFn: jobBookmarkApi.list,
  });

  const saveMutation = useMutation({
    mutationFn: jobBookmarkApi.save,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["job-bookmarks"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({
      source,
      externalId,
    }: {
      source: string;
      externalId: string;
    }) => jobBookmarkApi.remove(source, externalId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["job-bookmarks"] });
    },
  });

  return {
    bookmarks: bookmarksQuery.data ?? [],
    isLoading: bookmarksQuery.isLoading,
    isSaving: saveMutation.isPending,
    isRemoving: removeMutation.isPending,
    saveBookmark: saveMutation.mutateAsync,
    removeBookmark: removeMutation.mutateAsync,
  };
}
