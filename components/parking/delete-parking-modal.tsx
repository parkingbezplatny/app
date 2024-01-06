import { useDeleteParking } from "@/lib/hooks/parkingHooks";
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
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  parkingId: number;
};

function DeleteParkingModal({ parkingId }: Props) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const { mutateAsync: deleteParking, status } = useDeleteParking(onClose);

  async function onDelete() {
    await deleteParking(parkingId.toString());
    await queryClient.invalidateQueries(["parkings"]);
  }

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
                <Button onClick={onClose} variant="ghost" w="100px" size="md">
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
                  onClick={onDelete}
                  isLoading={status === "loading"}
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
