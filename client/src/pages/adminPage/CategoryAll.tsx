import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Api from '../../Api'
import useAuth from '../../hooks/useAuth'
import type { Category } from '../../types'
import TimedMessage from '../../components/TimedMessage'

export default function CategoryAll() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [message, setMessage] = useState<string>('')
  const [color, setColor] = useState<boolean>(true)
  const token = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    [getToken]
  )

  // Get all categories
  const getCategoryAll = useCallback(async () => {
    await Api.allCategories(token)
      .then(({ data }) => {
        if (typeof data !== 'string') {
          try {
            const type = Object.prototype.toString.call(data)
            if (type === '[object Object]' || type === '[object Array]') {
              setCategories(data)
            }
          } catch (err) {
            console.error(err)
          }
        }
      })
      .catch(({ response }) => {
        // {response} is from AxiosError
        if (response.data.message) {
          setColor(false)
          setMessage(response.data.message)
        }
        if (response.status === 401) {
          sessionStorage.clear()
          navigate('/login')
        }
      })
  }, [token, navigate])

  useEffect(() => {
    getCategoryAll()
  }, [getCategoryAll])

  // Delete a category
  const deleteCategoryById = async (id: number) => {
    const isDelete = window.confirm('Delete Category?')
    if (isDelete) {
      await Api.deleteCategory(id, token)
        .then(() => {
          setColor(true)
          setMessage('Deleted')
        })
        .catch(({ response }) => {
          if (response.data.message) {
            setColor(false)
            setMessage(response.data.message)
          }
        })
      getCategoryAll()
    }
  }

  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="mb-4">
          <Link
            to={'/admin/category/create'}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Add category
            </span>
          </Link>
        </div>
        {message !== '' && (
          <TimedMessage
            message={message}
            color={color}
            duration={3000}
            action={() => setMessage('')}
          />
        )}
        <div className="bg-gray-50 dark:bg-gray-800 overflow-auto mb-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Priority
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
              {!categories
                ? 'loading...'
                : categories.map((category) => {
                    return (
                      <tr
                        key={category.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                      >
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {category.priority}
                        </th>
                        <td>{category.name}</td>
                        <td>
                          <Link
                            className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                            to={`/admin/category/edit/${category.id}`}
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                              Edit
                            </span>
                          </Link>

                          <button
                            className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                            onClick={() => {
                              deleteCategoryById(category.id)
                            }}
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                              Delete
                            </span>
                          </button>
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
