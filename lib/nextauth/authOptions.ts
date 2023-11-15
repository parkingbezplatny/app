import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {
  getUserByEmail,
  signInWithCredential,
  signInWithGoogle,
} from "../services/user";
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
          const user = await signInWithCredential(
            credentials?.email,
            credentials?.password
          );
          return {
            user: {
              ...user,
            },
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
            const u = await signInWithGoogle(user.email ?? "", user.name ?? "");
            return u ? true : false;
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
          const userExists = await getUserByEmail(user.email as string);
          if (!userExists) return token;
          token.user = { ...userExists };
          return token;
        }
        token.user = { ...user.user };
        return token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = { ...token.user };
      }
      return session;
    },
  },
};
