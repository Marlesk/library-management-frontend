type PaginationTableProps = {
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
}

const PaginationHistory = ({ totalPages, setCurrentPage, currentPage }: PaginationTableProps) => {
  return (
      <div className="flex justify-end space-x-2 mt-7">
        <button
          onClick={() => setCurrentPage((p: number) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed bg-button-blue hover:bg-dark-blue text-white transition cursor-pointer"
        >
          Previous
        </button>
        <span className="px-3 py-1 border border-gray-300 rounded text-gray-700 select-none">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed bg-button-blue hover:bg-dark-blue text-white transition cursor-pointer"
        >
          Next
        </button>
      </div>
  )
}

export default PaginationHistory