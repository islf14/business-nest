import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import Aside from '../components/Aside'
import { getRole } from '../pageauth/UserSession'

export default function LayoutAdmin() {
  const navigate = useNavigate()
  useEffect(() => {
    if (getRole().toLowerCase() != 'admin') {
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
