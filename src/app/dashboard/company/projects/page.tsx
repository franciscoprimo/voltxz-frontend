"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  location: string;
  capacity: number;
  status: string;
}

export default function CompanyProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        title: "Projeto Solar Voltz 1",
        location: "Ceará",
        capacity: 500,
        status: "em execução",
      },
      {
        id: "2",
        title: "Parque Solar Nova Luz",
        location: "Pernambuco",
        capacity: 800,
        status: "em captação",
      },
    ];

    setProjects(mockProjects);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meus Projetos</h1>
        <Button variant="default">+ Novo Projeto</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
