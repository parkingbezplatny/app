import * as z from "zod";

export const UpdateUserPasswordValidation = z.object({
  passwords: z
    .object({
      currentPassword: z
        .string({ required_error: "Hasło jest wymagane" })
        .min(8, { message: "Hasło musi zawierać minumum 8 znaków" }),
      newPassword: z
        .string({ required_error: "Hasło jest wymagane" })
        .min(8, { message: "Hasło musi zawierać minumum 8 znaków" }),
      confirmedNewPassword: z.string({
        required_error: "Powtórzonie hasła jest wymagane",
      }),
    })
    .superRefine((data, ctx) => {
      if (data.newPassword !== data.confirmedNewPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hasła nie są takie same",
          path: ["confirmedNewPassword"],
        });
      }
    }),
});
