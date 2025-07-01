import { useEffect, type ReactNode } from 'react'
import {
  useLocation,
  useNavigate,
  useNavigationType
} from 'react-router-dom'

export default function ProtectedRoute({
  children
}: {
  children: ReactNode
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const navType = useNavigationType()

  useEffect(() => {
    if (navType === 'POP' && location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, [navType, location.pathname, navigate])

  return <>{children}</>
}
