/*
  Warnings:

  - Made the column `label` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryName` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `county` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postalCode` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_propertiesId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteParkingAndUser" DROP CONSTRAINT "FavoriteParkingAndUser_parkingId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteParkingAndUser" DROP CONSTRAINT "FavoriteParkingAndUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Geometry" DROP CONSTRAINT "Geometry_parkingId_fkey";

-- DropForeignKey
ALTER TABLE "Properties" DROP CONSTRAINT "Properties_parkingId_fkey";

-- DropForeignKey
ALTER TABLE "RatingParkingAndUser" DROP CONSTRAINT "RatingParkingAndUser_parkingId_fkey";

-- DropForeignKey
ALTER TABLE "RatingParkingAndUser" DROP CONSTRAINT "RatingParkingAndUser_userId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "label" SET NOT NULL,
ALTER COLUMN "countryName" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "county" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "postalCode" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FavoriteParkingAndUser" ADD CONSTRAINT "FavoriteParkingAndUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteParkingAndUser" ADD CONSTRAINT "FavoriteParkingAndUser_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingParkingAndUser" ADD CONSTRAINT "RatingParkingAndUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingParkingAndUser" ADD CONSTRAINT "RatingParkingAndUser_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geometry" ADD CONSTRAINT "Geometry_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertiesId_fkey" FOREIGN KEY ("propertiesId") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
