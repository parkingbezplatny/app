"use client";

import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminSidePanel() {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <Box
      p={2}
      minW="230px"
      height="calc(100dvh - 83px)"
      borderRight="1px solid #A0AEC0"
      bg="white"
    >
      <Flex direction={"column"} gap={"1rem"} boxSizing={"border-box"}>
        <Heading size="sm">Admin panel</Heading>
        <Link href="/admin">
          <Flex
            p={2}
            w={"min-content"}
            borderBottom={pathname === "/admin" ? "2px solid orange" : ""}
            mb={pathname === "/admin" ? "" : "2px"}
          >
            Dashboard
          </Flex>
        </Link>
        <Link href="/admin/user">
          <Flex
            p={2}
            w={"min-content"}
            borderBottom={pathname.includes("user") ? "2px solid orange" : ""}
            mb={pathname.includes("user") ? "" : "2px"}
          >
            Użytkownicy
          </Flex>
        </Link>
        <Link href="/admin/parking">
          <Flex
            p={2}
            w={"min-content"}
            borderBottom={
              pathname.includes("parking") ? "2px solid orange" : ""
            }
            mb={pathname.includes("parking") ? "" : "2px"}
          >
            Parkingi
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
}

export default AdminSidePanel;
