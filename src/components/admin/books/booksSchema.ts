import { z } from "zod"

export const AddBookSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required field"}),
  author: z
    .string()
    .nonempty({ message: "Author is required field"}),
  isbn: z
    .string()
    .nonempty({ message: "ISBN is required field"}),
   publisher: z
    .string(),
  coverImage: z
    .string(),
  year: z
    .string(),
  page: z
    .string(),
  genre: z
    .string(),
  description: z
    .string()
})


export type addBooksValues = z.infer<typeof AddBookSchema>

export const searchSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required field"}),
  author: z
    .string()
    .nonempty({ message: "Author is required field"})
})

export type searchBooksValues = z.infer<typeof searchSchema>

export type googleData = {
  title: string,
  author: string[],
  publisher: string,
  year: number,
  isbn: string,
  description: string,
  genre: string[],
  page: number,
  coverImage: string
}