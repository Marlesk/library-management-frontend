import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required field" }),
  
  password: z
    .string()
    .nonempty({ message: "Password is required field" })
  
})

export type loginValues=z.infer<typeof loginSchema>


