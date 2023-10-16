import Link from "next/link";
import React from "react";
import { Box, Heading, Text, Button, Flex, Image } from "@chakra-ui/react";

function WelcomePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="90vh"
      textAlign="center"
      mx={4}
    >
      <Image
        src="welcome-page-parking.jpg"
        alt="Dwie osoby na tle samochodu i znaku parkingu"
        mb={4}
        w={{ base: 300, md: 400 }}
        h={{ base: 200, md: 300 }}
      />
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={4}>
        Witaj w naszym serwisie z darmowymi parkingami!
      </Heading>
      <Text fontSize={{ base: "sm", md: "xl" }}>
        Cieszymy się, że jesteś tutaj. Rozpocznij wyszukiwanie idealnego miejsca
        parkingowego już teraz!
      </Text>
      <Flex mt={4}>
        <Link href="/pages/sign-in">
          <Button
            size={{ base: "sm", md: "md" }}
            bg="orange.400"
            _hover={{
              bg: "#DD6B20",
            }}
            textColor="white"
            mr={4}
          >
            Zaloguj się
          </Button>
        </Link>
        <Link href="/pages/sign-up">
          <Button
            size={{ base: "sm", md: "md" }}
            bg="orange.500"
            _hover={{
              bg: "#C05621",
            }}
            textColor="white"
          >
            Zarejestruj się
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default WelcomePage;
