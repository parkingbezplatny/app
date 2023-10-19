/*
  Warnings:

  - Added the required column `rating` to the `RatingParkingAndUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RatingParkingAndUser" ADD COLUMN     "rating" INTEGER NOT NULL;
