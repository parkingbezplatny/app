"use client";

import React from "react";
import {
  Flex,
  Heading,
} from "@chakra-ui/react";
import { DataTable } from "@/components/tables/data-table";
import { TUser } from "@/lib/types";
import { userColumns } from "@/components/tables/user-columns";

function AdminParking() {
  const users: Omit<
    TUser,
    "password" | "favoriteParkings" | "parkingRatings"
  >[] = [
    {
      email: "adi",
      isAdmin: true,
      isGoogle: true,
      username: "asdasd",
      id: 123,
    },
  ];

  return (
    <Flex direction="column" w="100%" gap="2rem">
      <Flex direction="row" justify="space-between" align="center">
        <Heading>Zarządzasz użytkownikami</Heading>
      </Flex>
      <DataTable columns={userColumns} data={users} type={"user"} isLoading={false} />
    </Flex>
  );
}

export default AdminParking;
