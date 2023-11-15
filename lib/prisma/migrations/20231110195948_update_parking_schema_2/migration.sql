/*
  Warnings:

  - You are about to drop the column `parkingId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Parking` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Parking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertiesId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertiesId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Parking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_parkingId_fkey";

-- DropIndex
DROP INDEX "Address_parkingId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "parkingId",
ADD COLUMN     "propertiesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Parking" DROP COLUMN "lat",
DROP COLUMN "lng",
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Geometry" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "coordinates" INTEGER[],
    "parkingId" INTEGER NOT NULL,

    CONSTRAINT "Geometry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" SERIAL NOT NULL,
    "parkingId" INTEGER NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Geometry_parkingId_key" ON "Geometry"("parkingId");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_parkingId_key" ON "Properties"("parkingId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertiesId_key" ON "Address"("propertiesId");

-- AddForeignKey
ALTER TABLE "Geometry" ADD CONSTRAINT "Geometry_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
