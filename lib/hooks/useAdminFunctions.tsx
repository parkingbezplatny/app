"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "../helpers/server-function-response";
import { TUser } from "../types";

function useAdminFunctions() {
  const getAllUsers = useQuery({
    queryFn: async () =>
      await axios
        .get<ApiResponse<TUser[]>>("/api/admin/users")
        .then((res) => res.data),
    queryKey: ["getAllUsersAdmin"],
  });

  const getUserById = (userId: string) => {
    return useQuery({
      queryKey: ["getUserAdmin", userId],
      queryFn: async () =>
        await axios
          .get<ApiResponse<TUser>>(`/api/admin/users/${userId}`)
          .then((res) => res.data),
      keepPreviousData: false,
    });
  };

  const updateUserById = () => {
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

  return { getAllUsers, getUserById, updateUserById };
}

export default useAdminFunctions;
