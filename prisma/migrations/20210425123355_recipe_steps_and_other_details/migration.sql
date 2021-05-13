/*
  Warnings:

  - Added the required column `userId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('PRIVATE', 'FRIENDS', 'PUBLIC');

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_submittedById_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "visibility" "Privacy" NOT NULL DEFAULT E'PRIVATE',
ADD COLUMN     "commentability" "Privacy" NOT NULL DEFAULT E'PRIVATE',
ADD COLUMN     "likeability" "Privacy" NOT NULL DEFAULT E'PRIVATE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RecipeCategories" (
    "id" TEXT NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "lunch" BOOLEAN NOT NULL,
    "dinner" BOOLEAN NOT NULL,
    "soup" BOOLEAN NOT NULL,
    "salad" BOOLEAN NOT NULL,
    "dessert" BOOLEAN NOT NULL,
    "curry" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeDiets" (
    "id" TEXT NOT NULL,
    "isSpicy" BOOLEAN NOT NULL DEFAULT false,
    "isHealthy" BOOLEAN NOT NULL DEFAULT false,
    "isVegetarian" BOOLEAN NOT NULL DEFAULT false,
    "isVegan" BOOLEAN NOT NULL DEFAULT false,
    "isPescetarian" BOOLEAN NOT NULL DEFAULT false,
    "isKeto" BOOLEAN NOT NULL DEFAULT false,
    "isGlutenFree" BOOLEAN NOT NULL DEFAULT false,
    "isPaleo" BOOLEAN NOT NULL DEFAULT false,
    "isSugarFree" BOOLEAN NOT NULL DEFAULT false,
    "isDairyFree" BOOLEAN NOT NULL DEFAULT false,
    "isLowFODMAP" BOOLEAN NOT NULL DEFAULT false,
    "isHalal" BOOLEAN NOT NULL DEFAULT false,
    "isKosher" BOOLEAN NOT NULL DEFAULT false,
    "isLactoVegetarian" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeAllergens" (
    "id" TEXT NOT NULL,
    "containsMilk" BOOLEAN NOT NULL,
    "containsEggs" BOOLEAN NOT NULL,
    "containsTreeNuts" BOOLEAN NOT NULL,
    "containsPeanuts" BOOLEAN NOT NULL,
    "containsShellfish" BOOLEAN NOT NULL,
    "containsWheat" BOOLEAN NOT NULL,
    "containsSoy" BOOLEAN NOT NULL,
    "containsFish" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "imageURI" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "contents" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_likedRecipes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_likedComments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedRecipes_AB_unique" ON "_likedRecipes"("A", "B");

-- CreateIndex
CREATE INDEX "_likedRecipes_B_index" ON "_likedRecipes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likedComments_AB_unique" ON "_likedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_likedComments_B_index" ON "_likedComments"("B");

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedRecipes" ADD FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedRecipes" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedComments" ADD FOREIGN KEY ("A") REFERENCES "RecipeComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedComments" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
