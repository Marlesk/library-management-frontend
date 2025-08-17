import { useForm } from "react-hook-form"
import SearchButton from "./SearchButton"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useState } from "react"
import SearchBookCard from "./SearchBookCard"
import SearchBookDetails from "./SearchBookDetails"
import InputField from "../InputField"
import { searchSchema, type googleData, type searchBooksValues } from "../../booksSchema"

const API_URL: string = import.meta.env.VITE_API_URL

const initialValues = {
  title: '',
  author: ''
}

const SearchForm = () => {
  const [results, setResults] = useState<googleData[] | null>(null)
  const [selectedBook, setSelectedBook] = useState<googleData | null>(null);


  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<searchBooksValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: initialValues,
    mode: "onChange"
  })

  const onSubmit = async({ title, author}: searchBooksValues) => {

    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch(`${API_URL}/api/admin/books/google-search/${title}/${author}`, {
        headers: { 'Authorization': `Bearer ${token}`}
      })

      if (!res.ok) {
        toast.error('Failed to fetch books from Google Library')
        return
      }

      const result = await res.json()
      const data = result.data 
      setResults(data)
      toast.success('Find the book successfully via Google Books API')

    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField 
          isTextArea={false} 
          placeholder="Title"
          register={register('title')}
          error={errors.title}
        />
        <InputField 
          isTextArea={false} 
          placeholder="Author"
          register={register('author')}
          error={errors.author}
        />
        <SearchButton/> 
      </form>

      <div className="mt-6">
        {results === null ? (
          <div className="text-gray-500">No results yet...</div>
        ) : results.length === 0 ? (
          <div className="text-gray-500">No books found</div>
        ) : (
          <div className="grid grid-cols-3 gap-6 mb-10 cursor-pointer">
            {results.map((book) => (
              <SearchBookCard
                key={book.isbn}
                book={book}
                onSelect={() => setSelectedBook(book)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedBook && (
        <SearchBookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
    
  )
}

export default SearchForm