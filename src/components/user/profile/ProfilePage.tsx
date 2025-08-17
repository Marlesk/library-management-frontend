import { useEffect, useState } from "react"
import { getProfile } from "./profile"
import type { Profile } from "./profileSchema"
import AvatarProfile from "./AvatarProfile"
import ProfileForm from "./ProfileForm"
import DeleteAccountButton from "./DeleteAccountButton"
import LoadingMessage from "@/components/LoadingMessage"
import ErrorMessage from "@/components/ErrorMessage"


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
      <div className="max-w-md mx-auto mt-2 p-5 mb-24 bg-white shadow-lg rounded-xl">
        <AvatarProfile/>
        <ProfileForm data={data}/>
        <DeleteAccountButton/>
      </div>
    </>
  )
}

export default ProfilePage