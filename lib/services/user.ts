import { User } from "@prisma/client";
import { getErrorMessage } from "../helpers/errorMessage";
import { comparePassword, hashPassword } from "../helpers/password";
import prisma from "../prisma/prismaClient";
import { TUserDatabase, TUsersDatabase } from "../types";

export async function canSignInWithCredential(
  email: string | undefined,
  password: string | undefined
) {
  try {
    if (!email || !password) throw new Error("Nieprawidłowe dane logowania");

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error("Nieprawidłowe dane logowania");
    if (user.isGoogle)
      throw new Error(
        "Konto o tym adresie email już istnieje. Spróbuj się zalogować używając przycisku Google."
      );
    if (!(await comparePassword(password, user.password)))
      throw new Error("Nieprawidłowe dane logowania");

    return user;
  } catch (err: unknown) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function canCreateGoogleUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return true;
    if (!user.isGoogle)
      throw new Error(
        "Konto o tym adresie email już istnieje. Spróbuj zalogować używając email i hasło."
      );
    return false;
  } catch (err: unknown) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
}

export async function createUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<TUserDatabase> {
  try {
    const user = await getUserByEmail(email);
    if (user) {
      if (user.isGoogle)
        throw new Error(
          "Konto o tym adresie email już istnieje. Spróbuj się zalogować używając przycisku Google."
        );
      throw new Error("Użytkownik już istnieje");
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        isGoogle: false,
        username: username,
      },
    });

    const newUser = await getUserByEmail(email);
    if (!newUser) throw new Error("Błąd tworzenia nowego użytkownika");

    return newUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createGoogleUser(
  email: string,
  username: string
): Promise<TUserDatabase> {
  try {
    // const user = await getUserByEmail(email);
    // if (user) throw new Error("Użytkownik już istnieje");

    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: "google",
        isGoogle: true,
      },
    });

    const newUser = await getUserByEmail(email);
    if (!newUser) throw new Error("Błąd tworzenia nowego użytkownika");

    return newUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserByEmail(email: string): Promise<TUserDatabase> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: {
          select: {
            parking: true,
          },
        },
      },
    });

    if (!user) throw new Error("Nie znaleziono użytkownika");

    return user;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserById(id: string): Promise<TUserDatabase> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        password: false,
        favoriteParkings: {
          select: {
            parking: true,
          },
        },
      },
    });

    if (!user) throw new Error("Nie znaleziono użytkownika");

    return user;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUsersWithPagination(
  skip: number,
  take: number
): Promise<Omit<User, "password">[]> {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
      },
      orderBy: { id: "asc" },
      take: take,
      skip: skip,
    });

    if (!users || users.length <= 0)
      throw new Error("Nie znaleziono użytkowników");

    return users;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUsers(): Promise<TUsersDatabase> {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isGoogle: true,
        username: true,
        favoriteParkings: { select: { parking: true } },
      },
      orderBy: { id: "asc" },
    });

    if (!users || users.length <= 0)
      throw new Error("Nie znaleziono użytkowników");

    return users;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserByEmail({
  email,
  username,
}: {
  email: string;
  username: string;
}): Promise<TUserDatabase> {
  try {
    const user = await getUserByEmail(email);
    if (!user) throw new Error("Nie znaleziono użytkownika");

    await prisma.user.update({
      data: {
        username: username,
      },
      where: {
        email: email,
      },
    });

    const updateUser = await getUserByEmail(email);
    if (!updateUser) throw new Error("Błąd aktualizacji danych użytkownika");
    return updateUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserById({
  id,
  username,
}: {
  id: string;
  username: string;
}): Promise<TUserDatabase> {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error("Nie znaleziono użytkownika");

    await prisma.user.update({
      data: {
        username: username,
      },
      where: {
        id: parseInt(id),
      },
    });

    const updateUser = await getUserById(id);
    if (!updateUser) throw new Error("Błąd aktualizacji danych użytkownika");
    return updateUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserPasswordByEmail({
  email,
  oldPassword,
  newPassword,
}: {
  email: string;
  oldPassword: string;
  newPassword: string;
}): Promise<TUserDatabase> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error("Nie znaleziono użytkownika");
    if (!(await comparePassword(oldPassword, user.password)))
      throw new Error("Aktualne hasło jest nieprawidłowe");

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: email,
      },
    });

    const updateUser = await getUserByEmail(email);
    if (!updateUser) throw new Error("Błąd zmiany hasła");

    return updateUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserPasswordById({
  id,
  oldPassword,
  newPassword,
}: {
  id: string;
  oldPassword: string;
  newPassword: string;
}): Promise<TUserDatabase> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) throw new Error("Nie znaleziono użytkownika");
    if (!(await comparePassword(oldPassword, user.password)))
      throw new Error("Aktualne hasło jest nieprawidłowe");

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: parseInt(id),
      },
    });

    const updateUser = await getUserById(id);
    if (!updateUser) throw new Error("Błąd zmiany hasła");

    return updateUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserAdminByEmail(
  email: string,
  isAdmin: boolean
): Promise<TUserDatabase> {
  try {
    const user = await getUserByEmail(email);
    if (!user) throw new Error("Nie znaleziono użytkownika");

    await prisma.user.update({
      data: {
        isAdmin: isAdmin,
      },
      where: {
        email: email,
      },
    });

    const updateUser = await getUserByEmail(email);
    if (!updateUser) throw new Error("Błąd aktualizacji danych użytkownika");

    return updateUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserAdminById(
  id: string,
  isAdmin: boolean
): Promise<TUserDatabase> {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error("Nie znaleziono użytkownika");

    await prisma.user.update({
      data: {
        isAdmin: isAdmin,
      },
      where: {
        id: parseInt(id),
      },
    });

    const updateUser = await getUserById(id);
    if (!updateUser) throw new Error("Błąd aktualizacji danych użytkownika");

    return updateUser;
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserByEmail(email: string): Promise<void> {
  try {
    await prisma.user.delete({
      where: { email: email },
    });
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserById(id: string): Promise<void> {
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  } catch (err: unknown) {
    throw getErrorMessage(err);
  } finally {
    await prisma.$disconnect();
  }
}
