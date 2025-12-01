import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import MenuIcon from './svg/MenuIcon'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
  const { getRole, getToken } = useAuth()
  const mainMenuRef = useRef<HTMLDivElement | null>(null)
  const mainMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const [mainOpen, setMainOpen] = useState<boolean>(false)

  // MANAGE CLICK OUTSIDE TO CLOSE MAIN MENU
  function toggleMainMenu() {
    setMainOpen(!mainOpen)
  }

  useEffect(() => {
    if (mainOpen) {
      document.addEventListener('mousedown', handleMenulistener)
      return () => {
        document.removeEventListener('mousedown', handleMenulistener)
      }
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

  //
  const navbarItems = [
    { name: 'Home', path: '/' }
    // { name: 'About', path: '/about' },
  ]

  if (getToken()) {
    navbarItems.push({
      name: getRole().toLowerCase() === 'admin' ? 'Admin' : 'Client',
      path: `/${getRole().toLowerCase() === 'admin' ? 'admin' : 'client'}`
    })
  } else {
    navbarItems.push({ name: 'Login', path: '/login' })
  }

  return (
    <nav className="">
      {/* Oppening button */}
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
      {/* Main menu */}
      <div
        ref={mainMenuRef}
        className={`${
          mainOpen ? '' : 'hidden'
        } z-10 absolute -translate-x-[calc(100%-33px)] items-center justify-between w-1/2 md:static md:flex md:w-auto md:-translate-0`}
        id="navbar-user"
      >
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {navbarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                onClick={() => setMainOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                    : 'block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }
                aria-current="page"
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
