"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/features/tasks/useTasks";
import { TaskForm } from "@/components/features/tasks/TaskForm";
import { TaskFilter } from "@/components/features/tasks/TaskFilter";
import { TaskList } from "@/components/features/tasks/TaskList";
import { Modal } from "@/components/shared/Modal";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import type { Task } from "@/features/tasks/types";

export default function DashboardPage() {
  const { tasks, filter, setFilter, addTask, deleteTask, toggleTask, updateTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  const handleAddTask = (titre: string, description: string) => {
    addTask(titre, description);
    setIsModalOpen(false);
  };

  const handleEditTask = (titre: string, description: string) => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, titre, description);
      setTaskToEdit(null);
      setIsModalOpen(false);
    }
  };

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <main className="container mx-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-2">Mes tâches</h1>
         

          <div className="flex items-center justify-between mt-6 mb-4">
            <TaskFilter filter={filter} onFilterChange={setFilter} />
            <Button onClick={openAddModal}>Ajouter une tâche</Button>
          </div>

          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={openEditModal}
          />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TaskForm
            onSubmit={taskToEdit ? handleEditTask : handleAddTask}
            task={taskToEdit}
          />
        </Modal>
      </main>
    </ProtectedRoute>
  );
}
