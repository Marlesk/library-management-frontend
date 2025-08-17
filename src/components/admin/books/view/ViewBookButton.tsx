import { useNavigate } from "react-router-dom"

type ViewProps = {
  isbn: string
}

const ViewBookButton = ({ isbn } : ViewProps) => {
  const navigate = useNavigate()
  return (
    <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg 
        hover:bg-indigo-600 cursor-pointer" 
          onClick={() => navigate(`/admin/books/isbn/${isbn}`)}>
        View
    </button>
    
  )
}

export default ViewBookButton