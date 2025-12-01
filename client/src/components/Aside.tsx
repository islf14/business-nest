import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import UsersIcon from './svg/UsersIcon'
import CategoryIcon from './svg/CategoryIcon'
import BusinessIcon from './svg/BusinessIcon'
import AsideIcon from './svg/AsideIcon'

const asideItems = [
  { name: 'Users', path: '/admin/user', icon: <UsersIcon /> },
  { name: 'Categories', path: '/admin/category', icon: <CategoryIcon /> },
  { name: 'Business', path: '/admin/company', icon: <BusinessIcon /> }
]

export default function Aside() {
  const [asideOpen, setAsideOpen] = useState<boolean>(false)
  const asideButton = useRef<HTMLButtonElement | null>(null)
  const sidebar = useRef<HTMLElement | null>(null)

  const toggleAside = () => {
    setAsideOpen(!asideOpen)
  }

  // listen for click outside the aside button
  useEffect(() => {
    if (asideOpen) {
      document.addEventListener('mousedown', closeOpenMenus)
      return () => {
        document.removeEventListener('mousedown', closeOpenMenus)
      }
    }
  }, [asideOpen])

  function closeOpenMenus(e: MouseEvent) {
    if (
      !asideButton.current?.contains(e.target as Node) &&
      !sidebar.current?.contains(e.target as Node)
    ) {
      setAsideOpen(false)
    }
  }

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={toggleAside}
        ref={asideButton}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <AsideIcon />
      </button>

      <aside
        id="default-sidebar"
        ref={sidebar}
        className={`${
          asideOpen ? '' : '-translate-x-full'
        } fixed top-32 md:top-20 left-0 z-40 w-56 h-1/3 transition-transform md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {asideItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => setAsideOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-100 dark:bg-gray-700'
                      : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  }
                >
                  {item.icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
