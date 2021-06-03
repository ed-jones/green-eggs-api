-- CreateTable
CREATE TABLE "_followingFollower" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_followingFollower_AB_unique" ON "_followingFollower"("A", "B");

-- CreateIndex
CREATE INDEX "_followingFollower_B_index" ON "_followingFollower"("B");

-- AddForeignKey
ALTER TABLE "_followingFollower" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followingFollower" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
