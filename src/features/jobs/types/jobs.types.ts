export interface JobListing {
  source: string;
  externalId: string;
  slug: string;
  title: string;
  companyName: string;
  location: string;
  remote: boolean;
  applyUrl: string;
  tags: string[];
  jobTypes: string[];
  descriptionText: string;
  descriptionHtml: string;
  postedAt: string | null;
}

export interface JobsResponse {
  jobs: JobListing[];
  meta: {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
    source: string;
  };
}

export interface JobsQueryParams {
  page?: number;
  remote?: boolean;
}

export interface JobBookmarkPayload {
  source: string;
  externalId: string;
  slug: string;
  title: string;
  companyName: string;
  location: string;
  applyUrl: string;
  remote: boolean;
  tags: string[];
  jobTypes: string[];
  snippet: string;
  postedAt: string | null;
}

export interface JobBookmarkItem extends JobBookmarkPayload {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
