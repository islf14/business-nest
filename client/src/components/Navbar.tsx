import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { getRole, getToken, getUser } from '../pageauth/UserSession'
import ConfigIcon from './svg/ConfigIcon'
import MenuIcon from './svg/MenuIcon'
import { useDark } from './useDark'

export default function Navbar() {
  console.log('Navbar rendered')
  // const darkModeProps = useDark()
  const { darkMode, changeMode, systemMode } = useDark()
  const navigate = useNavigate()
  //
  const configMenuRef = useRef<HTMLDivElement | null>(null)
  const configMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mainMenuRef = useRef<HTMLDivElement | null>(null)
  const mainMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const [mainOpen, setMainOpen] = useState<boolean>(false)
  const [configOpen, setConfigOpen] = useState<boolean>(false)

  // D A R K
  document.documentElement.classList.toggle('dark', darkMode)

  // view or hide the open menu
  function toggleMainMenu() {
    setMainOpen(!mainOpen)
  }
  function toggleConfigMenu() {
    setConfigOpen(!configOpen)
  }

  // MANAGE CLICK OUTSIDE TO CLOSE MAIN MENU
  useEffect(() => {
    if (mainOpen) {
      document.addEventListener('mousedown', handleMenulistener)
    }
    return () => {
      document.removeEventListener('mousedown', handleMenulistener)
    }
  }, [mainOpen])

  function handleMenulistener(e: MouseEvent) {
    if (
      !mainMenuButtonRef.current?.contains(e.target as Node) &&
      !mainMenuRef.current?.contains(e.target as Node)
    ) {
      setMainOpen(false)
    }
  }

  // MANAGE CLICK OUTSIDE TO CLOSE CONFIG MENU
  useEffect(() => {
    if (configOpen) {
      document.addEventListener('mousedown', handleConfiglistener)
    }
    return () => {
      document.removeEventListener('mousedown', handleConfiglistener)
    }
  }, [configOpen])

  function handleConfiglistener(e: MouseEvent) {
    if (
      !configMenuButtonRef.current?.contains(e.target as Node) &&
      !configMenuRef.current?.contains(e.target as Node)
    ) {
      setConfigOpen(false)
    }
  }

  //
  //

  // const token = { headers: { Authorization: `Bearer ${getToken()}` } }

  const logoutUser = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    toggleConfigMenu()
    sessionStorage.clear()
    navigate('/login')
  }

  //
  //

  const renderSession = () => {
    if (getToken()) {
      return (
        <>
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {getRole()}
            </span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {getUser().email}
            </span>
          </div>

          <a
            href="/logout"
            onClick={(e) => logoutUser(e)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </a>
        </>
      )
    }
  }

  const renderLinks = () => {
    if (getToken()) {
      return (
        <>
          <li>
            <Link
              to={`/${
                getRole().toLowerCase() === 'admin' ? 'admin' : 'client'
              }`}
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {getRole().toLowerCase() === 'admin' ? 'Admin' : 'Client'}
            </Link>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li>
            <Link
              to={'/login'}
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Login
            </Link>
          </li>
        </>
      )
    }
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center font-bold text-gray-900 dark:text-white space-x-3 rtl:space-x-reverse"
        >
          Business Directory
        </a>
        {/* Settings button and Princial menu button */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="block">
            {/* Seggings button - dark */}
            <button
              type="button"
              ref={configMenuButtonRef}
              onClick={toggleConfigMenu}
              className="flex text-sm cursor-pointer text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 dark:border-gray-700 dark:hover:bg-gray-700 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <span className="w-8 h-8">
                <ConfigIcon />
              </span>
            </button>
            {/* Settings menu */}
            <div
              ref={configMenuRef}
              className={`${
                configOpen ? '' : 'hidden'
              } z-50 absolute translate-x-[-110px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              {renderSession()}
              {/* Dark options */}
              <div className=" px-4 py-2 text-sm">
                <div className="flex justify-between">
                  <p>Dark</p>
                  <label
                    className="border bg-Toggle p-[3px] w-12 h-6 rounded-full cursor-pointer relative overflow-hidden"
                    htmlFor="darkmode"
                  >
                    <input
                      onChange={changeMode}
                      checked={darkMode}
                      className="peer sr-only"
                      type="checkbox"
                      id="darkmode"
                    />
                    <div className="peer-checked:bg-gradient-to-r from-Toggle-blue to-Toggle-green absolute top-0 left-0 w-full h-full"></div>
                    <div className="w-[18px] h-[18px] bg-Light-Grayish-Blue rounded-full peer-checked:translate-x-[24px]"></div>
                  </label>
                </div>
                <div className="flex justify-between mt-1">
                  <span>System</span>
                  <button
                    onClick={systemMode}
                    className="ml-3.5 mr-3.5 cursor-pointer text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-700 dark:hover:bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <svg
                      className="w-5 h-5 rounded-full"
                      aria-hidden="true"
                      fill="none"
                      version="1.1"
                      id="Icons"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                    >
                      <g>
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.2,9.6c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.5,6.1c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L8.2,9.6z"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7,16c0-0.6-0.4-1-1-1H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h3C6.6,17,7,16.6,7,16z"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.2,22.4l-2.1,2.1c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l2.1-2.1c0.4-0.4,0.4-1,0-1.4S8.6,22,8.2,22.4z"
                        />
                      </g>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M29.4,16.2c-0.4-0.2-0.9-0.1-1.2,0.3c-0.8,1-2,1.5-3.2,1.5c-2.3,0-4.3-1.9-4.3-4.3c0-1.6,0.9-3,2.3-3.8c0.4-0.2,0.6-0.7,0.5-1.1C23.4,8.4,23,8,22.5,8c-0.1,0-0.3,0-0.4,0c-1.9,0-3.7,0.7-5.1,1.8V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v5.1c-3.9,0.5-7,3.9-7,7.9s3.1,7.4,7,7.9V29c0,0.6,0.4,1,1,1s1-0.4,1-1v-6.8c1.4,1.2,3.2,1.8,5.1,1.8c4,0,7.3-2.9,7.9-6.8C30.1,16.8,29.8,16.3,29.4,16.2z M17,20c0,0.6-0.4,1-1,1s-1-0.4-1-1v-8c0-0.6,0.4-1,1-1s1,0.4,1,1V20z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Principal menu button */}
          <button
            onClick={toggleMainMenu}
            ref={mainMenuButtonRef}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <span className="w-5 h-5">
              <MenuIcon />
            </span>
          </button>
        </div>
        {/* Principal menu */}
        <div
          ref={mainMenuRef}
          className={`${
            mainOpen ? '' : 'hidden'
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                    : 'block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/about'}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                    : 'block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/contact'}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                    : 'block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }
              >
                Contact
              </NavLink>
            </li>
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  )
}
