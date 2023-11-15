/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_propertiesId_fkey";

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "city" TEXT,
ADD COLUMN     "countryName" TEXT,
ADD COLUMN     "county" TEXT,
ADD COLUMN     "houseNumber" TEXT,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT;

-- DropTable
DROP TABLE "Address";
