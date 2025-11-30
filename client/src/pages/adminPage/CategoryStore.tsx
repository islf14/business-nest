import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Api from '../../Api'
import type { CategoryData } from '../../types'
import useAuth from '../../hooks/useAuth'

export default function CategoryStore() {
  const { getToken } = useAuth()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [ord, setOrd] = useState<number>(0)
  const [photo, setPhoto] = useState<File>()
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate()
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const maxSize = 350 * 1024 // 350KB in bytes
    if (files) {
      if (files[0] && files[0].size <= maxSize) {
        setPhoto(files[0])
        setMessage('')
      } else {
        e.target.value = ''
        setMessage('Image must be smaller than 350KB')
      }
    }
  }

  const submitStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let data: CategoryData = {
      name,
      description,
      ord
    }
    if (photo) {
      data = { ...data, photo }
    }

    await Api.getCategoryStore(data, header)
      .then(() => {
        navigate('/admin/category')
      })
      .catch(({ response }) => {
        setMessage(response.data.message)
        if (response.status === 401) {
          sessionStorage.clear()
          navigate('/login')
        }
      })
  }
  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="text-lg text-gray-900 dark:text-white mb-4">
          Create category
        </div>
        <div className="">
          <form action="" onSubmit={submitStore}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="order"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Order
                </label>
                <input
                  id="order"
                  name="order"
                  type="number"
                  placeholder="0"
                  min={0}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={ord}
                  onChange={(e) => setOrd(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                minLength={6}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              />
              <div
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="user_avatar_help"
              >
                Note: Maximum size 350 KB
              </div>
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
                Create category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
