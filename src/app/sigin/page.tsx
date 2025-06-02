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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-200 via-yellow-100 to-yellow-50 px-4">
      <div className="max-w-lg w-full p-10 bg-white rounded-3xl shadow-lg border border-yellow-300">
        {/* Removi o SVG aqui */}
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-8">Entrar</h2>

        <form onSubmit={handleLogin} className="space-y-6">
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

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-shadow shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-8 text-center text-gray-600 text-sm">
          Não tem uma conta?{' '}
          <Link
            href="/signup"
            className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
