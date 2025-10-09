export type User = {
  id: string
  name: string
}

export type UserUpdateData = {
  name: string
  email: string
  password?: string
}

export type Category = {
  id: number
  name: string
  ord: number
}

export type CategoryData = {
  name: string
  description?: string
  ord: number
  menu?: boolean
  photo?: File
}
