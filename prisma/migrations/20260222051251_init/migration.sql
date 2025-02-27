/*
  Warnings:

  - You are about to drop the column `description` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the `RoadmapStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoadmap` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoadmapStep" DROP CONSTRAINT "RoadmapStep_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoadmap" DROP CONSTRAINT "UserRoadmap_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoadmap" DROP CONSTRAINT "UserRoadmap_userId_fkey";

-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "description",
ADD COLUMN     "data" JSONB NOT NULL;

-- DropTable
DROP TABLE "RoadmapStep";

-- DropTable
DROP TABLE "UserRoadmap";

-- CreateTable
CREATE TABLE "RoadmapBookmark" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roadmapId" INTEGER NOT NULL,

    CONSTRAINT "RoadmapBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoadmapBookmark_userId_roadmapId_key" ON "RoadmapBookmark"("userId", "roadmapId");

-- AddForeignKey
ALTER TABLE "RoadmapBookmark" ADD CONSTRAINT "RoadmapBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapBookmark" ADD CONSTRAINT "RoadmapBookmark_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;
