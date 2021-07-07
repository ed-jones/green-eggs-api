/*
  Warnings:

  - Added the required column `subtitle` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "subtitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RecipeComment" ADD COLUMN     "recipeCommentId" TEXT;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD FOREIGN KEY ("recipeCommentId") REFERENCES "RecipeComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
