
import AdminHeader from "./AdminHeader";
import AdminMenu from "./AdminMenu";

const AdminNavbar = () => {
  return (
    <nav className="bg-cyan-600 text-white px-5 py-1 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src="/logo2.png"
          alt="Logo"
          className="w-auto h-16"
        />
        <span className="font-bold text-admin">Admin Panel</span>
      </div>

      <ul className="flex gap-8 text-lg font-medium">
        <AdminHeader to="/admin/books" label="Books"/>
        <AdminHeader to="/admin/users" label="Users"/>
        <AdminHeader to="/admin/borrows" label="Borrows"/>
        <AdminHeader to="/admin/messages" label="Messages"/>
      </ul>

      <div className="flex items-center gap-3">
        <span className="text-gray-200">Welcome, Admin</span>
        <AdminMenu/>  
      </div>
      
      
    </nav>
  )
}

export default AdminNavbar
