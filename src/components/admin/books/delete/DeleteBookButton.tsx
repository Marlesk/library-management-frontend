import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

const API_URL =  import.meta.env.VITE_API_URL

type DeleteProps = {
  isbn: string
  deleteSuccess: () => void
}

const DeleteBookButton = ({ isbn, deleteSuccess }: DeleteProps) => {
  
  const handleDelete = async(isbn: string) => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch(`${API_URL}/api/admin/books/${isbn}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await res.json()
      
      if (!res.ok) {
        toast.error(data.errors || 'Failed to delete the book')
        return
      }
      toast.success('Book deleted successfully')
      setTimeout(() => {
        deleteSuccess()
      }, 2000)
    } catch {
      toast.error('Failed to delete book')
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
          <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
            Delete
          </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle  className="text-lg font-semibold text-gray-900">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm text-gray-600">
            This action cannot be undone. It will permanently delete the book from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="mr-2 hover:bg-gray-100 cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={() => handleDelete(isbn)}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteBookButton