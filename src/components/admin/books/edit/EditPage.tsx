import ErrorMessage from "@/components/ErrorMessage"
import LoadingMessage from "@/components/LoadingMessage"
import { getBookByIsbn } from "@/components/user/books/books"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EditInputField from "./EditInputField"
import type { BookSchema } from "@/components/user/books/bookSchema"
import { updateBook } from "./editBook"
import { toast } from "sonner"

const EditPage = () => {
  const [book, setBook] = useState<BookSchema | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [formData, setFormData] = useState<BookSchema | null>(null)
  const { isbn } = useParams()
  const [error, setError] = useState<string | null>(null)
 
  const navigate = useNavigate()

  useEffect(() => {
    getBookByIsbn(isbn)
      .then((result) => {
        setBook(result)
        setFormData(result)
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

  const handleChange = (name: string, value: string) => {
    setFormData(prev => prev ? { ...prev, [name]: value } : prev)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (!formData?.title?.trim()) {
      toast.error("Title is required")
      return
    }
    if (!formData?.author?.length) {
      toast.error("Author is required")
      return
    }
    try {
      const result = await updateBook(formData)
      setBook(result)
      toast.success('Book updated successfully')
      navigate(-1)
    } catch (error) {
      toast.error('Failed to update book')
    }
  }
  
  return(
     <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg min-h-screen mb-16">
      <form className="space-y-4 mx-auto min-h-screen" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-admin text-center">Edit Book</h1>

        <EditInputField 
          id="title"
          label="Title"
          name="title"
          value={formData?.title}
          isTextArea={false}
          onChange={handleChange}
        /> 
        <EditInputField 
          id="author"
          value={Array.isArray(formData?.author) ? formData.author.join(", ") : formData?.author ?? ""}
          label="Author"
          name="author"
          isTextArea={false}
          onChange={handleChange}
        />

        <EditInputField 
          id="publisher"
          value={formData?.publisher ?? ""}
          label="Publisher"
          name="publisher"
          isTextArea={false}
          onChange={handleChange}
        /> 

        <EditInputField 
          id="year"
          value={formData?.year ?? ""}
          label="Year"
          isTextArea={false}
          name="year"
          onChange={handleChange}
        /> 

        <EditInputField 
          id="page"
          value={formData?.page ?? ""}
          label="Pages"
          name="page"
          isTextArea={false}
          onChange={handleChange}
        /> 

        <EditInputField 
          id="genre"
          value={Array.isArray(formData?.genre) ? formData.genre.join(", ") : formData?.genre ?? ""}
          label="Genre"
          name="genre"
          isTextArea={false}
          onChange={handleChange}
        />

         <EditInputField 
          id="coverImage"
          value={formData?.coverImage ?? ""}
          label="Cover Image URL"
          name="coverImage"
          isTextArea={false}
          onChange={handleChange}
        /> 

        <EditInputField 
          id="description"
          value={formData?.description ?? ""}
          label="Description"
          name="description"
          isTextArea={true}
          onChange={handleChange}
        /> 
        
        <div className="flex justify-between items-center">
          <button type="submit" 
            className="px-4 py-2 bg-emerald-600 text-white cursor-pointer rounded-lg hover:bg-emerald-700">
            Save Changes
          </button>
          <div className="flex gap-4">
            <button type="button"
              className="px-4 py-2 bg-gray-600 text-white cursor-pointer rounded-lg hover:bg-gray-700"
              onClick={() => setFormData(book!)}>
              Reset
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded-lg hover:bg-red-700"
              onClick={() => navigate(-1) }>
              Cancel
            </button>
          </div>
        </div>
          
        
      </form>
    </div>
    
  )
}

export default EditPage