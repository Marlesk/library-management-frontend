import React from "react"

interface Props {
  href: string;
  children: React.ReactNode
}


const NavLink = ({ href, children}: Props) => {
  return (
    <a href={href} className="hover:text-semi-blue cursor-pointer ">
      {children}
    </a>
  )
}

export default NavLink