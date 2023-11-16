import * as z from "zod";
import { SignInValidation } from "../validations/forms/signIn.validation";
import { SignUpValidation } from "../validations/forms/signUp.validation";
import {
  Address,
  FavoriteParkingAndUser,
  Geometry,
  Parking,
  Properties,
  RatingParkingAndUser,
  User,
} from "@prisma/client";
import { UpdateParkingValidation } from "../validations/forms/updateParking.validation";
import { CreateParkingValidation } from "../validations/forms/createParking.validation";
import { UpdateUserUsernameValidation } from "../validations/forms/updateUserUsername.validation";
import { UpdateUserPasswordValidation } from "../validations/forms/updateUserPassword.validation";

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
  favoriteUsers: FavoriteParkingAndUser[] | null;
  userRatings: RatingParkingAndUser[] | null;
  properties:
    | ({
        address: Address | null;
      } & Properties)
    | null;
  geometry: Geometry | null;
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
