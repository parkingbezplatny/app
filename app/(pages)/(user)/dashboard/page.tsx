"use client";

import {
  Box,
  Heading,
  Input,
  List,
  Text,
  Divider,
  Button,
  Center,
  HStack,
  Image,
  useBreakpointValue,
  IconButton,
  Slide,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "@/app/components/navbar";

function Dashboard() {
  const [tab, setTab] = useState("favorites");
  const isLargerThanLG = useBreakpointValue({ base: false, lg: true });
  const [isPanelVisible, setPanelVisible] = useState(false);

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
  ];

  return (
    <>
      <Navbar />
      <Box display="flex" height="calc(100vh - 83px)">
        {isLargerThanLG || isPanelVisible ? (
          <Slide
            style={{ position: "absolute", top: "83px", width: "25%" }}
            direction="left"
            in={true}
          >
            <Box
              minW="250px"
              height="100%"
              p={5}
              borderRight="1px solid #A0AEC0"
              bg="white"
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
                    {parkings.map((parking, index) => (
                      <>
                        <Divider mb={2} borderColor="gray.200" />
                        <Text fontWeight={"semibold"} key={index}>
                          {parking.name}
                        </Text>
                        <Text key={index}>{parking.city}</Text>
                        <Text
                          fontSize={"sm"}
                          fontStyle={"italic"}
                          mb={3}
                          key={index}
                        >
                          {parking.coordinates.lat}, {parking.coordinates.lng}
                        </Text>
                      </>
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
                    focusBorderColor="orange.500"
                    mb={5}
                  />
                </>
              )}
            </Box>
          </Slide>
        ) : null}
        {!isLargerThanLG && (
          <IconButton
            display={{ base: "inherit", lg: "none" }}
            position="absolute"
            top={114}
            left={isPanelVisible ? "260px" : "8"}
            rounded={"full"}
            aria-label="Toggle Panel"
            icon={isPanelVisible ? <FaChevronLeft /> : <FaChevronRight />}
            onClick={() => setPanelVisible(!isPanelVisible)}
          />
        )}
        <Box flex="1" p={5} ml={{ base: 0, lg: "25%" }}>
          <Image
            h="100%"
            w="100%"
            objectFit="cover"
            src="https://i.wpimg.pl/1424x936/filerepo.grupawp.pl/api/v1/display/embed/42799308-8932-4908-b3de-95c4bc048308"
            alt="Europe map"
          />
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
