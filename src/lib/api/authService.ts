const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface SignUpData {
  email: string;
  password: string;
  nome: string;
  tipo: "proprietario" | "empresa" | "investidor" | "monitor";
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    email: string;
    role: "proprietario" | "empresa" | "investidor" | "monitor";
  };
}

export const authService = {
  async signup(data: SignUpData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao cadastrar");
    }

    const result: AuthResponse = await response.json();
    return result;
  },

  async signin(data: SignInData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao fazer login");
    }

    const result: AuthResponse = await response.json();
    return result;
  },
};
