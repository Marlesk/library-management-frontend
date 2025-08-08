import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Navbar"
import UserMenu from "./UserMenu"
import { Book, History, LogOut, Menu, User, X } from "lucide-react"
import { useEffect, useState } from "react"

const UserHeader = () => {
  const [nav, setNav] = useState(false)

  const location = useLocation()
 
  useEffect(() => {
    setNav(false);
  }, [location.pathname])

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/auth/login");
  }

  return (
    <>
      <Navbar>
        <button onClick={() => setNav(!nav)}>
          {nav ? <X size={28} className="z-50 sm:hidden text-dark-blue"/> : 
                <Menu size={28} className="sm:hidden text-dark-blue"/>
            }
        </button>
        <div className={`text-dark-blue font-bold text-lg bottom-0 fixed top-[64px] flex flex-col pt-10   
              space-y-12 items-center w-48 sm:hidden bg-light-blue z-50 duration-1000 
               ${ nav ? "right-[0px]" : "right-[-100vw]"} `}>
          <NavLink to="/books">
            <span className="flex items-center gap-2">
              <Book size={22} />
                Books
            </span>
          </NavLink>
          <NavLink to="/borrows">
            <span className="flex items-center gap-2">
              <History size={22} />
              History
            </span>
          </NavLink>
          <NavLink to="/users/profile">
            <span className="flex items-center gap-2">
              <User size={22} />
              My Profile
            </span>
          </NavLink>
          <button onClick={handleLogout}>
            <span className="flex items-center gap-2 cursor-pointer">
              <LogOut size={22} />
              Sign Out
            </span>
          </button>
        </div>

        <div className='hidden sm:flex items-center space-x-14 text-lg text-dark-blue font-bold'>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/borrows">History</NavLink>
          <UserMenu />
        </div>
      </Navbar>
     
    </>
  )
}

export default UserHeader