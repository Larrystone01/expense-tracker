import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pennywise | Expense Dashboard",
  description: "A clear view of your monthly spending and budget.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
