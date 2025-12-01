import { useNavigate } from 'react-router'

export default function useAuth() {
  const navigate = useNavigate()

  function getToken() {
    const tokenString = sessionStorage.getItem('token')
    if (tokenString) {
      const token = JSON.parse(tokenString)
      return token
    } else return ''
  }

  function getUser() {
    const userString = sessionStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString)
      return user
    } else return ''
  }

  function getRole() {
    const rolString = sessionStorage.getItem('role')
    if (rolString) {
      const rol = JSON.parse(rolString)
      return rol
    } else return ''
  }

  function saveToken(token: string, user: object, role: string) {
    sessionStorage.setItem('token', JSON.stringify(token))
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('role', JSON.stringify(role))
  }

  function getLogout() {
    sessionStorage.clear()
    navigate('/login')
  }

  const darkProps = {
    getToken,
    getUser,
    getRole,
    saveToken,
    getLogout
  }

  return darkProps
}
