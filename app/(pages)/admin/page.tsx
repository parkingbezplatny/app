import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Admin() {
  return (
    <Box>
      <Flex direction="column" w="100%" gap="2rem">
        <Heading>Admin page do zarządzania</Heading>
        <Link href="/admin/user">Zarządzaj użytkownikami</Link>
        <Link href="/admin/parking">Zarządzaj parkingami</Link>
      </Flex>
    </Box>
  );
}

export default Admin;
