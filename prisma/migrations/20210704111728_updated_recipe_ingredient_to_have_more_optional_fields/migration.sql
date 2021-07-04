/*
  Warnings:

  - You are about to drop the column `descriptor` on the `RecipeIngredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "descriptor",
ADD COLUMN     "supplement" TEXT,
ALTER COLUMN "unit" DROP NOT NULL;
