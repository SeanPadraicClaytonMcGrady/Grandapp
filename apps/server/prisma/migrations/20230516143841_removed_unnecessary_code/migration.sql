/*
  Warnings:

  - You are about to drop the column `volunteerId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_volunteerId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "volunteerId";
