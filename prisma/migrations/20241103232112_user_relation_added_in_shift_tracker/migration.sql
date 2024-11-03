-- AlterTable
ALTER TABLE "ShiftTracker" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "ShiftTracker" ADD CONSTRAINT "ShiftTracker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
