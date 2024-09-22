/*
  Warnings:

  - You are about to drop the column `level` on the `Rewards` table. All the data in the column will be lost.
  - You are about to drop the column `level_points` on the `Rewards` table. All the data in the column will be lost.
  - You are about to drop the column `total_points` on the `Rewards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rewards" DROP COLUMN "level",
DROP COLUMN "level_points",
DROP COLUMN "total_points",
ADD COLUMN     "response" JSONB;
