import Navbar from './Navbar'
import ConfigMenu from './ConfigMenu'

export default function Header() {
  console.log('Header rendered')

  return (
    <header className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center font-bold text-gray-900 dark:text-white space-x-3 rtl:space-x-reverse"
        >
          Business Directory
        </a>
        {/* Settings button and Main menu button */}
        <div className="flex items-center gap-1 md:gap-8">
          <div className="md:order-1">
            <Navbar />
          </div>
          <div className="md:order-2">
            <ConfigMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
