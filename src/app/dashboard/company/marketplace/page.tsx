"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function IconProjects() {
  return (
    <svg className="w-10 h-10 text-yellow-500 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconLightning() {
  return (
    <svg className="w-10 h-10 text-yellow-500 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 13 13 18 13 11 22 11 11 6 11 13 2" />
    </svg>
  );
}

function IconInvestment() {
  return (
    <svg className="w-10 h-10 text-yellow-500 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8v8M8 12h8M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
    </svg>
  );
}

export default function MarketplacePage() {
  const [terrenos, setTerrenos] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    document.title = "Marketplace | VoltzX";

    async function fetchData() {
      try {
        const [resTerrenos, resProjetos, resInvest] = await Promise.all([
          fetch("/api/terrenos"),
          fetch("/api/projetos"),
          fetch("/api/investimentos"),
        ]);

        if (!resTerrenos.ok || !resProjetos.ok || !resInvest.ok) {
          throw new Error("Erro ao carregar os dados");
        }

        const [terrenosData, projetosData, investimentosData] = await Promise.all([
          resTerrenos.json(),
          resProjetos.json(),
          resInvest.json(),
        ]);

        setTerrenos(terrenosData);
        setProjetos(projetosData);
        setInvestimentos(investimentosData);
      } catch (err) {
        setErro("Erro ao buscar dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-yellow-400 h-4 w-full" />
        <div className="bg-black h-1 w-full" />
        <header className="bg-white h-14 flex items-center justify-between px-6 shadow-md">
          <h1 className="text-xl font-bold text-gray-800">VoltzX Marketplace</h1>
          <nav className="space-x-4 flex items-center">
            <Link href="/dashboard/company/projects" className="text-gray-700 hover:text-yellow-500 font-semibold transition">
              Meus Projetos
            </Link>
            <Link href="/dashboard/company/chat" className="bg-yellow-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-yellow-500 transition">
              Chat
            </Link>
          </nav>
        </header>
      </div>

      <div className="h-[69px]" />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl text-center">
        <div className="bg-white rounded-xl shadow-lg px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Explore oportunidades com terrenos disponíveis
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Acesse terrenos cadastrados por proprietários e envie propostas para iniciar projetos de energia solar com o apoio de investidores.
          </p>

          {loading ? (
            <p className="text-gray-600">Carregando dados...</p>
          ) : erro ? (
            <p className="text-red-500">{erro}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 text-left">
              <div className="flex flex-col items-center">
                <IconProjects />
                <h3 className="font-bold text-xl text-gray-800 mb-2">Terrenos Disponíveis</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  {terrenos.slice(0, 3).map((t: any) => (
                    <li key={t.id}>• {t.nome || "Terreno Sem Nome"}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center">
                <IconLightning />
                <h3 className="font-bold text-xl text-gray-800 mb-2">Projetos em Andamento</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  {projetos.slice(0, 3).map((p: any) => (
                    <li key={p.id}>• {p.titulo || "Projeto Sem Título"}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center">
                <IconInvestment />
                <h3 className="font-bold text-xl text-gray-800 mb-2">Ofertas de Investimento</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  {investimentos.slice(0, 3).map((i: any) => (
                    <li key={i.id}>• {i.nomeInvestidor || "Investidor Anônimo"}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
