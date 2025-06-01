"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Input } from "@/components/ui/input";
import { getProjects, Project } from "@/lib/projects";

export default function InvestorMarketplacePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedProjects = getProjects();
    setProjects(storedProjects);
  }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Marketplace de Projetos</h1>
      <Input
        placeholder="Buscar projetos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.length ? (
          filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>Nenhum projeto encontrado.</p>
        )}
      </div>
    </div>
  );
}

