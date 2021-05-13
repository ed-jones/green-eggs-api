/*
  Warnings:

  - You are about to drop the column `quantity` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `RecipeAllergens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeDiets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "quantity",
DROP COLUMN "recipeId";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "userId",
ALTER COLUMN "visibility" SET DEFAULT E'FRIENDS';

-- DropTable
DROP TABLE "RecipeAllergens";

-- DropTable
DROP TABLE "RecipeCategories";

-- DropTable
DROP TABLE "RecipeDiets";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descriptor" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "ingredientId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DietToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRecipe_AB_unique" ON "_CategoryToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRecipe_B_index" ON "_CategoryToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DietToRecipe_AB_unique" ON "_DietToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_DietToRecipe_B_index" ON "_DietToRecipe"("B");

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToRecipe" ADD FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToRecipe" ADD FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
