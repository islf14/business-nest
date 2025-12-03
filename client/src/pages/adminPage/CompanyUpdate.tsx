import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Api from '../../Api'
import useAuth from '../../hooks/useAuth'
import type { Company, CompanyNewData } from '../../types'
import { base_api_url } from '../../constants'

export default function CompanyUpdate() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [photo, setPhoto] = useState<File>()
  const [photo_url, setPhoto_url] = useState('foto.jpg')
  const [userId, setUserId] = useState<number>(0)
  const [categoryId, setCategoryId] = useState<number>(0)
  const [message, setMessage] = useState<string>('')
  const header = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    }),
    [getToken]
  )

  // Image has been uploaded
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Load Company
  useEffect(() => {
    const getCategoryById = () => {
      Api.findCompany(Number(id), header)
        .then(({ data }) => {
          const company: Company = data
          setName(company.name)
          setEmail(company.email)
          setPhone(company.phone)
          setAddress(company.address)
          setDescription(company.description)
          if (company.website) {
            setWebsite(company.website)
          }
          setUserId(Number(company.userId))
          setCategoryId(Number(company.categoryId))

          if (company.photoUrl) {
            fetch(`${base_api_url}/file/${company.photoUrl}`, {
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
  }, [id, header, navigate, getToken])

  // Create company
  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let data: CompanyNewData = {
      name,
      email,
      phone,
      address,
      description,
      website,
      userId,
      categoryId
    }

    if (photo) {
      data = { ...data, photo }
    }

    await Api.updateCategory(Number(id), data, header)
      .then(() => {
        navigate('/admin/company')
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
          Update company
        </div>
        <div className="">
          <form action="" onSubmit={submitUpdate}>
            {/* Company name */}
            <div className=" w-full mb-5 ">
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

            {/* User id and category id */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="userId"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(Number(e.target.value))}
                  required
                >
                  <option value={1}>holi</option>
                  <option value={2}>holi</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="categoryId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="categoryId"
                  id="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  required
                >
                  <option value={1}>holi</option>
                  <option value={2}>holi</option>
                </select>
              </div>
            </div>

            {/* Email and phone */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  autoComplete="email"
                  placeholder="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  placeholder="Phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Company address */}
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                name="address"
                id="address"
                type="text"
                autoComplete="address"
                placeholder="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Description */}
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

            {/* Company website */}
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Website
              </label>
              <input
                name="website"
                id="website"
                type="text"
                autoComplete="website"
                placeholder="Website"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </div>

            {/* Company photo */}
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
                onChange={handleInputChange}
              />
            </div>

            {/* Error message */}
            <p className="text-red-600">{message}</p>

            {/* Buttons */}
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
                Update company
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
