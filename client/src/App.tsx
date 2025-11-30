import { ThemeProvider } from './providers/ThemeProvider'
import RouterApp from './RouterApp'

export default function App() {
  return (
    <ThemeProvider>
      <RouterApp />
    </ThemeProvider>
  )
}
