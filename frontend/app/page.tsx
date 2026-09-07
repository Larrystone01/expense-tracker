"use client";

import { useMemo, useState } from "react";
import { AddExpenseModal } from "./components/add-expense-modal";
import { AnalyticsPanels } from "./components/analytics-panels";
import {
  categories,
  initialExpenses,
  monthlyBudget,
  type Expense,
} from "./components/expense-data";
import { ExpensesTable } from "./components/expenses-table";
import { Icon } from "./components/dashboard-icon";
import { MobileHeader, Sidebar } from "./components/sidebar";
import { SummaryCards } from "./components/summary-cards";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalSpent = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );
  const categoryTotals = useMemo(
    () =>
      expenses.reduce<Record<string, number>>((totals, expense) => {
        totals[expense.category] =
          (totals[expense.category] ?? 0) + expense.amount;
        return totals;
      }, {}),
    [expenses],
  );
  const chartData = categories
    .map((category) => ({ category, amount: categoryTotals[category] ?? 0 }))
    .filter((item) => item.amount > 0);

  function addExpense(expense: Expense) {
    setExpenses((current) => [expense, ...current]);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f3f5f7] text-[#17212b] lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <MobileHeader />
        <main className="mx-auto max-w-375 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#142032] sm:text-3xl">
                Expense overview
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Welcome back, Larry. Here is where your money went this month.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-lg bg-[#18845e] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#126e4e] focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              <Icon name="plus" className="h-5 w-5" />
              Add expense
            </button>
          </div>

          <SummaryCards
            totalSpent={totalSpent}
            remaining={monthlyBudget - totalSpent}
            transactionCount={expenses.length}
          />
          <AnalyticsPanels
            chartData={chartData}
            categoryTotals={categoryTotals}
            totalSpent={totalSpent}
          />
          <ExpensesTable expenses={expenses} />
        </main>
      </div>

      {isModalOpen && (
        <AddExpenseModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addExpense}
        />
      )}
    </div>
  );
}
