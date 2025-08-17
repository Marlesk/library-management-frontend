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
import { acceptBorrowRequest } from "./borrows"
import { toast } from "sonner"

type BorrowButtonProps = {
  borrowCode: string
  onAccepted?: () => void
}

const BorrowButton = ({ borrowCode, onAccepted }: BorrowButtonProps) => {

  const handleConfirm = async(code: string) => {
    try {
      await acceptBorrowRequest(code)
      toast.success('Borrow request accepted successfully')
      onAccepted?.()
    } catch(error) {
      toast.error('Failed to accept borrow request')
    }
  }

  return (
    <>
     <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="px-4 py-1 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 mt-2
            transition cursor-pointer">
            Borrow
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle  className="text-lg font-semibold text-gray-900">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-gray-600">
              You accept a borrow request with Borrow Code: {borrowCode}. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="mr-2 hover:bg-gray-100 cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={() => handleConfirm(borrowCode)}>
              Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default BorrowButton