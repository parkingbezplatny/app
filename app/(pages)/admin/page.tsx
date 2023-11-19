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
      <Heading>Admin Dashboard</Heading>
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
            body={
              <Text>
                Tutaj możesz przeglądać, usuwać i zmieniać role użytkowników
              </Text>
            }
            footer={
              <Link href="/admin/user">
                <Button variant="ghost" minW="100px">
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
              <Text>
                Tutaj możesz przeglądać, usuwać, edytować i tworzyć parkingi
              </Text>
            }
            footer={
              <Link href="/admin/parking">
                <Button variant="ghost" minW="100px">
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
