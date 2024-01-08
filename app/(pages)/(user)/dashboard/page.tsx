"use client";

import Map from "@/components/map";
import { useMapContext } from "@/lib/hooks/useMapContext";
import { Box, IconButton, Slide, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "components/navbar";
import SidePanel from "components/sidepanel";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Dashboard() {
  const { handleSetMapNode, mapNode } = useMapContext();
  const isLargerThanLG = useBreakpointValue({ base: false, lg: true });
  const isLargerThanMD = useBreakpointValue({ base: false, md: true });
  const [isPanelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    if (!mapNode) {
      handleSetMapNode(<Map />);
    }
  }, [mapNode]);

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
            <SidePanel />
          </Slide>
        ) : null}
        {!isLargerThanLG && (
          <IconButton
            zIndex={2}
            display={{ base: "inherit", lg: "none" }}
            position="absolute"
            top={114}
            left={isPanelVisible ? (isLargerThanMD ? "240px" : "5") : "8"}
            rounded={"full"}
            bg={"white"}
            boxShadow={"0 0 0 2px rgba(0,0,0,.1)"}
            aria-label="Toggle Sidepanel"
            icon={isPanelVisible ? <FaChevronLeft /> : <FaChevronRight />}
            onClick={() => setPanelVisible(!isPanelVisible)}
          />
        )}
        <Box flex="1" p={{base: 2, md: 5}} ml={{ base: 0, lg: "25%" }}>
          {mapNode}
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
