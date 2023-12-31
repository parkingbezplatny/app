"use client";

import { TParking } from "@/lib/types";
import { Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import UpdateParkingModal from "../parking/update-parking-modal";
import DeleteParkingModal from "../parking/delete-parking-modal";

export const parkingColumns: ColumnDef<TParking>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "properties.address.label",
    header: "Label",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const parking = row.original;

      return (
        <Flex direction="row" gap="1rem" justify="flex-end">
          <UpdateParkingModal parkingId={parking.id} />
          <DeleteParkingModal parkingId={parking.id} />
        </Flex>
      );
    },
  },
];
