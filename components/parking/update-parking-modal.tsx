import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiEdit } from "react-icons/fi";
import UpdateParkingForm from "./update-parking-form";

type Props = {
  parkingId: number;
};

function UpdateParkingModal({ parkingId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <FiEdit />
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edytuj parking</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UpdateParkingForm parkingId={parkingId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateParkingModal;
