import { createContext, use } from 'react'

type DarkProviderContextType = {
  darkMode: boolean
  changeMode: () => void
  systemMode: () => void
}

const initialState: DarkProviderContextType = {
  darkMode: false,
  changeMode: () => {},
  systemMode: () => {}
}

export const DarkProviderContext =
  createContext<DarkProviderContextType>(initialState)

export const useDark = () => {
  const context = use(DarkProviderContext)
  if (context === undefined) {
    throw new Error('useDark must be used within a DarkProvider')
  }
  return context
}
