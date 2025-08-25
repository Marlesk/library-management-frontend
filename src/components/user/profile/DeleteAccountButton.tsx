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
import { useNavigate } from "react-router-dom"
import { toast} from "sonner"

const API_URL: string = import.meta.env.VITE_API_URL

const DeleteAccountButton = () => {
  const navigate = useNavigate()

  const handleDelete = async() => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch(`${API_URL}/api/users/profile`, { 
        method:"DELETE",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      })

      const data = await res.json()
      
      if (!res.ok) {
        toast.error(data.errors || 'Failed to delete account')
        return
      }
      
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
      <div className="flex justify-end">
         <AlertDialogTrigger asChild>
          <button
            className="px-10 py-2 mt-8 rounded-xl bg-red-700 text-white hover:bg-red-800 
              transition cursor-pointer active:bg-red-800">
            Delete account
          </button> 
          </AlertDialogTrigger>
        </div>
       
        <AlertDialogContent className="bg-white rounded-lg shadow-xl p-6 md:max-w-md md:mx-auto">
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