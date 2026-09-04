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

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
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
              <div className="flex items-center">
                <Label htmlFor="password">
                  Mot de passe
                </Label>

              </div>

              <Input
                id="password"
                name="password"
                type="password"
                required
              />
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
