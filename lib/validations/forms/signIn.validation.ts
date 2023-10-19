import * as z from "zod";

export const SignInValidation = z.object({
  email: z
    .string({ required_error: "Email jest wymagany" })
    .min(1, { message: "Email nie może być pusty" })
    .email({ message: "Pole musi zawierać adres email" }),
  password: z
    .string({ required_error: "Hasło jest wymagane" })
    .min(1, { message: "Hasło nie może być puste" }),
});
