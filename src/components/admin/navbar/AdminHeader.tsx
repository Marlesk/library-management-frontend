import { Link } from "react-router-dom"

type HeaderProps = {
  label: string
  to: string
}

const AdminHeader = ({label, to}: HeaderProps) => {
  return (
    <li>
      <Link to={to} className="hover:text-admin transition">
        {label}
      </Link>
    </li>
  )
}

export default AdminHeader