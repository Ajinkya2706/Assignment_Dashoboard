import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

export const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (!result.success) {
      showToast(result.error || 'Login failed', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
      <div className="text-center text-sm">
        <button
          type="button"
          onClick={onSwitchToRegister}
            className="text-gray-600 hover:text-black"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  )
}


