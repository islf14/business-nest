import { createContext, use } from 'react'
import type { Theme } from './ThemeProvider'

type ThemeProviderContextType = {
  theme: Theme
  changeTheme: (mode: Theme) => void
}

const initialState: ThemeProviderContextType = {
  theme: 'System',
  changeTheme: () => {}
}

export const ThemeProviderContext =
  createContext<ThemeProviderContextType>(initialState)

export const useTheme = () => {
  const context = use(ThemeProviderContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
