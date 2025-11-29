import { useState, useEffect } from 'react'
import { DarkProviderContext } from './useDark'

// Dark: localStorage: dark=true
// Light: localStorage: dark=false
// System: localStorage: It doesn't exist

type DarkProviderProps = {
  children: React.ReactNode
}

// P R O V I D E R

export function DarkProvider({ children }: DarkProviderProps) {
  const [darkMode, setDarkMode] = useState<boolean>(getMode)
  function getMode() {
    if (localStorage.dark) {
      if (localStorage.dark === 'true') return true
      else return false
    }
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }

  function browserChagedTheme(event: MediaQueryListEvent) {
    if (!('dark' in localStorage)) {
      console.log('changed mode in browser')
      setDarkMode(event.matches)
    }
  }

  // It is necessary to create a const mediaQuery,
  // otherwise the listener wil not be removed
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', browserChagedTheme)
    console.log('in useEffect- addlistener to scheme')
    return () => {
      mediaQuery.removeEventListener('change', browserChagedTheme)
      console.log('in useEffect- removeListener to scheme')
    }
  }, [])

  // button change Dark
  const changeMode = () => {
    console.log('user changed')
    setDarkMode(!darkMode)
    localStorage.dark = !darkMode
  }

  // button reset, mode system theme
  function systemMode() {
    setDarkMode(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    )
    localStorage.removeItem('dark')
  }

  const darkProps = {
    darkMode,
    changeMode,
    systemMode
  }

  // return darkProps
  return <DarkProviderContext value={darkProps}>{children}</DarkProviderContext>
}
