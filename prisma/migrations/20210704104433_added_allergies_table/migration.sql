-- CreateTable
CREATE TABLE "Allergies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AllergiesToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Allergies.name_unique" ON "Allergies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AllergiesToRecipe_AB_unique" ON "_AllergiesToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergiesToRecipe_B_index" ON "_AllergiesToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_AllergiesToRecipe" ADD FOREIGN KEY ("A") REFERENCES "Allergies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergiesToRecipe" ADD FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
