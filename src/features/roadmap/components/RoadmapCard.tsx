"use client";

import { FiBookmark } from "react-icons/fi";
import { RoadmapListItem } from "../types/roadmap.types";

interface Props {
  item: RoadmapListItem;
  isSaved: boolean;
  onToggle: () => void;
  onClick: () => void;
}

export function RoadmapCard({ item, isSaved, onToggle, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group bg-[#0A0A0A] border border-white/5 hover:border-white/15 rounded-sm p-4 cursor-pointer h-35 relative"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="absolute top-3 right-3 text-white/40 hover:text-white"
      >
        <FiBookmark className={isSaved ? "fill-white text-white" : ""} />
      </button>

      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="text-white/80 text-lg">{item.title}</p>
          <p className="text-white/30 text-xs mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>
        <button className="text-xs bg-white/70 text-black px-2 py-1 rounded-sm w-fit mt-2">
          Start learning
        </button>
      </div>
    </div>
  );
}
