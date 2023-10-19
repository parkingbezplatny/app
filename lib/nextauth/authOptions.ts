import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createGoogleUser, getUserByEmail } from "../services/user";
import prisma from "../prisma/prismaClient";
import { comparePassword } from "../helpers/password";
import { getErrorMessage } from "../helpers/errorMessage";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { type: "email", label: "email" },
        password: { type: "password", label: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password)
            throw new Error("Nieprawidłowe dane logowania");

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) throw new Error("Nieprawidłowe dane logowania");
          if (user.isGoogle)
            throw new Error(
              "Konto o tym adresie email już istnieje. Spróbuj się zalogować używając przycisku Google."
            );
          if (!(await comparePassword(credentials.password, user.password)))
            throw new Error("Nieprawidłowe dane logowania");

          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
          };
        } catch (err: unknown) {
          throw new Error(encodeURI(getErrorMessage(err)));
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
    GoogleProvider({
      id: "google",
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  callbacks: {
    async signIn({ user: userSignIn, account }) {
      if (account?.provider === "google") {
        if (userSignIn) {
          try {
            const user = await prisma.user.findUnique({
              where: {
                email: userSignIn.email,
              },
            });

            if (!user) {
              await createGoogleUser(userSignIn.email, userSignIn.name ?? "");
              return true;
            }
            if (!user.isGoogle)
              throw new Error(
                "Konto o tym adresie email już istnieje. Spróbuj zalogować używając email i hasło."
              );
          } catch (err: unknown) {
            throw new Error(encodeURI(getErrorMessage(err)));
          }
        }
      }
      return true;
    },

    async jwt({ user, token, account }) {
      if (user) {
        if (account?.provider === "google") {
          const userExists = await getUserByEmail(user.email);
          if (!userExists) return token;
          token.id = userExists.id.toString();
          token.email = userExists.email;
          token.username = userExists.username;
          token.isAdmin = userExists.isAdmin;

          return token;
        }
        token.id = user.id.toString();
        token.email = user.email;
        token.username = user.username;
        token.isAdmin = user.isAdmin;

        return token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          username: token.username,
          isAdmin: token.isAdmin,
        };
      }
      return session;
    },
  },
};
