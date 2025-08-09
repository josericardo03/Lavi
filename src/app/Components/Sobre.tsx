"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SobreData {
  id: string;
  titulo: string;
  descricao?: string;
  conteudo?: string;
  imagem_principal?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Sobre() {
  const [sobreData, setSobreData] = useState<SobreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/sobre");
        if (response.ok) {
          const result = await response.json();
          // Pegar o primeiro item (página principal)
          setSobreData(result[0] || null);
        } else {
          console.error("Erro ao buscar dados sobre");
        }
      } catch (error) {
        console.error("Erro ao buscar dados sobre:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando informações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {sobreData?.titulo || "Sobre o LAVI"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {sobreData?.descricao ||
              "Conheça mais sobre o Laboratório de Arqueologia Virtual e Interativa"}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {sobreData?.imagem_principal && (
            <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50">
              <Image
                src={sobreData.imagem_principal}
                alt="Imagem principal do LAVI"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              {sobreData?.conteudo ? (
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sobreData.conteudo }}
                />
              ) : (
                <div className="text-gray-700 leading-relaxed space-y-6">
                  <p>
                    O Laboratório de Arqueologia Virtual e Interativa (LAVI) é
                    uma instituição dedicada ao desenvolvimento e aplicação de
                    tecnologias inovadoras no campo da arqueologia.
                  </p>
                  <p>
                    Nossa missão é integrar métodos tradicionais de pesquisa
                    arqueológica com as mais avançadas tecnologias digitais,
                    criando novas possibilidades de descoberta, preservação e
                    divulgação do patrimônio cultural.
                  </p>
                  <p>
                    Através de projetos interdisciplinares, colaboramos com
                    pesquisadores, instituições e comunidades para desenvolver
                    soluções que transformem a forma como entendemos e
                    preservamos nossa história.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <a
            href="/projetos"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 p-8"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Nossos Projetos
              </h3>
            </div>
            <p className="text-gray-600">
              Conheça os projetos desenvolvidos pelo LAVI, incluindo pesquisas,
              tecnologias e inovações.
            </p>
          </a>

          <a
            href="/publicacoes"
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 p-8"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5c1.746 0 3.332.477 4.5 1.253zm0 0C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C16.5 18.5 15 19 13.5 19s-3-.5-4.5-1.253v-13z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Publicações
              </h3>
            </div>
            <p className="text-gray-600">
              Acesse nossas publicações científicas, artigos e pesquisas
              organizadas por ano.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
