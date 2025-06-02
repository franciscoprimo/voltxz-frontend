"use client";

import React, { useState, useEffect } from "react";

interface Proposal {
  id: number;
  company: string;
  description: string;
  status: "pending" | "approved" | "rejected";
}

interface Land {
  id: number;
  name: string;
  size: string;
  location: string;
  price: string;
  proposals: Proposal[];
}

function IconTerrain() {
  return (
    <svg
      className="w-6 h-6 text-yellow-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12l2-2 4 4 8-8 4 4v6H3v-4z" />
    </svg>
  );
}

export default function LandOwnerDashboard() {
  const [lands, setLands] = useState<Land[]>([
    {
      id: 1,
      name: "Terreno Fazenda Verde",
      size: "5000 m²",
      location: "Rio de Janeiro, RJ",
      price: "R$ 150.000",
      proposals: [
        {
          id: 101,
          company: "SolarTech",
          description: "Projeto solar de 100 kW com painel X e Y",
          status: "pending",
        },
        {
          id: 102,
          company: "Energia Pura",
          description: "Projeto solar 80 kW com painel Z",
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      name: "Terreno Praia Azul",
      size: "3000 m²",
      location: "Fortaleza, CE",
      price: "R$ 100.000",
      proposals: [],
    },
  ]);

  const [selectedProposal, setSelectedProposal] = useState<
    (Proposal & { landId: number }) | null
  >(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLands() {
      try {
        const response = await fetch("/api/lands");
        if (!response.ok) throw new Error("Erro ao carregar terrenos");
        const data: Land[] = await response.json();
        setLands(data);
      } catch (error) {
        console.error("Falha no fetch:", error);
        
      }
    }
    fetchLands();
  }, []);

  function openProposalModal(landId: number, proposalId: number) {
    const land = lands.find((l) => l.id === landId);
    if (!land) return;
    const proposal = land.proposals.find((p) => p.id === proposalId);
    if (!proposal) return;
    setSelectedProposal({ ...proposal, landId });
  }

  function closeProposalModal() {
    setSelectedProposal(null);
  }

  async function handleProposalDecision(decision: "approved" | "rejected") {
    if (!selectedProposal) return;

    const { landId, id: proposalId } = selectedProposal;

    try {
      const response = await fetch(
        `/api/lands/${landId}/proposals/${proposalId}/decision`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: decision }),
        }
      );

      if (!response.ok) throw new Error("Falha ao atualizar proposta");

      
      setLands((prev) =>
        prev.map((land) => {
          if (land.id === landId) {
            return {
              ...land,
              proposals: land.proposals.map((p) =>
                p.id === proposalId ? { ...p, status: decision } : p
              ),
            };
          }
          return land;
        })
      );

      setNotification(
        decision === "approved" ? "Proposta aceita com sucesso!" : "Proposta rejeitada."
    );

      closeProposalModal();

      
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Erro ao enviar decisão:", error);
      setNotification("Erro ao processar a decisão. Tente novamente.");
      setTimeout(() => setNotification(null), 3000);
    }
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-yellow-700">Meus Terrenos</h1>

      {/* Notificação */}
      {notification && (
        <div className="mb-6 p-4 rounded border border-yellow-400 bg-yellow-100 text-yellow-800 font-semibold text-center">
          {notification}
        </div>
      )}

      {lands.length === 0 ? (
        <p className="text-gray-600">Nenhum terreno cadastrado ainda.</p>
      ) : (
        lands.map((land) => (
          <div
            key={land.id}
            className="bg-white rounded-lg shadow-md p-6 mb-6 border border-yellow-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <IconTerrain /> {land.name}
              </h2>
              <span className="text-yellow-600 font-semibold">{land.price}</span>
            </div>
            <p className="text-gray-600 mb-2">
              <strong>Tamanho:</strong> {land.size}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Localização:</strong> {land.location}
            </p>

            <h3 className="font-semibold text-yellow-700 mb-2">Propostas:</h3>
            {land.proposals.length === 0 ? (
              <p className="text-gray-500 italic">Nenhuma proposta recebida.</p>
            ) : (
              <ul className="space-y-2">
                {land.proposals.map((proposal) => (
                  <li
                    key={proposal.id}
                    className={`p-3 rounded-md border ${
                      proposal.status === "approved"
                        ? "border-green-500 bg-green-50"
                        : proposal.status === "rejected"
                        ? "border-red-500 bg-red-50"
                        : "border-yellow-400 bg-yellow-50"
                    } cursor-pointer hover:bg-yellow-100`}
                    onClick={() => openProposalModal(land.id, proposal.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        openProposalModal(land.id, proposal.id);
                      }
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">{proposal.company}</span>
                      <span
                        className={`text-sm font-semibold uppercase ${
                          proposal.status === "approved"
                            ? "text-green-600"
                            : proposal.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {proposal.status}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm truncate max-w-xl">
                      {proposal.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}

      {/* Modal de Proposta */}
      {selectedProposal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={closeProposalModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-xl"
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2
              id="modal-title"
              className="text-xl font-bold text-yellow-700 mb-4"
            >
              Proposta de {selectedProposal.company}
            </h2>
            <p className="mb-6">{selectedProposal.description}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleProposalDecision("approved")}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Aceitar
              </button>
              <button
                onClick={() => handleProposalDecision("rejected")}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Rejeitar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
