"use client";

import React, { useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function SignUp() {
  return (
    <Flex
      minH={"90dvh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"2xl"}
          border={"1px solid #e4e4e7"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Heading fontSize={"2xl"} mb={4}>
            Zarejestruj się
          </Heading>
          <Stack spacing={4} w={{ base: 300, sm: 400 }}>
            <FormControl id="email">
              <FormLabel fontSize={"md"}>Email</FormLabel>
              <Input
                type="email"
                placeholder="Wpisz adres email"
                focusBorderColor="orange.500"
              />
            </FormControl>
            <FormControl id="username">
              <FormLabel fontSize={"md"}>Nazwa użytkownika</FormLabel>
              <Input
                type="text"
                placeholder="Wpisz nazwę użytkownika"
                focusBorderColor="orange.500"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Hasło</FormLabel>
              <Input
                type="password"
                placeholder="Wpisz hasło"
                focusBorderColor="orange.500"
              />
            </FormControl>
            <FormControl id="confirmedPassword">
              <FormLabel>Powtórz hasło</FormLabel>
              <Input
                type="password"
                placeholder="Wpisz ponownie hasło"
                focusBorderColor="orange.500"
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                mt={2}
                bg="orange.500"
                _hover={{
                  bg: "#C05621",
                }}
                textColor="white"
              >
                Zarejestruj się
              </Button>
            </Stack>
            <Stack pt={2}>
              <Text fontSize={{ base: "sm", sm: "md" }} align={"center"}>
                Masz już konto?{" "}
                <Link
                  href="/sign-in"
                  fontWeight={"semibold"}
                  color={"orange.500"}
                >
                  Zaloguj się
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp;
