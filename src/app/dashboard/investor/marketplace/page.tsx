"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  investment_needed: number;
  investment_received: number;
  company: {
    name: string;
  };
  land: {
    location: string;
  };
  capacity: number;
  status: string;
}

interface InvestmentOffer {
  amount: number;
  message: string;
}

export default function InvestorMarketplacePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [offer, setOffer] = useState<InvestmentOffer>({ amount: 0, message: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "VoltzX | Marketplace de Projetos";
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Erro ao buscar projetos");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar os projetos.");
    } finally {
      setLoading(false);
    }
  }

  function openOfferModal(project: Project) {
    setSelectedProject(project);
    setOffer({ amount: 0, message: "" });
    setModalOpen(true);
  }

  function closeOfferModal() {
    setSelectedProject(null);
    setModalOpen(false);
  }

  async function submitOffer() {
    if (!selectedProject) return;

    if (offer.amount <= 0) {
      toast.error("Informe um valor válido para a oferta.");
      return;
    }

    try {
      const res = await fetch(`/api/projects/${selectedProject.id}/investments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer),
      });

      if (!res.ok) throw new Error("Erro ao enviar oferta");

      toast.success("Oferta enviada com sucesso!");
      closeOfferModal();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao enviar a oferta.");
    }
  }

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">
        Marketplace de Projetos
      </h1>

      <Input
        placeholder="Buscar projetos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      {loading ? (
        <p className="text-gray-500">Carregando projetos...</p>
      ) : filteredProjects.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="border rounded p-4">
              <ProjectCard project={project} />
              <button
                onClick={() => openOfferModal(project)}
                className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Fazer Oferta
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Fazer Oferta - {selectedProject.title}
            </h2>

            <label className="block mb-2 font-semibold">
              Valor da Oferta (R$)
              <input
                type="number"
                min={0}
                value={offer.amount}
                onChange={(e) =>
                  setOffer((o) => ({ ...o, amount: Number(e.target.value) }))
                }
                className="border p-2 w-full rounded"
              />
            </label>

            <label className="block mb-4 font-semibold">
              Mensagem (opcional)
              <textarea
                value={offer.message}
                onChange={(e) =>
                  setOffer((o) => ({ ...o, message: e.target.value }))
                }
                className="border p-2 w-full rounded"
                rows={3}
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeOfferModal}
                className="px-4 py-2 rounded border border-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={submitOffer}
                className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Enviar Oferta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
