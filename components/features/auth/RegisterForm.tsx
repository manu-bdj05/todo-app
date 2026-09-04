"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type RegisterFormProps = {
  onSubmit: (
    name: string,
    email: string,
    password: string
  ) => void;
};

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    onSubmit(name, email, password);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>

        <CardDescription>
          Créez votre compte pour commencer à gérer vos tâches.
        </CardDescription>

        <CardAction>
          <Link
            href="/auth/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Se connecter
          </Link>
        </CardAction>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">

            {/* Nom */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nom
              </Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom"
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Mot de passe */}
            <div className="grid gap-2">
              <Label htmlFor="password">
                Mot de passe
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirmation */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">
                Confirmer le mot de passe
              </Label>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
          >
            S'inscrire
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}