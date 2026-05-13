import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shadow Vault // Void State Protocol",
  description: "Sovereign interface for decentralized dead man's switches",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0f] text-[#e0e0ff] font-mono antialiased">
        <nav className="border-b border-[#1e1e2e] px-6 py-3 flex items-center justify-between">
          <span className="text-[#00ff9d] font-bold tracking-widest text-sm">
            ◈ VOID STATE PROTOCOL
          </span>
          <div className="flex gap-6 text-xs text-[#4a4a6a]">
            <a href="/" className="hover:text-[#00ff9d] transition-colors">DASHBOARD</a>
            <a href="/create" className="hover:text-[#00ff9d] transition-colors">CREATE VAULT</a>
            <a href="/portal" className="hover:text-[#00ff9d] transition-colors">SHADOW PORTAL</a>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
