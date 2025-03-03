"use client";

import React, { useState } from "react";
import { FiBookmark, FiSearch } from "react-icons/fi";

const roadmaps = [
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps",
  "DevSecOps",
  "Data Analyst",
  "AI Engineer",
  "AI and Data Scientist",
  "Data Engineer",
  "Android",
  "Machine Learning",
  "PostgreSQL",
  "iOS",
  "Blockchain",
  "QA",
  "Software Architect",
  "Cyber Security",
  "UX Design",
  "Technical Writer",
  "Game Developer",
  "Server Side Game Developer",
  "MLOps",
  "Product Manager",
  "Engineering Manager",
  "Developer Relations",
  "BI Analyst",
];

export default function RoadmapPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = roadmaps.filter((r) =>
    r.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSave = (name: string) => {
    setSaved((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto min-h-full font-gothic">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-white/5 mb-6">
        <div>
          <h1 className="text-xl tracking-tight text-white/90">Roadmaps</h1>
          <p className="text-[11px] text-white/30 mt-1">
            Choose a path and start building your skills step by step.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <FiSearch
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            type="text"
            placeholder="Search roadmaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-sm pl-8 pr-4 py-2 text-xs text-white/70 placeholder-white/20 outline-none focus:border-white/20 transition-all"
          />
        </div>
      </div>

      {/* Saved section */}
      {saved.length > 0 && !search && (
        <section className="mb-6">
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Saved
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
            {saved.map((name) => (
              <RoadmapCard
                key={name}
                name={name}
                isSaved
                onToggle={() => toggleSave(name)}
              />
            ))}
          </div>
          <div className="h-px bg-white/5 mb-6" />
        </section>
      )}

      {/* All Roadmaps */}
      <section>
        {!search && (
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            All Roadmaps
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-10">
            {filtered.map((name) => (
              <RoadmapCard
                key={name}
                name={name}
                isSaved={saved.includes(name)}
                onToggle={() => toggleSave(name)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white/20">
            <FiSearch size={24} className="mb-3 opacity-40" />
            <p className="text-xs">
              No roadmaps found for &quot;{search}&quot;
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function RoadmapCard({
  name,
  isSaved,
  onToggle,
}: {
  name: string;
  isSaved: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group relative flex items-center justify-between bg-[#1B1913] border border-white/5 hover:border-white/15 rounded-sm px-4 py-3.5 transition-all duration-200 cursor-pointer">
      <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
        {name}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="text-white/20 hover:text-white/70 transition-colors ml-3 shrink-0"
      >
        <FiBookmark
          size={14}
          className={isSaved ? "fill-white/60 text-white/60" : ""}
        />
      </button>
    </div>
  );
}
