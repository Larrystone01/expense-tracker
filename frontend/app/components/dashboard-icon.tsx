export type IconName =
  | "grid" | "receipt" | "tag" | "wallet" | "settings" | "plus" | "close" | "arrow" | "trend"
  | "home" | "food" | "car" | "bolt" | "heart" | "lifestyle" | "other";

export const categoryIcons: Record<string, IconName> = {
  Food: "food", Housing: "home", Transport: "car", Utilities: "bolt",
  Health: "heart", Lifestyle: "lifestyle", Other: "other",
};

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" /><path d="M9 8h6M9 12h6" /></>,
    tag: <><path d="M20 13 11 22l-9-9V4h9l9 9Z" /><circle cx="7" cy="9" r="1" /></>,
    wallet: <><path d="M3 7h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V7Z" /><path d="M3 7V6a2 2 0 0 1 2-2h12v3M16 12h5v4h-5a2 2 0 0 1 0-4Z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l-2.83 2.83A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1.4 1.6h-3.2A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.91.31l-2.8-2.8A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3 13.6v-3.2A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.31-1.91l2.8-2.8A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10.4 3h3.2A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.91-.31l2.8 2.8A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.6 1.4v3.2a1.7 1.7 0 0 0-1.6 1.4Z" /></>,
    plus: <path d="M12 5v14M5 12h14" />, close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="m9 18 6-6-6-6" />, trend: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10" /><path d="M17 3c-2 2-3 5-3 8h4v10M18 3v8" /></>,
    car: <><path d="m5 17-2-2v-4l2-2 2-4h10l2 4 2 2v4l-2 2H5Z" /><circle cx="7" cy="14" r="1" /><circle cx="17" cy="14" r="1" /><path d="M5 9h14" /></>,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    lifestyle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    other: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
