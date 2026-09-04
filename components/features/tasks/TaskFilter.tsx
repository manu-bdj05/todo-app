import { buttonVariants } from "@/components/ui/button";

type TaskFilterProps = {
  filter: "all" | "done" | "todo";
  onFilterChange: (filter: "all" | "done" | "todo") => void;
};

const filters = [
  { value: "all" as const, label: "Toutes" },
  { value: "todo" as const, label: "En cours" },
  { value: "done" as const, label: "Terminées" },
];

export function TaskFilter({ filter, onFilterChange }: TaskFilterProps) {
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={buttonVariants({
            variant: filter === f.value ? "default" : "outline",
            size: "sm",
          })}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
