// UserAll
export type User = {
  id: number
  name: string
  email: string
  role: string
}

export type UserNewData = {
  name: string
  email: string
  password?: string
}

// CategoryAll
export type Category = {
  id: number
  name: string
  description: string
  status?: boolean
  priority: number
  photoUrl?: string
}

// CategoryStore
export type CategoryNewData = {
  name: string
  description?: string
  priority: number
  status?: boolean
  photo?: File
}

// CompanyAll
export type Company = {
  id: number
  name: string
  email: string
  phone: string
  address: string
  description: string
  website?: string
  photoUrl?: string
  categoryId: number
  userId: number
}

export type CompanyNewData = {
  name: string
  email: string
  phone: string
  address?: string
  website?: string
  description: string
  photo?: File
  categoryId: number
  userId: number
}
