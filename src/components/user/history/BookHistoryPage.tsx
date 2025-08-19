import { useEffect, useState } from "react";
import { type BookHistory, getHistory } from "./histrory";
import { Barcode, BookOpen, CheckCircle, Clock } from "lucide-react";
import HistoryDates from "./HistoryDates";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import PaginationHistory from "./PaginationHistory";

const BookHistoryPage = () => {
  const [data, setData] = useState<BookHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'requested' | 'borrowed' | 'returned'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const BOOKS_PER_PAGE = 10

  const filteredData = filterStatus === 'all' ? data : data.filter(entry => entry.status === filterStatus)

  const totalPages = Math.ceil(filteredData.length / BOOKS_PER_PAGE)
  const indexOfLastItem = currentPage * BOOKS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - BOOKS_PER_PAGE
  const paginatedBooks = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    getHistory()
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch(() => { 
        setLoading(false)
        setError("Failed to fetch history")
      })
  }, [])

  if (loading) return <LoadingMessage message="Loading history..."/>
    
  if (error) return <ErrorMessage error={error}/> 

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-8 mb-10 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 mt-10 md:mt-0 text-dark-blue text-center">
          Your Book History
        </h1>
        <div className="flex justify-center flex-wrap gap-3 md:space-x-4 mb-6">
          {['all', 'requested',  'borrowed', 'returned'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-1 rounded-md font-medium cursor-pointer ${
                filterStatus === status ? 'bg-button-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transition'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        
        {paginatedBooks.length === 0 ? 
          (
            <p className="text-center py-6 text-gray-500 min-h-screen">No books found.</p>
          ) : 
          (
            paginatedBooks.map((entry) => ( 
              <div key={entry._id} className="bg-white shadow-lg rounded-xl p-6">
                <div className="flex items-start space-x-5">
                  {entry.bookId.coverImage && (
                    <img
                      src={entry.bookId.coverImage}
                      alt={entry.bookId.title}
                      className="w-20 h-28 object-cover rounded-md shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{entry.bookId.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">by {entry.bookId.author.join(', ')}</p>
                    <div className="space-y-2 border-l-2 border-gray-300 pl-4">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Barcode size={18} className="w-4 h-4 text-red-700" />
                          <span className="font-medium text-red-700">Borrow Code:</span>
                        </div>
                        <span className="text-sm text-gray-700">{entry.borrowCode}</span>
                      </div>

                      <HistoryDates icon={<Clock size={18}/>} date={entry.createdAt} colorClass="text-yellow-700" label="Requested" />

                      {entry.borrowDate && (
                        <HistoryDates icon={<BookOpen size={18}/>} date={entry.borrowDate} colorClass="text-blue-700" label="Borrowed" />
                      )}

                      {entry.returnDate && (
                        <HistoryDates icon={<CheckCircle size={18}/>} date={entry.returnDate} colorClass="text-green-700" label="Returned" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        }

        <div className="md:ml-64">
          {totalPages > 1 && (
            <PaginationHistory 
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div> 
    </>
  )
}

export default BookHistoryPage