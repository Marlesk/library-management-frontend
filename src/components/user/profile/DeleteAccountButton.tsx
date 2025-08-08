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
import { deleteAccouct } from "./profile"
import { useNavigate } from "react-router-dom"
import { toast} from "sonner"

const DeleteAccountButton = () => {
  const navigate = useNavigate()

  const handleDelete = async() => {
    try {
      await deleteAccouct()
      localStorage.removeItem("accessToken")
      toast.success('Account deleted successfully')
      setTimeout(() => {
        navigate('/')
      }, 500)
    
    } catch (error) {
      toast.error('Failed to delete account')
    }
  }

  return (
    <>
     <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="px-10 py-2 mt-8 rounded-xl bg-red-700 text-white hover:bg-red-800 transition cursor-pointer active:bg-red-800 ml-55">
            Delete account
          </button> 
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle  className="text-lg font-semibold text-gray-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-gray-600">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="mr-2 hover:bg-gray-100 cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                onClick={handleDelete}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteAccountButton