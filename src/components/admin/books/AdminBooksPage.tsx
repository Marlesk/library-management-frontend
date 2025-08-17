import { getBooks } from "@/components/user/books/books";
import { type BookSchema } from "@/components/user/books/bookSchema";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BooksPagination } from "@/components/user/books/BooksPagination";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import { Plus } from "lucide-react";
import ViewBookButton from "./view/ViewBookButton";
import DeleteBookButton from "./delete/DeleteBookButton";


const AdminBooksPage = () => {
  const [books, setBooks] = useState<BookSchema[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get("page") || "1", 10)

  const BOOKS_PER_PAGE = 12

  const navigate = useNavigate()

  const fetchBooks = async() => {
    setLoading(true)
      try {
        const result = await getBooks()
        setBooks(result)
      } catch {
        setError("Failed to fetch all users")
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  if (loading) return <LoadingMessage message="Loading books..."/>
      
  if (error) return <ErrorMessage error={error}/> 
  
  if (!books) return null

  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE)
  const indexOfLastItem = currentPage * BOOKS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - BOOKS_PER_PAGE

  const paginatedBooks = books.slice(indexOfFirstItem, indexOfLastItem)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setSearchParams({ page: String(page) }) 
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-admin">Books Management</h1>
        <button className="px-4 py-2 flex items-center gap-2 bg-cyan-600 text-white 
          rounded-lg hover:bg-cyan-700 cursor-pointer"
          onClick={() => navigate("/admin/books/add")}>
          <Plus size={18}/> Add Book
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {paginatedBooks.map((book) => (
          <div key={book.isbn} className="bg-white shadow rounded-lg mb-3">
           <div className="flex justify-center mt-5">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-40 h-60 object-cover rounded-xl mb-4"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                  book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {book.available ? "Available" : "Not Available"}
              </span>

              <div className="flex justify-end gap-4 mt-4">
               <ViewBookButton isbn={book.isbn}/>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg 
                 hover:bg-yellow-600 cursor-pointer">
                  Edit
                </button>
                <DeleteBookButton key={book.isbn} isbn={book.isbn} deleteSuccess={fetchBooks}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <BooksPagination 
          totalPages={totalPages}
          goToPage={goToPage}
          currentPage={currentPage}
        /> 
      </div>
      
    </div>
  )
}

export default AdminBooksPage
