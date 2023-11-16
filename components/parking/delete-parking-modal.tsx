import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  parkingId: number;
};

function DeleteParkingModal({ parkingId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const deleteParking = async () => {
    //TODO call to API for delete
    alert(parkingId);
    onClose();
  };
  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <AiOutlineDelete />
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Usuń parking</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex direction="column" gap="1rem">
              <Text>Czy napewno chcesz usunąć parking?</Text>
              <Flex direction="row" justify="space-between">
                <Button
                  onClick={onOpen}
                  bg="green.400"
                  _hover={{
                    bg: "#DD6B20",
                  }}
                  textColor="white"
                  w="100px"
                  size="md"
                >
                  Anuluj
                </Button>
                <Button
                  bg="red.400"
                  _hover={{
                    bg: "#DD6B20",
                  }}
                  textColor="white"
                  w="100px"
                  size="md"
                  onClick={deleteParking}
                >
                  Tak
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteParkingModal;