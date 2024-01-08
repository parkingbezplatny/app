import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Search from "./search";
import { useFavorite } from "@/lib/hooks/useFavorite";
import { useMapContext } from "@/lib/hooks/useMapContext";

const SidePanel = () => {
  const [tab, setTab] = useState("favorites");
  const { handleSetSelectedPointOnMap } = useMapContext();

  const { data: favoriteParkings, status } = useFavorite();

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
          <Divider mb={2} borderColor="gray.200" />
          {status === "loading" ? (
            <Flex justify="center" align="center">
              <Spinner />
            </Flex>
          ) : favoriteParkings?.data?.length === 0 ? (
            <Flex justify="center" align="center">
              <Text>Nie posiadasz jeszcze ulubionych parkingów</Text>
            </Flex>
          ) : (
            <Box rounded="md" px={2} maxH="100dvh" overflowY="auto">
              {favoriteParkings?.data?.toReversed().map((favParking) => (
                <Flex
                  key={favParking.id}
                  py="0.75rem"
                  borderBottom="1px"
                  borderColor="#d8dce4"
                  _last={{ borderBottom: "none" }}
                >
                  <Box
                    w="full"
                    p="0.2rem"
                    cursor="pointer"
                    _hover={{ backgroundColor: "#dddddd" }}
                    onClick={() => {
                      handleSetSelectedPointOnMap([
                        favParking.parking.geometry.coordinates[0],
                        favParking.parking.geometry.coordinates[1],
                      ]);
                    }}
                  >
                    {favParking.parking.properties.address.label}
                  </Box>
                </Flex>
              ))}
            </Box>
          )}
        </>
      )}

      {tab === "search" && <Search />}
    </Box>
  );
};

export default SidePanel;
