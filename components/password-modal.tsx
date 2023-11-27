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
  useToast,
} from "@chakra-ui/react";

import { useUpdatePassword } from "@/lib/hooks/userHooks";
import { TModalProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PasswordModal({ isOpen, onClose }: TModalProps) {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const toast = useToast();

  const { mutate: updatePassword, isLoading } = useUpdatePassword(onClose);

  const onSave = () => {
    if (session?.user.email && session.user.email !== "") {
      return updatePassword({
        email: session?.user.email ?? "",
        passwords: {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmedNewPassword: confirmedNewPassword,
        },
      });
    } else {
      toast({
        title: "Wystąpił problem.",
        description: "Zmiana hasła nie powiodła się.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>Zmień hasło</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Wprowadź aktualne hasło</FormLabel>
            <Input
              type="password"
              focusBorderColor="orange.400"
              placeholder="Aktualne hasło"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Wprowadź nowe hasło</FormLabel>
            <Input
              type="password"
              focusBorderColor="orange.400"
              placeholder="Nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Powtórz nowe hasło</FormLabel>
            <Input
              type="password"
              focusBorderColor="orange.400"
              placeholder="Powtórz hasło"
              value={confirmedNewPassword}
              onChange={(e) => setConfirmedNewPassword(e.target.value)}
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
            {isLoading ? "Save..." : "Save"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
