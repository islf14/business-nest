import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import Aside from '../components/Aside'
import { getRole } from '../pageauth/UserSession'
import NotFound from '../pagepublic/NotFound'

export default function LayoutAdmin() {
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
  return (
    <>
      <Navbar />
      {renderComponents()}
      <Footer />
    </>
  )
}
