import { Barcode, BookOpen, CheckCircle, Clock } from "lucide-react"
import type { Borrows } from "./borrows"
import HistoryDates from "@/components/user/history/HistoryDates"
import BorrowButton from "./BorrowButton"
import RequestButton from "./ReturnButton"

type BorrowCardProps = {
  index: number
  borrow: Borrows
  onAccepted: () => void
}

const BorrowCard = ({borrow, index, onAccepted }: BorrowCardProps) => {
  return (
    <div key={index} className="max-w-4xl mx-auto rounded-xl shadow-xl overflow-hidden bg-gradient-to-r from-blue-50 to-yellow-50 p-1 hover:shadow-2xl transition-shadow">
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <div className="flex gap-4">
          <img src={borrow.bookId.coverImage} alt={borrow.bookId.title}
            className="w-32 h-48 object-cover rounded-lg shadow-lg mt-2"
          />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-admin">{borrow.bookId.title}</h2>
              <p className="text-gray-600 italic">{borrow.bookId.author.join(', ')}</p>
              <p className="text-sm text-gray-500 mt-1">ISBN: {borrow.bookId.isbn}</p>
            </div>

            <div className="space-y-2 border-l-2 border-gray-300 pl-4 mt-2">
              <div className="flex items-center space-x-2">
                <Barcode size={18} className="w-4 h-4 text-red-700"/>
                <span className="text-sm text-gray-700">
                <span className="font-medium text-red-700">Borrow Code:</span>{' '}
                  {borrow.borrowCode}
                </span>
              </div>

              <HistoryDates icon={<Clock size={18}/>} date={borrow.createdAt} colorClass="text-yellow-700" label="Requested" />

              {borrow.borrowDate && (
                <HistoryDates icon={<BookOpen size={18}/>} date={borrow.borrowDate} colorClass="text-blue-700" label="Borrowed" />
              )}

              {borrow.returnDate && (
                <HistoryDates icon={<CheckCircle size={18}/>} date={borrow.returnDate} colorClass="text-green-700" label="Returned" />
              )}

              <div className="mt-2 flex items-center gap-3">
                {borrow.status === 'requested' && (
                  <BorrowButton borrowCode={borrow.borrowCode} 
                    onAccepted={onAccepted}/>
                )}
                {borrow.status === 'borrowed' && (
                   <RequestButton isbn={borrow.bookId.isbn} 
                    onReturned={onAccepted}/>
                  )}
              </div>  
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-admin to-cyan-600 p-4 rounded-lg shadow-inner 
            flex items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">{borrow.userId?.firstname || "Deleted User"} {borrow.userId?.lastname || ""}</h2>
            <p className="text-gray-700">{borrow.userId?.email || ""}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BorrowCard