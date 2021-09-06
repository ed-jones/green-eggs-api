-- AlterTable
ALTER TABLE "Allergies" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Diet" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Allergies" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
