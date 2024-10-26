/*
  Warnings:

  - Added the required column `updatedAt` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SHIFT" AS ENUM ('EARLY', 'LATE', 'NIGHT');

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ShiftTracker" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "shift" "SHIFT" NOT NULL,
    "verbal_handover" BOOLEAN NOT NULL,
    "property_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShiftTracker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShiftTracker" ADD CONSTRAINT "ShiftTracker_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
