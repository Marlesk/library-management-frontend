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
import { markReturn } from "./borrows"
import { toast } from "sonner"

type RequestButtonProps = {
  isbn: string
  onReturned?: () => void
}


const RequestButton = ({ isbn, onReturned }: RequestButtonProps) => {

  const handleConfirm = async(isbn: string) => {
    try {
      await markReturn(isbn)
      toast.success('Book returned successfully')
      onReturned?.()
    } catch(error) {
      toast.error('Failed to process book return')
    }
  }

  return (
    <>
     <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="px-4 py-1 border border-green-600 text-green-600 rounded-lg shadow hover:bg-green-50 
            mt-2 transition cursor-pointer">
            Return
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle  className="text-lg font-semibold text-gray-900">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-gray-600">
              You mark the book as returned with ISBN: {isbn}. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="mr-2 hover:bg-gray-100 cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={() => handleConfirm(isbn)}>
              Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default RequestButton