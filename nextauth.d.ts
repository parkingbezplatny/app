import { FavoriteParkingAndUser, RatingParkingAndUser } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { TUser } from "./lib/types";

interface CustomUser extends TUser {}

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    user: CustomUser;
  }

  interface Session extends DefaultSession {
    user: CustomUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: CustomUser;
  }
}
