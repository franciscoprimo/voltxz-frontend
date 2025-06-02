"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { NewProjectForm } from "@/components/ui/NewProjectForm";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  location: string;
  capacity: number;
  status: string;
}


interface NewProjectFormData {
  title: string;
  location: string;
  capacity: number;
}

export default function CompanyProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "VoltzX | Projects";
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Erro ao carregar projetos");
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (data: NewProjectFormData) => {
    try {
      
      const dataWithStatus = { ...data, status: "rascunho" };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithStatus),
      });

      if (!response.ok) throw new Error("Erro ao criar projeto");

      const newProject: Project = await response.json();
      setProjects((prev) => [...prev, newProject]);
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-500">Meus Projetos</h1>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl px-6 py-2 shadow-md text-white"
        >
          + Novo Projeto
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} 
        >
          <div
            className="bg-white rounded-lg max-w-xl w-full p-6"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-lg font-semibold mb-4">Novo Projeto</h2>
            <NewProjectForm onSubmit={handleCreateProject} />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500 mt-20">Carregando projetos...</p>
      ) : projects.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">Você ainda não cadastrou nenhum projeto.</p>
          <p className="text-sm text-gray-400 mt-2">Clique em "+ Novo Projeto" para começar.</p>
        </div>
      )}
    </div>
  );
}
