"use client";

import { useEffect, useState } from "react";
import { LandCard } from "../../../../components/cards/LandCard";
import { Button } from "@/components/ui/button";

interface Land {
  id: string;
  name: string;
  location: string;
  size: number;
  status: string;
}

export default function OwnerLandsPage() {
  const [lands, setLands] = useState<Land[]>([]);

  useEffect(() => {
    document.title = "VoltzX | My Lands";
  }, []);

  useEffect(() => {
    // axios 
    const mockLands: Land[] = [
      {
        id: "1",
        name: "Terreno Solar ABC",
        location: "Minas Gerais",
        size: 1200,
        status: "disponível",
      },
      {
        id: "2",
        name: "Chácara Luz do Sol",
        location: "Bahia",
        size: 800,
        status: "em negociação",
      },
    ];

    setLands(mockLands);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meus Terrenos</h1>
        <Button variant="default">+ Novo Terreno</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {lands.map((land) => (
          <LandCard key={land.id} land={land} />
        ))}
      </div>
    </div>
  );
}
