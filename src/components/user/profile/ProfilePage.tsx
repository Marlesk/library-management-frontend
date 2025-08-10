import { useEffect, useState } from "react"
import { getProfile } from "./profile"
import type { Profile } from "./profileSchema"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import AvatarProfile from "./AvatarProfile"
import ProfileForm from "./ProfileForm"
import DeleteAccountButton from "./DeleteAccountButton"

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
        <AvatarProfile/>
        <ProfileForm data={data}/>
        <DeleteAccountButton/>
      </div>
      <Toaster duration={3000} expand={true} richColors/> 
    </>
  )
}

export default ProfilePage