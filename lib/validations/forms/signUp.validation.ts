import * as z from "zod";

export const SignUpValidation = z.object({
  email: z
    .string({ required_error: "Email jest wymagany" })
    .min(1, { message: "Email nie może być pusty" })
    .email({ message: "Pole musi zawierać adres email" }),
  username: z
    .string({ required_error: "Nazwa użytkownika jest wymagana" })
    .min(1, { message: "Nazwa użytkownika nie może być pusta" }),
  passwords: z
    .object({
      password: z
        .string({ required_error: "Hasło jest wymagane" })
        .min(8, { message: "Hasło musi zawierać minumum 8 znaków" }),
      repetedPassword: z.string({
        required_error: "Powtórzone hasło jest wymagane",
      }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.repetedPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hasła nie są takie same",
          path: ["repetedPassword"],
        });
      }
    }),
});
