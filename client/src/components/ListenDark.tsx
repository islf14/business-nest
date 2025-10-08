import { useState, useEffect } from 'react'

export function ListenDark() {
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

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (!('dark' in localStorage)) {
          // console.log('event')
          setDarkMode(event.matches)
        }
      })
  }, [])

  // button change Dark
  const changeMode = () => {
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

  return darkProps
}
