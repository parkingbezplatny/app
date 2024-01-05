"use client";

import Map from "@/components/map";
import NewMap from "@/components/newMap";
import { Box, IconButton, Slide, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "components/navbar";
import SidePanel from "components/sidepanel";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Dashboard() {
  const isLargerThanLG = useBreakpointValue({ base: false, lg: true });
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [selectedPointOnMap, setSelectedPointOnMap] = useState<number[]>([
    19.0, 51.5,
  ]);

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
            <SidePanel setSelectedPointOnMap={setSelectedPointOnMap} />
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
          <Map selectedPointOnMap={selectedPointOnMap} />
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
