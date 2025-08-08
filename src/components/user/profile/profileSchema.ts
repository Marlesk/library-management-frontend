import z from "zod"

export type Profile = {
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  role: string
}

export const updateProfileSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required field' })
    .email({ message: 'Email format is invalid' })
})
