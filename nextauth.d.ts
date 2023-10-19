import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string;
    username: string;
    isAdmin: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      username: string;
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    username: string;
    isAdmin: boolean;
  }
}

