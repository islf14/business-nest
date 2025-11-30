import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Aside from '../../components/Aside'
import NotFound from '../publicPage/NotFound'
import useAuth from '../../hooks/useAuth'

export default function LayoutAdmin() {
  const { getRole } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (getRole().toLowerCase() != 'admin') {
      navigate('/')
    }
  }, [navigate])

  function renderComponents() {
    if (getRole().toLowerCase() === 'admin') {
      return (
        <>
          <Aside />
          <Outlet />
        </>
      )
    } else {
      return (
        <>
          <NotFound />
        </>
      )
    }
  }
  return <>{renderComponents()}</>
}
