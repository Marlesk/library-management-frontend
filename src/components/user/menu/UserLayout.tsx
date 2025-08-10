import { Outlet } from "react-router-dom"
import UserHeader from "./UserHeader"
import Footer from "@/components/footer/Footer"

const UserLayout = () => {
  return (
    <>
      <UserHeader/>
        <main className="md:pt-24 pt-16">
          <Outlet />
        </main>
      <Footer/>
    </>
  )
}

export default UserLayout