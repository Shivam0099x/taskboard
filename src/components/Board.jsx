import Column from "./Column";

const COLUMNS = [
  { id: "todo", title: "To do" },
  { id: "progress", title: "In progress" },
  { id: "completed", title: "Completed" },
];

// high → medium → low, then by createdAt (oldest first) for stable order
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

const sortByPriority = (a, b) => {
  const pa = PRIORITY_RANK[a.priority] ?? 99;
  const pb = PRIORITY_RANK[b.priority] ?? 99;
  if (pa !== pb) return pa - pb;
  return (a.createdAt ?? 0) - (b.createdAt ?? 0);
};

export default function Board({ tasks, onEdit, onDelete, onMove }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {COLUMNS.map((col) => {
        const columnTasks = tasks
          .filter((t) => t.status === col.id)
          .sort(sortByPriority);

        return (
          <Column
            key={col.id}
            column={col}
            tasks={columnTasks}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        );
      })}
    </div>
  );
}