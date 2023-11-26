"use client";

import Map, { TMapProps } from "@/components/map";
import agent from "@/lib/api/agent";
import { Box, IconButton, Slide, useBreakpointValue } from "@chakra-ui/react";
import { Address } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Navbar from "components/navbar";
import SidePanel, { Parking } from "components/sidepanel";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function getParkingName(address: Address) {
  return `${address.street} ${address.houseNumber}, ${address.city} ${address.postalCode}, ${address.county}`;
}

function Dashboard() {
  const [tab, setTab] = useState("favorites");
  const isLargerThanLG = useBreakpointValue({ base: false, lg: true });
  const [isPanelVisible, setPanelVisible] = useState(false);

  const {
    data: parkingsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["parkings"],
    queryFn: () => agent.Parkings.list(),
  });

  const parkings: Parking[] =
    !parkingsResponse || !parkingsResponse.data || parkingsResponse.data.length === 0
      ? []
      : parkingsResponse.data.map((parking) => {
          return {
            name: getParkingName(parking.properties?.address as Address),
            coordinates: {
              lat: parking.geometry.coordinates[0],
              lng: parking.geometry.coordinates[1],
            },
            city: parking.properties.address.city,
          };
        });

  const mapProps: TMapProps =
    !parkingsResponse || !parkingsResponse.data || parkingsResponse.data.length === 0
      ? { lng: 0.0, lat: 0.0 }
      : {
          lng: parkingsResponse.data[0].geometry.coordinates[0],
          lat: parkingsResponse.data[0].geometry.coordinates[1],
        };

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
            <SidePanel tab={tab} setTab={setTab} parkings={...parkings} />
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
          <Map lng={mapProps.lng} lat={mapProps.lat} />
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
