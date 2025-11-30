import { useEffect, useMemo, useState } from 'react'
import Api from '../../Api'
import { Link, useNavigate } from 'react-router'
import type { User } from '../../types'
import useAuth from '../../hooks/useAuth'

export default function UserAll() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const token = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    []
  )
  useEffect(() => {
    const getUserAll = async () => {
      try {
        const data = await Api.getUserAll(token)
        setUsers(data.data)
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'status' in error &&
          error.status === 401
        ) {
          if (
            error &&
            typeof error === 'object' &&
            'response' in error &&
            error.response &&
            typeof error.response === 'object' &&
            'data' in error.response &&
            error.response.data &&
            typeof error.response.data === 'object' &&
            'message' in error.response.data
          ) {
            console.error(error.response.data.message)
          }

          sessionStorage.clear()
          navigate('/login')
        }

        if (
          error &&
          typeof error === 'object' &&
          'status' in error &&
          error.status === 403
        ) {
          navigate('/')
        }
      }
    }
    getUserAll()
  }, [token, navigate])

  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {/* // */}
        <div className="bg-gray-50 dark:bg-gray-800 overflow-auto mb-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!users
                ? '...loading'
                : users.map((user) => {
                    return (
                      <tr
                        key={user.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                      >
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.id}
                        </th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 ">
                          <Link
                            to={`/admin/user/edit/${user.id}`}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                              Edit
                            </span>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
