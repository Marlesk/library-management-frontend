import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import AdminProfileForm from "./AdminProfileForm"
import AdminAvatar from "./AdminAvatar"
import { getProfile } from "@/components/user/profile/profile"
import type { Profile } from "@/components/user/profile/profileSchema"

const ProfilePage = () => {
  const [data, setData] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
      .then((result) => {
        if (result === "unauthorized") {
          toast.error('Expired token. Login again')
          navigate('/auth/login')
          return 
        }
        setData(result)
      })
      .catch(() => {
        setError("Unable to retrieve your profile")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 min-h-screen">
          Loading profile...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 min-h-screen">
        {error}
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-2 p-5 mb-24 bg-white shadow-lg rounded-xl">
        <AdminAvatar/>
        <AdminProfileForm data={data}/>
      </div>
      <Toaster duration={3000} expand={true} richColors/> 
    </>
  )
}

export default ProfilePage