/*
  Warnings:

  - Changed the type of `from` on the `TrainingDates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `to` on the `TrainingDates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TrainingDates" ADD COLUMN     "staff_id" TEXT,
DROP COLUMN "from",
ADD COLUMN     "from" INTEGER NOT NULL,
DROP COLUMN "to",
ADD COLUMN     "to" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TrainingDates" ADD CONSTRAINT "TrainingDates_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
