"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { Label } from "./label";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // podemos integrar  avalidação real com backend
    localStorage.setItem("user", JSON.stringify({ email }));
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-yellow-600 text-center">Entrar na VoltzX</h2>

      <div className="mb-5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button className="w-full bg-yellow-500 hover:bg-yellow-600" onClick={handleLogin}>
        Entrar
      </Button>

      <p className="mt-6 text-center text-gray-600">
        Não tem conta?{" "}
        <Link href="/signup" className="text-yellow-600 font-semibold hover:underline">
          Inscreva-se
        </Link>
      </p>
    </div>
  );
}
