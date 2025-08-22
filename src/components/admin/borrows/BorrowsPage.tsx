import { useEffect, useState } from "react";
import { type Borrows, getAllBorrows } from "./borrows";
import StatusFilter from "./StatusFilter";
import BorrowCard from "./BorrowCard";
import { Search } from "lucide-react";
import RefreshButton from "../RefreshButton";
import PaginationTable from "../PaginationTable";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";

const BorrowsPage = () => {
  const [borrows, setBorrows] = useState<Borrows[] | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'requested' | 'borrowed' | 'returned'>('all')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
 
  const RECORDS_PER_PAGE = 10

  const fetchBorrows = async (showLoading = true) => {
    if (showLoading) setLoading(true)
    try {
      const result = await getAllBorrows()
      setBorrows(result)
    } catch {
      setError('Failed to fetch books records')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
   fetchBorrows(true)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filterStatus, search])

  if (loading) return <LoadingMessage message="Loading books records..." />

  if (error) return <ErrorMessage error="Failed to fetch books records"/>

  if (!borrows) return null

  const sortedRecords = [...borrows].sort((a, b) => {
    if (filterStatus === 'requested') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    if (filterStatus === 'borrowed') {
      return new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime()
    }
    if (filterStatus === 'returned') {
      return new Date(b.returnDate).getTime() - new Date(a.returnDate).getTime()
    }
    return 0
  })

  const filteredRecords = sortedRecords.filter(borrow => {
    if (filterStatus !== 'all' && borrow.status !== filterStatus) {
      return false
    }

    if (filterStatus === 'requested' && search.trim() !== '') {
      return borrow.borrowCode.toLowerCase().includes(search.toLowerCase());
    }

    if (filterStatus === 'borrowed' && search.trim() !== '') {
      return borrow.bookId.isbn.toLowerCase().includes(search.toLowerCase());
    }

    return true
  })

  const totalPages = Math.ceil(filteredRecords.length / RECORDS_PER_PAGE)
  const indexOfLastItem = currentPage * RECORDS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - RECORDS_PER_PAGE
  const paginatedRecords = filteredRecords.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="mt-6 mb-16 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-admin text-center mb-6">Books Records</h1>

      <StatusFilter activeStatus={filterStatus} onChange={setFilterStatus} />
       
      <div className="flex justify-center items-center mb-6 space-x-6">
        {(filterStatus === 'requested' || filterStatus === 'borrowed') && (
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder={filterStatus === 'requested' ? "Search by Borrow Code" : "Search by ISBN"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:w-80 w-60 pl-10 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
        )}
        <RefreshButton label="Refresh Records" onClick={fetchBorrows} />
      </div>

      {paginatedRecords.length === 0 ? 
      (
       <div className="col-span-3 flex justify-center py-6">
          <p className="text-center text-gray-500 text-lg">
            {filterStatus === "requested" && "No requested records found"}
            {filterStatus === "borrowed" && "No borrowed records found"}
            {filterStatus === "returned" && "No returned records found"}
            {filterStatus === "all" && "No records found"}
          </p>
        </div>
      ) : (
        paginatedRecords.map((borrow, i) => (
          <BorrowCard key={borrow._id} index={i} borrow={borrow} 
            onAccepted={() => fetchBorrows(false)}/>
        ))
      )}

       <div className="mr-56">
        {totalPages > 1 && (
          <PaginationTable 
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  )
}

export default BorrowsPage;
