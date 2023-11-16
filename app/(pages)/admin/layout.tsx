"use client";

import React, { useState } from "react";
import { Box, useBreakpointValue, Slide, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "components/navbar";
import AdminSidePanel from "@/components/admin-sidepanel";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLargerThanLG = useBreakpointValue({ base: false, lg: true });
  const [isPanelVisible, setPanelVisible] = useState(false);

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
            <AdminSidePanel />
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
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;
