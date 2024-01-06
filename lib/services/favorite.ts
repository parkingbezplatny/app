import { getErrorMessage } from "../helpers/getErrorMessage";
import {
  ErrorServerFunctionResponse,
  ExceptionServerFunctionResponse,
  SuccessServerFunctionResponse,
} from "../helpers/server-function-response";
import prisma from "../prisma/prismaClient";

export async function getFavoriteParkings(userId: number) {
  try {
    const favoriteParkings = await prisma.favoriteParkingAndUser.findMany({
      where: {
        userId: userId,
      },
      include: {
        parking: {
          include: {
            geometry: true,
            properties: {
              include: {
                address: true,
              },
            },
          },
        },
      },
    });

    return new SuccessServerFunctionResponse(
      "Znaleziono ulubione parkingi",
      favoriteParkings
    );
  } catch (err) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    prisma.$disconnect();
  }
}
