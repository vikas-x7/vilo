"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  JobBookmarkItem,
  JobBookmarkPayload,
  JobListing,
  useJobBookmarks,
  useJobs,
} from "@/features/jobs";
import {
  FiBookmark,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiFilter,
  FiLoader,
  FiMapPin,
  FiRefreshCw,
  FiSearch,
  FiWifi,
} from "react-icons/fi";

function formatPostedAt(value: string | null) {
  if (!value) {
    return "Recently added";
  }

  const date = new Date(value);
  const diffInMs = Date.now() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return "Today";
  }

  if (diffInDays === 1) {
    return "1 day ago";
  }

  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function toBookmarkPayload(job: JobListing): JobBookmarkPayload {
  return {
    source: job.source,
    externalId: job.externalId,
    slug: job.slug,
    title: job.title,
    companyName: job.companyName,
    location: job.location,
    applyUrl: job.applyUrl,
    remote: job.remote,
    tags: job.tags,
    jobTypes: job.jobTypes,
    snippet: job.descriptionText,
    postedAt: job.postedAt,
  };
}

function bookmarkToJob(bookmark: JobBookmarkItem): JobListing {
  return {
    source: bookmark.source,
    externalId: bookmark.externalId,
    slug: bookmark.slug,
    title: bookmark.title,
    companyName: bookmark.companyName,
    location: bookmark.location,
    remote: bookmark.remote,
    applyUrl: bookmark.applyUrl,
    tags: bookmark.tags,
    jobTypes: bookmark.jobTypes,
    descriptionText: bookmark.snippet,
    descriptionHtml: "",
    postedAt: bookmark.postedAt,
  };
}

function matchesSearch(job: JobListing, query: string) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const haystack = [
    job.title,
    job.companyName,
    job.location,
    job.descriptionText,
    ...job.tags,
    ...job.jobTypes,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error" | null>(
    null,
  );
  const deferredSearch = useDeferredValue(search);
  const jobsQuery = useJobs(page, remoteOnly);
  const {
    bookmarks,
    isLoading: areBookmarksLoading,
    isSaving,
    isRemoving,
    saveBookmark,
    removeBookmark,
  } = useJobBookmarks();

  const savedKeys = useMemo(
    () =>
      new Set(
        bookmarks.map(
          (bookmark) => `${bookmark.source}:${bookmark.externalId}`,
        ),
      ),
    [bookmarks],
  );

  const savedJobs = useMemo(
    () => bookmarks.map((bookmark) => bookmarkToJob(bookmark)),
    [bookmarks],
  );

  const visibleJobs = useMemo(() => {
    const baseJobs = savedOnly ? savedJobs : (jobsQuery.data?.jobs ?? []);
    return baseJobs.filter((job) => matchesSearch(job, deferredSearch));
  }, [deferredSearch, jobsQuery.data?.jobs, savedJobs, savedOnly]);

  const isLoading = savedOnly ? areBookmarksLoading : jobsQuery.isLoading;
  const isMutating = isSaving || isRemoving;

  const clearStatus = () => {
    setStatusTone(null);
    setStatusMessage("");
  };

  const handleToggleSave = async (job: JobListing) => {
    const bookmarkKey = `${job.source}:${job.externalId}`;
    const alreadySaved = savedKeys.has(bookmarkKey);

    try {
      if (alreadySaved) {
        await removeBookmark({
          source: job.source,
          externalId: job.externalId,
        });
        setStatusTone("success");
        setStatusMessage("Job removed from your saved list.");
        return;
      }

      await saveBookmark(toBookmarkPayload(job));
      setStatusTone("success");
      setStatusMessage("Job saved successfully.");
    } catch (error) {
      console.error("Failed to toggle job save state:", error);
      setStatusTone("error");
      setStatusMessage(
        "We couldn't update the saved state for this job. Please try again.",
      );
    }
  };

  const meta = jobsQuery.data?.meta;

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto flex flex-col min-h-full">
      <div className="flex flex-col gap-5 border-b border-white/5 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl tracking-tight text-white/90">
              Find jobs, save the best ones, and apply instantly.
            </h1>
            <p className="text-xs text-white/35 mt-2 leading-relaxed">
              This feed is powered by Arbeitnow, and saved jobs stay synced with
              your account.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between mt-10 mb-2">
          <div className="relative w-full xl:max-w-md">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, company, location, skill..."
              className="w-full rounded-sm border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-4 text-sm text-white/80 placeholder:text-white/20 outline-none transition-all focus:border-white/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-sm border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/35">
              <FiFilter size={12} />
              Filters
            </span>
            <button
              type="button"
              onClick={() => {
                setRemoteOnly((value) => !value);
                setPage(1);
              }}
              className={`rounded-sm border px-3 py-2 text-xs transition-all ${
                remoteOnly
                  ? "border-white/25 bg-white/10 text-white/90"
                  : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/70"
              }`}
            >
              Remote only
            </button>
            <button
              type="button"
              onClick={() => setSavedOnly((value) => !value)}
              className={`rounded-sm border px-3 py-2 text-xs transition-all ${
                savedOnly
                  ? "border-white/25 bg-white/10 text-white/90"
                  : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/70"
              }`}
            >
              Saved jobs
            </button>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setRemoteOnly(false);
                setSavedOnly(false);
                setPage(1);
                clearStatus();
              }}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/45 transition-all hover:border-white/20 hover:text-white/75"
            >
              <FiRefreshCw size={12} />
              Reset
            </button>
          </div>
        </div>

        {statusMessage ? (
          <div
            className={`rounded-sm border px-4 py-3 text-xs ${
              statusTone === "error"
                ? "border-red-400/25 bg-red-400/10 text-red-100"
                : "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
            }`}
          >
            {statusMessage}
          </div>
        ) : null}
      </div>

      <section className="pt-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/20">
              {savedOnly ? "Saved jobs" : "Latest roles"}
            </p>
            <p className="text-xs text-white/35 mt-1">
              {savedOnly
                ? "These are the roles you have saved."
                : meta?.source
                  ? `Source: ${meta.source}`
                  : "Loading source..."}
            </p>
          </div>

          {!savedOnly && meta ? (
            <div className="text-xs text-white/30">Page {meta.currentPage}</div>
          ) : null}
        </div>

        {isLoading ? (
          <div className="rounded-sm border border-white/8 bg-white/[0.03] p-10 text-center">
            <FiLoader className="mx-auto mb-3 animate-spin text-white/35" />
            <p className="text-sm text-white/45">Loading jobs...</p>
          </div>
        ) : jobsQuery.isError && !savedOnly ? (
          <div className="rounded-sm border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-100">
            The jobs feed could not be loaded. The backend is ready for a
            RapidAPI key later, and for now it is trying the direct source.
          </div>
        ) : visibleJobs.length === 0 ? (
          <div className="rounded-sm border border-white/8 bg-white/[0.03] p-10 text-center">
            <FiBriefcase className="mx-auto mb-3 text-white/25" size={20} />
            <p className="text-sm text-white/55">No matching jobs found.</p>
            <p className="text-xs text-white/25 mt-2">
              Try resetting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleJobs.map((job) => {
              const isSaved = savedKeys.has(`${job.source}:${job.externalId}`);

              return (
                <article
                  key={`${job.source}:${job.externalId}`}
                  className="group rounded-sm border border-white/8 bg-white/[0.03] p-5 transition-all hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">
                        {job.companyName}
                      </p>
                      <h2 className="text-base text-white/90 mt-2 leading-snug">
                        {job.title}
                      </h2>
                    </div>

                    <button
                      type="button"
                      disabled={isMutating}
                      onClick={() => void handleToggleSave(job)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-sm border px-3 py-2 text-xs transition-all ${
                        isSaved
                          ? "border-amber-300/25 bg-amber-300/10 text-amber-100"
                          : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/75"
                      }`}
                    >
                      <FiBookmark size={12} />
                      {isSaved ? "Saved" : "Save job"}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/45">
                    <span className="inline-flex items-center gap-1 rounded-sm border border-white/8 bg-black/20 px-2 py-1">
                      <FiMapPin size={11} />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-sm border border-white/8 bg-black/20 px-2 py-1">
                      <FiWifi size={11} />
                      {job.remote ? "Remote" : "On-site / Hybrid"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-sm border border-white/8 bg-black/20 px-2 py-1">
                      {formatPostedAt(job.postedAt)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/55 min-h-24">
                    {job.descriptionText || "No description preview available."}
                  </p>

                  {(job.tags.length > 0 || job.jobTypes.length > 0) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[...job.tags, ...job.jobTypes].slice(0, 6).map((tag) => (
                        <span
                          key={`${job.externalId}-${tag}`}
                          className="rounded-sm border border-white/8 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/85 transition-all hover:border-white/25 hover:bg-white/15"
                    >
                      Apply link
                      <FiExternalLink size={12} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {!savedOnly && meta && visibleJobs.length > 0 ? (
        <div className="mt-6 flex items-center justify-between rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3">
          <p className="text-xs text-white/35">
            Pagination works with both the remote filter and search.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!meta.hasPreviousPage}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-xs text-white/55 transition-all hover:border-white/20 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronLeft size={12} />
              Previous
            </button>
            <button
              type="button"
              disabled={!meta.hasNextPage}
              onClick={() => setPage((current) => current + 1)}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-xs text-white/55 transition-all hover:border-white/20 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <FiChevronRight size={12} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
