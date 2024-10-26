-- AlterTable
ALTER TABLE "ShiftTracker" ALTER COLUMN "property_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TrainingDates" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "notes" TEXT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "property_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingDates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingDates" ADD CONSTRAINT "TrainingDates_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
