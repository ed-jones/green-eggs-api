-- CreateTable
CREATE TABLE "_savedRecipes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_savedRecipes_AB_unique" ON "_savedRecipes"("A", "B");

-- CreateIndex
CREATE INDEX "_savedRecipes_B_index" ON "_savedRecipes"("B");

-- AddForeignKey
ALTER TABLE "_savedRecipes" ADD FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savedRecipes" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
