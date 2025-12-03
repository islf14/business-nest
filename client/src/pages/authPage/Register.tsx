import { useEffect, useRef, useState } from 'react'
import Api from '../../Api'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

export default function Register() {
  const { getToken } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const password2 = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [color, setColor] = useState<boolean>(true)

  useEffect(() => {
    if (getToken()) {
      navigate('/')
    }
  }, [navigate, getToken])

  // width button e: React.MouseEvent<HTMLButtonElement>
  const submitRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === password2.current?.value) {
      Api.register({ name, email, password })
        .then(() => {
          setColor(true)
          setMessage('Success!')
          setTimeout(() => {
            navigate('/login')
          }, 500)
        })
        .catch(({ response }) => {
          console.log(response)
          if (response.data && response.data.message) {
            setColor(false)
            setMessage(response.data.message)
          }
        })
    } else {
      setColor(false)
      setMessage('The passwords are different')
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your account
            </h1>
            <form
              onSubmit={submitRegistro}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
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
                  Your email
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
                  Password
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
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  ref={password2}
                  id="repeat-password"
                  placeholder="••••••••"
                  minLength={4}
                  maxLength={50}
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  required
                />
              </div>
              <p
                className={`${
                  color ? 'text-green-500' : 'text-red-500'
                } min-h-2`}
              >
                {message}
              </p>

              <button
                type="submit"
                className="wflex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
