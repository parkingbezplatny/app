import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export default function UsernameModal({ isOpen, onClose }) {
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
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Powtórz nową nazwę użytkownika</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Powtórz nazwę użytkownika"
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
            onClick={onClose}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
