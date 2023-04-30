/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Debate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicId` to the `Debate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debate" ADD COLUMN     "publicId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Debate_publicId_key" ON "Debate"("publicId");
