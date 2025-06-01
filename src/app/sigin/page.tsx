'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SigninPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const result = loginUser(email, password)

    if (result.success && result.user) {
      const role = result.user.role
      if (role === 'owner') router.push('/dashboard/owner/lands')
      else if (role === 'company') router.push('/dashboard/company/projects')
      else if (role === 'investor') router.push('/dashboard/investor/marketplace')
      else if (role === 'monitor') router.push('/dashboard/monitor') 
    } else {
      setError(result.message || 'Credenciais inválidas')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Entrar</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  )
}
