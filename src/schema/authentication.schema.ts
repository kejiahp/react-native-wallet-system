import * as z from "zod";

export const registration_validation_schema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email()
    .min(1, "email is required"),
  password: z
    .string({ required_error: "password is required" })
    .min(1, "password is required"),
});

export type RegistrationValidationSchemaType = z.infer<
  typeof registration_validation_schema
>;

export const login_validation_schema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email()
    .min(1, "email is required"),
  password: z
    .string({ required_error: "password is required" })
    .min(1, "password is required"),
});

export type LoginValidationSchemaType = z.infer<typeof login_validation_schema>;
