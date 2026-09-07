export type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export const initialExpenses: Expense[] = [
  { id: 1, title: "Apartment rent", amount: 185000, category: "Housing", date: "2026-09-05" },
  { id: 2, title: "Weekly groceries", amount: 32750, category: "Food", date: "2026-09-04" },
  { id: 3, title: "Internet subscription", amount: 18500, category: "Utilities", date: "2026-09-03" },
  { id: 4, title: "Fuel refill", amount: 24400, category: "Transport", date: "2026-09-02" },
  { id: 5, title: "Gym membership", amount: 15000, category: "Lifestyle", date: "2026-09-01" },
  { id: 6, title: "Pharmacy", amount: 9800, category: "Health", date: "2026-08-30" },
];

export const monthlyBudget = 500000;
export const categories = ["Food", "Housing", "Transport", "Utilities", "Health", "Lifestyle", "Other"];
export const categoryColors: Record<string, string> = {
  Food: "#e9a23b", Housing: "#37a779", Transport: "#5688d8", Utilities: "#8d6ccf",
  Health: "#e36d7d", Lifestyle: "#46a8ad", Other: "#7b8794",
};
export const budgetLimits: Record<string, number> = { Housing: 200000, Food: 100000, Transport: 70000 };
export const currency = new Intl.NumberFormat("en-NG", {
  style: "currency", currency: "NGN", maximumFractionDigits: 0,
});

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
