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
import React from "react";
import CreateParkingModal from "./parking/create-parking-modal";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Parking {
  name: string;
  coordinates: Coordinates;
  city: string;
}

interface SidePanelProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  parkings: Parking[];
}

const SidePanel: React.FC<SidePanelProps> = ({ tab, setTab, parkings }) => {
  const createParkingModal = useDisclosure();

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
            {parkings.map((parking) => (
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

      <Button
        mt="auto"
        bg="orange.500"
        _hover={{
          bg: "orange.600",
        }}
        textColor="white"
        borderRadius="md"
        onClick={createParkingModal.onOpen}
      >
        Dodaj
      </Button>
      <CreateParkingModal
        onOpen={createParkingModal.onOpen}
        isOpen={createParkingModal.isOpen}
        onClose={createParkingModal.onClose}
      />
    </Box>
  );
};

export default SidePanel;
