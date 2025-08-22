import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers, type UsersSchema } from "./users";
import DeleteButton from "./DeleteButton";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import PaginationTable from "../PaginationTable";
import RefreshButton from "../RefreshButton";
import { formatDate} from "../formatDate";

const UsersPage = () => {
  const [users, setUsers] = useState<UsersSchema[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)

  const USERS_PER_PAGE = 10

  const filteredUsers = users.filter(
    (user) => user.email.toLowerCase().includes(search.toLowerCase()) 
                || user.username.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const indexOfLastItem = currentPage * USERS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - USERS_PER_PAGE

  const paginatedUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const fetchUsers = async (showLoading = true) => {
    if (showLoading) setLoading(true)
    try {
      const result = await getAllUsers()
      setUsers(result)
    } catch {
      setError("Failed to fetch all users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(true)
  }, [])
    

  if (loading) return <LoadingMessage message="Loading users..."/>
    
  if (error) return <ErrorMessage error={error}/> 

  return (
    <>
      <div className="p-8 bg-white min-h-screen mb-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-admin text-center">Users Dashboard</h1>
          <div className="flex items-center justify-between mb-6">
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
            <RefreshButton label="Refresh Users" onClick={fetchUsers}/>
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
             {paginatedUsers.filter(user => user.role !== 'admin').length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-lg text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.filter(user => user.role !== 'admin').map((user, idx) => (
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
                     <DeleteButton key={user.username} username={user.username} 
                      deleteSuccess={() => fetchUsers(false)}/>
                    </td>
                  </tr>
                )) 
              )}
            </tbody>
          </table>
          
          {totalPages > 1 && (
            <PaginationTable 
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

export default UsersPage;



