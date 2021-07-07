/*
  Warnings:

  - You are about to drop the column `name` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `supplement` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `genericIngredientId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ingredient.name_unique";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "name",
DROP COLUMN "supplement",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "genericIngredientId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GenericIngredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GenericIngredient.name_unique" ON "GenericIngredient"("name");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD FOREIGN KEY ("genericIngredientId") REFERENCES "GenericIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
