import type { googleData } from "../../booksSchema";


type BookCardProps = {
  book: googleData
  onSelect?: () => void;
};

const SearchBookCard = ({ book, onSelect }: BookCardProps) => {
  console.log(book)
  return (
    <div
      key={book.isbn} onClick={onSelect}
      className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg 
        transition"
    >
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-32 h-48 object-cover mb-2 rounded"
      />
      <h3 className="font-bold text-center">{book.title}</h3>
      <p className="text-sm text-gray-600 text-center">
        {Array.isArray(book.author) ? book.author.join(", ") : book.author}
      </p>
    </div>
  )
}

export default SearchBookCard