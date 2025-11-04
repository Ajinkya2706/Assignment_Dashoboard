import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './components/ui/toast'
import { ProtectedRoute } from './components/shared/ProtectedRoute'
import { LoadingSpinner } from './components/shared/LoadingSpinner'
import { AuthPage } from './views/auth/AuthPage'
import { ProfessorDashboard } from './views/professor/ProfessorDashboard'
import { StudentDashboard } from './views/student/StudentDashboard'
import { useAuth } from './hooks/useAuth'

const AppContent = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={!user ? <AuthPage /> : <Navigate to="/" replace />} 
      />
      <Route
        path="/professor/*"
        element={
          <ProtectedRoute requiredRole="professor">
            <ProfessorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {user?.role === 'professor' ? (
              <Navigate to="/professor" replace />
            ) : (
              <StudentDashboard />
            )}
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
