CREATE TABLE "JobBookmark" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "applyUrl" TEXT NOT NULL,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "tags" JSONB NOT NULL,
    "jobTypes" JSONB NOT NULL,
    "snippet" TEXT,
    "postedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobBookmark_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "JobBookmark_userId_source_externalId_key" ON "JobBookmark"("userId", "source", "externalId");

ALTER TABLE "JobBookmark" ADD CONSTRAINT "JobBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
