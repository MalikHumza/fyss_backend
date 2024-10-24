/*
  Warnings:

  - You are about to drop the column `response` on the `Rewards` table. All the data in the column will be lost.
  - Added the required column `reward_key` to the `Rewards` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `Rewards` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "REWARD_KEYS" AS ENUM ('THERAPY_SESSION', 'HOMEWORK_COMPLETION', 'GROUP_ACTIVITY_PARTICIPATION', 'ONTIME_ATTENDACE');

-- AlterTable
ALTER TABLE "Rewards" DROP COLUMN "response",
ADD COLUMN     "reward_key" "REWARD_KEYS" NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

-- CreateTable
CREATE TABLE "RewardScoring" (
    "id" TEXT NOT NULL,
    "name" "REWARD_KEYS" NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardScoring_pkey" PRIMARY KEY ("id")
);
