'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'owner' | 'company' | 'investor' | 'monitor'>('owner')
  const [error, setError] = useState('')
  const router = useRouter()

  //Define o nome da aba do navegador
  useEffect(() => {
    document.title = "Voltxz | Sign Up"
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = registerUser({ name, email, password, role })

    if (result.success) {
      router.push('/sigin')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Criar Conta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        <div className="space-x-4">
          <label>
            <input
              type="radio"
              value="owner"
              checked={role === 'owner'}
              onChange={() => setRole('owner')}
            />
            <span className="ml-1">Proprietário</span>
          </label>
          <label>
            <input
              type="radio"
              value="company"
              checked={role === 'company'}
              onChange={() => setRole('company')}
            />
            <span className="ml-1">Empresa</span>
          </label>
          <label>
            <input
              type="radio"
              value="investor"
              checked={role === 'investor'}
              onChange={() => setRole('investor')}
            />
            <span className="ml-1">Investidor</span>
          </label>
          <label>
            <input
              type="radio"
              value="monitor"
              checked={role === 'monitor'}
              onChange={() => setRole('monitor')}
            />
            <span className="ml-1">Monitor</span>
          </label>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </form>
    </div>
  )
}
