import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin - LAVI",
  description: "Painel Administrativo",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`min-h-screen bg-gray-50 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
