import { RefreshCcw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers, type UsersSchema } from "./users";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const USERS_PER_PAGE = 10

const UsersPage = () => {
  const [users, setUsers] = useState<UsersSchema[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1);
  const navigate = useNavigate()

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) 
  }

  const filteredUsers = users.filter(
    (user) => user.email.toLowerCase().includes(search.toLowerCase()) 
                || user.username.toLowerCase().includes(search.toLowerCase())
  )

  const pageCount = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const result = await getAllUsers()
      if (result === "unauthorized") {
        toast.error('Expired token. Login again')
        setTimeout(() => {
          navigate('/auth/login')
        }, 1500) 
        return
      }
      setUsers(result)
    } catch {
      setError("Failed to fetch all users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
    

  if (loading) {
    return <div className="text-center py-20 text-gray-600 min-h-screen">Loading users...</div>
  }

 if (error) {
    return (
      <div className="text-center py-20 text-red-600 min-h-screen">
        {error}
      </div>
    )
  }

  return (
    <>
      <div className="p-8 bg-white min-h-screen mb-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6 text-admin text-center">Users Dashboard</h1>
          <div className="flex flex-row items-center justify-between mb-6">
           <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={search}
                placeholder="Search by email or username"
                className="md:w-80 w-60 pl-10 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                onChange={(el) => setSearch(el.target.value)}
              />
            </div>
            <button onClick={fetchUsers}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition cursor-pointer">
              <RefreshCcw size={18} />
              Refresh Users
            </button>
          </div>
      
          <table className="w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-600 to-admin text-white">
                <th className="border border-gray-200 px-4 py-3 text-left">Firt Name</th>
                <th className="border border-gray-200 px-4 py-3 text-left">Last Name</th>
                <th className="border border-gray-200 px-4 py-3 text-left">Email</th>
                <th className="border border-gray-200 px-4 py-3 text-left">Username</th>
                <th className="border border-gray-200 px-4 py-3 text-left">Registration Date</th>
                <th className="border border-gray-200 px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.filter(user => user.username !== 'admin').map((user, idx) => (
                  <tr
                    key={user.username}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-cyan-100 transition`}
                  >
                    <td className="border border-gray-200 px-4 py-3">{user.firstname}</td>
                    <td className="border border-gray-200 px-4 py-3">{user.lastname}</td>
                    <td className="border border-gray-200 px-4 py-3">{user.email}</td>
                    <td className="border border-gray-200 px-4 py-3">{user.username}</td>
                    <td className="border border-gray-200 px-4 py-3">{formatDate(user.createdAt)}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                     <DeleteButton key={user.username} username={user.username} deleteSuccess={fetchUsers}/>
                    </td>
                  </tr>
                )) 
              )}
            </tbody>
          </table>

           {/* Pagination */}
         {pageCount > 1 && (
        <div className="flex justify-end space-x-2 mt-7">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer"
          >
            Previous
          </button>
          <span className="px-3 py-1 border border-gray-300 rounded text-gray-700 select-none">
            Page {page} of {pageCount}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, pageCount))}
            disabled={page === pageCount}
            className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

        </div>
      </div>
      <Toaster duration={3000} expand={true} richColors/> 
    </>
  )
}

export default UsersPage;



