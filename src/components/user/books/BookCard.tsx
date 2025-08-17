import { Link } from "react-router-dom"
import type { BookSchema } from "./bookSchema"
import RequestButton from "./RequestButton"

type BookCardProps = {
  book: BookSchema
 
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col p-6 justify-center items-center mb-6">
      <Link to={`/books/isbn/${book.isbn}`} className="flex flex-col items-center pt-4">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-40 h-60 object-cover rounded-xl mb-4"
        />
        <h2 className="text-lg font-semibold text-center mb-2">{book.title}</h2>
        <p className={`mb-4 ${book.available ? 'text-green-600' : 'text-red-500'}`}>
        {book.available ? 'Available' : 'No available'}
        </p>
      </Link>

      <RequestButton available={book.available} isbn={book.isbn} />
    </div>
  )
}

export default BookCard