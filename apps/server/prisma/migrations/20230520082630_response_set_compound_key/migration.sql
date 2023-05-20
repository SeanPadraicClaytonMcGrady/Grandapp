/*
  Warnings:

  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Response` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId,responderId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Response_taskId_responderId_key" ON "Response"("taskId", "responderId");
