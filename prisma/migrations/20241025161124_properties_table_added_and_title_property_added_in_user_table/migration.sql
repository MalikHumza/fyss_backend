-- AlterTable
ALTER TABLE "User" ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "occupancy" INTEGER NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "staff_id" TEXT NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
