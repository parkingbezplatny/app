"use client";

import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { DataTable } from "@/components/tables/data-table";
import { TUser } from "@/lib/types";
import { userColumns } from "@/components/tables/user-columns";
import useAdminFunctions from "@/lib/hooks/useAdminFunctions";

function AdminUser() {
  const { getAllUsers } = useAdminFunctions();
  const { data: users, isLoading } = getAllUsers;

  return (
    <Flex direction="column" w="100%" gap="2rem">
      <Flex direction="row" justify="space-between" align="center">
        <Heading>Zarządzasz użytkownikami</Heading>
      </Flex>
      <DataTable
        columns={userColumns}
        data={users?.data ?? []}
        type={"user"}
        isLoading={isLoading}
      />
    </Flex>
  );
}

export default AdminUser;
