import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const avatar = "/avatar-default.png"

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    navigate("/auth/login")
  }

  return (
    <div className="relative text-semi-blue font-medium" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition cursor-pointer"
        title="User menu"
      >
        <img
          src={avatar}
          alt="User Avatar"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 pt-1 bg-white rounded-lg shadow-lg z-10">
          <button
            onClick={() => navigate("/users/profile")}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
          >
           My Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
