import { Outlet } from "react-router-dom"
import AdminFooter from "./footer/AdminFooter"
import AdminNavbar from "./navbar/AdminNavbar"

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar/>
        <main className="pt-5">
        <Outlet />
      </main>
      <AdminFooter/>
      
    </>
  )
}

export default AdminLayout