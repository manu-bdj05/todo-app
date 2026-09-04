import type { Task } from "./types";

export const mockTasks: Task[] = [
  {
    id: "1",
    titre: "Apprendre Next.js",
    description: "Suivre le tutoriel officiel",
    isDone: false,
    createdAt: "2026-09-01",
  },
  {
    id: "2",
    titre: "Créer une todo-app",
    description: "Avec TypeScript et Tailwind",
    isDone: false,
    createdAt: "2026-09-02",
  },
];
