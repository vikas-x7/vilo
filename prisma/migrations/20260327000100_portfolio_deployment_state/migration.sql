ALTER TABLE "Portfolio"
RENAME COLUMN "isPublished" TO "isPublic";

ALTER TABLE "Portfolio"
ADD COLUMN "isDeployed" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Portfolio"
ALTER COLUMN "isPublic" SET DEFAULT true;
