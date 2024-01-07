import { getErrorMessage } from "../helpers/getErrorMessage";
import {
  ErrorServerFunctionResponse,
  ExceptionServerFunctionResponse,
  ServerFunctionResponse,
  SuccessServerFunctionResponse,
} from "../helpers/server-function-response";
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
): Promise<ServerFunctionResponse<TParking | null>> {
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

    return new SuccessServerFunctionResponse<TParking>(
      "Pomyślnie dodano parking",
      newParking as TParking
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingById(
  id: string
): Promise<ServerFunctionResponse<TParking | null>> {
  try {
    if (id === "") {
      return new ErrorServerFunctionResponse("Id nie może być puste");
    }

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

    if (!parking) {
      return new ErrorServerFunctionResponse("Nie znalezniono parkingu");
    }
    return new SuccessServerFunctionResponse<TParking>(
      "Znaleziono parking",
      parking as TParking
    );
  } catch (err) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingsForMap(): Promise<
  ServerFunctionResponse<TParkingMap[] | null>
> {
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

    if (!parkings || parkings.length <= 0) {
      return new ErrorServerFunctionResponse("Nie znaleziono parkingów");
    }

    return new SuccessServerFunctionResponse<TParkingMap[]>(
      "Znaleziono parkingi",
      parkings
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingsWithPagination(
  skip: number,
  take: number
): Promise<ServerFunctionResponse<TParking[] | null>> {
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

    if (!parkings || parkings.length <= 0) {
      return new ErrorServerFunctionResponse("Nie znaleziono parkingów");
    }

    return new SuccessServerFunctionResponse<TParking[]>(
      "Znaleziono parkingi",
      parkings as TParking[]
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkingsByCity(
  city: string
): Promise<ServerFunctionResponse<TParking[] | null>> {
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

    if (!parkings || parkings.length <= 0) {
      return new ErrorServerFunctionResponse("Nie znaleziono parkingów");
    }

    return new SuccessServerFunctionResponse(
      "Znaleziono parkingi",
      parkings as TParking[]
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParkings(): Promise<
  ServerFunctionResponse<TParking[] | null>
> {
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

    if (!parkings) {
      return new ErrorServerFunctionResponse("Nie znaleziono parkingów");
    }

    return new SuccessServerFunctionResponse(
      "Znaleziono parkingi",
      parkings as TParking[]
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateParkingById(
  parkingId: string,
  updateParking: TUpdateParking
): Promise<ServerFunctionResponse<TParking | null>> {
  try {
    const parking = (await getParkingById(parkingId)).data;
    if (!parking) {
      return new ErrorServerFunctionResponse("Nie znaleziono parkingu");
    }

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

    if (!updatedParking) {
      return new ErrorServerFunctionResponse(
        "Błąd aktualizacji danych parkingu"
      );
    }

    return new SuccessServerFunctionResponse(
      "Pomyślnie zaktualizowano dane parkingu",
      updatedParking as TParking
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteParkingById(
  parkingId: string
): Promise<ServerFunctionResponse<null>> {
  try {
    const parking = (await getParkingById(parkingId)).data;
    if (!parking) {
      return new ErrorServerFunctionResponse("Nie znaleziono parkingu");
    }

    await prisma.parking.delete({
      where: {
        id: parseInt(parkingId),
      },
    });

    return new SuccessServerFunctionResponse(
      "Pomyślnie usunięto parking",
      null
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function rateParkingById(
  parkingId: string,
  userId: string,
  rating: string
): Promise<ServerFunctionResponse<TParking | null>> {
  try {
    const parking = (await getParkingById(parkingId)).data;
    const user = (await getUserById(userId)).data;

    if (!parking) {
      return new ErrorServerFunctionResponse("Nie znaleziono parkingu");
    }

    if (!user) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkownika");
    }

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

    const rateParking = (await getParkingById(parkingId)).data;
    if (!rateParking) {
      return new ErrorServerFunctionResponse("Błąd oceniania parkingu");
    }

    return new SuccessServerFunctionResponse(
      "Pomyślnie oceniono parking",
      rateParking
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}
