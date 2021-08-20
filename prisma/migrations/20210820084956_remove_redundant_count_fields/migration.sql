/*
  Warnings:

  - You are about to drop the column `commentCount` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `likeCount` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "commentCount",
DROP COLUMN "likeCount";
