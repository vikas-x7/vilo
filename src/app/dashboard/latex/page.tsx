"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { latexTemplateCatalog } from "@/modules/latex/latex.templates";
import {
  FiSearch,
  FiPlus,
  FiArrowRight,
  FiFileText,
  FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";

interface LatexVersion {
  id: number;
  content: string;
  createdAt: string;
}

interface LatexDocument {
  id: number;
  title: string;
  updatedAt: string;
  versions: LatexVersion[];
}

function formatUpdatedAt(updatedAt: string) {
  const date = new Date(updatedAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hour = 1000 * 60 * 60;
  const day = hour * 24;

  if (diff < hour) {
    return "Just now";
  }

  if (diff < day) {
    return `${Math.max(1, Math.floor(diff / hour))} hours ago`;
  }

  if (diff < day * 2) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function LatexPage() {
  const [search, setSearch] = useState("");
  const [userDocs, setUserDocs] = useState<LatexDocument[]>([]);
  const [docToDelete, setDocToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDocsLoading, setIsDocsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [docsError, setDocsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDocs = async () => {
      try {
        setIsDocsLoading(true);
        setDocsError(null);
        const response = await api.get<LatexDocument[]>("/latex");

        if (!isMounted) {
          return;
        }

        setUserDocs(response.data);
      } catch (error) {
        console.error("Failed to load latex documents:", error);

        if (isMounted) {
          setDocsError("Documents could not be loaded. Please refresh and try again.");
        }
      } finally {
        if (isMounted) {
          setIsDocsLoading(false);
        }
      }
    };

    void loadDocs();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPresets = latexTemplateCatalog.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredUserDocs = userDocs.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()),
  );

  const requestDeleteDoc = (id: number, name: string) => {
    setDocToDelete({ id, name });
  };

  const closeDeleteDialog = () => {
    setDocToDelete(null);
  };

  const confirmDeleteDoc = async () => {
    if (!docToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await api.delete(`/latex/${docToDelete.id}`);
      setUserDocs((prev) => prev.filter((d) => d.id !== docToDelete.id));
      setDocToDelete(null);
    } catch (error) {
      console.error("Failed to delete latex document:", error);
      setDocsError("The document could not be deleted. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!docToDelete) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDocToDelete(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [docToDelete]);

  return (
    <>
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
            href="/dashboard/latex/editor"
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
          {isDocsLoading && (
            <div className="col-span-full py-10 text-center text-white/25 text-xs">
              Loading your documents...
            </div>
          )}

          {!isDocsLoading && docsError && (
            <div className="col-span-full py-10 text-center text-red-300/80 text-xs">
              {docsError}
            </div>
          )}

          {!isDocsLoading &&
            !docsError &&
            filteredUserDocs.map((doc) => (
              <div
                key={doc.id}
                className="group relative flex flex-col bg-[#1B1913] border border-white/5 rounded-sm overflow-hidden hover:border-white/15 transition-all duration-300 aspect-[3/4]"
              >
                {/* Mock paper preview */}
                <div className="flex-1 flex flex-col items-center justify-center bg-[#0F0E09] p-4 gap-1.5 ">
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
                    {doc.title}
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5">
                    {formatUpdatedAt(doc.updatedAt)}
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
                    onClick={() => requestDeleteDoc(doc.id, doc.title)}
                    className="p-1.5 bg-white/10 border border-white/10 rounded-sm text-white/50 hover:text-red-400 hover:border-red-400/30 transition-all"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              </div>
            ))}

          {/* Empty state for user docs */}
          {!isDocsLoading &&
            !docsError &&
            filteredUserDocs.length === 0 &&
            search && (
            <div className="col-span-full py-6 text-center text-white/20 text-xs">
              No documents match &quot;{search}&quot;
            </div>
          )}

          {!isDocsLoading &&
            !docsError &&
            userDocs.length === 0 &&
            !search && (
            <div className="col-span-full py-10 text-center text-white/20 text-xs">
              No saved documents yet. Create one and it will show here.
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
                  {template.image ? (
                    <>
                      <div className="absolute inset-0 bg-black/40 z-10" />
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-60"
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#2A241B_0%,#15120D_100%)] px-4 text-center">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Template Preview
                      </div>
                    </div>
                  )}
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

      {docToDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={closeDeleteDialog}
        >
          <div
            className="w-full max-w-md rounded-sm border border-white/10 bg-[#171510] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-5 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-300 mb-4">
                <FiAlertTriangle size={18} />
              </div>
              <h2 className="text-base text-white/90 font-medium">
                Delete document?
              </h2>
              <p className="text-xs text-white/35 leading-relaxed mt-2">
                <span className="text-white/60">&quot;{docToDelete.name}&quot;</span>{" "}
                will be permanently removed. Please confirm before continuing.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 p-4">
              <button
                type="button"
                onClick={closeDeleteDialog}
                className="px-3 py-2 text-xs text-white/55 border border-white/10 rounded-sm hover:text-white/80 hover:border-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteDoc}
                disabled={isDeleting}
                className="px-3 py-2 text-xs font-semibold text-red-100 bg-red-500/15 border border-red-500/25 rounded-sm hover:bg-red-500/20 hover:border-red-500/35 transition-all"
              >
                {isDeleting ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
