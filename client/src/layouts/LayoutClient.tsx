import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import { getRol } from '../pageauth/UserSession'

export default function LayoutClient() {
  const navigate = useNavigate()

  useEffect(() => {
    if (getRol().toLowerCase() != 'client') {
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
