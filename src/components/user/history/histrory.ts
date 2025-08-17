export type BookStatus = 'requested' | 'borrowed' | 'returned'

const API_URL: string = import.meta.env.VITE_API_URL

export type BookHistory = {
  _id: string;
  bookId: {
    title: string;
    author: string[];
    coverImage?: string;
  };
  createdAt: string;
  borrowDate?: string;
  returnDate?: string;
  borrowCode: string;
  status: string
}


export async function getHistory(): Promise<BookHistory[]> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/borrows`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch history")
  }

  const result = await res.json()
  
  return result.data 
}