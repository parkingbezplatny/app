"use client";

import { ChakraProvider, useToast } from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { getErrorMessage } from "../helpers/errorMessage";
import { ApiResponse } from "../helpers/server-function-response";

export default function Providers({ children }: { children: React.ReactNode }) {
  const toast = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (err: unknown) => {
        toast({
          title: getErrorMessage(err),
          status: "error",
          isClosable: true,
        });
      },
    }),
    mutationCache: new MutationCache({
      onError: (err: unknown) => {
        toast({
          title: getErrorMessage(err),
          status: "error",
          isClosable: true,
        });
      },
      onSuccess: (data: unknown) => {
        toast({
          title: (data as ApiResponse<unknown>).message,
          status: "success",
          isClosable: true,
        });
        queryClient.invalidateQueries();
      },
    }),
  });

  return (
    <SessionProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
