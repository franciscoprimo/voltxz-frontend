'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { completeUserRegistration } from '@/lib/auth'; // criar no back caso nao tenha

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
      const payload =
        role === 'company'
          ? { role, cnpj, companyName }
          : { role, cpf, fullName };

      const result = await completeUserRegistration(payload);

      if (result.success) {
        router.push('/signin');
      } else {
        setError(result.message || 'Erro ao completar cadastro');
      }
    } catch (err) {
      setError('Erro ao completar cadastro');
    } finally {
      setLoading(false);
    }
  };

  const isRoleValid = role === 'owner' || role === 'investor' || role === 'monitor' || role === 'company';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-200 via-yellow-100 to-yellow-50">
      <div className="max-w-lg w-full p-10 bg-white rounded-3xl shadow-lg border border-yellow-300">
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-8">Completar Cadastro</h2>

        {!isRoleValid ? (
          <p className="text-center text-red-500 font-medium">Tipo de usuário inválido.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {role === 'company' ? (
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
        )}
      </div>
    </div>
  );
}
