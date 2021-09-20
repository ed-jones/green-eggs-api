/*
  Warnings:

  - The primary key for the `Follows` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_pkey",
ADD PRIMARY KEY ("followingId", "followerId");

-- AlterTable
ALTER TABLE "RecipeComment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
