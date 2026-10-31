import { useState } from "react";
import TaskCard from "./TaskCard";

const DOT = {
  todo: "bg-stone-400",
  progress: "bg-amber-500",
  completed: "bg-emerald-500",
};

export default function Column({ column, tasks, onEdit, onDelete, onMove }) {
  const [over, setOver] = useState(false);

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onMove(id, column.id);
      }}
      className={`rounded-lg border transition ${
        over
          ? "border-stone-400 bg-stone-50"
          : "border-[var(--line)] bg-white"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${DOT[column.id]}`} />
          <h2 className="text-sm font-medium">{column.title}</h2>
        </div>
        <span className="text-xs text-[var(--muted)]">{tasks.length}</span>
      </div>

      <div className="p-2 min-h-[420px] space-y-2">
        {tasks.length === 0 && (
          <p className="text-xs text-[var(--muted)] text-center py-10">
            No tasks
          </p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}