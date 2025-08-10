import type React from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

type ProtectedRouteProps = {
  children: React.ReactNode
  adminOnly?: boolean;
}

type JWTPayload = {
  role: string;
  exp: number;
}

const ProtectedRoute = ( {children, adminOnly}: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken')

  if (!token) return <Navigate to="/auth/login" replace/>
   
  try {
    const decoded = jwtDecode<JWTPayload>(token)

    // Έλεγχος λήξης token
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("accessToken")
      return <Navigate to="/auth/login" replace />
    }

    if (adminOnly && decoded.role !== "admin") {
      return <Navigate to="/books" replace/>
    }

    return <>{children}</>
  } catch (error) {
    console.error("Invalid token", error)
    localStorage.removeItem("accessToken")
    return <Navigate to="/auth/login" replace/>
  }
}


export default ProtectedRoute