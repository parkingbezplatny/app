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

export default function Providers({ children }: { children: React.ReactNode }) {
  const toast = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (err: unknown) => {
        if (err instanceof AxiosError) {
          const data = err.response?.data as ApiResponse<unknown>;
          toast({
            title: getErrorMessage(data.message),
            status: "error",
            isClosable: true,
          });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (err: unknown) => {
        if (err instanceof AxiosError) {
          const data = err.response?.data as ApiResponse<unknown>;
          toast({
            title: getErrorMessage(data.message),
            status: "error",
            isClosable: true,
          });
        }
      },
      onSuccess: (data: unknown) => {
        let message = "";
        if (typeof data === "object" && data !== null && "message" in data) {
          message = data.message as string;
        } else {
          const dataResponse = data as AxiosResponse;
          const dataFromResponse = dataResponse.data as ApiResponse<unknown>;
          message = dataFromResponse.message;
        }
        toast({
          title: getErrorMessage(message),
          status: "success",
          isClosable: true,
        });
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
