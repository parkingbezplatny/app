"use client";

import React, { useState } from "react";
import { Box, useBreakpointValue, Slide, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "components/navbar";
import AdminSidePanel from "@/components/admin-sidepanel";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box display="flex" height="calc(100dvh - 83px)">
        <AdminSidePanel />
        <Box flex="1" p={5}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;
