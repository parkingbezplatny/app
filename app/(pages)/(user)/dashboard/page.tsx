"use client";

import React, { useState } from "react";
import { Box, useBreakpointValue, Slide, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "components/navbar";
import SidePanel from "components/sidepanel";
import Map from "@/components/map";

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
            style={{
              position: "absolute",
              top: "83px",
              width: "25%",
              zIndex: 1,
            }}
            direction="left"
            in={true}
          >
            <SidePanel tab={tab} setTab={setTab} parkings={parkings} />
          </Slide>
        ) : null}
        {!isLargerThanLG && (
          <IconButton
            zIndex={2}
            display={{ base: "inherit", lg: "none" }}
            position="absolute"
            top={114}
            left={isPanelVisible ? "240px" : "8"}
            rounded={"full"}
            bg={"white"}
            boxShadow={"0 0 0 2px rgba(0,0,0,.1)"}
            aria-label="Toggle Sidepanel"
            icon={isPanelVisible ? <FaChevronLeft /> : <FaChevronRight />}
            onClick={() => setPanelVisible(!isPanelVisible)}
          />
        )}
        <Box flex="1" p={5} ml={{ base: 0, lg: "25%" }}>
          <Map
            lng={parkings[0].coordinates.lng}
            lat={parkings[0].coordinates.lat}
          />
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
