import { Icon, type IconName } from "./dashboard-icon";

const navItems: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "grid" }, { label: "Expenses", icon: "receipt" },
  { label: "Categories", icon: "tag" }, { label: "Budgets", icon: "wallet" },
  { label: "Settings", icon: "settings" },
];

export function Sidebar() {
  return <aside className="hidden min-h-screen w-64 shrink-0 flex-col bg-[#101d2f] px-5 py-7 text-white lg:sticky lg:top-0 lg:flex lg:h-screen">
    <Brand />
    <nav className="mt-10 space-y-1" aria-label="Main navigation">{navItems.map((item, index) => <button key={item.label} type="button" className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${index === 0 ? "bg-[#1b6f56] text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon name={item.icon} />{item.label}</button>)}</nav>
    <div className="mt-auto border-t border-white/10 pt-5"><div className="flex items-center gap-3 rounded-lg px-2 py-2"><Avatar /><div className="min-w-0 flex-1"><p className="text-sm font-semibold">Larry</p><p className="truncate text-xs text-slate-400">Personal account</p></div><Icon name="arrow" className="h-4 w-4 text-slate-500" /></div></div>
  </aside>;
}

export function MobileHeader() {
  return <header className="bg-[#101d2f] px-4 py-4 text-white lg:hidden"><div className="flex items-center justify-between"><Brand compact /><Avatar /></div><nav className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Mobile navigation">{navItems.map((item, index) => <button key={item.label} type="button" className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium ${index === 0 ? "bg-[#1b6f56] text-white" : "text-slate-300"}`}>{item.label}</button>)}</nav></header>;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`flex items-center ${compact ? "gap-2.5" : "gap-3 px-2"}`}><div className={`flex items-center justify-center rounded-lg bg-[#27a774] font-bold ${compact ? "h-9 w-9" : "h-10 w-10 text-lg"}`}>P</div><span className={compact ? "text-lg font-semibold" : "text-xl font-semibold"}>Pennywise</span></div>;
}

function Avatar() {
  return <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7f1e5] text-sm font-semibold text-[#176a4e] lg:h-10 lg:w-10">LA</div>;
}
