import AdminCard from "@/components/admin-card";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Admin() {
  return (
    <Flex direction="column" gap="2rem">
      <Heading>Panel administratora</Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="1rem"
      >
        <GridItem>
          <AdminCard
            header={"Zarządzaj użytkownikami"}
            body={<Text>Przeglądaj, usuwaj i zmieniaj role użytkowników.</Text>}
            footer={
              <Link href="/admin/user">
                <Button
                  border="1px"
                  borderColor="gray.400"
                  bg="transparent"
                  _hover={{
                    bg: "#C05621",
                    textColor: "white",
                    border: "1px solid white",
                  }}
                  textColor="black"
                  minW="100px"
                >
                  Zarządzaj
                </Button>
              </Link>
            }
          />
        </GridItem>
        <GridItem>
          <AdminCard
            header={"Zarządzaj parkingami"}
            body={
              <Text>Przeglądaj, usuwaj, edytuj i twórz nowe parkingi.</Text>
            }
            footer={
              <Link href="/admin/parking">
                <Button
                  border="1px"
                  borderColor="gray.400"
                  bg="transparent"
                  _hover={{
                    bg: "#C05621",
                    textColor: "white",
                    border: "1px solid white",
                  }}
                  textColor="black"
                  minW="100px"
                >
                  Zarządzaj
                </Button>
              </Link>
            }
          />
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default Admin;
