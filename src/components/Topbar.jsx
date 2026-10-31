export default function Topbar({ query, setQuery, onNew }) {
  return (
    <header className="h-14 border-b border-[var(--line)] bg-white flex items-center px-6 gap-4">
      <div className="flex-1 max-w-md relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks…"
          className="w-full pl-9 pr-3 py-1.5 text-sm bg-stone-50 border border-[var(--line)] rounded-md focus:bg-white transition"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onNew}
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-[var(--ink)] px-2 py-1.5 rounded-md hover:bg-stone-50 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New
        </button>
        <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-xs font-medium text-stone-600">
          You
        </div>
      </div>
    </header>
  );
}