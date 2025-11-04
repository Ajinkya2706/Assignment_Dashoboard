import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { LoginForm } from '../../components/auth/LoginForm'
import { RegisterForm } from '../../components/auth/RegisterForm'
import { BookOpen } from 'lucide-react'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-gray-300">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-black">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl">AssignHub</CardTitle>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to continue' : 'Create your account'}
          </p>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
          <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
            <p>Demo: prof@uni.edu / student@uni.edu</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


