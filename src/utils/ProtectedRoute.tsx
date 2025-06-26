import { useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (performance.navigation.type === 1 || location.key === 'default') {
      if (location.pathname !== '/') {
        navigate('/', { replace: true })
      }
    }
  }, [location, navigate])

  return <>{children}</>
}
