"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function MenuResponsivo() {
  const [menuAberto, setMenuAberto] = useState(false);

  const menuItems = [
    { href: "/sobre", label: "Sobre" },
    { href: "/projetos", label: "Projetos" },
    { href: "/publicacoes", label: "Publicações" },
    { href: "/Equipe", label: "Equipe" },
    { href: "/Legislacao", label: "Legislação" },
    { href: "/Orientacao", label: "Orientações" },
    { href: "/Artefatos", label: "Artefatos" },
    { href: "/Galeria", label: "Galeria" },
    { href: "/contato", label: "Contatos" },
  ];

  return (
    <header className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Logo Centralizada */}
        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/logoprivacidade.svg"
            alt="Segurança e Privacidade Digital"
            width={200}
            height={200}
            className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
            priority
          />
          <div className="hidden sm:block mt-4 text-center">
            <h1 className="text-xl md:text-2xl font-bold">
              Segurança e Privacidade
            </h1>
            <p className="text-sm md:text-base text-blue-100">
              Laboratório LAVI
            </p>
          </div>
        </div>

        {/* Botão Menu Mobile */}
        <div className="flex justify-center lg:hidden mb-4">
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            type="button"
            className="p-3 rounded-lg hover:bg-blue-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform ${
                menuAberto ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuAberto ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center justify-center space-x-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="mailto:lavi.ic.ufmt@gmail.com"
            className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            E-mail
          </a>
        </nav>

        {/* Menu Mobile Dropdown */}
        <div
          className={`lg:hidden mt-4 transition-all duration-300 overflow-hidden ${
            menuAberto ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col space-y-2 pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium backdrop-blur-sm"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:lavi.ic.ufmt@gmail.com"
              onClick={() => setMenuAberto(false)}
              className="px-4 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium shadow-lg flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              E-mail
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
