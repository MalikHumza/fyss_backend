/*
  Warnings:

  - You are about to drop the column `staff_id` on the `Properties` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Properties" DROP CONSTRAINT "Properties_staff_id_fkey";

-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "staff_id";

-- CreateTable
CREATE TABLE "StaffHasProperty" (
    "id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffHasProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffHasProperty" ADD CONSTRAINT "StaffHasProperty_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHasProperty" ADD CONSTRAINT "StaffHasProperty_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
