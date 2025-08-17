import { Trash2 } from "lucide-react"
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
import { deleteAUser } from "./users"
import { toast } from "sonner"

type DeleteProps = {
  username: string
  deleteSuccess: () => void
}

const DeleteButton = ({username, deleteSuccess}: DeleteProps) => {

  const handleDelete = async(username: string) => {
    try {
      await deleteAUser(username)
      toast.success('User deleted successfully')
      setTimeout(() => {
        deleteSuccess()
      }, 2000)
    } catch {
      toast.error('Failed to delete user')
    }
  }
  return (
    <>
     <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-red-600 hover:text-red-800 font-semibold flex items-center justify-center   mx-auto cursor-pointer">
            <Trash2 size={18} /> 
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle  className="text-lg font-semibold text-gray-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-gray-600">
              This action cannot be undone. It will permanently delete the user's account and remove all their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="mr-2 hover:bg-gray-100 cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                onClick={() => handleDelete(username)}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteButton