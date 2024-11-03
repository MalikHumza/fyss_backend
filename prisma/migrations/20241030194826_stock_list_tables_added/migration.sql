-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'STAFF', 'STUDENT');

-- CreateEnum
CREATE TYPE "ACTION_STATUS" AS ENUM ('SENT', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "QUARTER_MONTHS" AS ENUM ('JAN_MAR', 'APR_JUN', 'JUL_SEP', 'OCT_DEC');

-- CreateEnum
CREATE TYPE "REWARD_TYPES" AS ENUM ('REWARD', 'INCENTIVE', 'SANCTION');

-- CreateEnum
CREATE TYPE "REWARD_KEYS" AS ENUM ('THERAPY_SESSION', 'HOMEWORK_COMPLETION', 'GROUP_ACTIVITY_PARTICIPATION', 'ONTIME_ATTENDACE');

-- CreateEnum
CREATE TYPE "SAVINGS_TYPE" AS ENUM ('DEPOSITOR', 'WITHDRAWL');

-- CreateEnum
CREATE TYPE "ROOM_CHECK_FEEDBACK" AS ENUM ('CLEANLINESS', 'BED_MADE', 'ORGANIZATION', 'GARBAGE_DISPOSED');

-- CreateEnum
CREATE TYPE "REWARD_TIERS" AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- CreateEnum
CREATE TYPE "SHIFT" AS ENUM ('EARLY', 'LATE', 'NIGHT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "title" TEXT,
    "dob" INTEGER,
    "phone_number" TEXT,
    "gender" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'STUDENT',
    "image" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomCheck" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT,
    "student_id" TEXT,
    "staff_name" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "thoughts_and_feelings" TEXT NOT NULL,
    "maintenance_issues" TEXT NOT NULL,
    "feedback" "ROOM_CHECK_FEEDBACK"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Savings" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT,
    "staff_name" TEXT,
    "student_id" TEXT,
    "student_name" TEXT,
    "student_email" TEXT,
    "depositer_name" TEXT,
    "withdrawl_name" TEXT,
    "recieved_by" TEXT,
    "amount" DOUBLE PRECISION,
    "balance" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Savings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionPlan" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT,
    "staff_name" TEXT,
    "student_id" TEXT,
    "student_email" TEXT,
    "key_need" TEXT,
    "action_to_be_completed" TEXT,
    "success_metrics" TEXT,
    "due_date" INTEGER,
    "assigned_to" TEXT,
    "review" TEXT,
    "start_date" INTEGER,
    "status" "ACTION_STATUS",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionPlan_pkey" PRIMARY KEY ("id")
);

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
    "name_of_medication" TEXT,
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
    "type" "REWARD_TYPES" NOT NULL,
    "reward_key" "REWARD_KEYS" NOT NULL,
    "reason" TEXT,
    "points" INTEGER DEFAULT 0,
    "reflection" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardScoring" (
    "id" TEXT NOT NULL,
    "name" "REWARD_KEYS" NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardScoring_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "occupancy" INTEGER NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "staff_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShiftTracker" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "shift" "SHIFT" NOT NULL,
    "verbal_handover" BOOLEAN NOT NULL,
    "property_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShiftTracker_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "ShoppingStockInventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "allocated_to" TEXT NOT NULL,
    "date_ordered" INTEGER NOT NULL,
    "date_recieved" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingStockInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnifeInventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "supervised" BOOLEAN NOT NULL,
    "time_out" INTEGER NOT NULL,
    "time_returned" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnifeInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StationaryInventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "default_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StationaryInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HygineProductsInventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "default_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HygineProductsInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeysInventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "default_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeysInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WelcomePackInventory" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "default_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WelcomePackInventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "StudentRewardsProgress_student_id_key" ON "StudentRewardsProgress"("student_id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomCheck" ADD CONSTRAINT "RoomCheck_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Savings" ADD CONSTRAINT "Savings_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlan" ADD CONSTRAINT "ActionPlan_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportPlan" ADD CONSTRAINT "SupportPlan_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "Health_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentRewardsProgress" ADD CONSTRAINT "StudentRewardsProgress_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftTracker" ADD CONSTRAINT "ShiftTracker_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingDates" ADD CONSTRAINT "TrainingDates_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingStockInventory" ADD CONSTRAINT "ShoppingStockInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnifeInventory" ADD CONSTRAINT "KnifeInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationaryInventory" ADD CONSTRAINT "StationaryInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HygineProductsInventory" ADD CONSTRAINT "HygineProductsInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeysInventory" ADD CONSTRAINT "KeysInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WelcomePackInventory" ADD CONSTRAINT "WelcomePackInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
