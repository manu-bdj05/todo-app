type EmptyStateProps = {
  message?: string;
};

export function EmptyState({ message = "Aucune tâche pour le moment" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <p className="text-lg">{message}</p>
    </div>
  );
}
