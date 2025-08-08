import { useState } from "react"
import EditData from "./EditData"
import type { Profile } from "./profileSchema"
import ReadOnlyData from "./ReadOnlyData"
import { toast, Toaster } from "sonner"
import { updateProfile } from "./profile"

type ProfileFormProps = {
  data: Profile
}

const ProfileForm = ({data}: ProfileFormProps) => {
  const [userData, setUserData] = useState<Profile>(data)
   

  const handleSaveField = async (_field: "email", newValue: string) => {
    const updatedField =  { email: newValue }

    try {
     await updateProfile(updatedField)
    
      setUserData((prev) => ({
        ...prev,
        ...updatedField,
      }))
      toast.success("Profile updated successfully")
    } catch (error: any) {
      const backendMessage = error?.response?.errors?.email
      if (backendMessage) {
        toast.error(backendMessage)
      } else {
        toast.error("Failed to update profile");
      }
    }
  }

  return (
    <>
      <form className="space-y-4">
        <ReadOnlyData label="Fisrt Name" value={data.firstname}/>
        <ReadOnlyData label="Last Name" value={data.lastname}/>
        <EditData name="email" type="email" label="Email" value={userData.email} onSave={handleSaveField}/>
        <ReadOnlyData label="username" value={data.username}/>
        <ReadOnlyData label="Role" value={data.role}/>
        
       </form>
      <Toaster duration={3000} expand={true} richColors/>
    </>
  )
}

export default ProfileForm