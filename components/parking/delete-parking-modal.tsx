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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  parkingId: number;
};

function DeleteParkingModal({ parkingId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = useRef(null);

  const deleteParkingErrorToast = () => {
    toast({
      title: "Wystąpił problem.",
      description: "Usuwanie parkingu nie powiodło się.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const deleteParkingSuccessToast = () => {
    toast({
      title: "Sukces.",
      description: "Pomyślnie usunięto parking.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const {
    mutate: deleteParking,
    data: deleteParkingResponse,
    isSuccess,
  } = useDeleteParking(onClose);

  useEffect(() => {
    if (isSuccess && deleteParkingResponse?.data.success) {
      deleteParkingSuccessToast();
    }

    if (isSuccess && !deleteParkingResponse?.data.success) {
      deleteParkingErrorToast();
    }
  }, [isSuccess, deleteParkingResponse]);

  function onDelete() {
    deleteParking(parkingId.toString());
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
