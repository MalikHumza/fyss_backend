-- CreateEnum
CREATE TYPE "QUARTER_MONTHS" AS ENUM ('JAN_MAR', 'APR_JUN', 'JUL_SEP', 'OCT_DEC');

-- CreateEnum
CREATE TYPE "REWARD_TYPES" AS ENUM ('REWARD', 'INCENTIVE', 'SANCTION');

-- CreateTable
CREATE TABLE "SupportPlan" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT,
    "student_id" TEXT,
    "student_email" TEXT,
    "strengths" TEXT,
    "area_of_development" TEXT,
    "current_strategy_and_support" TEXT,
    "month" "QUARTER_MONTHS",
    "year" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Health" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT,
    "staff_name" TEXT,
    "student_id" TEXT,
    "student_email" TEXT,
    "health_issue" TEXT,
    "appointment" BOOLEAN,
    "feedback" TEXT,
    "medication" BOOLEAN,
    "name_of_medication" BOOLEAN,
    "from_duration" INTEGER,
    "to_duration" INTEGER,
    "follow_up_date" INTEGER,
    "evidence" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rewards" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT,
    "staff_name" TEXT,
    "student_id" TEXT,
    "student_email" TEXT,
    "type" "REWARD_TYPES",
    "reason" TEXT,
    "points" INTEGER DEFAULT 0,
    "reflection" TEXT,
    "notes" TEXT,
    "level" INTEGER DEFAULT 0,
    "level_points" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SupportPlan" ADD CONSTRAINT "SupportPlan_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "Health_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
