"use client";

import {
  Box,
  VStack,
  Flex,
  Text,
  Button,
  Image,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Flex
      justify="space-between"
      wrap="wrap"
      padding="1.25rem"
      borderBottom="1px solid #A0AEC0"
      position="relative"
      zIndex="dropdown"
    >
      <Link href="/dashboard">
        <Flex align="center">
          <Image boxSize={42} mr={2} src="/logo.png" alt="" />
          <Text fontSize="lg" fontWeight="bold">
            PARKING
          </Text>
          <Text fontSize="md" ml={2}>
            BEZPŁATNY
          </Text>
        </Flex>
      </Link>
      <Box display={{ base: "block", md: "none" }} onClick={onOpen}>
        <Button variant="ghost">
          <FiMenu />
        </Button>
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Box zIndex={999}>
          <Menu z-index="3">
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
            >
              <Avatar
                bg="white"
                color="black"
                shadow="lg"
                borderWidth={1}
                borderColor={"blackAlpha.400"}
                boxSize={10}
                name={session?.user?.username}
              />
            </MenuButton>
            <MenuList>
              <Link href="/profile">
                <MenuItem>Profil</MenuItem>
              </Link>
              <MenuItem onClick={logout}>
                <Box display="flex">
                  Wyloguj się
                  <Icon ml={2} mt={"4.5px"} as={FiLogOut} />
                </Box>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <VStack align="center" justify="center" mt={5} mx={4}>
            <DrawerCloseButton mt={2} />
            <Text mt={8} fontSize={"sm"}>
              Aktualnie zalogowano jako:
            </Text>
            <Text mb={4} fontSize={"sm"} fontWeight={"bold"}>
              {session?.user?.username}
            </Text>
            <Button
              as={Link}
              href="/profile"
              size="sm"
              bg="orange.400"
              _hover={{
                bg: "orange.500",
              }}
              textColor="white"
              w={"full"}
            >
              Profil
            </Button>
            <Button
              size="sm"
              bg="orange.500"
              _hover={{
                bg: "orange.600",
              }}
              textColor="white"
              w={"full"}
              onClick={logout}
            >
              Wyloguj się
            </Button>
          </VStack>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
