import type { JobBookmarkItem, JobBookmarkPayload, JobListing } from '@/features/jobs';

export function formatPostedAt(value: string | null) {
  if (!value) {
    return 'Recently added';
  }

  const date = new Date(value);
  const diffInMs = Date.now() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return 'Today';
  }

  if (diffInDays === 1) {
    return '1 day ago';
  }

  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function toBookmarkPayload(job: JobListing): JobBookmarkPayload {
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

export function bookmarkToJob(bookmark: JobBookmarkItem): JobListing {
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
    descriptionHtml: '',
    postedAt: bookmark.postedAt,
  };
}

export function matchesSearch(job: JobListing, query: string) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const haystack = [job.title, job.companyName, job.location, job.descriptionText, ...job.tags, ...job.jobTypes].join(' ').toLowerCase();

  return haystack.includes(normalizedQuery);
}
