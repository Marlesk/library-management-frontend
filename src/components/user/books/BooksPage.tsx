import { getBooks } from "./books"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { BooksPagination } from "./BooksPagination"
import type { BookSchema } from "./bookSchema"
import BookCard from "./BookCard"
import { Search } from "lucide-react"
import LoadingMessage from "@/components/LoadingMessage"
import ErrorMessage from "@/components/ErrorMessage"


const BOOKS_PER_PAGE = 9

const BooksPage = () => {
  const [books, setBooks] = useState<BookSchema[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const currentPage = parseInt(searchParams.get("page") || "1", 10)

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase()) 
  )

  useEffect(() => {
    getBooks()
      .then((result) => {
        setBooks(result)
        setLoading(false)
      })
      .catch(() => { 
        setLoading(false)
        setError("Failed to fetch books")
      })
  }, [])

  if (loading) return <LoadingMessage message="Loading books..."/>
    
  if (error) return <ErrorMessage error={error}/> 

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  )
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setSearchParams({ page: String(page) }) 
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

 return (
    <>
      <div className="px-6 text-center">
        <h1 className="text-3xl font-bold text-dark-blue mb-2 mt-14 md:mt-10">Explore the Library</h1>
        <p className="text-gray-800 leading-relaxed max-w-prose mx-auto">Click on a book to learn more</p>
        <div className="mt-6 flex justify-center">
          <div className="relative md:w-full w-80 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-2 focus:-outline-offset-2 focus:outline-dark-blue"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:p-20 p-10 min-h-screen">
        {currentBooks.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>

      <BooksPagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </>
  )
}

export default BooksPage