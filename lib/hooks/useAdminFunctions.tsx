"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "../helpers/server-function-response";
import { TUser } from "../types";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["getUserAdmin", userId],
    queryFn: async () =>
      await axios
        .get<ApiResponse<TUser>>(`/api/admin/users/${userId}`)
        .then((res) => res.data),
    keepPreviousData: false,
  });
};

export const useUpdateUserById = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      isAdmin,
    }: {
      userId: string;
      isAdmin: boolean;
    }) =>
      await axios
        .post<ApiResponse<TUser>>(`/api/admin/users/${userId}`, {
          isAdmin: isAdmin,
        })
        .then((res) => res.data),
  });
};

function useAdminFunctions() {
  const getAllUsers = useQuery({
    queryFn: async () =>
      await axios
        .get<ApiResponse<TUser[]>>("/api/admin/users")
        .then((res) => res.data),
    queryKey: ["getAllUsersAdmin"],
  });

  return { getAllUsers };
}

export default useAdminFunctions;
