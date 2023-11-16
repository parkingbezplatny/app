"use client";

import {
  Box,
  Heading,
  Avatar,
  Button,
  IconButton,
  SimpleGrid,
  useBreakpointValue,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import Navbar from "@/components/navbar";
import UsernameModal from "@/components/username-modal";
import PasswordModal from "@/components/password-modal";

export default function Profile() {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const usernameModal = useDisclosure();
  const passwordModal = useDisclosure();
  
  const [user, setUser] = useState({
    name: "Spongebob",
  });

  const parkings = [
    {
      name: "Parking u Miecia",
      coordinates: { lat: 51.11, lng: 17.0225 },
      city: "Wrocław",
    },
    {
      name: "Darmoowo",
      coordinates: { lat: 50.0647, lng: 19.945 },
      city: "Kraków",
    },
    {
      name: "Free&Park",
      coordinates: { lat: 10.012, lng: 13.342 },
      city: "Lubin",
    },
    {
      name: "Parkingowo",
      coordinates: { lat: 80.047, lng: 9.212 },
      city: "Zielona Góra",
    },
    {
      name: "Parking u Miecia",
      coordinates: { lat: 51.11, lng: 17.0225 },
      city: "Wrocław",
    },
    {
      name: "Darmoowo",
      coordinates: { lat: 50.0647, lng: 19.945 },
      city: "Kraków",
    },
    {
      name: "Free&Park",
      coordinates: { lat: 10.012, lng: 13.342 },
      city: "Lubin",
    },
    {
      name: "Parkingowo",
      coordinates: { lat: 80.047, lng: 9.212 },
      city: "Zielona Góra",
    },
    {
      name: "Parking u Miecia",
      coordinates: { lat: 51.11, lng: 17.0225 },
      city: "Wrocław",
    },
    {
      name: "Darmoowo",
      coordinates: { lat: 50.0647, lng: 19.945 },
      city: "Kraków",
    },
    {
      name: "Free&Park",
      coordinates: { lat: 10.012, lng: 13.342 },
      city: "Lubin",
    },
    {
      name: "Parkingowo",
      coordinates: { lat: 80.047, lng: 9.212 },
      city: "Zielona Góra",
    },
  ];

  return (
    <Box minH="100vh">
      <Navbar />
      <Box
        p={4}
        mt={4}
        mx={4}
        shadow="lg"
        borderWidth={1}
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar
          name={user.name}
          bg="white"
          color="black"
          shadow="lg"
          borderWidth={1}
          borderColor={"blackAlpha.400"}
          size="xl"
          my={4}
        />
        <Heading size="md" mb={6}>
          {user.name}
        </Heading>
        <Flex mb={4}>
          <Button
            bg="orange.400"
            _hover={{
              bg: "orange.500",
            }}
            textColor="white"
            size="md"
            mr={2}
            onClick={usernameModal.onOpen}
          >
            Zmień nazwę
          </Button>
          <Button
            bg="orange.500"
            _hover={{
              bg: "orange.600",
            }}
            textColor="white"
            size="md"
            onClick={passwordModal.onOpen}
          >
            Zmień hasło
          </Button>
        </Flex>
      </Box>
      <Box p={4}>
      <SimpleGrid columns={columns} spacing={5}>
          {parkings.map((parking, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              position="relative"
            >
              <IconButton
                aria-label="Delete parking"
                icon={<FaTrash />}
                position="absolute"
                top={"50%"}
                transform="translateY(-50%)"
                right={2}
                bg="blackAlpha.200"
                _hover={{
                  bg: "red.400",
                  color: "white",
                }}
                // onClick={() => handleDeleteParking(index)}
              />
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    {parking.city}
                  </Box>
                </Box>
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                  {parking.name}
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <UsernameModal isOpen={usernameModal.isOpen} onClose={usernameModal.onClose} />
      <PasswordModal isOpen={passwordModal.isOpen} onClose={passwordModal.onClose} />
    </Box>
  );
}
