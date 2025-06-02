export type Role = 'owner' | 'company' | 'investor' | 'monitor';

export type User = {
  id?: string;
  name: string;
  email: string;
  role: Role;
};


function storeSession(accessToken: string, user: User) {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('currentUser', JSON.stringify(user));
}


export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
}

// pra recuperar o usuario do armazenamento local. podemos tirar depois!
export function getCurrentUser(): User | null {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Recupera token salvo. para uso em headers ou futuramente substituir por cookies
export function getAuthToken(): string | null {
  return localStorage.getItem('token');
}


export async function registerUser(user: {
  name: string;
  email: string;
  password: string;
  role: Role;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || 'Erro ao registrar usuário.' };
    }

    return { success: true, message: 'Usuário registrado com sucesso.' };
  } catch (error) {
    return { success: false, message: 'Erro de rede ou servidor.' };
  }
}


export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; message?: string }> {
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || 'Credenciais inválidas.' };
    }

    // Armazenar localmente. vamos tirar quando for integrar com back. ta aqui só para testes
    storeSession(data.access_token, data.user);

    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: 'Erro de rede ou servidor.' };
  }
}
