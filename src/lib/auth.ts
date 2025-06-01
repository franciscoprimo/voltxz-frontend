export type User = {
  name: string;
  email: string;
  password: string;
  role: 'owner' | 'company' | 'investor' | 'monitor';
}

export function registerUser(user: User): { success: boolean; message: string } {
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];

  const alreadyExists = existingUsers.some((u) => u.email === user.email);
  if (alreadyExists) {
    return { success: false, message: 'Usuário já existe.' };
  }

  existingUsers.push(user);
  localStorage.setItem('users', JSON.stringify(existingUsers));
  return { success: true, message: 'Usuário registrado com sucesso.' };
}

export function loginUser(email: string, password: string): { success: boolean; user?: User; message?: string } {
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: 'Credenciais inválidas.' };
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  return { success: true, user };
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem('currentUser');
}
