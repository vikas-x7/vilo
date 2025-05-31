'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { JobListing, useJobBookmarks, useJobs } from '@/features/jobs';
import { FiBriefcase, FiChevronLeft, FiChevronRight, FiFilter, FiLoader, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { toBookmarkPayload, bookmarkToJob, matchesSearch } from './jobs.utils';
import { JobCard } from './components/JobCard';

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState<'success' | 'error' | null>(null);
  const deferredSearch = useDeferredValue(search);
  const jobsQuery = useJobs(page, remoteOnly);

  const { bookmarks, isLoading: areBookmarksLoading, isSaving, isRemoving, saveBookmark, removeBookmark } = useJobBookmarks();

  const savedKeys = useMemo(() => new Set(bookmarks.map((b) => `${b.source}:${b.externalId}`)), [bookmarks]);

  const savedJobs = useMemo(() => bookmarks.map((b) => bookmarkToJob(b)), [bookmarks]);

  const visibleJobs = useMemo(() => {
    const baseJobs = savedOnly ? savedJobs : (jobsQuery.data?.jobs ?? []);
    return baseJobs.filter((job) => matchesSearch(job, deferredSearch));
  }, [deferredSearch, jobsQuery.data?.jobs, savedJobs, savedOnly]);

  const isLoading = savedOnly ? areBookmarksLoading : jobsQuery.isLoading;
  const isMutating = isSaving || isRemoving;

  const clearStatus = () => {
    setStatusTone(null);
    setStatusMessage('');
  };

  const handleToggleSave = async (job: JobListing) => {
    const bookmarkKey = `${job.source}:${job.externalId}`;
    const alreadySaved = savedKeys.has(bookmarkKey);

    try {
      if (alreadySaved) {
        await removeBookmark({ source: job.source, externalId: job.externalId });
        setStatusTone('success');
        setStatusMessage('Job removed from your saved list.');
        return;
      }

      await saveBookmark(toBookmarkPayload(job));
      setStatusTone('success');
      setStatusMessage('Job saved successfully.');
    } catch (error) {
      console.error('Failed to toggle job save state:', error);
      setStatusTone('error');
      setStatusMessage("We couldn't update the saved state for this job. Please try again.");
    }
  };

  const meta = jobsQuery.data?.meta;

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto flex flex-col min-h-full">
      <div className="flex flex-col gap-5 border-b border-white/5 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl tracking-tight text-white/90">Find jobs, save the best ones, and apply instantly.</h1>
            <p className="text-xs text-white/35 mt-2 leading-relaxed">This feed is powered by Arbeitnow, and saved jobs stay synced with your account.</p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between mt-10 mb-2">
          <div className="relative w-full xl:max-w-md">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
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
                remoteOnly ? 'border-white/25 bg-white/10 text-white/90' : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/70'
              }`}
            >
              Remote only
            </button>
            <button
              type="button"
              onClick={() => setSavedOnly((value) => !value)}
              className={`rounded-sm border px-3 py-2 text-xs transition-all ${
                savedOnly ? 'border-white/25 bg-white/10 text-white/90' : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/70'
              }`}
            >
              Saved jobs
            </button>
            <button
              type="button"
              onClick={() => {
                setSearch('');
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
            className={`rounded-sm border px-4 py-3 text-xs ${statusTone === 'error' ? 'border-red-400/25 bg-red-400/10 text-red-100' : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'}`}
          >
            {statusMessage}
          </div>
        ) : null}
      </div>

      <section className="pt-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/20">{savedOnly ? 'Saved jobs' : 'Latest roles'}</p>
            <p className="text-xs text-white/35 mt-1">{savedOnly ? 'These are the roles you have saved.' : meta?.source ? `Source: ${meta.source}` : 'Loading source...'}</p>
          </div>

          {!savedOnly && meta ? <div className="text-xs text-white/30">Page {meta.currentPage}</div> : null}
        </div>

        {isLoading ? (
          <div className="rounded-sm border border-white/8 bg-white/[0.03] p-10 text-center">
            <FiLoader className="mx-auto mb-3 animate-spin text-white/35" />
            <p className="text-sm text-white/45">Loading jobs...</p>
          </div>
        ) : jobsQuery.isError && !savedOnly ? (
          <div className="rounded-sm border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-100">
            The jobs feed could not be loaded. The backend is ready for a RapidAPI key later, and for now it is trying the direct source.
          </div>
        ) : visibleJobs.length === 0 ? (
          <div className="rounded-sm border border-white/8 bg-white/[0.03] p-10 text-center">
            <FiBriefcase className="mx-auto mb-3 text-white/25" size={20} />
            <p className="text-sm text-white/55">No matching jobs found.</p>
            <p className="text-xs text-white/25 mt-2">Try resetting your search or filters.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleJobs.map((job) => (
              <JobCard key={`${job.source}:${job.externalId}`} job={job} isSaved={savedKeys.has(`${job.source}:${job.externalId}`)} isMutating={isMutating} onToggleSave={handleToggleSave} />
            ))}
          </div>
        )}
      </section>

      {!savedOnly && meta && visibleJobs.length > 0 ? (
        <div className="mt-6 flex items-center justify-between rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3">
          <p className="text-xs text-white/35">Pagination works with both the remote filter and search.</p>

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
