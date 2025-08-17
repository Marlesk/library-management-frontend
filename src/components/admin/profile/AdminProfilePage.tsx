import { useEffect, useState } from "react"
import AdminProfileForm from "./AdminProfileForm"
import AdminAvatar from "./AdminAvatar"
import { getProfile } from "@/components/user/profile/profile"
import type { Profile } from "@/components/user/profile/profileSchema"
import ErrorMessage from "@/components/ErrorMessage"
import LoadingMessage from "@/components/LoadingMessage"

const ProfilePage = () => {
  const [data, setData] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProfile()
      .then((result) => { setData(result) })
      .catch(() => {
        setError("Unable to retrieve your profile")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <LoadingMessage message="Loading profile..."/>
    
  if (error) return <ErrorMessage error={error}/> 

  if (!data) return null

  return (
    <>
      <div className="max-w-4xl mx-auto mt-14 p-6 mb-24 bg-white shadow-lg rounded-xl">
        <AdminAvatar/>
        <AdminProfileForm data={data}/>
      </div>
    </>
  )
}

export default ProfilePage