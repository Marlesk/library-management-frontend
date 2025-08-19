import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ViewBookDetails from "./ViewBookDetails"
import LoadingMessage from "@/components/LoadingMessage"
import ErrorMessage from "@/components/ErrorMessage"
import type { BookSchema } from "@/components/user/books/bookSchema"
import { getBookByIsbn } from "@/components/user/books/books"

const ViewBookPage = () => {
  const [book, setBook] = useState<BookSchema | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { isbn } = useParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getBookByIsbn(isbn)
      .then((result) => {
        setBook(result)
        setLoading(false)
      })
      .catch(() => { 
        setLoading(false)
        setError("Failed to fetch book")
      })
  }, [isbn])

  if (loading) return <LoadingMessage message="Loading book..."/>
  
  if (error) return <ErrorMessage error={error} />

  if (!book) return null

  
  return (
    <div className="max-w-4xl mx-auto bg-white md:rounded-xl md:shadow-md mb-16 p-6 mt-10">
      <ViewBookDetails book={book}/>
    </div>
  ) 
}

export default ViewBookPage