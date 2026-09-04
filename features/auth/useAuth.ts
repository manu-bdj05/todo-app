"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { User, LoginCredentials, RegisterCredentials } from "./types";

import { isValidEmail } from "./validation";

type UsersMap = Record<string, User & { password: string }>;

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>("todo-app-user", null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginCredentials) => {
    if (!isValidEmail(email)) {
      throw new Error("Veuillez saisir une adresse e-mail valide (ex: utilisateur@domaine.com).");
    }

    const users: UsersMap = JSON.parse(
      localStorage.getItem("todo-app-users") || "{}"
    );

    const userByEmail = Object.values(users).find((u) => u.email === email);

    if (!userByEmail) {
      throw new Error("Aucun compte associé à cet e-mail. Veuillez vous inscrire.");
    }

    if (userByEmail.password !== password) {
      throw new Error("Mot de passe incorrect.");
    }

    const { password: _, ...userWithoutPassword } = userByEmail;
    setUser(userWithoutPassword);
  };

  const register = async ({ name, email, password }: RegisterCredentials) => {
    if (!isValidEmail(email)) {
      throw new Error("Veuillez saisir une adresse e-mail valide (ex: utilisateur@domaine.com).");
    }

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
