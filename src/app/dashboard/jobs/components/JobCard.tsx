'use client';

import { FiBookmark, FiExternalLink, FiMapPin, FiWifi } from 'react-icons/fi';
import type { JobListing } from '@/features/jobs';
import { formatPostedAt } from '../jobs.utils';

interface JobCardProps {
  job: JobListing;
  isSaved: boolean;
  isMutating: boolean;
  onToggleSave: (job: JobListing) => void;
}

export function JobCard({ job, isSaved, isMutating, onToggleSave }: JobCardProps) {
  return (
    <article className="group rounded-sm border border-white/8 bg-white/[0.03] p-5 transition-all hover:border-white/15 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">{job.companyName}</p>
          <h2 className="text-base text-white/90 mt-2 leading-snug">{job.title}</h2>
        </div>

        <button
          type="button"
          disabled={isMutating}
          onClick={() => onToggleSave(job)}
          className={`inline-flex shrink-0 items-center gap-2 rounded-sm border px-3 py-2 text-xs transition-all ${
            isSaved ? 'border-amber-300/25 bg-amber-300/10 text-amber-100' : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/75'
          }`}
        >
          <FiBookmark size={12} />
          {isSaved ? 'Saved' : 'Save job'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/45">
        <span className="inline-flex items-center gap-1 rounded-sm border border-white/8 bg-black/20 px-2 py-1">
          <FiMapPin size={11} />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1 rounded-sm border border-white/8 bg-black/20 px-2 py-1">
          <FiWifi size={11} />
          {job.remote ? 'Remote' : 'On-site / Hybrid'}
        </span>
        <span className="inline-flex items-center gap-1 rounded-sm border border-white/8 bg-black/20 px-2 py-1">{formatPostedAt(job.postedAt)}</span>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/55 min-h-24">{job.descriptionText || 'No description preview available.'}</p>

      {(job.tags.length > 0 || job.jobTypes.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[...job.tags, ...job.jobTypes].slice(0, 6).map((tag) => (
            <span key={`${job.externalId}-${tag}`} className="rounded-sm border border-white/8 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
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
}
