import type { FormEvent } from "react";
import { categories, type Expense } from "./expense-data";
import { Icon } from "./dashboard-icon";

type AddExpenseModalProps = {
  onClose: () => void;
  onAdd: (expense: Expense) => Promise<void>;
};

export function AddExpenseModal({ onClose, onAdd }: AddExpenseModalProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const expenseData = {
      title: String(data.get("title")),
      amount: Number(data.get("amount")),
      category: String(data.get("category")),
      date: String(data.get("date")),
    };
    try {
      await onAdd(expenseData);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating expense:", error.message);
      }
    }
    form.reset();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07101d]/60 p-4 backdrop-blur-[2px]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="expense-modal-title"
        className="w-full max-w-md rounded-lg bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
          <div>
            <h2
              id="expense-modal-title"
              className="text-lg font-semibold text-[#142032]"
            >
              Add expense
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Record a new transaction.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close modal"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-5 py-5 sm:px-6 sm:py-6"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Title
            </span>
            <input
              name="title"
              type="text"
              required
              minLength={2}
              maxLength={60}
              placeholder="e.g. Grocery shopping"
              className="form-control"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Amount
            </span>
            <div className="relative ">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-medium text-slate-500">
                ₦
              </span>
              <input
                name="amount"
                type="number"
                required
                min="1"
                step="0.01"
                // placeholder="0.00"
                className="form-control pl-15"
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Category
            </span>
            <select
              name="category"
              required
              defaultValue=""
              className="form-control"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Date
            </span>
            <input
              name="date"
              type="date"
              required
              defaultValue="2026-09-07"
              className="form-control"
            />
          </label>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 rounded-lg bg-[#18845e] px-5 text-sm font-semibold text-white transition hover:bg-[#126e4e] focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              Add expense
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
