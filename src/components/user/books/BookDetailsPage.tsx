import { useEffect, useState } from "react"
import { getBookByTitle } from "./books"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import type { BookSchema } from "./bookSchema"
import BookDetails from "./BookDetails"

const BookDetailsPage = () => {
  const [book, setBook] = useState<BookSchema | null>(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const { title } = useParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getBookByTitle(title)
      .then((result) => {
        if (result === "unauthorized") {
          toast.error('Expired token. Login again')
          navigate('/auth/login')
          return 
        }
        setBook(result)
        setLoading(false)
      })
      .catch(() => { 
        setLoading(false)
        setError("Failed to fetch books")
      })
  }, [title])

  if (loading) {
    return <div className="text-center py-20 text-gray-600 min-h-screen">Loading book...</div>
  }

  if (error || !book) {
  return (
      <div className="text-center py-20 text-red-600 min-h-screen">
        {error}
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto bg-white md:rounded-xl md:shadow-md mb-16 p-6">
      <BookDetails book={book}/>
    </div>
  )
}

export default BookDetailsPage