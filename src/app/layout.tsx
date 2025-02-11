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
        {/* Navbar solta no topo */}
        <nav className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MenuResponsivo />
          </div>
        </nav>

        {/* Conteúdo principal */}
        <main className="flex-grow w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* Footer com altura fixa */}

        <div className="flex justify-center w-full">
          <div className=" bg-green-700 max-w-7xl w-full">
            <div className="px-4 sm:px-6 lg:px-8">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
