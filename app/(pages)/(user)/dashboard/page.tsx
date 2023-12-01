"use client";

import Map, { TMapProps } from "@/components/map";
import { useGetFavoriteParkings } from "@/lib/hooks/userHooks";
import { Box, IconButton, Slide, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "components/navbar";
import SidePanel from "components/sidepanel";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Dashboard() {
  const { data: session } = useSession();
  const [tab, setTab] = useState("favorites");
  const isLargerThanLG = useBreakpointValue({ base: false, lg: true });
  const [isPanelVisible, setPanelVisible] = useState(false);

  const favoriteParkingsIds =
    session?.user.favoriteParkings?.map((parking) => parking.id) ?? [];
  const { data: parkingsQueryResult, isSuccess } =
    useGetFavoriteParkings(favoriteParkingsIds);

  const parkings = parkingsQueryResult === undefined ? [] : parkingsQueryResult;

  const mapProps: TMapProps =
    parkings && parkings.length > 0
      ? parkings[0].coordinates
      : { lng: 0.0, lat: 0.0 };

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
