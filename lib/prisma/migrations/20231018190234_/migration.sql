/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_parkingId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_parkingId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "FavoriteParkingAndUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "parkingId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteParkingAndUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingParkingAndUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "parkingId" INTEGER NOT NULL,

    CONSTRAINT "RatingParkingAndUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteParkingAndUser" ADD CONSTRAINT "FavoriteParkingAndUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteParkingAndUser" ADD CONSTRAINT "FavoriteParkingAndUser_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingParkingAndUser" ADD CONSTRAINT "RatingParkingAndUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingParkingAndUser" ADD CONSTRAINT "RatingParkingAndUser_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
