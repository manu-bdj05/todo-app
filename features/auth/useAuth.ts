"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { User, LoginCredentials, RegisterCredentials } from "./types";

type UsersMap = Record<string, User & { password: string }>;

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>("todo-app-user", null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginCredentials) => {
    const users: UsersMap = JSON.parse(
      localStorage.getItem("todo-app-users") || "{}"
    );

    const found = Object.values(users).find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
  };

  const register = async ({ name, email, password }: RegisterCredentials) => {
    const users: UsersMap = JSON.parse(
      localStorage.getItem("todo-app-users") || "{}"
    );

    const exists = Object.values(users).some((u) => u.email === email);

    if (exists) {
      throw new Error("Un compte avec cet email existe déjà");
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users[newUser.id] = newUser;
    localStorage.setItem("todo-app-users", JSON.stringify(users));
  };

  const logout = () => {
    setUser(null);
  };

  return { user, isLoading, login, register, logout };
}
