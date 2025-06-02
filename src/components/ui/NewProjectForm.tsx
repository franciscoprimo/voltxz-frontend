"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface NewProjectFormProps {
  onSubmit: (data: { title: string; location: string; capacity: number }) => Promise<void>;
}

export function NewProjectForm({ onSubmit }: NewProjectFormProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title || !location || capacity === "") {
      setError("Preencha todos os campos corretamente.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await onSubmit({
        title,
        location,
        capacity: Number(capacity),
      });

      setSuccess("Projeto cadastrado com sucesso!");
      setTitle("");
      setLocation("");
      setCapacity("");
    } catch (err: any) {
      setError(err?.message || "Erro ao cadastrar projeto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-yellow-600 text-center">
        Novo Projeto Solar
      </h2>

      <div className="mb-5">
        <Label htmlFor="title">Nome do Projeto</Label>
        <Input
          id="title"
          type="text"
          placeholder="Ex: Fazenda Solar São João"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <Label htmlFor="location">Localização</Label>
        <Input
          id="location"
          type="text"
          placeholder="Ex: Juazeiro - BA"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="capacity">Capacidade (kWp)</Label>
        <Input
          id="capacity"
          type="number"
          placeholder="Ex: 150"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <Button
        className="w-full bg-yellow-500 hover:bg-yellow-600"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar Projeto"}
      </Button>
    </div>
  );
}
