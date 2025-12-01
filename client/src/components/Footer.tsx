import DiscordIcon from './svg/DiscordIcon'
import FbIcon from './svg/FbIcon'
import GithubIcon from './svg/GithubIcon'
import XIcon from './svg/XIcon'

const footerItems = [
  { name: 'Facebook page', icon: <FbIcon /> },
  { name: 'Discord community', icon: <DiscordIcon /> },
  { name: 'Twitter page', icon: <XIcon /> },
  { name: 'GitHub account', icon: <GithubIcon /> }
]

export default function Footer() {
  return (
    <footer className="fbg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 lg:py-8">
        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 Business Directory
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {footerItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                {item.icon}
                <span className="sr-only">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
