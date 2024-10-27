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

-- AddForeignKey
ALTER TABLE "ShoppingStockInventory" ADD CONSTRAINT "ShoppingStockInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnifeInventory" ADD CONSTRAINT "KnifeInventory_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
