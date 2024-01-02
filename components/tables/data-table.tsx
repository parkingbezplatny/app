"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  type: "parking" | "user";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <Flex direction="column" gap="1rem">
        {type === "parking" && (
          <Input
            maxW="300px"
            focusBorderColor="orange.400"
            placeholder="Szukaj po miejscowości..."
            value={
              (table
                .getColumn("properties_address.label")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table
                .getColumn("properties_address.label")
                ?.setFilterValue(e.target.value)
            }
          />
        )}
        {type === "user" && (
          <Input
            maxW="300px"
            placeholder="Szukaj po email..."
            focusBorderColor="orange.400"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("email")?.setFilterValue(e.target.value)
            }
          />
        )}
        <Table variant="simple" border="1px solid #e4e4e7" boxShadow="lg">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length}>No results.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Flex
          align="center"
          direction="row"
          w="100%"
          justify="space-between"
          mb="1rem"
          gap="1rem"
          p="1rem"
        >
          <Flex direction="row" gap="1rem" align="center">
            <Text>
              {table.getState().pagination.pageIndex + 1} z{" "}
              {table.getPageCount()}
            </Text>
            <NumberInput
              focusBorderColor="orange.400"
              onChange={(e) => {
                if (parseInt(e) >= 0) table.setPageIndex(parseInt(e) - 1);
                else table.setPageIndex(0);
              }}
              min={1}
              max={table.getPageCount()}
            >
              <NumberInputField placeholder="Wpisz numer strony..." />
            </NumberInput>
          </Flex>

          <Flex direction="row" justify="flex-end" gap="1rem" mb="1rem">
            <Button
              variant="ghost"
              w="100px"
              size="sm"
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            >
              Wstecz
            </Button>
            <Button
              variant="ghost"
              w="100px"
              size="sm"
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              Dalej
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
