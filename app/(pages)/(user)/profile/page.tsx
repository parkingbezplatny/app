"use client";

import Navbar from "@/components/navbar";
import ChangePasswordModal from "@/components/user/change-password-modal";
import ChangeUsernameModal from "@/components/user/change-username-modal";
import { useGetFavoriteParkings } from "@/lib/hooks/userHooks";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";

export default function Profile() {
  const { data: session } = useSession();

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const usernameModal = useDisclosure();
  const passwordModal = useDisclosure();

  const favoriteParkingsIds =
    session?.user.favoriteParkings?.map((parking) => parking.id) ?? [];
  const { data: parkingsQueryResult } =
    useGetFavoriteParkings(favoriteParkingsIds);

  const parkings = parkingsQueryResult === undefined ? [] : parkingsQueryResult;

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
          name={session?.user?.username}
          bg="white"
          color="black"
          shadow="lg"
          borderWidth={1}
          borderColor={"blackAlpha.400"}
          size="xl"
          my={4}
        />
        <Heading size="md" mb={6}>
          {session?.user?.username}
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
      <ChangeUsernameModal
        isOpen={usernameModal.isOpen}
        onClose={usernameModal.onClose}
      />
      <ChangePasswordModal
        isOpen={passwordModal.isOpen}
        onClose={passwordModal.onClose}
      />
    </Box>
  );
}
