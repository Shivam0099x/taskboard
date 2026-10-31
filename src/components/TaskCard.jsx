const PRIORITY = {
  low: { label: "Low", dot: "bg-stone-400" },
  medium: { label: "Medium", dot: "bg-amber-500" },
  high: { label: "High", dot: "bg-rose-500" },
};

const RANK_BORDER = {
  high: "border-l-rose-400",
  medium: "border-l-amber-400",
  low: "border-l-stone-300",
};

const fmtDate = (iso) => {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const p = PRIORITY[task.priority] || PRIORITY.medium;
  const strip = RANK_BORDER[task.priority] || "border-l-stone-200";
  const overdue =
    task.dueDate &&
    task.status !== "completed" &&
    new Date(task.dueDate) < new Date();

  return (
    <article
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
      onDoubleClick={() => onEdit(task)}
      className={`group bg-white border border-[var(--line)] border-l-2 ${strip} rounded-md p-3 cursor-grab active:cursor-grabbing hover:border-stone-300 transition`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium leading-snug break-words">
          {task.title}
        </h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-stone-500 hover:text-[var(--ink)] rounded hover:bg-stone-100"
            title="Edit"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-stone-500 hover:text-rose-600 rounded hover:bg-stone-100"
            title="Delete"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            </svg>
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-[var(--muted)] mt-1.5 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-3 mt-3 text-[11px] text-[var(--muted)]">
        <span className="inline-flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
          {p.label}
        </span>
        {task.dueDate && (
          <span className={overdue ? "text-rose-600 font-medium" : ""}>
            {overdue ? "Overdue · " : "Due "}
            {fmtDate(task.dueDate)}
          </span>
        )}
      </div>
    </article>
  );
}