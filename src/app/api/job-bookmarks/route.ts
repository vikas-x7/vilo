import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const jobBookmarkPayloadSchema = z.object({
  source: z.string().trim().min(1),
  externalId: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  companyName: z.string().trim().min(1),
  location: z.string().trim().min(1),
  applyUrl: z.string().trim().url(),
  remote: z.boolean(),
  tags: z.array(z.string()).default([]),
  jobTypes: z.array(z.string()).default([]),
  snippet: z.string().trim().min(1).max(2000),
  postedAt: z.string().datetime().nullable(),
});

const jobBookmarkDeleteSchema = z.object({
  source: z.string().trim().min(1),
  externalId: z.string().trim().min(1),
});

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function serializeBookmark(bookmark: {
  id: number;
  userId: number;
  source: string;
  externalId: string;
  slug: string;
  title: string;
  companyName: string;
  location: string;
  applyUrl: string;
  remote: boolean;
  tags: unknown;
  jobTypes: unknown;
  snippet: string | null;
  postedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...bookmark,
    tags: normalizeStringArray(bookmark.tags),
    jobTypes: normalizeStringArray(bookmark.jobTypes),
    snippet: bookmark.snippet ?? "",
    postedAt: bookmark.postedAt?.toISOString() ?? null,
    createdAt: bookmark.createdAt.toISOString(),
    updatedAt: bookmark.updatedAt.toISOString(),
  };
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmarks = await prisma.jobBookmark.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookmarks.map(serializeBookmark), { status: 200 });
  } catch (error) {
    console.error("Failed to load job bookmarks:", error);

    return NextResponse.json(
      { error: "Saved jobs load nahi ho paaye." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const payload = jobBookmarkPayloadSchema.parse(body);
    const bookmark = await prisma.jobBookmark.upsert({
      where: {
        userId_source_externalId: {
          userId: user.id,
          source: payload.source,
          externalId: payload.externalId,
        },
      },
      update: {
        slug: payload.slug,
        title: payload.title,
        companyName: payload.companyName,
        location: payload.location,
        applyUrl: payload.applyUrl,
        remote: payload.remote,
        tags: payload.tags,
        jobTypes: payload.jobTypes,
        snippet: payload.snippet,
        postedAt: payload.postedAt ? new Date(payload.postedAt) : null,
      },
      create: {
        userId: user.id,
        source: payload.source,
        externalId: payload.externalId,
        slug: payload.slug,
        title: payload.title,
        companyName: payload.companyName,
        location: payload.location,
        applyUrl: payload.applyUrl,
        remote: payload.remote,
        tags: payload.tags,
        jobTypes: payload.jobTypes,
        snippet: payload.snippet,
        postedAt: payload.postedAt ? new Date(payload.postedAt) : null,
      },
    });

    return NextResponse.json(serializeBookmark(bookmark), { status: 200 });
  } catch (error) {
    console.error("Failed to save job bookmark:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid job bookmark payload." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Job save nahi ho paaya." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const payload = jobBookmarkDeleteSchema.parse(body);
    const bookmark = await prisma.jobBookmark.delete({
      where: {
        userId_source_externalId: {
          userId: user.id,
          source: payload.source,
          externalId: payload.externalId,
        },
      },
    });

    return NextResponse.json(serializeBookmark(bookmark), { status: 200 });
  } catch (error) {
    console.error("Failed to remove job bookmark:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid saved job identifier." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Saved job remove nahi ho paaya." },
      { status: 500 },
    );
  }
}
