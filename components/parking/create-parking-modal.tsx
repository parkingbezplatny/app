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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import CreateParkingForm from "./create-parking-form";

function CreateParkingModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        bg="orange.400"
        _hover={{
          bg: "#DD6B20",
        }}
        textColor="white"
        w="100px"
        size="md"
      >
        Dodaj
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj nowy parking</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateParkingForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateParkingModal;
