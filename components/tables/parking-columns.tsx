"use client";

import { TParkingMap } from "@/lib/types";
import { Button, Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import UpdateParkingModal from "../parking/update-parking-modal";
import DeleteParkingModal from "../parking/delete-parking-modal";

export const parkingColumns: ColumnDef<Omit<TParkingMap, "geometry">>[] = [
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
        <Flex direction="row" gap="1rem">
          <UpdateParkingModal parkingId={parking.id} />
          <DeleteParkingModal parkingId={parking.id} />
        </Flex>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(payment.id)}
        //     >
        //       Copy payment ID
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem>View customer</DropdownMenuItem>
        //     <DropdownMenuItem>View payment details</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];
