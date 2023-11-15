/*
  Warnings:

  - You are about to drop the column `place` on the `Parking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Parking" DROP COLUMN "place";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "label" TEXT,
    "countryName" TEXT,
    "state" TEXT,
    "county" TEXT,
    "city" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "houseNumber" TEXT,
    "parkingId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_parkingId_key" ON "Address"("parkingId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
