import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import { loadTasks, saveTasks, uid } from "./lib/storage";

const emptyForm = {
  title: "",
  description: "",
  priority: "",
  dueDate: "",
  status: "todo",
};

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState({ open: false, task: null });

  useEffect(() => saveTasks(tasks), [tasks]);

  const openNew = () => setModal({ open: true, task: null });
  const openEdit = (task) => setModal({ open: true, task });

  const handleSave = (form) => {
    if (modal.task) {
      setTasks((prev) =>
        prev.map((t) => (t.id === modal.task.id ? { ...form, id: t.id } : t))
      );
    } else {
      setTasks((prev) => [...prev, { ...form, id: uid(), createdAt: Date.now() }]);
    }
    setModal({ open: false, task: null });
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMove = (id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active" && t.status === "completed") return false;
    if (filter === "completed" && t.status !== "completed") return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => t.status !== "completed").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="flex h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        counts={counts}
        onNew={openNew}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar query={query} setQuery={setQuery} onNew={openNew} />

        <main className="flex-1 overflow-auto px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight">Board</h1>
              <p className="text-sm text-[var(--muted)] mt-1">
                {counts.active} open · {counts.completed} done
              </p>
            </div>

            <Board
              tasks={visibleTasks}
              onEdit={openEdit}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          </div>
        </main>
      </div>

      {modal.open && (
        <TaskModal
          initial={modal.task || emptyForm}
          onClose={() => setModal({ open: false, task: null })}
          onSave={handleSave}
        />
      )}
    </div>
  );
}