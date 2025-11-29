import { DarkProvider } from './components/DarkProvider'
import RouterApp from './RouterApp'

export default function App() {
  return (
    <DarkProvider>
      <RouterApp />
    </DarkProvider>
  )
}
