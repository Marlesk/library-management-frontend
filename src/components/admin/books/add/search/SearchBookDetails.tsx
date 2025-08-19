import { X } from "lucide-react";
import { toast } from "sonner";
import type { googleData } from "../../booksSchema";

type BookDetailsProps = {
  book: googleData
  onClose: () => void;
}

const API_URL: string = import.meta.env.VITE_API_URL

const SearchBookDetails = ({ book, onClose }: BookDetailsProps) => {
  const handleSaveBook = async (book: googleData) => {
    if (!book.title || !book.author || !book.isbn) {
      toast.error("Title, Author and ISBN are required to save the book");
      return
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_URL}/api/admin/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(book)
      })

      const result = await res.json()
      
      if (!res.ok) {
        if (res.status === 409 && result.errors?.isbn) {
          toast.error(result.errors.isbn);
        } else if (result.message) {
          toast.error(result.message);
        } else {
          toast.error("Failed to add book");
        }
        return;
      }
      toast.success("Book added successfully!")
      onClose()
    } catch (err) {
      toast.error("Something went wrong. Please try again.")
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] 
        overflow-y-auto flex flex-row">

        {/* Cover */}
        <div className="w-1/3 flex flex-row justify-center items-start p-4">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-36 h-56 object-cover rounded-xl shadow mt-10"
          />
        </div>

        {/* Details */}
        <div className="w-2/3 flex flex-col p-4 flex-1">
      
          {/* Content που scrollάρει */}
          <div className="overflow-y-auto flex-1 pr-2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl md:text-2xl font-bold">{book.title}</h2>
              <button
                className="text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
                onClick={onClose}
              >
                <X size={28}/>
              </button>
            </div>

            <p className="text-gray-700 mb-2">
              <strong>Author:</strong>{" "}
              {Array.isArray(book.author) ? book.author.join(", ") : book.author}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Year:</strong> {book.year}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Pages:</strong> {book.page}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Genre:</strong>{" "}
              {Array.isArray(book.genre) ? book.genre.join(", ") : book.genre}
            </p>
            <p className="text-gray-600 mt-4">
              <strong>Description:</strong> {book.description}</p>

            <div className="mt-10 mb-2">
              <button type="button" onClick={() => handleSaveBook(book)} className="px-4 py-2 bg-cyan-600 text-white 
                cursor-pointer rounded-lg hover:bg-cyan-700">
                Save Book
              </button>
            </div>
          </div>
        </div> 
      </div>
      
    </div>
  );
}

export default SearchBookDetails