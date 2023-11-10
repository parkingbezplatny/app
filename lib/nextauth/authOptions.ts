import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {
  canCreateGoogleUser,
  canSignInWithCredential,
  createGoogleUser,
  getUserByEmail,
} from "../services/user";
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
          const user = await canSignInWithCredential(
            credentials?.email,
            credentials?.password
          );
          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
          };
        } catch (err: unknown) {
          throw new Error(encodeURI(getErrorMessage(err)));
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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (user) {
          try {
            if (await canCreateGoogleUser(user.email)) {
              await createGoogleUser(user.email, user.name ?? "");
              return true;
            }
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
