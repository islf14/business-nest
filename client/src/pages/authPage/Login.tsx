import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Api from '../../Api'
import { Link } from 'react-router'
import { useFormInput } from '../../components/UseFormInput'
import useAuth from '../../hooks/useAuth'

export default function Login() {
  const { getToken, saveToken } = useAuth()
  const emailProps = useFormInput('')
  const passwordProps = useFormInput('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (getToken()) {
      navigate('/')
    }
  }, [navigate, getToken])

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    Api.login({ email: emailProps.value, password: passwordProps.value })
      .then(({ data }) => {
        if (data && data.token && data.user) {
          saveToken(data.token, data.user, data.user.role)
          if (data.user.role === 'ADMIN') {
            navigate('/admin')
          } else if (data.user.role === 'USER') {
            navigate('/client')
          } else {
            navigate('/')
          }
        } else {
          setMessage('Incomplete session')
        }
      })
      .catch(({ response }) => {
        setMessage(response.data.message)
      })
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={submitLogin}
              className="space-y-4 md:space-y-6"
              action="#"
            >
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
                  {...emailProps}
                  autoComplete="username"
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
                  {...passwordProps}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                Admin email and password for testing:
                <div>admin@admin.com</div>
                <div>admin</div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="wflex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 mt-2 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
              <p className="text-red-600">{message}</p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link
                  to={'/register'}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
