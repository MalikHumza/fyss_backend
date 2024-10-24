-- CreateEnum
CREATE TYPE "REWARD_TIERS" AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- CreateTable
CREATE TABLE "StudentRewardsProgress" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "current_points" INTEGER NOT NULL DEFAULT 0,
    "total_points" INTEGER DEFAULT 0,
    "current_level" INTEGER NOT NULL DEFAULT 0,
    "points_to_next" INTEGER NOT NULL DEFAULT 500,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentRewardsProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentRewardsProgress_student_id_key" ON "StudentRewardsProgress"("student_id");

-- AddForeignKey
ALTER TABLE "StudentRewardsProgress" ADD CONSTRAINT "StudentRewardsProgress_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
