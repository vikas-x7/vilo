"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useRoadmaps } from "@/features/roadmap/hooks/useRoadmaps";
import { useBookmarks } from "@/features/roadmap/hooks/useBookmarks";
import { RoadmapGrid } from "@/features/roadmap/components/RoadmapGrid";
import RoadmapHeader from "@/features/roadmap/components/RoadmapHeader";
import { useRoadmapStore } from "@/features/roadmap/store/roadmap.store";

export default function RoadmapPage() {
  const router = useRouter();
  const { data, isLoading } = useRoadmaps();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const search = useRoadmapStore((state) => state.search);

  const filteredRoadmaps = useMemo(() => {
    const roadmaps = data ?? [];
    const query = search.trim().toLowerCase();

    if (!query) return roadmaps;

    return roadmaps.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

  const sortedRoadmaps = useMemo(() => {
    const bookmarkedIds = new Set(
      bookmarks.map((bookmark) => bookmark.roadmapId),
    );

    return [...filteredRoadmaps].sort((a, b) => {
      const aSaved = bookmarkedIds.has(a.id) ? 1 : 0;
      const bSaved = bookmarkedIds.has(b.id) ? 1 : 0;

      return bSaved - aSaved;
    });
  }, [bookmarks, filteredRoadmaps]);

  const bookmarkedRoadmaps = useMemo(
    () =>
      sortedRoadmaps.filter((item) =>
        bookmarks.some((bookmark) => bookmark.roadmapId === item.id),
      ),
    [bookmarks, sortedRoadmaps],
  );

  const otherRoadmaps = useMemo(
    () =>
      sortedRoadmaps.filter(
        (item) => !bookmarks.some((bookmark) => bookmark.roadmapId === item.id),
      ),
    [bookmarks, sortedRoadmaps],
  );

  const handleToggle = (roadmapId: number) => {
    const isSaved = bookmarks.some(
      (bookmark) => bookmark.roadmapId === roadmapId,
    );

    if (isSaved) {
      removeBookmark(roadmapId);
      return;
    }

    addBookmark(roadmapId);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" p-3  gap-8">
      <RoadmapHeader />

      {bookmarkedRoadmaps.length > 0 && (
        <section className="flex flex-col gap-3 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-white/60">
              Saved Roadmaps
            </h2>
            <span className="text-xs text-white/30">
              {bookmarkedRoadmaps.length}
            </span>
          </div>
          <RoadmapGrid
            items={bookmarkedRoadmaps}
            bookmarks={bookmarks}
            onToggle={handleToggle}
            onOpen={(slug) => router.push(`/dashboard/roadmap/${slug}`)}
          />
        </section>
      )}

      {otherRoadmaps.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-white/40">
              Other Roadmaps
            </h2>
            <span className="text-xs text-white/30">
              {otherRoadmaps.length}
            </span>
          </div>
          <RoadmapGrid
            items={otherRoadmaps}
            bookmarks={bookmarks}
            onToggle={handleToggle}
            onOpen={(slug) => router.push(`/dashboard/roadmap/${slug}`)}
          />
        </section>
      )}

      {sortedRoadmaps.length === 0 && (
        <div className="rounded-sm border border-white/5 bg-white/5 p-6 text-center text-sm text-white/50">
          No roadmap found for this search.
        </div>
      )}
    </div>
  );
}
