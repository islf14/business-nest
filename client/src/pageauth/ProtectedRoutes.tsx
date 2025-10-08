import { Navigate, Outlet } from 'react-router'
import { getToken } from './UserSession'

export default function ProtectedRoutes() {
  if (!getToken()) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}
