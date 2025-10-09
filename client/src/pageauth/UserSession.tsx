export function getToken() {
  const tokenString = sessionStorage.getItem('token')
  if (tokenString) {
    const token = JSON.parse(tokenString)
    return token
  } else return ''
}

export function getUser() {
  const userString = sessionStorage.getItem('user')
  if (userString) {
    const user = JSON.parse(userString)
    return user
  } else return ''
}

export function getRole() {
  const rolString = sessionStorage.getItem('role')
  if (rolString) {
    const rol = JSON.parse(rolString)
    return rol
  } else return ''
}

export function saveToken(token: string, user: object, role: string) {
  sessionStorage.setItem('token', JSON.stringify(token))
  sessionStorage.setItem('user', JSON.stringify(user))
  sessionStorage.setItem('role', JSON.stringify(role))
}
