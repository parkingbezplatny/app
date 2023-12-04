import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Input,
  List,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CreateParkingModal from "./parking/create-parking-modal";
import { useSession } from "next-auth/react";
import { useGetFavoriteParkings } from "@/lib/hooks/userHooks";

const SidePanel = () => {
  const createParkingModal = useDisclosure();
  const [tab, setTab] = useState("favorites");

  const { data: session } = useSession();
  const favoriteParkingsIds =
    session?.user.favoriteParkings?.map((parking) => parking.id) ?? [];
  const { data: parkingsQueryResult, isSuccess } =
    useGetFavoriteParkings(favoriteParkingsIds);

  const favoriteParkings =
    parkingsQueryResult === undefined ? [] : parkingsQueryResult;

  return (
    <Box
      minW="230px"
      height="calc(100vh - 83px)"
      p={5}
      borderRight="1px solid #A0AEC0"
      bg="white"
      display="flex"
      flexDirection="column"
    >
      <Center justifyContent="space-evenly" mb={2}>
        <Button
          bg={"white"}
          _hover={{
            bg: "#f4f4f5",
          }}
          onClick={() => setTab("favorites")}
        >
          Ulubione
        </Button>
        <Button
          bg={"white"}
          _hover={{
            bg: "#f4f4f5",
          }}
          onClick={() => setTab("search")}
        >
          Wyszukaj
        </Button>
      </Center>
      <HStack gap={0}>
        <Divider
          mb={4}
          borderBottom={
            tab === "favorites" ? "2px solid black" : "2px solid grey"
          }
        />
        <Divider
          mb={4}
          borderBottom={
            tab === "search" ? " 2px solid black" : "2px solid grey"
          }
        />
      </HStack>

      {tab === "favorites" && (
        <>
          <Heading as="h3" size="md" mb={4}>
            Ulubione
          </Heading>
          <List mb={5}>
            {favoriteParkings.map((parking) => (
              <React.Fragment key={parking.name}>
                <Divider mb={2} borderColor="gray.200" />
                <Text fontWeight={"semibold"}>{parking.name}</Text>
                <Text>{parking.city}</Text>
                <Text fontSize={"sm"} fontStyle={"italic"} mb={3}>
                  {parking.coordinates.lat}, {parking.coordinates.lng}
                </Text>
              </React.Fragment>
            ))}
          </List>
          <Divider mb={2} borderColor="gray.200" />
        </>
      )}

      {tab === "search" && (
        <>
          <Heading as="h3" size="md" mb={4}>
            Wyszukaj
          </Heading>
          <Input
            placeholder="Wyszukaj parking..."
            borderColor="#d8dce4"
            focusBorderColor="orange.500"
            mb={5}
          />
        </>
      )}
    </Box>
  );
};

export default SidePanel;
