import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUserByEmail } from "../services/user";
import prisma from "../prisma/prismaClient";
import { comparePassword } from "../helpers/password";

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
          if (user.isGoogle) throw new Error("Nieprawidłowe dane logowania");
          if (!(await comparePassword(credentials.password, user.password)))
            throw new Error("Nieprawidłowe dane logowania");

          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
          };
        } catch (err: any) {
          throw err;
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
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const userExists = await getUserByEmail(user?.email);
        if (!userExists) {
          await createUser({
            email: user.email,
            username: user.name ?? "",
            password: "google",
          });
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
