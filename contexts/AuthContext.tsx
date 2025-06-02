"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/authService";

interface User {
  email: string;
  role: "proprietario" | "empresa" | "investidor" | "monitor";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await authService.signin(credentials);
      const { token, user } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      switch (user.role) {
        case "proprietario":
          router.push("/dashboard/terrenos");
          break;
        case "empresa":
          router.push("/dashboard/marketplace-terrenos");
          break;
        case "investidor":
          router.push("/dashboard/marketplace-projetos");
          break;
        case "monitor":
          router.push("/dashboard/monitoramento");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("Credenciais inválidas ou erro de rede.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
