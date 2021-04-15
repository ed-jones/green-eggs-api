/*
  Warnings:

  - Added the required column `previewURI` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "previewURI" TEXT NOT NULL;
