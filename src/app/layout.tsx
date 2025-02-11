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
      <body className={inter.className} >
        <MenuResponsivo />
        
        <main>{children}</main>  
        <div className="bottom-0"> <Footer /></div>     
       
      </body>
    </html>
  );
}
