import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

export default function LayoutClient() {
  const { getRole } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (getRole().toLowerCase() != 'user') {
      navigate('/')
    }
  }, [navigate])

  return <Outlet />
}
