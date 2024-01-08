"use client";

import { ChakraProvider, useToast } from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { ApiResponse } from "../helpers/server-function-response";
import { AxiosError, AxiosResponse } from "axios";
import { MapContextProvider } from "../context/mapContext";
import { queryClient } from "../query/queryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const toast = useToast();

  return (
    <SessionProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <MapContextProvider>{children}</MapContextProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
