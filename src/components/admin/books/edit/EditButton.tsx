import { useNavigate } from "react-router-dom"

type EditButtonProps = {
  isbn: string
}

const EditButton = ({isbn}: EditButtonProps) => {
  const navigate = useNavigate()

  return (
    <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg 
      hover:bg-yellow-600 cursor-pointer" onClick={() => navigate(`/admin/books/edit/${isbn}`)}>
      Edit
    </button>
  )
}

export default EditButton