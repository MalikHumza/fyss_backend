/*
  Warnings:

  - The `feedback` column on the `RoomCheck` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deposit_amount` on the `Savings` table. All the data in the column will be lost.
  - You are about to drop the column `deposited_by` on the `Savings` table. All the data in the column will be lost.
  - Made the column `staff_name` on table `RoomCheck` required. This step will fail if there are existing NULL values in that column.
  - Made the column `purpose` on table `RoomCheck` required. This step will fail if there are existing NULL values in that column.
  - Made the column `observation` on table `RoomCheck` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thoughts_and_feelings` on table `RoomCheck` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maintenance_issues` on table `RoomCheck` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SAVINGS_TYPE" AS ENUM ('DEPOSITOR', 'WITHDRAWL');

-- CreateEnum
CREATE TYPE "ROOM_CHECK_FEEDBACK" AS ENUM ('CLEANLINESS', 'BED_MADE', 'ORGANIZATION', 'GARBAGE_DISPOSED');

-- AlterTable
ALTER TABLE "RoomCheck" ALTER COLUMN "staff_name" SET NOT NULL,
ALTER COLUMN "purpose" SET NOT NULL,
ALTER COLUMN "observation" SET NOT NULL,
ALTER COLUMN "thoughts_and_feelings" SET NOT NULL,
ALTER COLUMN "maintenance_issues" SET NOT NULL,
DROP COLUMN "feedback",
ADD COLUMN     "feedback" "ROOM_CHECK_FEEDBACK"[];

-- AlterTable
ALTER TABLE "Savings" DROP COLUMN "deposit_amount",
DROP COLUMN "deposited_by",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "depositer_name" TEXT,
ADD COLUMN     "withdrawl_name" TEXT,
ALTER COLUMN "balance" SET DEFAULT 0;
