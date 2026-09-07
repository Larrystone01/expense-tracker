"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type BarShapeProps,
} from "recharts";
import {
  budgetLimits,
  categoryColors,
  currency,
  monthlyBudget,
} from "./expense-data";

type CategoryTotal = { category: string; amount: number };

function CategoryBar({ payload, ...rectangleProps }: BarShapeProps) {
  const category = String(payload?.category ?? "Other");
  return (
    <Rectangle
      {...rectangleProps}
      fill={categoryColors[category] ?? categoryColors.Other}
      radius={[5, 5, 0, 0]}
    />
  );
}

export function AnalyticsPanels({
  chartData,
  categoryTotals,
  totalSpent,
}: {
  chartData: CategoryTotal[];
  categoryTotals: Record<string, number>;
  totalSpent: number;
}) {
  const usedPercent = Math.min((totalSpent / monthlyBudget) * 100, 100);
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-[#142032]">Spending overview</h2>
            <p className="mt-1 text-sm text-slate-500">Expenses by category</p>
          </div>
          <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
            This month
          </span>
        </div>
        <div
          className="mt-6 h-72 min-w-0"
          aria-label="Bar chart of spending by category"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 4, left: 0, bottom: 0 }}
              accessibilityLayer
            >
              <CartesianGrid
                stroke="#e8edf2"
                strokeDasharray="4 4"
                vertical={false}
              />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={54}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(value) =>
                  `₦${Math.round(Number(value) / 1000)}k`
                }
              />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                formatter={(value) => [currency.format(Number(value)), "Spent"]}
                contentStyle={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
                labelStyle={{
                  color: "#142032",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              />
              <Bar dataKey="amount" maxBarSize={54} shape={CategoryBar} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-[#142032]">Budget progress</h2>
            <p className="mt-1 text-sm text-slate-500">September allocation</p>
          </div>
          <span className="text-sm font-semibold text-[#18845e]">
            {Math.round(usedPercent)}%
          </span>
        </div>
        <div className="mt-6">
          <div className="flex justify-between gap-3 text-sm">
            <span className="font-medium">Overall budget</span>
            <span className="text-right text-slate-500">
              {currency.format(totalSpent)} / {currency.format(monthlyBudget)}
            </span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${totalSpent > monthlyBudget ? "bg-red-500" : "bg-[#27a774]"}`}
              style={{ width: `${usedPercent}%` }}
            />
          </div>
        </div>
        <div className="mt-7 space-y-5">
          {Object.entries(budgetLimits).map(([category, limit]) => {
            const spent = categoryTotals[category] ?? 0;
            const percent = Math.min((spent / limit) * 100, 100);
            return (
              <div key={category}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 font-medium">
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ backgroundColor: categoryColors[category] }}
                    />
                    {category}
                  </span>
                  <span className="text-right text-xs text-slate-500">
                    {currency.format(spent)} of {currency.format(limit)}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: categoryColors[category],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
