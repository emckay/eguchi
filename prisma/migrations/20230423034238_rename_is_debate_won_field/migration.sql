/*
  Warnings:

  - You are about to drop the column `isDebateWon` on the `Debate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Debate" DROP COLUMN "isDebateWon",
ADD COLUMN     "hasUserWon" BOOLEAN NOT NULL DEFAULT false;
