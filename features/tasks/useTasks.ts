"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuthContext } from "@/lib/hooks/useAuthContext";
import type { Task } from "./types";
import { mockTasks } from "./data";

export function useTasks() {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    user ? `todo-app-tasks-${user.id}` : "todo-app-tasks-guest",
    mockTasks
  );
  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");

  const addTask = (titre: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      titre,
      description,
      isDone: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nextIsDone = !t.isDone;
          return {
            ...t,
            isDone: nextIsDone,
            createdAt: !nextIsDone ? new Date().toISOString().split("T")[0] : t.createdAt,
          };
        }
        return t;
      })
    );
  };

  const updateTask = (id: string, titre: string, description: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, titre, description } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "done") return t.isDone;
    if (filter === "todo") return !t.isDone;
    return true;
  });

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
  };
}
