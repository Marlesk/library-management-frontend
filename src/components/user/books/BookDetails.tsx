import { Toaster } from "sonner"
import type { BookSchema } from "./bookSchema"
import RequestButton from "./RequestButton"

type BookDetailsProps = {
  book: BookSchema
}

const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 p-8">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-40 md:w-64 h-auto rounded-lg object-cover"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="mb-1"><span className="font-semibold">Author:</span> {book.author.join(", ")}</p>
            <p className="mb-1"><span className="font-semibold">Publisher:</span> {book.publisher}</p>
            <p className="mb-1"><span className="font-semibold">Year:</span> {book.year}</p>
            <p className="mb-1"><span className="font-semibold">ISBN:</span> {book.isbn}</p>
            <p className="mb-1"><span className="font-semibold">Genre:</span> {book.genre?.join(", ")}</p>
          </div>
          <div className="mt-4 mb-5">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{book.description}</p>
          </div>

          <RequestButton available={book.available} isbn={book.isbn}/>
          
        </div>
      </div>
      <Toaster duration={3000} expand={true} richColors/> 
    </>
  )
}

export default BookDetails