import { TModalProps } from "@/lib/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import CreateParkingForm from "./create-parking-form";
import { useCreateParking } from "@/lib/hooks/userHooks";

function CreateParkingModal({ onOpen, isOpen, onClose }: TModalProps) {
  const initialRef = useRef(null);

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj nowy parking</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateParkingForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateParkingModal;
