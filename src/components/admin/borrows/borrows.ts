type BorrowStatus =  "requested" | "borrowed" | "returned"

export type Borrows = {
  _id: string
  userId: {
    firstname: string,
    lastname: string,
    email: string
  }
  bookId: {
    title: string
    author: string[]
    isbn: string
    coverImage: string
  }
  borrowCode: string
  createdAt: string
  borrowDate: string
  returnDate: string
  status: BorrowStatus
}

const API_URL: string = import.meta.env.VITE_API_URL

export async function getAllBorrows(): Promise<Borrows[]>{
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/admin/borrows`,{
    headers: {"Authorization": `Bearer ${token}`}
  })

  if (!res.ok) throw new Error('Failed to fetch all borrow records')

  const result = await res.json()

  return result.data
}

export async function acceptBorrowRequest(code: string): Promise<void> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/admin/borrows/accept/${code}`, {
    method:'POST',
    headers:{
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to accept borrow request')
  } 

  return 

}

export async function markReturn(isbn: string): Promise<void> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/admin/borrows/returns/${isbn}`, {
    method:'POST',
    headers:{
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to process book return')
  } 

  return 

}