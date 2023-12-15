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
  VStack,
} from "@chakra-ui/react";

import { useUpdatePassword } from "@/lib/hooks/userHooks";
import { TModalProps, TUpdateUserPassword } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { UpdateUserPasswordValidation } from "@/lib/validations/forms/updateUserPassword.validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChangePasswordModal({ isOpen, onClose }: TModalProps) {
  const { data: session, update: updateSession } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateUserPassword>({
    resolver: zodResolver(UpdateUserPasswordValidation),
    mode: "onChange",
  });

  const onSuccess = () => {
    updateSession();
    onClose();
  };

  const onSave = (values: TUpdateUserPassword) => {
    if (session?.user.email && session.user.email !== "") {
      return updatePassword({
        email: session.user.email,
        passwords: {
          currentPassword: values.passwords.currentPassword,
          newPassword: values.passwords.newPassword,
          confirmedNewPassword: values.passwords.confirmedNewPassword,
        },
      });
    }
  };

  const { mutate: updatePassword, isLoading } = useUpdatePassword(onSuccess);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={2}>
        <form onSubmit={handleSubmit(onSave)}>
          <ModalHeader>Zmień hasło</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap="1rem">
              <FormControl
                id="passwords.currentPassword"
                isInvalid={!!errors.passwords?.currentPassword}
              >
                <FormLabel>Aktualne hasło</FormLabel>
                <Input
                  focusBorderColor="orange.400"
                  placeholder="Aktualne hasło"
                  type="password"
                  {...register("passwords.currentPassword", {
                    required: {
                      value: true,
                      message: "Aktualne hasło jest wymagane",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.passwords?.currentPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="passwords.newPassword"
                isInvalid={!!errors.passwords?.newPassword}
              >
                <FormLabel>Nowe hasło hasło</FormLabel>
                <Input
                  focusBorderColor="orange.400"
                  placeholder="Nowe hasło"
                  type="password"
                  {...register("passwords.newPassword", {
                    required: {
                      value: true,
                      message: "Nowe hasło jest wymagane",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.passwords?.newPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="passwords.confirmedNewPassword"
                isInvalid={!!errors.passwords?.confirmedNewPassword}
              >
                <FormLabel>Powtórz nowe hasło</FormLabel>
                <Input
                  focusBorderColor="orange.400"
                  placeholder="Powtórz nowe hasło"
                  type="password"
                  {...register("passwords.confirmedNewPassword", {
                    required: {
                      value: true,
                      message: "Powtórzone hasło jest wymagane",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.passwords?.confirmedNewPassword?.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
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
