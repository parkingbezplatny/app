"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useFavoriteMutation() {
  const queryClient = useQueryClient();

  const removeParkingFromFavoriteMutation = useMutation({
    mutationKey: ["removeParkingFromFavoriteMutation"],
    mutationFn: async (parkingId: string) =>
      await axios.delete(`/favorite/${parkingId}`),
  });

  const addParkingFromFavoriteMutation = useMutation({
    mutationKey: ["addParkingFromFavoriteMutation"],
    mutationFn: async (parkingId: string) =>
      await axios.post(`/favorite/${parkingId}`),
  });

  const addParkingToFavorite = async (parkingId: string) => {
    await addParkingFromFavoriteMutation.mutateAsync(parkingId);
    await queryClient.invalidateQueries(["favoriteParkingsQuery"]);
  };

  const removeParkingFromFavorite = async (parkingId: string) => {
    await removeParkingFromFavoriteMutation.mutateAsync(parkingId);
    await queryClient.invalidateQueries(["favoriteParkingsQuery"]);
  };

  return { addParkingToFavorite, removeParkingFromFavorite };
}
