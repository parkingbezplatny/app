import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getErrorMessage } from "../helpers/getErrorMessage";
import {
  getUserByEmail,
  signInWithCredential,
  signInWithGoogle,
} from "../services/user";

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

    async jwt({ user, token, account, trigger }) {
      if (user) {
        if (account?.provider === "google") {
          const response = await getUserByEmail(user.email as string);
          const userExists = response.data;
          if (!userExists) return { ...token };
          token.user = { ...userExists };
          return { ...token };
        }
        token.user = { ...user.user };
        return { ...token };
      }

      if (trigger === "update") {
        const response = await getUserByEmail(token.user.email as string);
        const retrievedUser = response.data;
        if (!retrievedUser) return { ...token };
        token.user = { ...retrievedUser };
        return { ...token };
      }

      return { ...token };
    },

    async session({ session, token }) {
      if (token) {
        session.user = { ...token.user };
      }
      return { ...session };
    },
  },
};
