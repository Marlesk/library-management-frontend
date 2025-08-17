import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputField from "./InputField"
import { toast } from "sonner"
import { AddBookSchema, type addBooksValues } from "../booksSchema"
import SaveButton from "./SaveButton"

const API_URL: string = import.meta.env.VITE_API_URL

const initialValues = {
  title: '',
  author: '',
  isbn: '',
  publisher: '',
  coverImage: '',
  year: '',
  page: '',
  genre: '',
  description: ''
}

const InputForm = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError
  } = useForm<addBooksValues>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: initialValues,
    mode: 'onChange'
  })


  const onSubmit = async(data: addBooksValues) => {
    const finalData = {
      ...data,
      author: data.author ? data.author.split(',').map(a => a.trim()) : [],
      genre: data.genre ? data.genre.split(',').map(g => g.trim()) : []
    }

  console.log(finalData);
    try {
      const token = localStorage.getItem('accessToken')
      console.log("Token:", token)

      const res = await fetch(`${API_URL}/api/admin/books`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(finalData)
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.errors) {
          for (const field in result.errors) {
            setError(field as keyof addBooksValues, { 
              type: 'manual', message: result.errors[field] 
            });
          }
        } else {
          toast.error('Failed to add book')
        }
        return
      }

      toast.success('Book added successfully')

    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
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
      <InputField 
        isTextArea={false} 
        placeholder="ISBN"
        register={register('isbn')}
        error={errors.isbn}
      />
      <InputField 
        isTextArea={false} 
        placeholder="Publisher"
        register={register('publisher')}
        error={errors.publisher}
      />
      <InputField 
        isTextArea={false} 
        placeholder="Cover Image URL"
        register={register('coverImage')}
        error={errors.coverImage}
      />
      <InputField 
        isTextArea={false} 
        placeholder="Year"
        register={register('year')}
        error={errors.year}
      />
      <InputField 
        isTextArea={false} 
        placeholder="Page"
        register={register('page')}
        error={errors.page}
      />
      <InputField 
        isTextArea={false} 
        placeholder="Genre"
        register={register('genre')}
        error={errors.genre}
        />
      <InputField 
        isTextArea={true} 
        placeholder="Description"
        register={register('description')}
        error={errors.description}
      />
     
      <SaveButton/>
    </form>
  )
}


export default InputForm

