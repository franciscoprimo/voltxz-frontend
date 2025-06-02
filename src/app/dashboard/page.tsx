"use client";

import React, { useEffect } from "react";
import Link from "next/link";

function IconSolar() {
  return (
    <svg
      className="w-10 h-10 text-yellow-500 mb-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg
      className="w-10 h-10 text-yellow-500 mb-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

function IconGraph() {
  return (
    <svg
      className="w-10 h-10 text-yellow-500 mb-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-5" />
    </svg>
  );
}

export default function DashboardPage() {
  useEffect(() => {
    document.title = "VoltzX";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      {/* Header fixo faixas */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-yellow-400 h-4 w-full" />
        <div className="bg-black h-1 w-full" />
        <header className="bg-white h-14 flex items-center justify-between px-6 shadow-md">
          <h1 className="text-xl font-bold text-gray-800">VoltzX Dashboard</h1>
          <nav className="space-x-4 flex items-center">
            <Link
              href="/sigin"
              className="text-gray-700 hover:text-yellow-500 font-semibold transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-yellow-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-yellow-500 transition"
            >
              Sign Up
            </Link>
          </nav>
        </header>
      </div>

      {/* Espaço para o header */}
      <div className="h-[69px]" />

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl text-center">
        <div className="bg-white rounded-xl shadow-lg px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Energia limpa, lucros sustentáveis
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            A VoltzX conecta proprietários de terras, empresas de energia solar e investidores para impulsionar projetos sustentáveis e rentáveis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex flex-col items-center text-center">
              <IconSolar />
              <h3 className="text-yellow-700 font-semibold text-lg mb-2">
                Cadastre seu terreno
              </h3>
              <p className="text-gray-600 text-sm">
                Transforme espaços ociosos em geradores de energia solar e novas fontes de renda.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <IconHandshake />
              <h3 className="text-yellow-700 font-semibold text-lg mb-2">
                Conecte-se com empresas
              </h3>
              <p className="text-gray-600 text-sm">
                Receba propostas para instalação de painéis solares em sua propriedade.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <IconGraph />
              <h3 className="text-yellow-700 font-semibold text-lg mb-2">
                Invista em projetos reais
              </h3>
              <p className="text-gray-600 text-sm">
                Invista de forma sustentável e acompanhe seus retornos em tempo real.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/signup"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md text-base font-semibold hover:bg-yellow-600 transition"
            >
              Comece agora
            </Link>
          </div>
        </div>
      </main>

      {/* Rodapé fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black text-gray-300 text-center py-2 text-sm">
        &copy; 2025 VoltzX - Plataforma de Energia Solar
      </footer>
    </div>
  );
}
