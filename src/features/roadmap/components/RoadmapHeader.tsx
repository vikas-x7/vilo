import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { useRoadmapStore } from "../store/roadmap.store";

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

export default function RoadmapHeader() {
  const [active, setActive] = React.useState("All");
  const search = useRoadmapStore((state) => state.search);
  const setSearch = useRoadmapStore((state) => state.setSearch);

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-[40px] font-serif">RoadMap</h1>
        <p className="mb-10">
          Explore curated learning paths designed to take you from beginner to
          production-ready, one step at a time
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:items-end">
        <div className="relative w-full lg:w-[320px]">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roadmap..."
            className="w-full rounded-sm border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:bg-white/10"
          />
        </div>
      </div>
    </div>
  );
}
