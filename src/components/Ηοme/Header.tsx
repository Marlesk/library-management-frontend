import { useState } from "react"
import { Menu, X,  Home, Info, Mail } from'lucide-react'
import Navbar from "../Navbar"
import NavLink from "../NavLink"


const Header = () => {
  const [nav, setNav] = useState(false)
  
  return(
    <Navbar>

      <button onClick={() => setNav(!nav)}>
        {nav ? <X size={28} className="z-50 sm:hidden text-dark-blue"/> : 
               <Menu size={28} className="sm:hidden text-dark-blue"/>
        }
      </button>
       
      <div className={`text-dark-blue font-bold text-lg h-[88vh] fixed top-[80px] flex flex-col pt-10   
              space-y-12 items-center w-48 sm:hidden bg-light-blue z-50 duration-1000 
               ${ nav ? "right-[0px]" : "right-[-100vw]"} `}>
          <NavLink href="/">
            <span className="flex items-center gap-2">
              <Home size={22} />
                Home
            </span>
          </NavLink>
          <NavLink href="/about">
            <span className="flex items-center gap-2">
              <Info size={22} />
              About
            </span>
          </NavLink>
          <NavLink href="/contact">
            <span className="flex items-center gap-2">
              <Mail size={22} />
              Contact us
            </span>
          </NavLink>
      </div>

      <div className='hidden sm:flex space-x-14 text-lg text-dark-blue font-bold '>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact Us</NavLink>
      </div>
  
    </Navbar>
  )
}

export default Header