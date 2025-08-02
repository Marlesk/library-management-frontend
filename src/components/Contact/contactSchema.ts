import { z } from 'zod'

export const contactSchema = z.object({
  firstname: z
    .string()
    .nonempty({ message: 'First Νame is required field' }),
  lastname: z
    .string()
    .nonempty({ message: 'Last Νame is required field' }),
  email: z
    .string()    
    .nonempty({ message: 'Email is required field' })
    .email({ message: 'Email format is invalid' }),
  message: z
    .string()
    .nonempty({ message: 'Message is required field' }),
})

export type contactValues = z.infer<typeof contactSchema>