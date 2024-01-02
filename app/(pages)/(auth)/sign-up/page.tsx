"use client";

import { useSignUp } from "@/lib/hooks/authHooks";
import { TSignUpForm } from "@/lib/types";
import { SignUpValidation } from "@/lib/validations/forms/signUp.validation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpForm>({
    resolver: zodResolver(SignUpValidation),
    mode: "onChange",
  });

  const { mutate: credentialsSignUp, isSuccess, isLoading } = useSignUp();

  const onSubmit = async (data: TSignUpForm) => {
    credentialsSignUp(data);
    if (isSuccess) router.push("/sign-in");
  };

  useEffect(() => {
    if (isSuccess) router.push("/sign-in");
  }, [isSuccess]);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} w={{ base: 300, sm: 400 }}>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel fontSize="md">Email</FormLabel>
                  <Input
                    placeholder="Wpisz adres email"
                    focusBorderColor="orange.400"
                    {...register("email", {
                      required: { value: true, message: "Email jest wymagany" },
                    })}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl id="username" isInvalid={!!errors.username}>
                  <FormLabel fontSize="md">Nazwa użytkownika</FormLabel>
                  <Input
                    placeholder="Wpisz nazwę użytkownika"
                    focusBorderColor="orange.400"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Nazwa użytkownika jest wymagana",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="password"
                  isInvalid={!!errors.passwords?.password}
                >
                  <FormLabel fontSize="md">Hasło</FormLabel>
                  <Input
                    type="password"
                    placeholder="Wpisz hasło"
                    focusBorderColor="orange.400"
                    {...register("passwords.password", {
                      required: { value: true, message: "Hasło jest wymagane" },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.passwords?.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="confirmedPassword"
                  isInvalid={!!errors.passwords?.confirmedPassword}
                >
                  <FormLabel fontSize="md">Powtórz hasło</FormLabel>
                  <Input
                    type="password"
                    placeholder="Powtórz hasło"
                    focusBorderColor="orange.400"
                    {...register("passwords.confirmedPassword", {
                      required: {
                        value: true,
                        message: "Powtórzenie hasła jest wymagane",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.passwords?.confirmedPassword?.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  mt={2}
                  bg="orange.500"
                  _hover={{
                    bg: "#C05621",
                  }}
                  textColor="white"
                  isLoading={isLoading}
                >
                  Zarejestruj się
                </Button>
              </Stack>
            </form>

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
