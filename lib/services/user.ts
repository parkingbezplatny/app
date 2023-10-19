import { comparePassword, hashPassword } from "../helpers/password";
import prisma from "../prisma/prismaClient";
import { TUserDatabase, TUsersDatabase } from "../types";

export async function createUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<TUserDatabase | null> {
  try {
    const user = await getUserByEmail(email);
    if (user) return null;

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
    if (!newUser) return null;

    return newUser;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createGoogleUser(
  email: string,
  username: string
): Promise<TUserDatabase | null> {
  try {
    const user = await getUserByEmail(email);
    if (user) return null;

    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: "google",
        isGoogle: true,
      },
    });

    const newUser = await getUserByEmail(email);
    if (!newUser) return null;

    return newUser;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserByEmail(
  email: string
): Promise<TUserDatabase | null> {
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

    return user;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserById(id: string) {
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
        favoriteParkings: {
          select: {
            parking: true,
          },
        },
      },
    });

    return user;
  } catch (err: any) {
    throw err;
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

    return users;
  } catch (err: any) {
    throw err;
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
}): Promise<TUserDatabase | null> {
  try {
    const user = await getUserByEmail(email);
    if (!user) return null;

    await prisma.user.update({
      data: {
        username: username,
      },
      where: {
        email: email,
      },
    });

    const updateUser = await getUserByEmail(email);
    return updateUser;
  } catch (err: any) {
    throw err;
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
}): Promise<TUserDatabase | null> {
  try {
    const user = await getUserById(id);
    if (!user) return null;

    await prisma.user.update({
      data: {
        username: username,
      },
      where: {
        id: parseInt(id),
      },
    });

    const updateUser = await getUserById(id);
    return updateUser;
  } catch (err: any) {
    throw err;
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
}): Promise<TUserDatabase | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return null;
    if (!(await comparePassword(oldPassword, user.password))) return null;

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
    if (!updateUser) return null;

    return updateUser;
  } catch (err: any) {
    throw err;
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
}): Promise<TUserDatabase | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) return null;
    if (!(await comparePassword(oldPassword, user.password))) return null;

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
    if (!updateUser) return null;

    return updateUser;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserAdminByEmail(
  email: string,
  isAdmin: boolean
): Promise<TUserDatabase | null> {
  try {
    const user = await getUserByEmail(email);
    if (!user) return null;

    await prisma.user.update({
      data: {
        isAdmin: isAdmin,
      },
      where: {
        email: email,
      },
    });

    const updateUser = await getUserByEmail(email);
    if (!updateUser) return null;

    return updateUser;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserAdminById(
  id: string,
  isAdmin: boolean
): Promise<TUserDatabase | null> {
  try {
    const user = await getUserById(id);
    if (!user) return null;

    await prisma.user.update({
      data: {
        isAdmin: isAdmin,
      },
      where: {
        id: parseInt(id),
      },
    });

    const updateUser = await getUserById(id);
    if (!updateUser) return null;

    return updateUser;
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserByEmail(email: string): Promise<void> {
  try {
    await prisma.user.delete({
      where: { email: email },
    });
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserById(id: string): Promise<void> {
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  } catch (err: any) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
