import { RoadmapListItem } from "../types/roadmap.types";
import { RoadmapCard } from "./RoadmapCard";
import { RoadmapBookmarkItem } from "../types/roadmap.types";

interface Props {
  items: RoadmapListItem[];
  bookmarks: RoadmapBookmarkItem[];
  onToggle: (id: number) => void;
  onOpen: (slug: string) => void;
}

export function RoadmapGrid({ items, bookmarks, onToggle, onOpen }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <RoadmapCard
          key={item.slug}
          item={item}
          isSaved={bookmarks.some((bookmark) => bookmark.roadmapId === item.id)}
          onToggle={() => onToggle(item.id)}
          onClick={() => onOpen(item.slug)}
        />
      ))}
    </div>
  );
}
