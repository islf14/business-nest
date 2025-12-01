import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function PanelAdmin() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/admin/user')
  })

  return <div className="p-4 md:ml-56"></div>
}
