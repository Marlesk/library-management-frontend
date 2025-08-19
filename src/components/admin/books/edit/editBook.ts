import type { BookSchema } from "@/components/user/books/bookSchema"

const API_URL: string = import.meta.env.VITE_API_URL

export async function updateBook(data: BookSchema) {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/admin/books/${data.isbn}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()
  
  if (!res.ok) {
    throw new Error('Failed to update book')
  }

  return result.data
}