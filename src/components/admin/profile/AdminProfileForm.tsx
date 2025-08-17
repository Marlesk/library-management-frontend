import type { Profile } from "@/components/user/profile/profileSchema"
import AdminReadOnlyData from "./AdminReadOnly"


type ProfileFormProps = {
  data: Profile
}

const AdminProfileForm = ({data}: ProfileFormProps) => {
   
  return (
    <>
      <form className="space-y-4">
        <AdminReadOnlyData label="Fisrt Name" value={data.firstname}/>
        <AdminReadOnlyData label="Last Name" value={data.lastname}/>
        <AdminReadOnlyData label="Email" value={data.email}/>
        <AdminReadOnlyData label="username" value={data.username}/>
        <AdminReadOnlyData label="Role" value={data.role}/>  
      </form>
    </>
  )
}

export default AdminProfileForm