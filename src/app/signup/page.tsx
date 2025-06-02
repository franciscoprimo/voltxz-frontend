'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'owner' | 'company' | 'investor' | 'monitor'>('owner');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = 'VoltzX | Criar Conta';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await registerUser({ name, email, password, role });

      if (result.success) {
        // Redirecionar para a página de completar cadastro com o role
        router.push(`/complete-registration?role=${role}`);
      } else {
        setError(result.message || 'Erro ao registrar');
      }
    } catch {
      setError('Ocorreu um erro durante o cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-200 via-yellow-100 to-yellow-50">
      <div className="max-w-lg w-full p-10 bg-white rounded-3xl shadow-lg border border-yellow-300">
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-8">Criar Conta</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
          />

          <div className="flex justify-between mt-4">
            {['owner', 'company', 'investor', 'monitor'].map((r) => (
              <label
                key={r}
                className="flex items-center space-x-2 cursor-pointer select-none text-yellow-700 hover:text-yellow-800 transition"
              >
                <input
                  type="radio"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r as any)}
                  className="accent-yellow-500 focus:ring-yellow-500"
                />
                <span className="capitalize">
                  {r === 'owner'
                    ? 'Proprietário'
                    : r === 'company'
                    ? 'Empresa'
                    : r === 'investor'
                    ? 'Investidor'
                    : 'Monitor'}
                </span>
              </label>
            ))}
          </div>

          {error && <p className="text-red-500 text-center font-medium">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-shadow shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>

        <div className="mt-8 text-center text-gray-600 text-sm">
          Já tem uma conta?{' '}
          <Link href="/signin" className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
