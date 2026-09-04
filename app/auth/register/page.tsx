"use client";

import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/features/auth/RegisterForm";
import { useAuthContext } from "@/lib/hooks/useAuthContext";

export default function RegisterPage() {
  const { register } = useAuthContext();
  const router = useRouter();

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await register({ name, email, password });
      router.push("/auth/login");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <RegisterForm onSubmit={handleRegister} />
    </main>
  );
}
