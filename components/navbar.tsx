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
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedInUser, setLoggedInUser] = useState("Spongebob Squarepants23");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Flex
      justify="space-between"
      wrap="wrap"
      padding="1.25rem"
      borderBottom="1px solid #A0AEC0"
    >
      <Link href="/dashboard">
        <Flex align="center">
          <Image boxSize={42} mr={2} src="logo.png" alt="" />
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
        <Flex align="center">
          <Text w={"120px"} fontSize={"sm"} fontWeight={"bold"} mx={2}>
            {loggedInUser}
          </Text>
          <Button
            bg="orange.400"
            _hover={{
              bg: "#DD6B20",
            }}
            textColor="white"
            w="100px"
            size="md"
            onClick={() => setLoggedInUser("")}
          >
            Wyloguj się
          </Button>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <VStack align="center" justify="center" mt={5} mx={4}>
            <DrawerCloseButton mt={2} />
            <Text mt={8} fontSize={"sm"}>
              Aktualnie zalogowany jako:
            </Text>
            <Text mb={4} fontSize={"sm"} fontWeight={"bold"}>
              {loggedInUser}
            </Text>
            <Button
              size="sm"
              bg="orange.400"
              _hover={{
                bg: "#DD6B20",
              }}
              textColor="white"
              w={"full"}
              onClick={() => setLoggedInUser("")}
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
