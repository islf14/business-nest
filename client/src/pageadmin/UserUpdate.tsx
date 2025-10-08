import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Api from '../Api'
import { Link } from 'react-router'
import { getToken } from '../pageauth/UserSession'
import type { UserUpdateData } from '../types'

export default function UserUpdate() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const token = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
    []
  )

  useEffect(() => {
    const getUserById = async () => {
      Api.getUserById(Number(id), token)
        .then(({ data }) => {
          setName(data.name)
          setEmail(data.email)
        })
        .catch(({ response }) => {
          console.error(response.data.message)
          if (response.status === 401) {
            sessionStorage.clear()
            navigate('/login')
          }
        })
    }
    getUserById()
  }, [id, token, navigate])

  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let data: UserUpdateData = {
      name,
      email
    }
    if (password) {
      data = {
        ...data,
        password
      }
    }
    Api.getUserUpdate(Number(id), data, token)
      .then((data) => {
        if (data.status == 200) {
          navigate('/admin/user')
        }
      })
      .catch(({ response }) => {
        setMessage(response.data.message)
      })
  }

  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="text-lg text-gray-900 dark:text-white mb-4">
          Edit User
        </div>
        <div className="">
          <form onSubmit={submitUpdate}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="User"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                minLength={4}
                maxLength={50}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <p className="text-red-600">{message}</p>
            <div className="mt-4">
              <Link
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                to={'..'}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(-1)
                }}
              >
                Back
              </Link>

              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
