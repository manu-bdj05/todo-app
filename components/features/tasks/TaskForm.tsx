"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Task } from "@/features/tasks/types";

type TaskFormProps = {
  onSubmit: (titre: string, description: string) => void;
  task?: Task | null;
};

export function TaskForm({ onSubmit, task }: TaskFormProps) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitre(task.titre);
      setDescription(task.description);
    } else {
      setTitre("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onSubmit(titre, description);
    setTitre("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        {task ? "Modifier la tâche" : "Nouvelle tâche"}
      </h2>

      <div className="grid gap-2">
        <Label htmlFor="titre">Titre</Label>
        <Input
          id="titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Nom de la tâche"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optionnel)"
        />
      </div>

      <Button type="submit">{task ? "Modifier" : "Ajouter"}</Button>
    </form>
  );
}
