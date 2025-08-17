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

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("accessToken")
      sessionStorage.setItem("toastMessage", "Token has expired. Please login again.")
      return <Navigate to="/auth/login" replace />
    }

    if (adminOnly && decoded.role !== "admin") {
      sessionStorage.setItem("toastMessage", "Access denied. Only admin can access this resource")
      return <Navigate to="/books" replace/>
    }

    return <>{children}</>
  } catch (error) {
    localStorage.removeItem("accessToken")
    return <Navigate to="/auth/login" replace/>
  }
}


export default ProtectedRoute