import { Navigate, Outlet } from 'react-router'
import useAuth from '../../hooks/useAuth'

export default function ProtectedRoutes() {
  const { getToken } = useAuth()
  if (!getToken()) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}
