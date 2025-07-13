import Logo from "./Logo"
import React from "react"

interface Props {
  children?: React.ReactNode
}

const Navbar = ({children}: Props) => {
 return (
    <nav className='flex items-center justify-between px-5 bg-light-blue fixed w-full h-20'>
      <Logo/>
      {children}
    </nav>
 )
}

export default Navbar