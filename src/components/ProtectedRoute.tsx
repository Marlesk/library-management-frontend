import type React from "react"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ( {children}: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken')
  return token ? <>{children}</> : <Navigate to="/auth/login"/>
}


export default ProtectedRoute