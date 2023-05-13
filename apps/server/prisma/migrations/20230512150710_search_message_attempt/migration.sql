/*
  Warnings:

  - Made the column `senderId` on table `Messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverId` on table `Messages` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Senior" DROP CONSTRAINT "Senior_id_fkey";

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "senderId" SET NOT NULL,
ALTER COLUMN "receiverId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Senior" ADD CONSTRAINT "Senior_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
