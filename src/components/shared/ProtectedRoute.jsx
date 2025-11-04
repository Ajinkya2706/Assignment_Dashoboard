import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LoadingSpinner } from './LoadingSpinner'

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}



