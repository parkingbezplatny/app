"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
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
}

export function DataTable<TData, TValue>({
  columns,
  data,
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
        <Input
          maxW="300px"
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
        <Flex direction="row" w="100%" justify="flex-end" gap="1rem" mb="1rem">
          <Button
            bg="orange.400"
            _hover={{
              bg: "#DD6B20",
            }}
            textColor="white"
            w="100px"
            size="sm"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            Wstecz
          </Button>
          <Button
            bg="orange.400"
            _hover={{
              bg: "#DD6B20",
            }}
            textColor="white"
            w="100px"
            size="sm"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            Dalej
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
