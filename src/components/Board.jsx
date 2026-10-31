import Column from "./Column";

const COLUMNS = [
  { id: "todo", title: "To do" },
  { id: "progress", title: "In progress" },
  { id: "completed", title: "Completed" },
];

export default function Board({ tasks, onEdit, onDelete, onMove }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {COLUMNS.map((col) => (
        <Column
          key={col.id}
          column={col}
          tasks={tasks.filter((t) => t.status === col.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
}