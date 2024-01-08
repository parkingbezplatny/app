import { getErrorMessage } from "../helpers/getErrorMessage";
import { comparePassword, hashPassword } from "../helpers/password";
import {
  ErrorServerFunctionResponse,
  ExceptionServerFunctionResponse,
  ServerFunctionResponse,
  SuccessServerFunctionResponse,
} from "../helpers/server-function-response";
import prisma from "../prisma/prismaClient";
import {
  TSignUpForm,
  TUpdateUserPassword,
  TUpdateUserUsername,
  TUser,
} from "../types";

export async function signInWithGoogle(
  email: string = "",
  username: string = ""
): Promise<TUser> {
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (userExist) {
      if (!userExist.isGoogle) {
        throw new Error(
          "Konto o tym adresie email już istnieje. Spróbuj zalogować używając email i hasło."
        );
      } else {
        return userExist;
      }
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: "google",
          username: username,
          isAdmin: false,
          isGoogle: true,
        },
        select: {
          email: true,
          id: true,
          isAdmin: true,
          isGoogle: true,
          username: true,
          favoriteParkings: true,
          parkingRatings: true,
        },
      });

      return newUser;
    }
  } catch (err: unknown) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
}

export async function signInWithCredential(
  email: string | undefined,
  password: string | undefined
): Promise<TUser> {
  try {
    if (!email || !password) throw new Error("Nieprawidłowe dane logowania");

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!user) throw new Error("Nieprawidłowe dane logowania");
    if (user.isGoogle)
      throw new Error(
        "Konto o tym adresie email już istnieje. Spróbuj się zalogować używając przycisku Google."
      );
    if (!(await comparePassword(password, user.password)))
      throw new Error("Nieprawidłowe dane logowania");

    const getUserByEmailResponse = await getUserByEmail(email);
    if (getUserByEmailResponse.data === null) {
      throw new Error(getUserByEmailResponse.message);
    }

    return getUserByEmailResponse.data;
  } catch (err: unknown) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function signUpWithCreadential(
  user: TSignUpForm
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const getUserByEmailResponse = await getUserByEmail(user.email);
    const userExist = getUserByEmailResponse.data;
    if (userExist) {
      if (userExist.isGoogle)
        return new ErrorServerFunctionResponse(
          "Konto o tym adresie email już istnieje. Spróbuj się zalogować używając przycisku Google."
        );
      return new ErrorServerFunctionResponse("Użytkownik już istnieje");
    }

    const hashedPassword = await hashPassword(user.passwords.password);

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        username: user.username,
        isAdmin: false,
        isGoogle: false,
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!newUser)
      return new ErrorServerFunctionResponse(
        "Błąd tworzenia nowego użytkownika"
      );

    return new SuccessServerFunctionResponse(
      "Utworzono konto użytkownika",
      newUser
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserByEmail(
  userEmail: string
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!user) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkownika");
    }

    return new SuccessServerFunctionResponse("Znaleziono użytkownika", user);
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserById(
  userId: string
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!user) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkownika");
    }

    return new SuccessServerFunctionResponse("Znaleziono użytkownika", user);
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUsersWithPagination(
  skip: number,
  take: number
): Promise<ServerFunctionResponse<TUser[] | null>> {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        parkingRatings: true,
        favoriteParkings: true,
      },
      orderBy: { id: "asc" },
      take: take,
      skip: skip,
    });

    if (!users || users.length <= 0) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkowników");
    }

    return new SuccessServerFunctionResponse("Znaleziono użytkowników", users);
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUsers(): Promise<
  ServerFunctionResponse<TUser[] | null>
> {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
      orderBy: { id: "asc" },
    });

    if (!users || users.length <= 0) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkowników");
    }

    return new SuccessServerFunctionResponse("Znaleziono użytkowników", users);
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserByEmail(
  userEmail: string,
  updateUser: TUpdateUserUsername
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const user = await getUserByEmail(userEmail);
    if (!user) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkownika");
    }

    const updatedUser = await prisma.user.update({
      data: {
        username: updateUser.username,
      },
      where: {
        email: userEmail,
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!updatedUser) {
      return new ErrorServerFunctionResponse(
        "Błąd aktualizacji danych użytkownika"
      );
    }

    return new SuccessServerFunctionResponse(
      "Zaktualizowano dane użytkownika",
      updatedUser
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserById(
  userId: string,
  updateUser: TUpdateUserUsername
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkownika");
    }

    const updatedUser = await prisma.user.update({
      data: {
        username: updateUser.username,
      },
      where: {
        id: parseInt(userId),
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!updatedUser) {
      return new ErrorServerFunctionResponse(
        "Błąd aktualizacji danych użytkownika"
      );
    }

    return new SuccessServerFunctionResponse(
      "Zaktualizowano dane użytkownika",
      updatedUser
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserPasswordByEmail(
  userEmail: string,
  updateUser: TUpdateUserPassword
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkownika");
    }
    if (
      !(await comparePassword(
        updateUser.passwords.currentPassword,
        user.password
      ))
    ) {
      return new ErrorServerFunctionResponse(
        "Aktualne hasło jest nieprawidłowe"
      );
    }

    const hashedPassword = await hashPassword(updateUser.passwords.newPassword);

    const updatedUser = await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: userEmail,
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!updatedUser) {
      return new ErrorServerFunctionResponse("Błąd zmiany hasła");
    }

    return new SuccessServerFunctionResponse(
      "Zaktualizowano hasło użytkownika",
      updatedUser
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserPasswordById(
  userId: string,
  updateUser: TUpdateUserPassword
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return new ErrorServerFunctionResponse("Nie znaleziono użytkownika");
    }
    if (
      !(await comparePassword(
        updateUser.passwords.currentPassword,
        user.password
      ))
    ) {
      return new ErrorServerFunctionResponse(
        "Aktualne hasło jest nieprawidłowe"
      );
    }

    const hashedPassword = await hashPassword(updateUser.passwords.newPassword);

    const updatedUser = await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: parseInt(userId),
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (!updatedUser) {
      return new ErrorServerFunctionResponse("Błąd zmiany hasła");
    }

    return new SuccessServerFunctionResponse(
      "Zaktualizowano hasło użytkownika",
      updatedUser
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

// TODO change admin role
export async function updateUserAdminById(
  id: string,
  isAdmin: boolean
): Promise<ServerFunctionResponse<TUser | null>> {
  try {
    const updatedUser = await prisma.user.update({
      data: {
        isAdmin: isAdmin,
      },
      where: {
        id: parseInt(id),
      },
      include: {
        favoriteParkings: true,
        parkingRatings: true,
      },
    });

    if (isAdmin)
      return new SuccessServerFunctionResponse(
        "Użytkownik jest administratorem.",
        updatedUser
      );

    return new SuccessServerFunctionResponse(
      "Użytkownik nie jest administratorem.",
      updatedUser
    );
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

// export async function updateUserAdminById(
//   id: string,
//   isAdmin: boolean
// ): Promise<TUserDatabase> {
//   try {
//     const user = await getUserById(id);
//     if (!user) throw new Error("Nie znaleziono użytkownika");

//     await prisma.user.update({
//       data: {
//         isAdmin: isAdmin,
//       },
//       where: {
//         id: parseInt(id),
//       },
//     });

//     const updateUser = await getUserById(id);
//     if (!updateUser) throw new Error("Błąd aktualizacji danych użytkownika");

//     return updateUser;
//   } catch (err: unknown) {
//     throw getErrorMessage(err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

export async function deleteUserByEmail(
  userEmail: string
): Promise<ServerFunctionResponse<null>> {
  try {
    await prisma.user.delete({
      where: { email: userEmail },
    });
    return new SuccessServerFunctionResponse("Usunięto użytkownika", null);
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserById(
  userId: string
): Promise<ServerFunctionResponse<null>> {
  try {
    await prisma.user.delete({
      where: { id: parseInt(userId) },
    });
    return new SuccessServerFunctionResponse("Usunięto użytkownika", null);
  } catch (err: unknown) {
    return new ExceptionServerFunctionResponse(getErrorMessage(err));
  } finally {
    await prisma.$disconnect();
  }
}
