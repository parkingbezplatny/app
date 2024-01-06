"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ApiResponse } from "../helpers/server-function-response";
import { Address, Geometry } from "@prisma/client";
import { useEffect } from "react";

type TFavorite = {
  id: number;
  parkingId: number;
  userId: string;
  parking: {
    id: number;
    type: string;
    geometry: Geometry;
    properties: {
      id: number;
      parkingId: number;
      address: Address;
    };
  };
};

export function useFavorite() {
  const { data: session } = useSession();

  const favoriteParkingsQuery = useQuery({
    queryFn: async () =>
      await axios
        .get<ApiResponse<TFavorite[]>>("/favorite")
        .then((res) => res.data),
    queryKey: ["favoriteParkingsQuery"],
    enabled: session ? true : false,
  });

  useEffect(() => {
    if (!session) return;
    favoriteParkingsQuery.refetch();
  }, [session]);

  return favoriteParkingsQuery.data;
}
