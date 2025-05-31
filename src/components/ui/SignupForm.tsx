"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./input";
import { Button } from "./button";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword || !role) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    // Aqui você pode adicionar a lógica para cadastro, ex: chamada API

    localStorage.setItem("user", JSON.stringify({ name, email, role }));
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-yellow-600 text-center">Cadastrar na VoltzX</h2>

      <div className="mb-4">
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <Label>Tipo de Usuário</Label>
        <RadioGroup onValueChange={setRole} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" />
            <Label htmlFor="owner">Proprietário</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="company" id="company" />
            <Label htmlFor="company">Empresa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="investor" id="investor" />
            <Label htmlFor="investor">Investidor</Label>
          </div>
        </RadioGroup>
      </div>

      <Button className="w-full bg-yellow-500 hover:bg-yellow-600" onClick={handleSignup}>
        Cadastrar
      </Button>
    </div>
  );
}
