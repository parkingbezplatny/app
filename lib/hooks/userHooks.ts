import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { ApiResponse } from "../helpers/server-function-response";
import {
  TCreateParking,
  TParking,
  TUpdateUserPassword,
  TUpdateUserUsername,
} from "../types";

export type TUseUpdateUsernameProps = {
  email: string;
} & TUpdateUserUsername;

function updateUsername({ email, username }: TUseUpdateUsernameProps) {
  return agent.Users.updateUsernameByEmail(email, {
    username: username,
  });
}

export const useUpdateUsername = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: updateUsername,
    onSuccess: onSuccess,
  });
};

export type TUseUpdatePasswordProps = {
  email: string;
} & TUpdateUserPassword;

function updatePassword({ email, passwords }: TUseUpdatePasswordProps) {
  return agent.Users.updatePasswordByEmail(email, { passwords });
}

export const useUpdatePassword = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: onSuccess,
  });
};

function getFavoriteParkings(parkingsIds: number[]) {
  return agent.Parkings.list().then((response) => {
    if (response.success && response.data) {
      response.data = response?.data?.filter((parking) =>
        parkingsIds.includes(parking.id)
      );
    }
    return response;
  });
}

function mapFavoriteParkings(response: ApiResponse<TParking[] | null>) {
  let parking: TParking[] = [];
  if (response.success && response.data) {
    parking = response.data;
  }
  return parking;
}

export const useGetFavoriteParkings = (parkingsIds: number[]) => {
  return useQuery({
    queryKey: ["favoriteParkings"],
    queryFn: async () => getFavoriteParkings(parkingsIds),
    select: mapFavoriteParkings,
  });
};

function createParking(createParking: TCreateParking) {
  return agent.Parkings.create(createParking);
}

export const useCreateParking = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: createParking,
    onSuccess: onSuccess,
  });
};
