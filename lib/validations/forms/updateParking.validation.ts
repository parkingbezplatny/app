import * as z from "zod";

export const UpdateParkingValidation = z.object({
  geometry: z.object({
    lat: z
      .string({ required_error: "Lat jest wymagane" })
      .min(1, { message: "Lat nie może być pusty" }),
    lng: z
      .string({ required_error: "Lng jest wymagane" })
      .min(1, { message: "Lng nie może być pusty" }),
  }),
  properties: z.object({
    address: z.object({
      label: z
        .string({ required_error: "Label jest wymagany" })
        .min(1, { message: "Label nie może być pusty" }),
      countryName: z
        .string({ required_error: "Państwo jest wymagane" })
        .min(1, { message: "Państwo nie może być puste" }),
      state: z
        .string({ required_error: "Województwo jest wymagane" })
        .min(1, { message: "Województwo nie może być puste" }),
      county: z
        .string({ required_error: "Powiat jest wymagany" })
        .min(1, { message: "Powiat nie może być pusty" }),
      city: z
        .string({ required_error: "Miasto jest wymagane" })
        .min(1, { message: "Miasto nie może być puste" }),
      street: z.string().default("").optional(),
      postalCode: z
        .string({ required_error: "Kod pocztowy jest wymagany" })
        .min(1, { message: "Kod pocztowy nie może być pusty" }),
      houseNumber: z.string().default("").optional(),
    }),
  }),
});
