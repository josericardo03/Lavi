"use client";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Informações de Contato */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium mb-1">Laboratório LAVI</p>
            <p className="text-xs text-blue-100">
              Segurança e Privacidade Digital
            </p>
            <a
              href="mailto:lavi.ic.ufmt@gmail.com"
              className="text-xs text-blue-100 hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1 mt-2"
            >
              <svg
                className="w-3 h-3"
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
              lavi.ic.ufmt@gmail.com
            </a>
          </div>

          {/* Links Rápidos */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium mb-2">Links Rápidos</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs">
              <a
                href="/sobre"
                className="hover:text-blue-100 transition-colors"
              >
                Sobre
              </a>
              <span className="text-blue-400">•</span>
              <a
                href="/projetos"
                className="hover:text-blue-100 transition-colors"
              >
                Projetos
              </a>
              <span className="text-blue-400">•</span>
              <a
                href="/Equipe"
                className="hover:text-blue-100 transition-colors"
              >
                Equipe
              </a>
              <span className="text-blue-400">•</span>
              <a
                href="/contato"
                className="hover:text-blue-100 transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-blue-500 text-center">
          <p className="text-xs text-blue-100">
            © {currentYear} Laboratório LAVI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
