// src/app/complete-registration/page.tsx (Este é o local correto para o App Router)
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAuthToken } from '@/lib/auth'; // Para pegar o token do usuário logado
import { profileCreationService } from '@/lib/api/profileCreationService'; // Importar o serviço correto

export default function CompleteRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Usamos 'user_type' para ser consistente com o UserType do backend
  const user_type = searchParams.get('user_type');

  // Estados para os campos de entrada, mais concisos
  const [documentId, setDocumentId] = useState(''); // Será CPF ou CNPJ
  const [companyName, setCompanyName] = useState(''); // Apenas para empresas

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'VoltzX | Completar Cadastro';
    // Adiciona uma verificação mais robusta do user_type
    if (!user_type || !['land_owner', 'company', 'investor', 'monitor'].includes(user_type)) {
      setError('Tipo de usuário inválido ou não fornecido.');
      // Opcional: redireciona para signup se o tipo for inválido
      // router.push('/signup');
    }
  }, [user_type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = getAuthToken(); // Obtém o token do localStorage
    if (!token) {
      setError('Sessão expirada ou não autenticada. Por favor, faça login novamente.');
      router.push('/signin'); // Redireciona para login
      return;
    }

    try {
      if (user_type === 'land_owner') {
        // Envia apenas o document_id para land_owner
        await profileCreationService.createLandOwner(
          { document_id: documentId },
          token
        );
      } else if (user_type === 'investor' || user_type === 'monitor') {
        // Envia apenas o document_id para investor/monitor
        await profileCreationService.createInvestor(
          { document_id: documentId },
          token
        );
      } else if (user_type === 'company') {
        // Envia document_id e company_name para company
        await profileCreationService.createCompany(
          { document_id: documentId, company_name: companyName },
          token
        );
      } else {
        // Caso o user_type não seja mapeado (idealmente previnido pelo useEffect)
        setError('Tipo de usuário desconhecido para completar o cadastro.');
        setLoading(false);
        return;
      }

      // Redireciona para o dashboard após completar o cadastro
      router.push('/dashboard');
    } catch (err: any) { // Captura o erro corretamente
      console.error("Erro ao completar cadastro:", err);
      setError(err.message || 'Erro ao completar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getDocumentLabel = () => {
    if (user_type === 'land_owner' || user_type === 'investor' || user_type === 'monitor') return 'CPF';
    if (user_type === 'company') return 'CNPJ';
    return 'Documento';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-200 via-yellow-100 to-yellow-50">
      <div className="max-w-lg w-full p-10 bg-white rounded-3xl shadow-lg border border-yellow-300">
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-8">Completar Cadastro</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Condição para renderizar o formulário se o user_type for válido */}
          {user_type && ['land_owner', 'company', 'investor', 'monitor'].includes(user_type) ? (
            <>
              {/* Campo de Documento (CPF ou CNPJ) */}
              <Input
                placeholder={getDocumentLabel()}
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                required
                className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
              />

              {/* Campo de Razão Social (apenas para company) */}
              {user_type === 'company' && (
                <Input
                  placeholder="Razão Social"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-400 placeholder-yellow-400"
                />
              )}
            </>
          ) : (
            // Mensagem de erro se o user_type não for válido
            <p className="text-center text-red-500 font-medium">Tipo de usuário inválido ou não selecionado.</p>
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