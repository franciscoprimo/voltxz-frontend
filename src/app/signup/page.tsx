// pages/signup/index.tsx (ou o caminho correto)
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { performRegister } from '@/lib/auth'; // Importa performRegister
import type { UserType } from '@/lib/auth'; // Importa UserType
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Alinhado com o UserType do backend
  const [user_type, setUser_type] = useState<UserType>('land_owner'); // <-- Renomeado de 'role' para 'user_type'
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
      // Chama performRegister com os dados alinhados
      const result = await performRegister({ name, email, password, user_type });

      if (result.success) {
        // Se o registro logar automaticamente, você pode ir para o dashboard
        router.push(`/complete-registration?user_type=${user_type}`);
        // Se a ideia for completar o cadastro antes de ir para o dashboard
        // router.push(`/complete-registration?user_type=${user_type}`);
      } else {
        setError(result.message || 'Erro ao registrar');
      }
    } catch (err: any) { // Pega o erro que foi propagado
      setError(err.message || 'Ocorreu um erro durante o cadastro');
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
            {/* Atualizado para user_type e valores do backend */}
            {['land_owner', 'company', 'investor', 'monitor'].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-2 cursor-pointer select-none text-yellow-700 hover:text-yellow-800 transition"
              >
                <input
                  type="radio"
                  value={type}
                  checked={user_type === type}
                  onChange={() => setUser_type(type as UserType)}
                  className="accent-yellow-500 focus:ring-yellow-500"
                />
                <span className="capitalize">
                  {type === 'land_owner'
                    ? 'Proprietário'
                    : type === 'company'
                    ? 'Empresa'
                    : type === 'investor'
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