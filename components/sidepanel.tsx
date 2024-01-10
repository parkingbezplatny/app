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
          data-testid="ulubione"
          bg={"white"}
          _hover={{
            bg: "#f4f4f5",
          }}
          onClick={() => setTab("favorites")}
        >
          Ulubione
        </Button>
        <Button
          data-testid="wyszukaj"
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
            <Flex mt={2} justify="center" align="center">
              <Spinner />
            </Flex>
          ) : favoriteParkings?.data?.length === 0 ? (
            <Text mt={2} textAlign="center">
              Nie posiadasz jeszcze ulubionych parkingów
            </Text>
          ) : (
            <Box
              rounded="md"
              border="1px solid #d8dce4"
              maxH="65dvh"
              overflowY="auto"
            >
              {favoriteParkings?.data?.toReversed().map((favParking) => (
                <Flex
                  key={favParking.id}
                  borderBottom="1px"
                  borderColor="#d8dce4"
                  _last={{ borderBottom: "none" }}
                >
                  <Box
                    w="full"
                    p="0.75rem"
                    rounded="md"
                    cursor="pointer"
                    _hover={{ backgroundColor: "#eeeeee" }}
                    transition="all"
                    transitionTimingFunction="ease-in-out"
                    transitionDuration="0.2s"
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
