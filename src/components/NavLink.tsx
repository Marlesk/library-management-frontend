import React from "react"
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode
}


const NavLink = ({ to, children}: Props) => {
  return (
    <Link to={to} className="hover:text-semi-blue cursor-pointer ">
      {children}
    </Link>
  )
}

export default NavLink