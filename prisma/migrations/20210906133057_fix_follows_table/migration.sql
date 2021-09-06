/*
  Warnings:

  - You are about to drop the column `userId` on the `Follows` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_userId_fkey";

-- AlterTable
ALTER TABLE "Follows" DROP COLUMN "userId";
