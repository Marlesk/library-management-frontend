import type { Profile} from "./profileSchema";

const API_URL: string = import.meta.env.VITE_API_URL

export async function getProfile(): Promise<Profile | "unauthorized"> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch( `${API_URL}/api/users/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (res.status === 401) {
    localStorage.removeItem('accessToken')
    return "unauthorized"
  }

  if (!res.ok) {
    throw new Error("Unable to retrieve your profile")
  }

  const result = await res.json()
  return result.data
}

export async function updateProfile(data: {email: string}) {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/users/profile`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()
  
  if (!res.ok) {
    const error: any = new Error("Failed to update profile");
    error.response = result
    throw error
  }

  return result.data
}

export async function deleteAccouct(): Promise<void> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_URL}/api/users/profile`, { 
    method:"DELETE",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  })

  if(!res.ok) {
    throw new Error("Failed to delete account")
  }

  return


}