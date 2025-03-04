"use client";

import React, { useState } from "react";
import { FiBookmark, FiSearch } from "react-icons/fi";

const roadmaps = [
  {
    name: "Frontend",
    desc: "HTML, CSS, JavaScript, React and modern UI frameworks.",
  },
  {
    name: "Backend",
    desc: "Servers, databases, APIs and backend architecture.",
  },
  {
    name: "Full Stack",
    desc: "End-to-end development from UI to server and database.",
  },
  {
    name: "DevOps",
    desc: "CI/CD pipelines, Docker, Kubernetes and cloud infrastructure.",
  },
  {
    name: "DevSecOps",
    desc: "Security practices integrated into the DevOps lifecycle.",
  },
  {
    name: "Data Analyst",
    desc: "Data cleaning, visualization and business intelligence.",
  },
  {
    name: "AI Engineer",
    desc: "Building and deploying AI models and intelligent systems.",
  },
  {
    name: "AI and Data Scientist",
    desc: "ML algorithms, statistical modeling and deep learning.",
  },
  {
    name: "Data Engineer",
    desc: "Data pipelines, warehousing and large-scale data systems.",
  },
  {
    name: "Android",
    desc: "Native Android development with Kotlin and Jetpack.",
  },
  {
    name: "Machine Learning",
    desc: "Supervised, unsupervised learning and neural networks.",
  },
  {
    name: "PostgreSQL",
    desc: "Relational database design, queries and optimization.",
  },
  { name: "iOS", desc: "Native iOS development with Swift and SwiftUI." },
  {
    name: "Blockchain",
    desc: "Smart contracts, Web3 and decentralized applications.",
  },
  {
    name: "QA",
    desc: "Testing strategies, automation and quality assurance practices.",
  },
  {
    name: "Software Architect",
    desc: "System design, patterns and scalable architecture.",
  },
  {
    name: "Cyber Security",
    desc: "Threat analysis, ethical hacking and security protocols.",
  },
  {
    name: "UX Design",
    desc: "User research, wireframing, prototyping and design systems.",
  },
  {
    name: "Technical Writer",
    desc: "Docs, API references and developer communication.",
  },
  {
    name: "Game Developer",
    desc: "Game engines, physics, rendering and game design.",
  },
  {
    name: "Server Side Game Developer",
    desc: "Multiplayer backends, game servers and networking.",
  },
  {
    name: "MLOps",
    desc: "ML model deployment, monitoring and lifecycle management.",
  },
  {
    name: "Product Manager",
    desc: "Roadmaps, stakeholder management and product strategy.",
  },
  {
    name: "Engineering Manager",
    desc: "Team leadership, hiring and engineering culture.",
  },
  {
    name: "Developer Relations",
    desc: "Community building, advocacy and developer experience.",
  },
  {
    name: "BI Analyst",
    desc: "Business intelligence, dashboards and data-driven decisions.",
  },
];

export default function RoadmapPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = roadmaps.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()),
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

      {/* Saved */}
      {saved.length > 0 && !search && (
        <section className="mb-6">
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Saved
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
            {saved.map((name) => {
              const item = roadmaps.find((r) => r.name === name)!;
              return (
                <RoadmapCard
                  key={name}
                  item={item}
                  isSaved
                  onToggle={() => toggleSave(name)}
                />
              );
            })}
          </div>
          <div className="h-px bg-white/5 mb-6" />
        </section>
      )}

      {/* All */}
      <section>
        {!search && (
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            All Roadmaps
          </p>
        )}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-10">
            {filtered.map((item) => (
              <RoadmapCard
                key={item.name}
                item={item}
                isSaved={saved.includes(item.name)}
                onToggle={() => toggleSave(item.name)}
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
  item,
  isSaved,
  onToggle,
}: {
  item: { name: string; desc: string };
  isSaved: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group relative flex items-start justify-between bg-[#1B1913] border border-white/5 hover:border-white/15 rounded-sm px-4 py-3.5 transition-all duration-200 cursor-pointer">
      <div className="flex-1 min-w-0 pr-3">
        <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-tight">
          {item.name}
        </p>
        <p className="text-[11px] text-white/25 mt-1 leading-relaxed line-clamp-2">
          {item.desc}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="text-white/20 hover:text-white/70 transition-colors shrink-0 mt-0.5"
      >
        <FiBookmark
          size={13}
          className={isSaved ? "fill-white/60 text-white/60" : ""}
        />
      </button>
    </div>
  );
}
