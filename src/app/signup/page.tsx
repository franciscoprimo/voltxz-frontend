'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'owner' | 'company' | 'investor' | 'monitor'>('owner')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Define o nome da aba do navegador
  useEffect(() => {
    document.title = "VoltzX | Sign Up"
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = registerUser({ name, email, password, role })

      if (result.success) {
        router.push('/signin') // Corrigido de '/sigin' para '/signin'
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Ocorreu um erro durante o cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
          />

          <div className="flex flex-wrap gap-3 justify-center">
            {['owner', 'company', 'investor', 'monitor'].map((r) => (
              <label key={r} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r as any)}
                  className="text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-gray-700">
                  {r === 'owner' ? 'Proprietário' : 
                   r === 'company' ? 'Empresa' : 
                   r === 'investor' ? 'Investidor' : 'Monitor'}
                </span>
              </label>
            ))}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/signin" className="font-medium text-yellow-600 hover:text-yellow-500">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 