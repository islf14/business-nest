import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import { getRole } from '../pageauth/UserSession'

export default function LayoutClient() {
  const navigate = useNavigate()

  useEffect(() => {
    if (getRole().toLowerCase() != 'client') {
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
