const AdminAvatar = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src="/admin.png" 
        alt="User Avatar"
        className="w-auto h-20 mb-2"
      />
      <h2 className="text-2xl font-semibold text-center text-admin">My Profile</h2>
    </div>
  )
}

export default AdminAvatar