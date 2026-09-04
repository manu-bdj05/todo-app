export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};
