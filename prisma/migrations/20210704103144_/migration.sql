/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Diet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Diet.name_unique" ON "Diet"("name");
