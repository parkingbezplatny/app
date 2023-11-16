import { getErrorMessage } from "../helpers/errorMessage";
import prisma from "../prisma/prismaClient";
import {
  TCreateParking,
  TParking,
  TParkingMap,
  TUpdateParking,
} from "../types";
import { getUserById } from "./user";

export async function createParking(
  parking: TCreateParking
): Promise<TParking> {
  try {
    const newParking = await prisma.parking.create({
      data: {
        ...parking,
        geometry: {
          create: {
            coordinates: [
              parseFloat(parking.geometry.lat),
              parseFloat(parking.geometry.lng),
            ],
            type: parking.geometry.type,
          },
        },
        properties: {
          create: {
            address: {
              create: {
                ...parking.properties.address,
              },
            },
          },
        },
      },
      include: {
        favoriteUsers: true,
        geometry: true,
        properties: {
          include: {
            address: true,
          },
        },
        userRatings: true,
      },
    });

    return newParking;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingById(id: string): Promise<TParking> {
  try {
    const parking = await prisma.parking.findUnique({
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
      where: {
        id: parseInt(id),
      },
    });

    if (!parking) throw new Error("Nie znaleziono parkingu");
    return parking;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingsForMap(): Promise<TParkingMap[]> {
  try {
    const parkings = await prisma.parking.findMany({
      include: {
        geometry: {
          select: {
            coordinates: true,
            type: true,
          },
        },
        properties: {
          select: {
            address: {
              select: {
                label: true,
              },
            },
          },
        },
      },
    });

    if (!parkings || parkings.length <= 0)
      throw new Error("Nie znaleziono parkingów");

    return parkings;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingsWithPagination(
  skip: number,
  take: number
): Promise<TParking[]> {
  try {
    const parkings = await prisma.parking.findMany({
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
      orderBy: { id: "asc" },
      take: take,
      skip: skip,
    });

    if (!parkings || parkings.length <= 0)
      throw new Error("Nie znaleziono parkingów");

    return parkings;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingsByCity(city: string): Promise<TParking[]> {
  try {
    const parkings = await prisma.parking.findMany({
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
      where: {
        properties: {
          address: {
            city: {
              contains: city,
              mode: "insensitive",
            },
          },
        },
      },
    });

    if (!parkings || parkings.length <= 0)
      throw new Error("Nie znaleziono parkingów");

    return parkings;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkings(): Promise<TParking[]> {
  try {
    const parkings = await prisma.parking.findMany({
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
    });

    if (!parkings || parkings.length <= 0)
      throw new Error("Nie znaleziono parkingów");

    return parkings;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateParkingById(
  parkingId: string,
  updateParking: TUpdateParking
): Promise<TParking> {
  try {
    const parking = await getParkingById(parkingId);
    if (!parking) throw new Error("Nie znaleziono parkingu");

    const updatedParking = await prisma.parking.update({
      data: {
        geometry: {
          update: {
            data: {
              coordinates: [
                parseFloat(updateParking.geometry.lat),
                parseFloat(updateParking.geometry.lng),
              ],
            },
          },
        },
        properties: {
          update: {
            address: {
              update: { data: updateParking.properties.address },
            },
          },
        },
      },
      where: {
        id: parseInt(parkingId),
      },
      include: {
        favoriteUsers: true,
        geometry: true,
        properties: {
          include: {
            address: true,
          },
        },
        userRatings: true,
      },
    });

    if (!updatedParking) throw new Error("Błąd aktualizacji danych parkingu");

    return updatedParking;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteParkingById(parkingId: string): Promise<boolean> {
  try {
    const parking = await getParkingById(parkingId);
    if (!parking) throw new Error("Nie znaleziono parkingu");

    await prisma.parking.delete({
      where: {
        id: parseInt(parkingId),
      },
    });

    return true;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function rateParkingById(
  parkingId: string,
  userId: string,
  rating: string
): Promise<TParking> {
  try {
    const parking = await getParkingById(parkingId);
    const user = await getUserById(userId);

    if (!parking || !user)
      throw new Error("Nie znaleziono użytkownika lub parkingu");

    const ratedParkingByUser = await prisma.ratingParkingAndUser.findFirst({
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

    if (ratedParkingByUser) {
      await prisma.ratingParkingAndUser.update({
        data: {
          rating: parseInt(rating),
        },
        where: {
          id: ratedParkingByUser.id,
        },
      });
    } else {
      await prisma.ratingParkingAndUser.create({
        data: {
          rating: parseInt(rating),
          userId: user.id,
          parkingId: parking.id,
        },
      });
    }

    const rateParking = await getParkingById(parkingId);
    if (!rateParking) throw new Error("Błąd oceniania parkingu");
    return rateParking;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function addToFavoriteParkingById(
  parkingId: string,
  userId: string
): Promise<TParking> {
  try {
    const parking = await getParkingById(parkingId);
    const user = await getUserById(userId);

    if (!parking || !user)
      throw new Error("Nie znaleziono użytkownika lub parkingu");

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

    if (favoredParkingByUser) throw new Error("Parking już jest w ulubionych");

    await prisma.favoriteParkingAndUser.create({
      data: {
        parkingId: parking.id,
        userId: user.id,
      },
    });

    const favoriteParking = await getParkingById(parkingId);
    if (!favoriteParking)
      throw new Error("Błąd dodawania parkingu do ulubionych");
    return favoriteParking;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function removeFromFavoriteParkingById(
  parkingId: string,
  userId: string
): Promise<boolean> {
  try {
    const parking = await getParkingById(parkingId);
    const user = await getUserById(userId);

    if (!parking || !user)
      throw new Error("Nie znaleziono użytkownika lub parkingu");

    const favoredParkingByUser = await prisma.favoriteParkingAndUser.findFirst({
      where: {
        AND: [
          {
            parkingId: parking.id,
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    if (!favoredParkingByUser) throw new Error("Parking nie jest w ulubionych");

    await prisma.favoriteParkingAndUser.delete({
      where: {
        id: favoredParkingByUser.id,
      },
    });
    return true;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}
