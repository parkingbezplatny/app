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
import { useGetParking } from "@/lib/hooks/parkingHooks";

type Props = {
  parkingId: number;
};

function UpdateParkingModal({ parkingId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: parkingResponse } = useGetParking(
    parkingId ? parkingId.toString() : ""
  );

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
            {parkingResponse ? (
              <UpdateParkingForm
                parkingId={parkingId}
                parkingResponse={parkingResponse}
                onClose={onClose}
              />
            ) : (
              <div>Loading...</div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateParkingModal;
