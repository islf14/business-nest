import { useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { ListenDark } from './ListenDark'
import { getRole, getToken, getUser } from '../pageauth/UserSession'

export default function Navbar() {
  const navigate = useNavigate()
  //
  const menuUser = useRef<HTMLDivElement | null>(null)
  const menuButton = useRef<HTMLButtonElement | null>(null)
  const navUser = useRef<HTMLDivElement | null>(null)
  const navButton = useRef<HTMLButtonElement | null>(null)
  const dropUser = useRef<HTMLDivElement | null>(null)
  const dropButton = useRef<HTMLButtonElement | null>(null)

  // listen for click outside the open menu
  document.addEventListener('mousedown', closeOpenMenus)
  function closeOpenMenus(e: MouseEvent) {
    // console.log('click')
    if (
      !menuButton.current?.contains(e.target as Node) &&
      !menuUser.current?.contains(e.target as Node)
    ) {
      menuUser.current?.classList.add('hidden')
    }

    if (
      !navButton.current?.contains(e.target as Node) &&
      !navUser.current?.contains(e.target as Node)
    ) {
      navUser.current?.classList.add('hidden')
    }

    if (
      !dropButton.current?.contains(e.target as Node) &&
      !dropUser.current?.contains(e.target as Node)
    ) {
      dropUser.current?.classList.add('hidden')
    }
  }

  // view or hide the open menu
  function toggleDropdown() {
    dropUser.current?.classList.toggle('hidden')
  }
  function toggleNav() {
    navUser.current?.classList.toggle('hidden')
  }
  function toggleMenu() {
    menuUser.current?.classList.toggle('hidden')
  }

  //
  //

  // const token = { headers: { Authorization: `Bearer ${getToken()}` } }

  const logoutUser = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    toggleMenu()
    sessionStorage.clear()
    navigate('/login')
  }

  //
  // D A R K

  const darkModeProps = ListenDark()
  document.documentElement.classList.toggle('dark', darkModeProps.darkMode)

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

          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="/logout"
                onClick={(e) => logoutUser(e)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </>
      )
    }
  }

  const renderLinks = () => {
    if (getToken()) {
      return (
        <>
          <li>
            <button
              id="dropdownNavbarLink"
              onClick={toggleDropdown}
              ref={dropButton}
              data-dropdown-toggle="dropdownNavbar"
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
              Options{' '}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              ref={dropUser}
              id="dropdownNavbar"
              className="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 hidden"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownNavbar"
              >
                <li>
                  <a
                    href=""
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Category
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <Link
                  to={`/${getRole().toLowerCase()}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  {getRole()}
                </Link>
              </div>
            </div>
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
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="block">
            {/* button and menu user - dark */}
            <button
              type="button"
              ref={menuButton}
              onClick={toggleMenu}
              className="flex text-sm cursor-pointer text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 dark:border-gray-700 dark:hover:bg-gray-700 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <svg
                className="w-8 h-8 rounded-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
            <div
              ref={menuUser}
              className="z-50 hidden absolute translate-x-[-110px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              {renderSession()}
              <div className=" px-4 py-2 text-sm">
                <div className="flex justify-between">
                  <p>Dark</p>
                  <label
                    className="border bg-Toggle p-[3px] w-12 h-6 rounded-full cursor-pointer relative overflow-hidden"
                    htmlFor="darkmode"
                  >
                    <input
                      onChange={darkModeProps.changeMode}
                      checked={darkModeProps.darkMode}
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
                    onClick={darkModeProps.systemMode}
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
          <button
            onClick={toggleNav}
            ref={navButton}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          ref={navUser}
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
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
