"use client";

import { useEffect, useMemo, useState } from "react";
import { AddExpenseModal } from "./components/add-expense-modal";
import { AnalyticsPanels } from "./components/analytics-panels";
import {
  categories,
  monthlyBudget,
  type Expense,
} from "./components/expense-data";
import { ExpensesTable } from "./components/expenses-table";
import { Icon } from "./components/dashboard-icon";
import { MobileHeader, Sidebar } from "./components/sidebar";
import { SummaryCards } from "./components/summary-cards";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/expenses`);
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        const expenses = data.map((expense: Expense) => ({
          ...expense,
          amount: Number(expense.amount),
        }));
        setExpenses(expenses);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Unable to fetch :", error.message);
        }
      }
    };
    fetchExpenses();
  }, []);

  const totalSpent = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    for (const expense of expenses) {
      const category = expense.category;
      const existingTotal = totals[category] ?? 0;

      totals[category] = existingTotal + expense.amount;
    }

    return totals;
  }, [expenses]);
  const chartData = categories
    .map((category) => ({ category, amount: categoryTotals[category] ?? 0 }))
    .filter((item) => item.amount > 0);

  async function addExpense(expense: Expense) {
    const response = await fetch(`${API_URL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error("Unable to add expense");
    }

    const data = await response.json();

    const newExpense = {
      ...data,
      amount: Number(data.amount),
    };
    console.log(typeof newExpense.amount);

    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
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
