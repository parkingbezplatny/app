// import NextAuth from "next-auth/next";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [],
//   pages: {
//     signIn: "/sign-in",
//   },

//   callbacks: {
//     async jwt({ user, token, trigger }) {
//       return token;
//     },

//     async session({ session, token }) {
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
