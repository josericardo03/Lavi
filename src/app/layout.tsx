import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MenuResponsivo } from "./Components/MenuResponsivo";
import { Footer } from "./Components/Footer";
import "./globals.css"; // Adicionando import do CSS global se existir

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LAVI",
  description: "Laboratório de Ambientes Virtuais Interativos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        {/* Navbar com fundo branco */}
        <nav className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <MenuResponsivo />
          </div>
        </nav>

        {/* Conteúdo principal */}
        <main className="flex-grow w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* Footer com mesma estrutura do header */}
        <footer className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  );
}
