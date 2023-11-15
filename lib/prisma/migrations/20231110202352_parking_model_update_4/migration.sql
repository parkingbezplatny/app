/*
  Warnings:

  - You are about to drop the column `city` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `countryName` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `houseNumber` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Geometry" ALTER COLUMN "coordinates" SET DATA TYPE DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "city",
DROP COLUMN "countryName",
DROP COLUMN "county",
DROP COLUMN "houseNumber",
DROP COLUMN "label",
DROP COLUMN "postalCode",
DROP COLUMN "state",
DROP COLUMN "street";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "propertiesId" INTEGER NOT NULL,
    "label" TEXT,
    "countryName" TEXT,
    "state" TEXT,
    "county" TEXT,
    "city" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "houseNumber" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertiesId_key" ON "Address"("propertiesId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
