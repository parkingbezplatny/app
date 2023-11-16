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
import { TParking, TParkingMap } from "@/lib/types";
import * as json from "@/parkings/okJsonParkingList.json";

function AdminParking() {
  const parkings: any[] = json;

  return (
    <Flex direction="column" w="100%" gap="2rem">
      <Flex direction="row" justify="space-between" align="center">
        <Heading>Zarządzasz parkingami</Heading>
        <CreateParkingModal />
      </Flex>
      <DataTable columns={parkingColumns} data={parkings} />
    </Flex>
  );
}

export default AdminParking;
