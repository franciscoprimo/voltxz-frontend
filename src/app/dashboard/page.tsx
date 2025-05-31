"use client";

import React from "react";
import Link from "next/link";

// Íconesssss
function IconLand() {
  return (
    <>
      <svg
        className="w-8 h-8 text-yellow-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 12l2-2 4 4 8-8 4 4v6H3z" />
      </svg>
      <span className="sr-only">My Lands Icon</span>
    </>
  );
}

function IconProject() {
  return (
    <>
      <svg
        className="w-8 h-8 text-yellow-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
      <span className="sr-only">My Projects Icon</span>
    </>
  );
}

function IconMarketplace() {
  return (
    <>
      <svg
        className="w-8 h-8 text-yellow-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 6h16M4 10h16M4 14h10M4 18h16" />
      </svg>
      <span className="sr-only">Marketplace Icon</span>
    </>
  );
}

function IconInvestment() {
  return (
    <>
      <svg
        className="w-8 h-8 text-yellow-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 8v8M8 12h8" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      <span className="sr-only">Investments Icon</span>
    </>
  );
}

// Card Component
function DashboardCard({
  icon,
  title,
  description,
  progress,
  label,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  progress: number;
  label: string;
}) {
  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 flex flex-col items-center text-center">
      {icon}
      <h3 className="font-semibold text-yellow-700 mb-2">{title}</h3>
      <p className="text-yellow-900 mb-4">{description}</p>
      <div className="w-full bg-yellow-200 rounded-full h-2">
        <div
          className="bg-yellow-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <small className="text-yellow-700 mt-1">{label}</small>
    </div>
  );
}

// Página principal do dash so para se localizar...
export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md h-14 flex items-center justify-between px-6 z-50">
        <h1 className="text-xl font-bold text-gray-800">Voltxz Dashboard</h1>
        <nav className="space-x-4 flex items-center">
          <Link
            href="/signing"
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

      {/* Espaço para o header glr */}
      <div className="h-14" />

      {/* Conteúdo principal aqui */}
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Welcome to your Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              icon={<IconLand />}
              title="My Lands"
              description="List and manage your lands here."
              progress={75}
              label="75% used"
            />
            <DashboardCard
              icon={<IconProject />}
              title="My Projects"
              description="Create and track your projects."
              progress={40}
              label="40% progress"
            />
            <DashboardCard
              icon={<IconMarketplace />}
              title="Marketplace"
              description="Explore lands and projects marketplace."
              progress={60}
              label="60% active listings"
            />
            <DashboardCard
              icon={<IconInvestment />}
              title="Investments"
              description="Manage your investments and offers."
              progress={90}
              label="90% return"
            />
          </div>
        </div>
      </main>

      {/* Rodapé fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-300 text-center py-2 text-sm">
        &copy; 2025 Voltxz - Plataforma de Energia Solar
      </footer>
    </div>
  );
}
