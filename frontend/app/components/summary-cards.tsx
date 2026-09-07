import { currency, monthlyBudget } from "./expense-data";
import { Icon, type IconName } from "./dashboard-icon";

export function SummaryCards({ totalSpent, remaining, transactionCount }: { totalSpent: number; remaining: number; transactionCount: number }) {
  const cards: [string, string, IconName, string][] = [
    ["Total spent", currency.format(totalSpent), "trend", "text-[#18845e] bg-[#e5f5ee]"],
    ["Monthly budget", currency.format(monthlyBudget), "wallet", "text-[#4e72ba] bg-[#eaf0fb]"],
    ["Remaining budget", currency.format(remaining), "grid", remaining >= 0 ? "text-[#18845e] bg-[#e5f5ee]" : "text-red-600 bg-red-50"],
    ["Transactions", transactionCount.toString(), "receipt", "text-[#9a6b1f] bg-[#fff3dc]"],
  ];
  return <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Monthly summary">{cards.map(([label, value, icon, color]) => <article key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}><Icon name={icon} className="h-4 w-4" /></span></div><p className={`mt-4 text-2xl font-bold ${label === "Remaining budget" && remaining < 0 ? "text-red-600" : "text-[#142032]"}`}>{value}</p></article>)}</section>;
}
