import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const prisma = new PrismaClient();

  const parkingListJSON = fs.readFileSync("okJsonParkingList.json", "utf-8");
  if (!parkingListJSON) throw new Error("Can't read file");
  const parkingList = JSON.parse(parkingListJSON);

  console.log(parkingList[0].geometry.coordinates);

  try {
    for (let i = 0; i < parkingList.length; i++) {
      const parking = await prisma.parking.create({
        data: {
          ...parkingList[i],
          properties: {
            create: {
              ...parkingList[i].properties,
              address: {
                create: {
                  ...parkingList[i].properties.address,
                },
              },
            },
          },
          geometry: {
            create: {
              ...parkingList[i].geometry,
            },
          },
        },
        include: {
          properties: {
            include: {
              address: true,
            },
          },
          geometry: true,
        },
      });
      console.log(parking);

      await sleep(100).then(() => {
        console.log(`Create parking OK ${parking.id}`);
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
