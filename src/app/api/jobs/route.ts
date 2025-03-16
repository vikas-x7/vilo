import { NextRequest, NextResponse } from "next/server";

interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
}

interface ArbeitnowResponse {
  data?: ArbeitnowJob[];
  links?: {
    next?: string | null;
    prev?: string | null;
  };
  meta?: {
    current_page?: number;
  };
}

function parseBoolean(value: string | null) {
  return value === "true" || value === "1";
}

function stripHtml(value: string) {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getSnippet(value: string) {
  const text = stripHtml(value);

  if (text.length <= 240) {
    return text;
  }

  return `${text.slice(0, 237).trim()}...`;
}

export async function GET(req: NextRequest) {
  const pageParam = req.nextUrl.searchParams.get("page");
  const remoteOnly = parseBoolean(req.nextUrl.searchParams.get("remote"));
  const page = Number.isFinite(Number(pageParam)) && Number(pageParam) > 0 ? Number(pageParam) : 1;

  const endpoint = new URL(
    process.env.JOBS_API_BASE_URL ?? "https://www.arbeitnow.com/api/job-board-api",
  );

  endpoint.searchParams.set("page", String(page));

  if (remoteOnly) {
    endpoint.searchParams.set("remote", "true");
  }

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (process.env.RAPIDAPI_KEY && process.env.RAPIDAPI_HOST) {
    headers["X-RapidAPI-Key"] = process.env.RAPIDAPI_KEY;
    headers["X-RapidAPI-Host"] = process.env.RAPIDAPI_HOST;
  }

  try {
    const response = await fetch(endpoint, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Jobs could not be loaded right now. Please try again shortly." },
        { status: response.status },
      );
    }

    const payload = (await response.json()) as ArbeitnowResponse;
    const jobs = (payload.data ?? []).map((job) => ({
      source: "arbeitnow",
      externalId: job.slug || job.url,
      slug: job.slug,
      title: job.title,
      companyName: job.company_name,
      location: job.location || "Location not specified",
      remote: job.remote,
      applyUrl: job.url,
      tags: Array.isArray(job.tags) ? job.tags : [],
      jobTypes: Array.isArray(job.job_types) ? job.job_types : [],
      descriptionText: getSnippet(job.description ?? ""),
      descriptionHtml: job.description ?? "",
      postedAt: job.created_at
        ? new Date(job.created_at * 1000).toISOString()
        : null,
    }));

    const hasNextPage = Boolean(payload.links?.next);
    const hasPreviousPage = page > 1;

    return NextResponse.json(
      {
        jobs,
        meta: {
          currentPage: payload.meta?.current_page ?? page,
          hasNextPage,
          hasPreviousPage,
          nextPage: hasNextPage ? page + 1 : null,
          previousPage: hasPreviousPage ? page - 1 : null,
          source: "arbeitnow",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch jobs feed:", error);

    return NextResponse.json(
      { error: "Could not connect to the jobs service. Please try again." },
      { status: 500 },
    );
  }
}
