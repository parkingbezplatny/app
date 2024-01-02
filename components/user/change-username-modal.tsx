"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { TModalProps, TUpdateUserUsername } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserUsernameValidation } from "@/lib/validations/forms/updateUserUsername.validation";

export default function ChangeUsernameModal({ isOpen, onClose }: TModalProps) {
  const { data: session, update: updateSession } = useSession();

  const onSuccess = () => {
    updateSession();
    onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateUserUsername>({
    resolver: zodResolver(UpdateUserUsernameValidation),
    mode: "onChange",
    defaultValues: {
      username: session?.user.username,
    },
  });

  const { mutate: updateUsername, isLoading } = useUpdateUsername(onSuccess);

  const onSave = (values: TUpdateUserUsername) => {
    if (session?.user.email && session.user.email !== "") {
      updateUsername({
        email: session.user.email,
        username: values.username,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={2}>
        <form onSubmit={handleSubmit(onSave)}>
          <ModalHeader>Zmień nazwę użytkownika</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="username" isInvalid={!!errors.username}>
              <FormLabel>Nowa nazwa użytkownika</FormLabel>
              <Input
                focusBorderColor="orange.400"
                placeholder="Nazwa użytkownika"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Nazwa użytkownika jest wymagana",
                  },
                })}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
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
              type="submit"
              isLoading={isLoading}
            >
              Zapisz
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Anuluj
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
