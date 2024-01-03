import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  List,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import { useGetFavoriteParkings } from "@/lib/hooks/userHooks";
import Search from "./search";

const SidePanel = ({
  setSelectedPointOnMap,
}: {
  setSelectedPointOnMap: Dispatch<SetStateAction<number[]>>;
}) => {
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
          <Divider mb={2} borderColor="gray.200" />
          {favoriteParkings.length > 0 ? (
            <List mb={5}>
              {favoriteParkings.map((parking) => (
                <React.Fragment key={parking.properties.address.label}>
                  <Divider mb={2} borderColor="gray.200" />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Text>Nie posiadasz jeszcze ulubionych parkingów.</Text>
          )}
        </>
      )}

      {tab === "search" && (
        <Search setSelectedPointOnMap={setSelectedPointOnMap} />
      )}
    </Box>
  );
};

export default SidePanel;
