import { Parking } from "@/components/sidepanel";
import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { ApiResponse } from "../helpers/server-function-response";
import { TParking, TUpdateUserPassword, TUpdateUserUsername } from "../types";

export type TUseUpdateUsernameProps = {
    email: string;
  } & TUpdateUserUsername

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
}

export type TUseUpdatePasswordProps = {
    email: string;
  } & TUpdateUserPassword;

function updatePassword({ email, passwords }: TUseUpdatePasswordProps) {
    return agent.Users.updatePasswordByEmail(email, {passwords});
  }

export const useUpdatePassword = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: updatePassword,
        onSuccess: onSuccess,
      });
}

function getFavoriteParkings(parkingsIds: number[]) {
    return agent.Parkings.list().then((response) => {
        if (response.success && response.data) {
            response.data = response?.data?.filter((parking) => parkingsIds.includes(parking.id));
        }
        return response;
    });
  }

function mapFavoriteParkings(response: ApiResponse<TParking[] | null>) {
    let parking: Parking[] = [];
    if (response.success && response.data) {
        parking = response.data.map((parking) => {
            return {
                name: parking.properties.address.label,
                coordinates: {
                  lat: parking.geometry.coordinates[0],
                  lng: parking.geometry.coordinates[1],
                },
                city: parking.properties.address.city,
              };
        });
    }
    return parking;
  }

export const useGetFavoriteParkings = (parkingsIds: number[]) => {
    return useQuery({
        queryKey: ["favoriteParkings"],
        queryFn: async () => getFavoriteParkings(parkingsIds),
        select: mapFavoriteParkings
    });
};
