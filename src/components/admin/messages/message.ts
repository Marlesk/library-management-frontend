export type InboxMessages = {
  firstname: string
  lastname: string
  email: string
  message: string
  createdAt: string
}

const API_URL = import.meta.env.VITE_API_URL

export async function getInboxMessages(): Promise<InboxMessages[]>{
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/admin/messages`, {
    headers:{'Authorization': `Bearer ${token}`}
  })

  if (!res.ok) {
    throw new Error('Failed to fetch inbox messages')
  }

  const result = await res.json()

  return result.data
}

