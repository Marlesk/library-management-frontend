import { getBooks } from "@/components/user/books/books";
import { type BookSchema } from "@/components/user/books/bookSchema";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BooksPagination } from "@/components/user/books/BooksPagination";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import { Plus, Search } from "lucide-react";
import ViewBookButton from "./view/ViewBookButton";
import DeleteBookButton from "./delete/DeleteBookButton";
import EditButton from "./edit/EditButton";


const AdminBooksPage = () => {
  const [books, setBooks] = useState<BookSchema[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [title, setTitle] = useState<string>('')
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

  const filteredBooks = books.filter(
    (book) => book.title.toLowerCase().includes(title.toLowerCase()) 
  )

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  const indexOfLastItem = currentPage * BOOKS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - BOOKS_PER_PAGE

  const paginatedBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setSearchParams({ page: String(page) }) 
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl font-bold text-admin text-center mb-10">Books Management</h1>
        <div className="flex justify-between items-center mb-10">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="md:w-80 w-60 pl-10 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
          <button className="px-4 py-2 flex items-center gap-2 bg-cyan-600 text-white 
            rounded-lg hover:bg-cyan-700 cursor-pointer"
            onClick={() => navigate("/admin/books/add")}>
            <Plus size={18}/> Add Book
          </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {paginatedBooks.length > 0 ? (
          paginatedBooks.map((book) => (
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
                  <EditButton isbn={book.isbn}/>
                  <DeleteBookButton key={book.isbn} isbn={book.isbn} deleteSuccess={fetchBooks}/>
                </div>
              </div>
            </div>
          ))
        ) : (
         <div className="col-span-3 flex justify-center py-6">
          <p className="text-center text-gray-500 text-lg">No books found</p>
        </div>
        )}
      </div>
      
      <div className="mt-10">
        {totalPages > 1 && (
          <BooksPagination 
            totalPages={totalPages}
            goToPage={goToPage}
            currentPage={currentPage}
          /> 
        )}
      </div>
    </div>
  )
}

export default AdminBooksPage
