const AvatarProfile = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src="/avatar-default.png" 
        alt="User Avatar"
        className="w-24 h-24 rounded-full mb-2"
      />
      <h2 className="text-3xl font-bold text-center text-semi-blue">My Profile</h2>
    </div>
  )
}

export default AvatarProfile