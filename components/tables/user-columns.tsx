"use client";

import { TUser } from "@/lib/types";
import { Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import DeleteUserModal from "../user/delete-user-modal";
import SetUserAdminModal from "../user/set-user-admin-modal";

export const userColumns: ColumnDef<
  Omit<TUser, "password" | "favoriteParkings" | "parkingRatings">
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "isGoogle",
    header: "Is Google",
  },
  {
    accessorKey: "isAdmin",
    header: "Is Admin",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Flex direction="row" gap="1rem" justify="flex-end">
          <SetUserAdminModal userId={user.id} />
        </Flex>
      );
    },
  },
];
