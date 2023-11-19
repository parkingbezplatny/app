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
  userId: number;
};

function DeleteUserModal({ userId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const deleteUser = async () => {
    //TODO call to API for delete
    alert(userId);
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
          <ModalHeader>Usuń użytkownika</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex direction="column" gap="1rem">
              <Text>Czy napewno chcesz usunąć użytkownika?</Text>
              <Flex direction="row" justify="space-between">
                <Button onClick={onClose} w="100px" size="md" variant="ghost">
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
                  onClick={deleteUser}
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

export default DeleteUserModal;
