"use client";

import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { MapContextProvider } from "../context/mapContext";
import { queryClient } from "../query/queryClient";

const { ToastContainer, toast } = createStandaloneToast();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <MapContextProvider>
            {children}
            <ToastContainer />
          </MapContextProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
