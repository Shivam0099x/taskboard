import { useEffect, useState } from "react";

const PRIORITIES = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];

const STATUSES = [
  { id: "todo", label: "To do" },
  { id: "progress", label: "In progress" },
  { id: "completed", label: "Completed" },
];

const REQUIRED = {
  title: "Title is required",
  description: "Description is required",
  priority: "Pick a priority",
  dueDate: "Due date is required",
  status: "Pick a status",
};

export default function TaskModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validate = (data) => {
    const errs = {};
    Object.keys(REQUIRED).forEach((k) => {
      const v = data[k];
      if (!v || (typeof v === "string" && !v.trim())) errs[k] = REQUIRED[k];
    });
    return errs;
  };

  const set = (k) => (e) => {
    const next = { ...form, [k]: e.target.value };
    setForm(next);
    if (touched[k]) setErrors(validate(next));
  };

  const blur = (k) => () => {
    setTouched({ ...touched, [k]: true });
    setErrors(validate(form));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched(
      Object.keys(REQUIRED).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    if (Object.keys(errs).length > 0) return;
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  const errorText = (k) =>
    touched[k] && errors[k] ? (
      <p className="text-[11px] text-rose-600 mt-1">{errors[k]}</p>
    ) : null;

  const inputBase =
    "w-full border rounded-md px-3 py-2 text-sm transition focus:border-stone-400";
  const inputState = (k) =>
    touched[k] && errors[k]
      ? "border-rose-300 bg-rose-50/40"
      : "border-[var(--line)]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
      <form
        onSubmit={submit}
        noValidate
        className="w-full max-w-lg bg-white border border-[var(--line)] rounded-lg shadow-xl"
      >
        <div className="px-5 py-4 border-b border-[var(--line)] flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            {initial.id ? "Edit task" : "New task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              autoFocus
              value={form.title}
              onChange={set("title")}
              onBlur={blur("title")}
              placeholder="What needs to be done?"
              className={`${inputBase} ${inputState("title")}`}
            />
            {errorText("title")}
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              onBlur={blur("description")}
              rows={3}
              placeholder="Add some details…"
              className={`${inputBase} ${inputState("description")} resize-none`}
            />
            {errorText("description")}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">
                Priority <span className="text-rose-500">*</span>
              </label>
              <select
                value={form.priority}
                onChange={set("priority")}
                onBlur={blur("priority")}
                className={`${inputBase} ${inputState("priority")} bg-white`}
              >
                <option value="">Select…</option>
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
              {errorText("priority")}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">
                Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={form.status}
                onChange={set("status")}
                onBlur={blur("status")}
                className={`${inputBase} ${inputState("status")} bg-white`}
              >
                <option value="">Select…</option>
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              {errorText("status")}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">
                Due date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={set("dueDate")}
                onBlur={blur("dueDate")}
                className={`${inputBase} ${inputState("dueDate")}`}
              />
              {errorText("dueDate")}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-[var(--line)] flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-md border border-[var(--line)] text-stone-700 hover:bg-stone-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm rounded-md bg-[var(--ink)] text-white hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}