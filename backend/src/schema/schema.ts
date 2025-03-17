import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, "username must min of 3 letters.")
    .max(10, "username cannot be more than 10 letter"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at least 8 characters long" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    })
});


export  type User = z.infer<typeof UserSchema>