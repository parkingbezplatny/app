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
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UsernameModal({ isOpen, onClose }: TModalProps) {
  const { data: session, update: updateSession } = useSession();
  const [username, setUsername] = useState(session?.user.username ?? "");

  const onSuccess = () => {
    updateSession();
    onClose();
  };

  const { mutate: updateUsername, isLoading } = useUpdateUsername(onSuccess);

  const onSave = () => {
    if (session?.user.email && session.user.email !== "") {
      updateUsername({
        email: session.user.email,
        username: username,
      });
    }
  };

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
            isLoading={isLoading}
          >
            Zapisz
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Anuluj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
