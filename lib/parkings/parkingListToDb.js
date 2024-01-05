"use server";

import prisma from "../prisma/prismaClient";
import { okJsonParkingList as parkingList } from "./okJsonParkingList";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function populate() {
  if (!parkingList) return;

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
