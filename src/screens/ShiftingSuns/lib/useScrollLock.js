import { useEffect } from 'react'

const windowGlobal = typeof window !== 'undefined' && window

const useScrollLock = () => {
  const scrollLock = e => {
    e.preventDefault()
  }

  useEffect(() => {
    windowGlobal.addEventListener('touchmove', scrollLock, { passive: false })
    return () => {
      return windowGlobal.removeEventListener('touchmove', scrollLock)
    }
  }, [])
}

export default useScrollLock
