const API_URL =  import.meta.env.VITE_API_URL

export type UsersSchema = {
  firstname: string
  lastname: string
  email: string
  username: string
  role?: string
  createdAt: string
}

export async function getAllUsers():Promise<UsersSchema[]> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch all users')
  }

  const result = await res.json()

  return result.data
}

export async function deleteAUser(username: string):Promise<void> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/admin/users/username/${username}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (!res.ok) {
    throw new Error('Failed to delete the user')
  }

  return 
}