/*
  Warnings:

  - You are about to drop the column `responderId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_responderId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "responderId";

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "responderId" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_responderId_fkey" FOREIGN KEY ("responderId") REFERENCES "Volunteer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
