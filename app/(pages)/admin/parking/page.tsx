"use client";

import CreateParkingModal from "@/components/parking/create-parking-modal";
import { DataTable } from "@/components/tables/data-table";
import { parkingColumns } from "@/components/tables/parking-columns";
import { useGetAllParkings } from "@/lib/hooks/parkingHooks";
import { Flex, Heading, useDisclosure } from "@chakra-ui/react";

function AdminParking() {
  const { data: parkings } = useGetAllParkings();
  const createParkingModal = useDisclosure();

  return (
    <Flex direction="column" w="100%" gap="2rem">
      <Flex direction="row" justify="space-between" align="center">
        <Heading>Zarządzasz parkingami</Heading>
        <CreateParkingModal {...createParkingModal} />
      </Flex>
      <DataTable
        columns={parkingColumns}
        data={parkings ?? []}
        type={"parking"}
      />
    </Flex>
  );
}

export default AdminParking;
