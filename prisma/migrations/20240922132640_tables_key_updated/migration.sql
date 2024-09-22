-- AlterTable
ALTER TABLE "Rewards" ADD COLUMN     "total_points" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "RoomCheck" ADD COLUMN     "feedback" TEXT;
