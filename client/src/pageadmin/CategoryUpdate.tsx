import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Api, { base_api_url } from '../Api'
import { getToken } from '../pageauth/UserSession'
import type { CategoryData } from '../types'

export default function CategoryUpdate() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [ord, setOrd] = useState<number>(0)
  const [menu, setMenu] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File>()
  const [photo_url, setPhoto_url] = useState('foto.jpg')
  const [message, setMessage] = useState<string>('')
  const header = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    }),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setPhoto(files[0])
    }
  }

  useEffect(() => {
    const getCategoryById = () => {
      Api.getCategoryById(Number(id), header)
        .then(({ data }) => {
          const category = data
          setName(category.name)
          setDescription(category.description)
          if (category.ord !== null) {
            setOrd(Number(category.ord))
          }
          if (category.menu) {
            setMenu(category.menu)
          }

          if (category.photoUrl) {
            fetch(`${base_api_url}/file/${category.photoUrl}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            })
              .then(async (response) => {
                const image = await response.blob()
                if (image) {
                  const objectUrl = URL.createObjectURL(image)
                  setPhoto_url(objectUrl)
                }
              })
              .catch((error) => {
                console.error(error)
              })
          }
        })
        .catch(({ response }) => {
          if (response.data.message) {
            setMessage(response.data.message)
          }
          if (response.status === 401) {
            sessionStorage.clear()
            navigate('/login')
          }
        })
    }
    getCategoryById()
  }, [id, header, navigate])

  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let data: CategoryData = {
      name,
      description,
      ord,
      menu
    }

    if (photo) {
      data = { ...data, photo }
    }

    await Api.getCategoryUpdate(Number(id), data, header)
      .then((data) => {
        if (data.status == 200) console.log('Updated successfully')
        navigate('/admin/category')
      })
      .catch(({ response }) => {
        console.log(response)
        if (typeof response.data.message === 'string') {
          setMessage(response.data.message)
        } else {
          setMessage(response.data.message[0].message)
        }
        if (response.status === 401) {
          sessionStorage.clear()
          navigate('/login')
        }
      })
  }

  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-70">
        <div className="text-lg text-gray-900 dark:text-white mb-4">
          Update category
        </div>
        <div className="">
          <form action="" onSubmit={submitUpdate}>
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label className="flex items-center justify-center mb-5 cursor-pointer">
                  <input
                    checked={menu}
                    onChange={() => setMenu(!menu)}
                    id="menu"
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Menu
                  </span>
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
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
                  type="number"
                  name="order"
                  id="order"
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
                name="description"
                id="description"
                minLength={6}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <img
                src={photo_url}
                alt=""
                id="file"
                className="img-fluid img-thumbnail"
              />
              <input
                type="file"
                id="photo"
                name="photo"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => handleInputChange(e)}
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
                Update Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
