import { useEffect, useState } from 'react'
type TimedMessageProps = {
  message: string
  color: boolean
  duration?: number
  action: () => void
}

export default function TimedMessage({
  message,
  color,
  duration = 5000,
  action
}: TimedMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsVisible(false)
      action()
    }, duration) // 5000 milliseconds = 5 seconds
    return () => {
      clearTimeout(timerId)
    }
  }, [duration, action])

  if (!isVisible) {
    return null
  }
  return (
    <div className={`${color ? 'text-green-400' : 'text-red-500'} p-1 my-1`}>
      {message}
    </div>
  )
}
