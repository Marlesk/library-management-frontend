import { z } from "zod"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$]).{8,}$/

export const registerSchema = z.object({
  firstname: z
    .string()
    .nonempty({ message: 'First Name is required field' }),
  lastname: z
    .string()
    .nonempty({ message: 'Last Name is required field' }),
  email: z
    .string()
    .nonempty({ message: 'Email is required field' })
    .email({ message: 'Email format is invalid' }),
  username: z
    .string()
    .nonempty({ message: 'Username is required field' }),
  password: z 
    .string()
    .nonempty({ message: 'Password is required field' })
    .regex(
      passwordRegex,"Password format is invalid"
    ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
})

export type registerValues = z.infer<typeof registerSchema>
