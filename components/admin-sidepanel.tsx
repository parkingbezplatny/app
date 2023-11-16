import React from "react";
import {
  Box,
  Center,
  Button,
  HStack,
  Divider,
  Heading,
  List,
  Text,
  Input,
  VStack,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

function AdminSidePanel() {
  return (
    <Box
      pt={5}
      minW="230px"
      height="calc(100dvh - 83px)"
      borderRight="1px solid #A0AEC0"
      bg="white"
    >
      <Flex direction={"column"} gap={"2rem"}>
        <Link href="user">
          <Box w={"100%"} p={5}>
            Użytkownicy
          </Box>
        </Link>
        <Link href="parking">
          <Box w={"100%"} p={5}>
            Parkingi
          </Box>
        </Link>
      </Flex>
    </Box>
  );
}

export default AdminSidePanel;
