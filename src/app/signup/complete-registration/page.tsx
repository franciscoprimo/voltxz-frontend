'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CompleteRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const [cpf, setCpf] = useState('');
  const [fullName, setFullName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'VoltzX | Completar Cadastro';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // integra  com  API para salvar os dados
      

      router.push('/signin');
    } catch (err) {
      setError('Erro ao completar cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-200 via-yellow-100 to-yellow-50">
      <div className="max-w-lg w-full p-10 bg-white rounded-3xl shadow-lg border border-yellow-300">
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-8">Completar Cadastro</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === 'owner' || role === 'investor' || role === 'monitor' ? (
            <>
              <Input
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
              />
              <Input
                placeholder="Nome Completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
              />
            </>
          ) : role === 'company' ? (
            <>
              <Input
                placeholder="CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                required
                className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
              />
              <Input
                placeholder="Nome da Empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
              />
            </>
          ) : (
            <p className="text-center text-red-500">Tipo de usuário inválido.</p>
          )}

          {error && <p className="text-red-500 text-center font-medium">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-shadow shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Finalizar Cadastro'}
          </Button>
        </form>
      </div>
    </div>
  );
}
