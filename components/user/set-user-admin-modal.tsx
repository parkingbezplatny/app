import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";

type Props = {
  userId: number;
};

function SetUserAdminModal({ userId }: Props) {
  const [isAdmin, setIsAdmin] = useState<string>("false");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const updateAdmin = async () => {
    //TODO call to API for delete
    alert(isAdmin);
    onClose();
  };
  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <FiEdit />
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zrób administratora</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex direction="column" gap="1rem">
              <Flex direction="column" justify="space-between" gap="1rem">
                <FormControl>
                  <FormLabel>Administrator</FormLabel>
                  <Select
                    defaultValue={isAdmin}
                    onChange={(e) => {
                      setIsAdmin(e.target.value);
                    }}
                  >
                    <option value="true">Tak</option>
                    <option value="false">Nie</option>
                  </Select>
                </FormControl>
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
                    onClick={updateAdmin}
                  >
                    Zapisz
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SetUserAdminModal;
