"use client";

import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Icon,
  Stack,
  HStack,
  Divider,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

function SignIn() {
  const googleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  const credentialSignIn = async () => {
    await signIn("credentials", {
      email: "email",
      password: "password",
      callbackUrl: "/",
    });
  };

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={4} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"2xl"}
          border={"1px solid #e4e4e7"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Heading fontSize={"2xl"} mb={4}>
            Zaloguj się
          </Heading>
          <Stack spacing={4} w={{ base: 300, sm: 400 }}>
            <FormControl id="email">
              <FormLabel fontSize={"md"}>Email</FormLabel>
              <Input type="email" focusBorderColor="orange.400" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Hasło</FormLabel>
              <Input type="password" focusBorderColor="orange.400" />
            </FormControl>
            <Stack spacing={6}>
              <Button
                onClick={credentialSignIn}
                mt={2}
                bg="orange.400"
                _hover={{
                  bg: "#DD6B20",
                }}
                textColor="white"
              >
                Zaloguj się
              </Button>
              <HStack>
                <Divider borderColor="gray.200" />
                <Text
                  minW={36}
                  fontSize={{ base: "sm", sm: "md" }}
                  align="center"
                >
                  lub kontynuuj z
                </Text>
                <Divider borderColor="gray.200" />
              </HStack>
              <Button
                leftIcon={<Icon as={FaGoogle} />}
                onClick={googleSignIn}
                border={"1px solid #e4e4e7"}
                bg={"white"}
                _hover={{
                  bg: "#f4f4f5",
                }}
              >
                Google
              </Button>
            </Stack>
            <Stack pt={2}>
              <Text fontSize={{ base: "sm", sm: "md" }} align={"center"}>
                Nie masz jeszcze konta?{" "}
                <Link
                  href="/sign-up"
                  fontWeight={"semibold"}
                  color={"orange.500"}
                >
                  Zarejestruj się
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignIn;
