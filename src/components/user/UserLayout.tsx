import { Outlet } from "react-router-dom"
import UserHeader from "./UserHeader"

const UserLayout = () => {
  return (
    <>
      <UserHeader/>
        <main className="md:pt-24 pt-16">
        <Outlet />
      </main>
    </>
  )
}

export default UserLayout