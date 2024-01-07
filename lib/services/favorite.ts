import { getErrorMessage } from "../helpers/getErrorMessage";
import {
  ErrorServerFunctionResponse,
  ExceptionServerFunctionResponse,
  ServerFunctionResponse,
  SuccessServerFunctionResponse,
} from "../helpers/server-function-response";
import prisma from "../prisma/prismaClient";
import { TParking } from "../types";

export async function addToFavoriteParkingById(
  parkingId: string,
  userId: string
): Promise<ServerFunctionResponse<TParking | null>> {
  try {
    const favoredParkingByUser = await prisma.favoriteParkingAndUser.findFirst({
      where: {
        AND: [
          {
            parkingId: parseInt(parkingId),
          },
          {
            userId: parseInt(userId),
          },
        ],
      },
    });

    if (favoredParkingByUser) {
      return new ErrorServerFunctionResponse("Parking już jest w ulubionych");
    }

    const newFavoriteParking = await prisma.favoriteParkingAndUser.create({
      data: {
        parkingId: parseInt(parkingId),
        userId: parseInt(userId),
      },
      include: {
        parking: {
          include: {
            favoriteUsers: true,
            userRatings: true,
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

    if (!newFavoriteParking) {
      return new ErrorServerFunctionResponse(
        "Błąd dodawania parkingu do ulubionych"
      );
    }

    return new SuccessServerFunctionResponse(
      "Pomyślnie dodano parking do ulubionych",
      newFavoriteParking.parking as TParking
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function removeFromFavoriteParkingById(
  parkingId: string,
  userId: string
): Promise<ServerFunctionResponse<null>> {
  try {
    const favoredParkingByUser = await prisma.favoriteParkingAndUser.findFirst({
      where: {
        AND: [
          {
            parkingId: parseInt(parkingId),
          },
          {
            userId: parseInt(userId),
          },
        ],
      },
    });

    if (!favoredParkingByUser) {
      return new ErrorServerFunctionResponse("Parking nie jest w ulubionych");
    }

    await prisma.favoriteParkingAndUser.delete({
      where: {
        id: favoredParkingByUser.id,
      },
    });

    return new SuccessServerFunctionResponse(
      "Pomyślnie usunięto parking z ulubionych",
      null
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

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
