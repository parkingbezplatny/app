"use client";

import useAdminFunctions from "@/lib/hooks/useAdminFunctions";
import { TUser } from "@/lib/types";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";

type Props = {
  userId: number;
};

type SwitchFormProps = {
  updateAdmin: (isAdmin: boolean) => Promise<void>;
  user: TUser;
  isLoading: boolean;
  onClose: () => void;
};

function SwitchForm({
  user,
  updateAdmin,
  isLoading,
  onClose,
}: SwitchFormProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(user.isAdmin);

  return (
    <Flex direction="column" gap="1rem">
      <Flex direction="column" justify="space-between" gap="1rem">
        <FormControl>
          <FormLabel>Administrator</FormLabel>
          <Switch
            colorScheme="orange"
            defaultChecked={isAdmin}
            onChange={(e) => {
              setIsAdmin(e.target.checked);
            }}
          />
        </FormControl>
        <Flex direction="row" justify="space-between">
          <Button onClick={onClose} w="100px" size="md" variant="ghost">
            Anuluj
          </Button>
          <Button
            textColor="white"
            w="100px"
            size="md"
            bg="orange.500"
            _hover={{
              bg: "orange.600",
            }}
            onClick={(e) => {
              e.preventDefault();
              updateAdmin(isAdmin);
            }}
            isLoading={isLoading}
          >
            Zapisz
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

function SetUserAdminModal({ userId }: Props) {
  const queryClient = useQueryClient();
  const { getUserById, updateUserById } = useAdminFunctions();
  const { data: user, status } = getUserById(userId.toString() ?? "");
  const { mutateAsync, isLoading } = updateUserById();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const updateAdmin = async (isAdmin: boolean) => {
    if (isAdmin === user?.data.isAdmin || isAdmin === undefined) return;
    await mutateAsync({ isAdmin: isAdmin, userId: userId.toString() });
    await queryClient.invalidateQueries(["getAllUsersAdmin"]);
    await queryClient.invalidateQueries(["getUserAdmin", userId.toString()]);
    onClose();
  };

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <FiEdit />
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zrób administratora</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {status === "loading" || !user?.data ? (
              <div>Loading...</div>
            ) : (
              <SwitchForm
                user={user.data}
                updateAdmin={updateAdmin}
                isLoading={isLoading}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SetUserAdminModal;
