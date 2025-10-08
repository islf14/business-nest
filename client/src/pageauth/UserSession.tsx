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

export function getRol() {
  const rolString = sessionStorage.getItem('rol')
  if (rolString) {
    const rol = JSON.parse(rolString)
    return rol
  } else return ''
}

export function saveToken(token: string, user: object, rol: string) {
  sessionStorage.setItem('token', JSON.stringify(token))
  sessionStorage.setItem('user', JSON.stringify(user))
  sessionStorage.setItem('rol', JSON.stringify(rol))
}
