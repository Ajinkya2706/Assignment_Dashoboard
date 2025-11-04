import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select } from '../ui/select'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

export const RegisterForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await register(name, email, password, role)
    setLoading(false)
    if (!result.success) {
      showToast(result.error || 'Registration failed', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="professor">Professor</option>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
      <div className="text-center text-sm">
        <button
          type="button"
          onClick={onSwitchToLogin}
            className="text-gray-600 hover:text-black"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  )
}


