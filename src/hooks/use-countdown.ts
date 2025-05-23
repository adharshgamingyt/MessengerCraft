"use client"

import { useState, useEffect } from "react"

interface UseCountdownProps {
  initialSeconds: number
  onComplete?: () => void
}

export const useCountdown = ({ initialSeconds, onComplete }: UseCountdownProps) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isActive && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
    } else if (seconds === 0 && isActive) {
      setIsActive(false)
      onComplete?.()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [seconds, isActive, onComplete])

  const reset = (newSeconds = initialSeconds) => {
    setSeconds(newSeconds)
    setIsActive(true)
  }

  const stop = () => {
    setIsActive(false)
  }

  return {
    seconds,
    isActive,
    reset,
    stop,
  }
}
