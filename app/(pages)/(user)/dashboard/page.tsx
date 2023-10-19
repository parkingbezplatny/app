"use client";

import React, { useState } from "react";
import {
  Box,
  useBreakpointValue,
  Slide,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "components/navbar";
import SidePanel from "components/sidepanel";

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
      <Box display="flex" height="calc(100dvh - 83px)">
        {isLargerThanLG || isPanelVisible ? (
          <Slide
            style={{ position: "absolute", top: "83px", width: "25%" }}
            direction="left"
            in={true}
          >
            <SidePanel tab={tab} setTab={setTab} parkings={parkings} />
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
