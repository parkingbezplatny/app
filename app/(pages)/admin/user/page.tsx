"use client";

import React, { useState } from "react";
import {
  Box,
  useBreakpointValue,
  Slide,
  IconButton,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CreateParkingModal from "@/components/parking/create-parking-modal";
import { DataTable } from "@/components/tables/data-table";
import { parkingColumns } from "@/components/tables/parking-columns";
import { TParking, TParkingMap, TUser } from "@/lib/types";
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
      <DataTable columns={userColumns} data={users} type={"user"} />
    </Flex>
  );
}

export default AdminParking;
