import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Api from '../../Api'
import useAuth from '../../hooks/useAuth'
import type { Category } from '../../types'

export default function CategoryAll() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const token = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    []
  )

  const getCategoryAll = useCallback(async () => {
    await Api.getCategoryAll(token)
      .then(({ data }) => {
        if (typeof data !== 'string') {
          try {
            const type = Object.prototype.toString.call(data)
            if (type === '[object Object]' || type === '[object Array]') {
              setCategories(data)
            }
          } catch (err) {
            console.log(err)
          }
        } else console.log('Error, the server responded with a text string.')
      })
      .catch(({ response }) => {
        console.error(response.data.message)
        if (response.status === 401) {
          sessionStorage.clear()
          navigate('/login')
        }
      })
  }, [token, navigate])

  useEffect(() => {
    getCategoryAll()
  }, [getCategoryAll])

  const deleteCategoryById = async (id: number) => {
    const isDelete = window.confirm('Delete Category?')
    if (isDelete) {
      await Api.getCategoryDelete(id, token)
        .then(() => {})
        .catch(({ response }) => {
          console.log(response)
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
              Add Category
            </span>
          </Link>
        </div>
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
              {!categories
                ? 'loading...'
                : categories.map((category) => {
                    return (
                      <tr
                        key={category.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                      >
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {category.ord}
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
