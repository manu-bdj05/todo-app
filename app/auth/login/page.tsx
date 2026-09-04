"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { useAuthContext } from "@/lib/hooks/useAuthContext";

export default function LoginPage() {
  const { login } = useAuthContext();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm onSubmit={handleLogin} />
    </main>
  );
}
