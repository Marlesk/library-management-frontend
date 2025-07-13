import Navbar from "./Navbar"
import NavLink from "./NavLink"


const Header = () => {
  return(
    <Navbar>
      <div className='flex space-x-14 text-lg text-dark-blue font-bold '>
        <NavLink href="/">Home</NavLink>
        <NavLink href="">About</NavLink>
        <NavLink href="">Contact Us</NavLink>
      </div>
    </Navbar>
  )
}

export default Header