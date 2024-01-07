"use client";

import Navbar from "@/components/navbar";
import ChangePasswordModal from "@/components/user/change-password-modal";
import ChangeUsernameModal from "@/components/user/change-username-modal";
import { useFavorite } from "@/lib/hooks/useFavorite";
import { useFavoriteMutation } from "@/lib/hooks/useFavoriteMutation";
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
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Profile() {
  const { data: session } = useSession();
  const [removingIds, setRemovingIds] = useState<number[]>([]);

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const usernameModal = useDisclosure();
  const passwordModal = useDisclosure();

  const { data: favoriteParkings } = useFavorite();
  const { removeParkingFromFavorite } = useFavoriteMutation();

  const handleRemoveParkingFromFavorite = (
    parkingId: number,
    favParkingId: number
  ) => {
    setRemovingIds((prev) => [...prev, favParkingId]);
    removeParkingFromFavorite(parkingId.toString());
  };

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
          {!session?.user.isGoogle && (
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
          )}
        </Flex>
      </Box>
      <Box p={4}>
        <SimpleGrid columns={columns} spacing={5}>
          {favoriteParkings?.data?.toReversed().map((favParking) => (
            <Box key={favParking.id} borderWidth={1} borderRadius="lg">
              <Flex justify="space-between" align="center" p="6" gap="1rem">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {favParking.parking.properties.address.label}
                </Box>
                <IconButton
                  aria-label="Delete parking"
                  icon={<FaTrash />}
                  bg="blackAlpha.200"
                  _hover={{
                    bg: "red.400",
                    color: "white",
                  }}
                  isDisabled={removingIds.includes(favParking.id)}
                  onClick={() =>
                    handleRemoveParkingFromFavorite(
                      favParking.parkingId,
                      favParking.id
                    )
                  }
                />
              </Flex>
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
