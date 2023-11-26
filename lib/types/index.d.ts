import {
  Address,
  FavoriteParkingAndUser,
  Geometry,
  Parking,
  Properties,
  RatingParkingAndUser,
  User,
} from "@prisma/client";
import * as z from "zod";
import { CreateParkingValidation } from "../validations/forms/createParking.validation";
import { SignInValidation } from "../validations/forms/signIn.validation";
import { SignUpValidation } from "../validations/forms/signUp.validation";
import { UpdateParkingValidation } from "../validations/forms/updateParking.validation";
import { UpdateUserPasswordValidation } from "../validations/forms/updateUserPassword.validation";
import { UpdateUserUsernameValidation } from "../validations/forms/updateUserUsername.validation";

export type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type TUser = {
  favoriteParkings: FavoriteParkingAndUser[] | null;
  parkingRatings: RatingParkingAndUser[] | null;
} & Omit<User, "password">;

export type TCreateUser = z.infer<typeof SignUpValidation>;
export type TUpdateUserUsername = z.infer<typeof UpdateUserUsernameValidation>;
export type TUpdateUserPassword = z.infer<typeof UpdateUserPasswordValidation>;

export type TParking = {
  favoriteUsers: FavoriteParkingAndUser[];
  userRatings: RatingParkingAndUser[];
  properties: {
    address: Address;
  } & Properties;
  geometry: Geometry;
} & Parking;

export type TParkingMap = {
  properties: {
    address: Pick<Address, "label"> | null;
  } | null;
  geometry: Pick<Geometry, "coordinates" | "type"> | null;
} & Parking;

export type TCreateParking = z.infer<typeof CreateParkingValidation>;
export type TUpdateParking = z.infer<typeof UpdateParkingValidation>;

export type TSignInForm = z.infer<typeof SignInValidation>;
export type TSignUpForm = z.infer<typeof SignUpValidation>;
