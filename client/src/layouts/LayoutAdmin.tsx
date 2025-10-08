import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import Aside from '../components/Aside'
import { getRol } from '../pageauth/UserSession'

export default function LayoutAdmin() {
  const navigate = useNavigate()
  useEffect(() => {
    if (getRol().toLowerCase() != 'admin') {
      navigate('/')
    }
  }, [navigate])

  return (
    <>
      <Navbar />
      <Aside />
      <Outlet />
      <Footer />
    </>
  )
}
