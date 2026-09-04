import { Button } from "@/components/ui/button";
import type { Task } from "@/features/tasks/types";

type TaskCardProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  return (
    <div className="flex items-start justify-between border rounded-lg p-4">
      <div className="flex flex-col gap-1">
        <h3 className={`font-bold ${task.isDone ? "line-through text-muted-foreground" : ""}`}>
          {task.titre}
        </h3>
        <p className={`text-sm ${task.isDone ? "line-through text-muted-foreground" : ""}`}>
          {task.description}
        </p>
        <span className="text-xs text-muted-foreground">{task.createdAt}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => onToggle(task.id)}>
          {task.isDone ? "Reprendre" : "Terminer"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
          Modifier
        </Button>
        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(task.id)}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}
