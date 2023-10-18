import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

type ParkingType = {
  lng: number;
  lat: number;
  place: string;
};

async function main() {
  try {
    const parkingListJSON = fs.readFileSync("parkingList.json", "utf-8");
    if (!parkingListJSON) throw new Error("Can't read file");

    const parkingList: ParkingType[] = JSON.parse(parkingListJSON);

    const prisma = new PrismaClient();

    try {
      const parkings = await prisma.parking.createMany({
        data: [...parkingList],
      });
      console.log(parkings);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  } catch (err) {
    console.log(err);
  }
}

main();
