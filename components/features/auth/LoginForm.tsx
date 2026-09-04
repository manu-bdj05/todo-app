"use client";

import { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    onSubmit(email, password);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Connexion à votre compte</CardTitle>

        <CardDescription>
          Entrez votre adresse e-mail et votre mot de passe pour vous connecter.
        </CardDescription>

        <CardAction>
          <Button variant="link">
            <Link href="/auth/register">S&apos;inscrire</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Mot de passe
                </Label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
