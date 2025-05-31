"use client"; //pode usar onclick se a gente decidir usar

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-yellow-700 drop-shadow-md">
        Bem-vindo à <span className="text-yellow-900">VoltzX</span>
      </h1>

      <p className="max-w-xl text-yellow-800 mb-10 text-lg sm:text-xl">
        Conectando proprietários de terrenos, empresas de energia solar e investidores
        para criar um futuro sustentável e próspero para todos.
      </p>

      <button
        onClick={() => router.push("/dashboard")}
        className="inline-block px-8 py-4 bg-yellow-500 hover:bg-yellow-600 transition-colors text-white rounded-lg shadow-lg text-xl font-semibold drop-shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400"
        aria-label="Seguir"
      >
        Seguir
      </button>

      <footer className="mt-20 text-yellow-700 text-sm opacity-70">
        &copy; {new Date().getFullYear()} VoltzX. Todos os direitos reservados.
      </footer>
    </main>
  );
}
