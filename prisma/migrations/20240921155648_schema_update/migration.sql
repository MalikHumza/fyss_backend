-- CreateEnum
CREATE TYPE "ACTION_STATUS" AS ENUM ('SENT', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "RoomCheck" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT,
    "student_id" TEXT,
    "staff_name" TEXT,
    "purpose" TEXT,
    "observation" TEXT,
    "thoughts_and_feelings" TEXT,
    "maintenance_issues" TEXT,
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
    "deposited_by" TEXT,
    "recieved_by" TEXT,
    "deposit_amount" DOUBLE PRECISION,
    "balance" DOUBLE PRECISION,
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

-- AddForeignKey
ALTER TABLE "RoomCheck" ADD CONSTRAINT "RoomCheck_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Savings" ADD CONSTRAINT "Savings_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlan" ADD CONSTRAINT "ActionPlan_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
