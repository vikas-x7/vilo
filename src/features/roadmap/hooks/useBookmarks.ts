import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkApi } from "../api/bookmark.api";

export const useBookmarks = () => {
  const qc = useQueryClient();

  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks"],
    queryFn: bookmarkApi.getAll,
  });

  const add = useMutation({
    mutationFn: bookmarkApi.add,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
  });

  const remove = useMutation({
    mutationFn: bookmarkApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
  });

  return {
    bookmarks: bookmarksQuery.data ?? [],
    isLoading: bookmarksQuery.isLoading,
    addBookmark: add.mutate,
    removeBookmark: remove.mutate,
  };
};
