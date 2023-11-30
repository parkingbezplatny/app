import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { useUpdateUsername } from "@/lib/hooks/userHooks";
import { TModalProps } from "@/lib/types";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UsernameModal({ isOpen, onClose }: TModalProps) {
  const { data: session, update: updateSession } = useSession();
  const [username, setUsername] = useState(session?.user.username ?? "");
  const toast = useToast();

  const {
    mutate: updateUsername,
    data: updateUsernameResponse,
    isSuccess,
    isLoading,
  } = useUpdateUsername(onClose);

  const usernameChangeErrorToast = () => {
    toast({
      title: "Wystąpił problem.",
      description: "Zmiana nazwy użytkownika nie powiodła się.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const usernameChangeSuccessToast = () => {
    toast({
      title: "Sukces.",
      description: "Nazwa użytkownika została zmieniona.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const onSave = () => {
    if (session?.user.email && session.user.email !== "") {
      updateUsername({
        email: session?.user.email ?? "",
        username: username,
      });
    } else {
      usernameChangeErrorToast();
    }
  };

  useEffect(() => {
    if (isSuccess && updateUsernameResponse?.data.success) {
      updateSession();
      usernameChangeSuccessToast();
    }

    if (isSuccess && !updateUsernameResponse?.data.success) {
      usernameChangeErrorToast();
    }
  }, [isSuccess, updateUsernameResponse]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>Zmień nazwę użytkownika</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nowa nazwa użytkownika</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="orange.500"
            _hover={{
              bg: "orange.600",
            }}
            textColor="white"
            mr={3}
            onClick={onSave}
          >
            {isLoading ? "Zapisywanie..." : "Zapisz"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
