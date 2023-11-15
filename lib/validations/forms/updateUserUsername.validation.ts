import * as z from "zod";

export const UpdateUserUsernameValidation = z.object({
  username: z
    .string({ required_error: "Nazwa użytkownika jest wymagana" })
    .min(1, { message: "Nazwa użytkownika nie może być pusta" }),
  password: z
    .string({ required_error: "Hasło jest wymagane" })
    .min(8, { message: "Hasło musi zawierać minumum 8 znaków" }),
});
