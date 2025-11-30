import { useState, useEffect } from 'react'
import { ThemeProviderContext } from './useTheme'

type ThemeProviderProps = {
  children: React.ReactNode
}

export type Theme = 'Dark' | 'Light' | 'System'

// P R O V I D E R

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getTheme)

  function getTheme() {
    if (localStorage.dark) {
      return localStorage.dark
    } else return 'System'
  }

  // It is necessary to create a const mediaQuery,
  // otherwise the listener wil not be removed
  useEffect(() => {
    if (theme === 'Dark') {
      document.documentElement.classList.toggle('dark', true)
    }
    if (theme === 'Light') {
      document.documentElement.classList.toggle('dark', false)
    }
    if (theme === 'System') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      document.documentElement.classList.toggle('dark', mediaQuery.matches)

      function browserChagedTheme(event: MediaQueryListEvent) {
        document.documentElement.classList.toggle('dark', event.matches)
      }
      mediaQuery.addEventListener('change', browserChagedTheme)
      return () => {
        mediaQuery.removeEventListener('change', browserChagedTheme)
      }
    }
  }, [theme])

  // button change Dark
  const changeTheme = (mode: Theme) => {
    setTheme(mode)
    localStorage.dark = mode
    return
  }

  const value = {
    theme,
    changeTheme
  }

  return <ThemeProviderContext value={value}>{children}</ThemeProviderContext>
}
