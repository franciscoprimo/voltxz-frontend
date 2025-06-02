'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = 'VoltzX | Entrar';
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(email, password);

      if (result.success && result.user) {
        const role = result.user.role;
        if (role === 'owner') router.push('/dashboard/owner/lands');
        else if (role === 'company') router.push('/dashboard/company/projects');
        else if (role === 'investor') router.push('/dashboard/investor/marketplace');
        else if (role === 'monitor') router.push('/dashboard/monitor');
      } else {
        setError(result.message || 'Credenciais inválidas');
      }
    } catch {
      setError('Ocorreu um erro durante o login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-yellow-700 mb-2">VoltzX</h1>
          <p className="text-gray-600">Acesse sua conta para continuar</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
            />
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/signup" className="font-medium text-yellow-600 hover:text-yellow-500">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}