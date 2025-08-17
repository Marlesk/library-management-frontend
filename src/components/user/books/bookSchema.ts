export type BookSchema = {
  title: string
  author: string[]
  publisher?: string
  year?: number
  isbn: string
  description?: string
  genre?: string[]
  page?: number
  coverImage?: string
  available?: boolean
}

export type RequestSchema = {
  borrowCode: string
}
