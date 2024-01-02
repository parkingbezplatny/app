import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaParking } from 'react-icons/fa'; // Import your icons here

function AdminSidePanel() {
  const pathname = usePathname();

  return (
    <Box
      p={2}
      height="100dvh"
      borderRight="1px solid #A0AEC0"
      bg="white"
    >
      <Flex direction={"column"} gap={"1rem"} boxSizing={"border-box"}>
        <Link href="/admin">
          <IconButton
            aria-label="Dashboard"
            icon={<FaHome />}
            borderBottom={pathname === "/admin" ? "2px solid #ED8936" : ""}
            mb={pathname === "/admin" ? "" : "2px"}
            _hover={{
              bg: "orange.300",
            }}
          />
        </Link>
        <Link href="/admin/user">
          <IconButton
            aria-label="Users"
            icon={<FaUser />}
            borderBottom={pathname.includes("user") ? "2px solid #ED8936" : ""}
            mb={pathname.includes("user") ? "" : "2px"}
            _hover={{
              bg: "orange.300",
            }}
          />
        </Link>
        <Link href="/admin/parking">
          <IconButton
            aria-label="Parkings"
            icon={<FaParking />}
            borderBottom={
              pathname.includes("parking") ? "2px solid #ED8936" : ""
            }
            mb={pathname.includes("parking") ? "" : "2px"}
            _hover={{
              bg: "orange.300",
            }}
          />
        </Link>
      </Flex>
    </Box>
  );
}

export default AdminSidePanel;