-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('RECIPE_LIKED', 'RECIPE_COMMENTED', 'COMMENT_LIKED', 'COMMENT_REPLIED');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "read" BOOLEAN NOT NULL,
    "forId" TEXT NOT NULL,
    "concernsId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("forId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("concernsId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
