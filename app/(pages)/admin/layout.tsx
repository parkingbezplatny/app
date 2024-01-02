"use client";

import React from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "components/navbar";
import AdminSidePanel from "@/components/admin-sidepanel";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box display="flex" minH="calc(100dvh - 83px)">
        <AdminSidePanel />
        <Box flex="1" p={5}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;
