import { requestBorrowBook } from "./books"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, type ReactNode } from "react"

type RequestButtonProps = {
  available?: boolean
  isbn: string
}

const RequestButton = ({ available: initialAvailable, isbn }: RequestButtonProps) => {
  const [message, setMessage] = useState<ReactNode>("")
  const [available, setAvailable] = useState(initialAvailable)

  const handleRequest = async() => {
    try {
      const borrowCode = await requestBorrowBook(isbn)
      setMessage(
        <>
          Thank you for your request! Your borrow code is: <br />
          <span className="font-bold text-red-700">{borrowCode}</span>
          <br />
          Please use this code at the library to receive your book.
        </>
      )
      setAvailable(false)
    } catch (error: any) {
      if (error instanceof Error) {
        setMessage(`${error.message}`)
      }
    }
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
          <button
            className="px-4 py-2 rounded-xl disabled:bg-gray-300 bg-button-blue text-white  hover:bg-dark-blue transition cursor-pointer active:bg-dark-blue"
            disabled={!available} onClick={handleRequest}>
            Request
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-xl bg-white shadow-lg border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">Notification</DialogTitle>
            <DialogDescription className="mt-2 text-gray-700 whitespace-pre-wrap">
              {message}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default RequestButton