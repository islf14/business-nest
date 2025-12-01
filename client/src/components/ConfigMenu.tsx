import { Link } from 'react-router'
import ConfigIcon from './svg/ConfigIcon'
import { useEffect, useRef, useState } from 'react'
import ThemeList from './ThemeList'
import useAuth from '../hooks/useAuth'

export default function ConfigMenu() {
  const { getRole, getToken, getUser, getLogout } = useAuth()
  const [configOpen, setConfigOpen] = useState<boolean>(false)
  const configMenuRef = useRef<HTMLDivElement | null>(null)
  const configMenuButtonRef = useRef<HTMLButtonElement | null>(null)

  // MANAGE CLICK OUTSIDE TO CLOSE CONFIG MENU
  function toggleConfigMenu() {
    setConfigOpen(!configOpen)
  }

  useEffect(() => {
    if (configOpen) {
      document.addEventListener('mousedown', handleConfiglistener)
      return () => {
        document.removeEventListener('mousedown', handleConfiglistener)
      }
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

  // e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  const logoutUser = () => {
    setConfigOpen(false)
    getLogout()
  }

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
          <Link
            to={'/login'}
            onClick={logoutUser}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </Link>
        </>
      )
    }
  }

  return (
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
        } z-50 absolute translate-x-[-110px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:divide-gray-600`}
        id="user-dropdown"
      >
        {renderSession()}
        {/* Dark options */}
        <ThemeList setConfigOpen={setConfigOpen} />
      </div>
    </div>
  )
}
