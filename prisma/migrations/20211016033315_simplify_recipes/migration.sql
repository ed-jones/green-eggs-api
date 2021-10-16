/*
  Warnings:

  - You are about to drop the column `commentability` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `likeability` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "commentability",
DROP COLUMN "likeability",
DROP COLUMN "visibility",
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "servingCount" DROP NOT NULL,
ALTER COLUMN "timeEstimate" DROP NOT NULL,
ALTER COLUMN "subtitle" DROP NOT NULL;
