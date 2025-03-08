/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Roadmap` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_slug_key" ON "Roadmap"("slug");
