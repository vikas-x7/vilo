"use client";

import React, { useState } from "react";
import { FiBookmark, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

const roadmaps = [
  {
    id: "frontend",
    name: "Frontend",
    desc: "HTML, CSS, JavaScript, React and modern UI frameworks.",
    image:
      "https://i.pinimg.com/736x/22/66/35/22663574174366c551d7753f72e1db64.jpg",
  },
  {
    id: "backend",
    name: "Backend",
    desc: "Servers, databases, APIs and backend architecture.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
  },
  {
    id: "full-stack",
    name: "Full Stack",
    desc: "End-to-end development from UI to server and database.",
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=200&fit=crop",
  },
  {
    id: "devops",
    name: "DevOps",
    desc: "CI/CD pipelines, Docker, Kubernetes and cloud infrastructure.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=200&fit=crop",
  },
  {
    id: "devsecops",
    name: "DevSecOps",
    desc: "Security practices integrated into the DevOps lifecycle.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=200&fit=crop",
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    desc: "Data cleaning, visualization and business intelligence.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    desc: "Building and deploying AI models and intelligent systems.",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop",
  },
  {
    id: "ai-data-scientist",
    name: "AI and Data Scientist",
    desc: "ML algorithms, statistical modeling and deep learning.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop",
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    desc: "Data pipelines, warehousing and large-scale data systems.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop",
  },
  {
    id: "android",
    name: "Android",
    desc: "Native Android development with Kotlin and Jetpack.",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=200&fit=crop",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    desc: "Supervised, unsupervised learning and neural networks.",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    desc: "Relational database design, queries and optimization.",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop",
  },
  {
    id: "ios",
    name: "iOS",
    desc: "Native iOS development with Swift and SwiftUI.",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=200&fit=crop",
  },
  {
    id: "blockchain",
    name: "Blockchain",
    desc: "Smart contracts, Web3 and decentralized applications.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
  },
  {
    id: "qa",
    name: "QA",
    desc: "Testing strategies, automation and quality assurance practices.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
  },
  {
    id: "software-architect",
    name: "Software Architect",
    desc: "System design, patterns and scalable architecture.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    desc: "Threat analysis, ethical hacking and security protocols.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop",
  },
  {
    id: "ux-design",
    name: "UX Design",
    desc: "User research, wireframing, prototyping and design systems.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
  },
  {
    id: "technical-writer",
    name: "Technical Writer",
    desc: "Docs, API references and developer communication.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=200&fit=crop",
  },
  {
    id: "game-developer",
    name: "Game Developer",
    desc: "Game engines, physics, rendering and game design.",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
  },
  {
    id: "server-side-game-developer",
    name: "Server Side Game Developer",
    desc: "Multiplayer backends, game servers and networking.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
  },
  {
    id: "mlops",
    name: "MLOps",
    desc: "ML model deployment, monitoring and lifecycle management.",
    image:
      "https://images.unsplash.com/photo-1586953208270-680716ae0afe?w=400&h=200&fit=crop",
  },
  {
    id: "product-manager",
    name: "Product Manager",
    desc: "Roadmaps, stakeholder management and product strategy.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=200&fit=crop",
  },
  {
    id: "engineering-manager",
    name: "Engineering Manager",
    desc: "Team leadership, hiring and engineering culture.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
  },
  {
    id: "developer-relations",
    name: "Developer Relations",
    desc: "Community building, advocacy and developer experience.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop",
  },
  {
    id: "bi-analyst",
    name: "BI Analyst",
    desc: "Business intelligence, dashboards and data-driven decisions.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
  },
];

export default function RoadmapPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const router = useRouter();

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

  const handleCardClick = (id: string) => {
    router.push(`/dashboard/roadmap/${id}`);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            {saved.map((name) => {
              const item = roadmaps.find((r) => r.name === name)!;
              return (
                <RoadmapCard
                  key={name}
                  item={item}
                  isSaved
                  onToggle={() => toggleSave(name)}
                  onClick={() => handleCardClick(item.id)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 pb-10">
            {filtered.map((item) => (
              <RoadmapCard
                key={item.name}
                item={item}
                isSaved={saved.includes(item.name)}
                onToggle={() => toggleSave(item.name)}
                onClick={() => handleCardClick(item.id)}
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
  onClick,
}: {
  item: { id: string; name: string; desc: string; image: string };
  isSaved: boolean;
  onToggle: () => void;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col bg-[#1B1913] border border-white/5 hover:border-white/15 rounded-sm overflow-hidden transition-all duration-200 cursor-pointer"
    >
      {/* Content */}
      <div className="flex items-start justify-between px-4 py-3.5">
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-[18px] text-white/70 group-hover:text-white/90 transition-colors leading-tight">
            {item.name}
          </p>
          <p className="text-[11px] text-white/25 mt-1 leading-relaxed line-clamp-2">
            {item.desc}
          </p>

          <button className="text-[10px] bg-white/60 py-1 px-2 text-black/90 mt-5 rounded-[3px]">
            Start now{" "}
          </button>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // card click se alag rakho
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
    </div>
  );
}
