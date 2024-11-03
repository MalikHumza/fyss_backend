-- CreateTable
CREATE TABLE "SatffHasPettyCash" (
    "id" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "deposit" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "staff_id" TEXT NOT NULL,
    "property_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SatffHasPettyCash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyHasPettyCashBalance" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "property_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "satffHasPettyCashId" TEXT,

    CONSTRAINT "PropertyHasPettyCashBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffHasTravelExpense" (
    "id" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "expense" INTEGER NOT NULL DEFAULT 0,
    "property_id" TEXT,
    "staff_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffHasTravelExpense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SatffHasPettyCash" ADD CONSTRAINT "SatffHasPettyCash_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatffHasPettyCash" ADD CONSTRAINT "SatffHasPettyCash_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyHasPettyCashBalance" ADD CONSTRAINT "PropertyHasPettyCashBalance_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHasTravelExpense" ADD CONSTRAINT "StaffHasTravelExpense_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHasTravelExpense" ADD CONSTRAINT "StaffHasTravelExpense_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
