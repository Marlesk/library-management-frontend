import type { BookSchema } from "./bookSchema"

const API_URL: string = import.meta.env.VITE_API_URL

export async function getBooks(): Promise<BookSchema[] | "unauthorized">  {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/books`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (res.status === 401) {
    localStorage.removeItem('accessToken')
    return "unauthorized"
  }
    
  if (!res.ok) {
    throw new Error("Failed to fetch books")
  }

  const json = await res.json()
  return json.data

}

export async function getBookByTitle(title: string | undefined): Promise<BookSchema | 'unauthorized'> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/books/title/${title}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (res.status === 401) {
    localStorage.removeItem('accessToken')
    return "unauthorized"
  }

  if (!res.ok) {
    throw new Error("Failed to fetch book")
  }

  const json = await res.json()
  return json.data[0]
}

export async function requestBorrowBook(isbn: string): Promise<string> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/borrows`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({isbn})
  })

  const result = await res.json()
  console.log('Response:', result)

   if (!res.ok) {
      throw new Error(result.message || "Request failed");
    }

    console.log('Borrow code:', result.borrowCode)

  return result.borrowCode
}