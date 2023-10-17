"use client"

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import Navbar from "@/app/components/navbar";

function Dashboard() {
  return (
    <><Navbar /><Flex
          minH={"90dvh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
      >
          <Text>Dashboard</Text>
      </Flex></>
  );
}

export default Dashboard;
