-- CreateEnum
CREATE TYPE "INCIDENT_CONTACTED" AS ENUM ('POLICE', 'SOCIAL_WORKER', 'MANAGER');

-- CreateTable
CREATE TABLE "AlcohalAndDrugsLogIncident" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "found_by" TEXT NOT NULL,
    "contacted" "INCIDENT_CONTACTED" NOT NULL,
    "police_involved" TEXT,
    "action_to_be_taken" TEXT NOT NULL,
    "action_taken_by" TEXT NOT NULL,
    "date_of_action" INTEGER NOT NULL,
    "disposed" TEXT,
    "witnesses" TEXT[],
    "risk_assessment" TEXT NOT NULL,
    "notes" TEXT,
    "completion_target_date" INTEGER NOT NULL,
    "completed_by_date" INTEGER NOT NULL,
    "reported_by" TEXT NOT NULL,
    "property_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlcohalAndDrugsLogIncident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissingFromCareIncident" (
    "id" TEXT NOT NULL,
    "yp" TEXT NOT NULL,
    "unit_left_time" INTEGER NOT NULL,
    "last_description" INTEGER NOT NULL,
    "contacted_authority" BOOLEAN NOT NULL,
    "property_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MissingFromCareIncident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlcohalAndDrugsLogIncident" ADD CONSTRAINT "AlcohalAndDrugsLogIncident_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissingFromCareIncident" ADD CONSTRAINT "MissingFromCareIncident_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
