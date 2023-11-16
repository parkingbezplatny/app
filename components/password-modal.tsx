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

export default function PasswordModal({ isOpen, onClose }) {
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
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Wprowadź nowe hasło</FormLabel>
            <Input
              type="password"
              focusBorderColor="orange.400"
              placeholder="Nowe hasło"
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Powtórz nowe hasło</FormLabel>
            <Input
              type="password"
              focusBorderColor="orange.400"
              placeholder="Powtórz hasło"
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
