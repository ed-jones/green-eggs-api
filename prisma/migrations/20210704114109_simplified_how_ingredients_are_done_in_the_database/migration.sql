/*
  Warnings:

  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "recipeId" TEXT NOT NULL,
ADD COLUMN     "supplement" TEXT,
ADD COLUMN     "unit" TEXT;

-- DropTable
DROP TABLE "RecipeIngredient";

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient.name_unique" ON "Ingredient"("name");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
