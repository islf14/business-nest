import { useTheme } from '../providers/useTheme'

type ThemeListProps = {
  setConfigOpen: (status: boolean) => void
}

export default function ThemeList({ setConfigOpen }: ThemeListProps) {
  const { theme, changeTheme } = useTheme()

  const themeItems = [
    {
      name: 'Light',
      action: () => {
        changeTheme('Light')
        setConfigOpen(false)
      },
      selected: theme === 'Light'
    },
    {
      name: 'Dark',
      action: () => {
        changeTheme('Dark')
        setConfigOpen(false)
      },
      selected: theme === 'Dark'
    },
    {
      name: 'System',
      action: () => {
        changeTheme('System')
        setConfigOpen(false)
      },
      selected: theme === 'System'
    }
  ]

  return (
    <ul className="min-w-32 px-4 py-2 text-sm">
      {themeItems.map((item, index) => (
        <li
          key={index}
          onClick={item.action}
          className={`${
            item.selected
              ? 'border-blue-800 bg-gray-100 dark:bg-gray-700'
              : 'border-transparent'
          } border rounded-md flex justify-between p-1 cursor-pointer mt-1 dark:hover:bg-gray-600 hover:bg-gray-100`}
        >
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  )
}
