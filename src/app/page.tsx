"use client";

import React from "react";

function IconLand() {
  return (
    <svg
      className="w-8 h-8 text-yellow-500 mb-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12l2-2 4 4 8-8 4 4v6H3z" />
    </svg>
  );
}

function IconProject() {
  return (
    <svg
      className="w-8 h-8 text-yellow-500 mb-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2 2 4-4" />
    </svg>
  );
}

function IconMarketplace() {
  return (
    <svg
      className="w-8 h-8 text-yellow-500 mb-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M4 10h16M4 14h10M4 18h16" />
    </svg>
  );
}

function IconInvestment() {
  return (
    <svg
      className="w-8 h-8 text-yellow-500 mb-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8v8M8 12h8" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md h-14 flex items-center justify-between px-6 z-50">
        <h1 className="text-xl font-bold text-gray-800">Voltxz Dashboard</h1>
        <nav className="space-x-4">
          <button className="text-gray-700 hover:text-yellow-500 font-semibold transition">
            Sign In
          </button>
          <button className="bg-yellow-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-yellow-500 transition">
            Sign Up
          </button>
        </nav>
      </header>

      {/* Espaço para o header fixo */}
      <div className="h-14" />

      {/* Conteúdo principal centralizado e responsivo */}
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Welcome to your Dashboard
          </h2>

          {/* Cards com conteúdo visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 flex flex-col items-center text-center">
              <IconLand />
              <h3 className="font-semibold text-yellow-700 mb-2">My Lands</h3>
              <p className="text-yellow-900 mb-4">
                List and manage your lands here.
              </p>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <small className="text-yellow-700 mt-1">75% used</small>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 flex flex-col items-center text-center">
              <IconProject />
              <h3 className="font-semibold text-yellow-700 mb-2">My Projects</h3>
              <p className="text-yellow-900 mb-4">
                Create and track your projects.
              </p>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
              <small className="text-yellow-700 mt-1">40% progress</small>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 flex flex-col items-center text-center">
              <IconMarketplace />
              <h3 className="font-semibold text-yellow-700 mb-2">Marketplace</h3>
              <p className="text-yellow-900 mb-4">
                Explore lands and projects marketplace.
              </p>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <small className="text-yellow-700 mt-1">60% active listings</small>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 flex flex-col items-center text-center">
              <IconInvestment />
              <h3 className="font-semibold text-yellow-700 mb-2">Investments</h3>
              <p className="text-yellow-900 mb-4">
                Manage your investments and offers.
              </p>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <small className="text-yellow-700 mt-1">90% return</small>
            </div>
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
