const NAV = [
  { id: "all", label: "All tasks" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export default function Sidebar({ filter, setFilter, counts, onNew }) {
  return (
    <aside className="w-60 border-r border-[var(--line)] bg-white flex flex-col">
      <div className="px-5 py-5 border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[var(--ink)] flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="font-semibold tracking-tight">Taskboard</span>
        </div>
      </div>

      <div className="p-3">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-between bg-[var(--ink)] text-white text-sm font-medium px-3 py-2 rounded-md hover:opacity-90 transition"
        >
          <span>New task</span>
          <span className="text-xs opacity-60">N</span>
        </button>
      </div>

      <nav className="px-2 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-[var(--muted)] px-3 pt-3 pb-1">
          Views
        </p>
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition ${
              filter === item.id
                ? "bg-stone-100 text-[var(--ink)] font-medium"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-xs text-[var(--muted)]">{counts[item.id]}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--line)] text-xs text-[var(--muted)]">
        Saved locally · v1.0
      </div>
    </aside>
  );
}