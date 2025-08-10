import type { Profile } from "@/components/user/profile/profileSchema"
import ReadOnlyData from "@/components/user/profile/ReadOnlyData"

type ProfileFormProps = {
  data: Profile
}

const AdminProfileForm = ({data}: ProfileFormProps) => {
   
  return (
    <>
      <form className="space-y-4">
        <ReadOnlyData label="Fisrt Name" value={data.firstname}/>
        <ReadOnlyData label="Last Name" value={data.lastname}/>
        <ReadOnlyData label="Email" value={data.email}/>
        <ReadOnlyData label="username" value={data.username}/>
        <ReadOnlyData label="Role" value={data.role}/>  
      </form>
    </>
  )
}

export default AdminProfileForm