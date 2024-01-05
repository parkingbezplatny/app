"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useFavoriteMutation() {
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
  };

  const removeParkingFromFavorite = async (parkingId: string) => {
    await removeParkingFromFavoriteMutation.mutateAsync(parkingId);
  };

  return { addParkingToFavorite, removeParkingFromFavorite };
}
