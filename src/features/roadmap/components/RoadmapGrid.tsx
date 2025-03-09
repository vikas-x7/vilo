import { RoadmapListItem } from "../types/roadmap.types";
import { RoadmapCard } from "./RoadmapCard";

interface Props {
  items: RoadmapListItem[];
  bookmarks: unknown[];
  onToggle: (id: number) => void;
  onOpen: (slug: string) => void;
}

export function RoadmapGrid({ items, bookmarks, onToggle, onOpen }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item: any) => (
        <RoadmapCard
          key={item.slug}
          item={item}
          isSaved={bookmarks.some((b) => b.roadmap.slug === item.slug)}
          onToggle={() => onToggle(item.id)}
          onClick={() => onOpen(item.slug)}
        />
      ))}
    </div>
  );
}
