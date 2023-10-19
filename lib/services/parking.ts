import prisma from "../prisma/prismaClient";
import { TParkingDatabase, TParkingsDatabase } from "../types";
import { getUserById } from "./user";

export async function createParking({
  lat,
  lng,
  place,
}: {
  lat: string;
  lng: string;
  place: string;
}): Promise<TParkingDatabase | null> {
  try {
    const newParking = await prisma.parking.create({
      data: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        place: place,
      },
    });

    const parking = await getParkingById(newParking.id.toString());
    if (!parking) return null;
    return parking;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingById(
  id: string
): Promise<TParkingDatabase | null> {
  try {
    const parking = await prisma.parking.findUnique({
      include: {
        userRatings: {
          select: {
            userId: true,
            rating: true,
          },
        },
      },
      where: {
        id: parseInt(id),
      },
    });

    if (!parking) return null;
    return parking;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingsByPlace(
  place: string
): Promise<TParkingsDatabase> {
  try {
    const parkings = await prisma.parking.findMany({
      include: {
        userRatings: {
          select: {
            userId: true,
            rating: true,
          },
        },
      },
      where: {
        place: place,
      },
    });

    return parkings;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkings(): Promise<TParkingsDatabase> {
  try {
    const parkings = await prisma.parking.findMany({
      include: {
        userRatings: {
          select: {
            userId: true,
            rating: true,
          },
        },
      },
    });

    return parkings;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateParkingById({
  id,
  lat,
  lng,
  place,
}: {
  id: string;
  lat: string;
  lng: string;
  place: string;
}): Promise<TParkingDatabase | null> {
  try {
    const parking = await getParkingById(id);
    if (!parking) return null;

    await prisma.parking.update({
      data: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        place: place,
      },
      where: {
        id: parseInt(id),
      },
    });

    const updateParking = await getParkingById(id);
    if (!updateParking) return null;

    return updateParking;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteParkingById(id: string) {
  try {
    await prisma.favoriteParkingAndUser.deleteMany({
      where: {
        parkingId: parseInt(id),
      },
    });
    await prisma.ratingParkingAndUser.deleteMany({
      where: {
        parkingId: parseInt(id),
      },
    });
    await prisma.parking.delete({ where: { id: parseInt(id) } });
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function rateParkingById({
  parkingId,
  userId,
  rating,
}: {
  parkingId: string;
  userId: string;
  rating: string;
}): Promise<TParkingDatabase | null> {
  try {
    const parking = await getParkingById(parkingId);
    const user = await getUserById(userId);

    if (!parking || !user) return null;

    const ratedParkingByUser = await prisma.ratingParkingAndUser.findFirst({
      where: {
        AND: [
          {
            userId: user.id,
          },
          {
            parkingId: parking.id,
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
    if (!rateParking) return null;
    return rateParking;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function addToFavoriteParkingById(
  parkingId: string,
  userId: string
): Promise<TParkingDatabase | null> {
  try {
    const parking = await getParkingById(parkingId);
    const user = await getUserById(userId);

    if (!parking || !user) return null;

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

    if (favoredParkingByUser) return null;

    await prisma.favoriteParkingAndUser.create({
      data: {
        parkingId: parking.id,
        userId: user.id,
      },
    });

    const favoriteParking = await getParkingById(parkingId);
    if (!favoriteParking) return null;
    return favoriteParking;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function removeFromFavoriteParkingById(
  parkingId: string,
  userId: string
): Promise<void | null> {
  try {
    const parking = await getParkingById(parkingId);
    const user = await getUserById(userId);

    if (!parking || !user) return null;

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

    if (!favoredParkingByUser) return null;

    await prisma.favoriteParkingAndUser.delete({
      where: {
        id: favoredParkingByUser.id,
      },
    });
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
