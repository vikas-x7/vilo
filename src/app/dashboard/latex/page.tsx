"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiArrowRight,
  FiFileText,
  FiTrash2,
} from "react-icons/fi";

const presetTemplates = [
  {
    id: "resume-standard",
    name: "Professional Resume",
    description:
      "A clean, modern two-column resume template suitable for all professions.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "research-ieee",
    name: "Research Paper (IEEE)",
    description:
      "Standard IEEE two-column format for academic research papers and conferences.",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "report-tech",
    name: "Technical Report",
    description:
      "Comprehensive layout with title page, table of contents, and chapters.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "presentation-beamer",
    name: "Slide Presentation",
    description:
      "Minimalist Beamer template for academic or professional slide decks.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "cover-letter",
    name: "Cover Letter",
    description:
      "Formal business letter template matching the Professional Resume style.",
    image:
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "assignment",
    name: "Homework Assignment",
    description:
      "Simple single-column format with question/answer block environments.",
    image:
      "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=400&auto=format&fit=crop",
  },
];

// Mock user documents — replace with real data from API
const initialUserDocs = [
  { id: "user-1", name: "My Thesis Draft", updatedAt: "2 hours ago" },
  { id: "user-2", name: "CV — April 2025", updatedAt: "Yesterday" },
  { id: "user-3", name: "Conference Paper", updatedAt: "3 days ago" },
];

export default function LatexPage() {
  const [search, setSearch] = useState("");
  const [userDocs, setUserDocs] = useState(initialUserDocs);

  const filteredPresets = presetTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredUserDocs = userDocs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteDoc = (id: string) => {
    setUserDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto flex flex-col min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-white/5 mb-6">
        <div>
          <h1 className="text-xl tracking-tight text-white/90">
            LaTeX Templates
          </h1>
          <p className="text-[11px] text-white/30 mt-1">
            Start a new document from a template or create your own from
            scratch.
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
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-sm pl-8 pr-4 py-2 text-xs text-white/70 placeholder-white/20 outline-none focus:border-white/20 transition-all"
          />
        </div>
      </div>

      {/* ── User Documents ── */}
      <section className="mb-8">
        <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
          My Documents
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {/* Create New */}
          <Link
            href="/editor"
            className="group flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-sm hover:border-white/20 hover:bg-white/5 transition-all duration-300 aspect-[3/4]"
          >
            <div className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 group-hover:text-white/60 group-hover:border-white/20 transition-all mb-2">
              <FiPlus size={16} />
            </div>
            <span className="text-[11px] text-white/30 group-hover:text-white/60 transition-colors">
              New Document
            </span>
          </Link>

          {/* User doc cards */}
          {filteredUserDocs.map((doc) => (
            <div
              key={doc.id}
              className="group relative flex flex-col bg-[#1B1913] border border-white/5 rounded-sm overflow-hidden hover:border-white/15 transition-all duration-300 aspect-[3/4]"
            >
              {/* Mock paper preview */}
              <div className="flex-1 flex flex-col items-center justify-center bg-[#0F0E09] p-4 gap-1.5">
                <FiFileText size={28} className="text-white/15" />
                <div className="w-full space-y-1.5 mt-2">
                  {[80, 60, 70, 50, 65].map((w, i) => (
                    <div
                      key={i}
                      className="h-px bg-white/8 rounded-full"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="px-3 py-2.5 border-t border-white/5">
                <p className="text-xs text-white/70 font-medium truncate">
                  {doc.name}
                </p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  {doc.updatedAt}
                </p>
              </div>

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
                <Link
                  href={`/dashboard/latex/editor?doc=${doc.id}`}
                  className="px-3 py-1.5 bg-[#F0EDE7] text-black/80 text-[10px] font-semibold rounded-sm hover:bg-[#F0EDE7]/90 transition-all"
                >
                  Open
                </Link>
                <button
                  onClick={() => deleteDoc(doc.id)}
                  className="p-1.5 bg-white/10 border border-white/10 rounded-sm text-white/50 hover:text-red-400 hover:border-red-400/30 transition-all"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty state for user docs */}
          {filteredUserDocs.length === 0 && search && (
            <div className="col-span-full py-6 text-center text-white/20 text-xs">
              No documents match &quot;{search}&quot;
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-white/5 mb-6" />

      {/* ── Preset Templates ── */}
      <section className="mb-10">
        <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
          Templates
        </p>

        {filteredPresets.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredPresets.map((template, i) => (
              <Link
                href={`/dashboard/latex/editor?template=${template.id}`}
                key={`${template.id}-${i}`}
                className="group flex flex-col bg-[#1B1913] border border-white/5 rounded-sm overflow-hidden hover:border-white/15 transition-all duration-300"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-60"
                  />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-xs font-medium text-white/80 group-hover:text-white transition-colors mb-1">
                    {template.name}
                  </h3>
                  <p className="text-[10px] text-white/25 flex-1 leading-relaxed line-clamp-2">
                    {template.description}
                  </p>
                  <div className="mt-3 flex items-center text-[10px] text-white/30 group-hover:text-white/60 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
                    Use Template
                    <FiArrowRight size={11} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-white/20">
            <FiSearch size={24} className="mb-3 opacity-40" />
            <p className="text-xs">
              No templates found for &quot;{search}&quot;
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
