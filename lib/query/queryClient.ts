import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "../helpers/server-function-response";
import { createStandaloneToast } from "@chakra-ui/react";
import { getErrorMessage } from "../helpers/getErrorMessage";

const { toast } = createStandaloneToast();

export const queryClient = new QueryClient({
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
      let message = "";
      if (
        err !== null &&
        typeof err === "object" &&
        "message" in err &&
        "data" in err
      ) {
        message = err.message as string;
      } else {
        if (err instanceof AxiosError) {
          const data = err.response?.data as ApiResponse<unknown>;
          message = data.message;
        }
      }
      toast({
        title: getErrorMessage(message),
        status: "error",
        isClosable: true,
      });
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
