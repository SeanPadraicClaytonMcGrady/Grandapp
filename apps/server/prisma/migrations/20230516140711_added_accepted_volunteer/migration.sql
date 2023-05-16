-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "acceptedId" INTEGER,
ADD COLUMN     "volunteerId" INTEGER,
ALTER COLUMN "scheduledDate" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_acceptedId_fkey" FOREIGN KEY ("acceptedId") REFERENCES "Volunteer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
