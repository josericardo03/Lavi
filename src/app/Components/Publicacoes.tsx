"use client";
import { useEffect, useState } from "react";

interface Publicacao {
  id: string;
  titulo: string;
  autores?: string;
  ano: number;
  revista_periodico?: string;
  doi?: string;
  link_externo?: string;
  resumo?: string;
  tipo?: string;
  imagem?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface PublicacoesPorAno {
  [ano: number]: Publicacao[];
}

export default function Publicacoes() {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/publicacoes");
        if (response.ok) {
          const result = await response.json();
          setPublicacoes(result);
        } else {
          console.error("Erro ao buscar publicações");
        }
      } catch (error) {
        console.error("Erro ao buscar publicações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Agrupar publicações por ano
  const publicacoesPorAno: PublicacoesPorAno = publicacoes.reduce(
    (acc, publicacao) => {
      if (!acc[publicacao.ano]) {
        acc[publicacao.ano] = [];
      }
      acc[publicacao.ano].push(publicacao);
      return acc;
    },
    {} as PublicacoesPorAno
  );

  // Ordenar anos em ordem decrescente
  const anosOrdenados = Object.keys(publicacoesPorAno)
    .map(Number)
    .sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando publicações...</p>
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
            Publicações Científicas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acesse nossas publicações científicas, artigos e pesquisas
            organizadas por ano
          </p>
        </div>

        {/* Publicações por Ano */}
        {anosOrdenados.length > 0 ? (
          <div className="space-y-12">
            {anosOrdenados.map((ano) => (
              <div
                key={ano}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
                  <h2 className="text-3xl font-bold text-white">{ano}</h2>
                  <p className="text-green-100 mt-2">
                    {publicacoesPorAno[ano].length} publicação
                    {publicacoesPorAno[ano].length !== 1 ? "ões" : ""}
                  </p>
                </div>

                <div className="p-8">
                  <div className="space-y-6">
                    {publicacoesPorAno[ano].map((publicacao) => (
                      <div
                        key={publicacao.id}
                        className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-green-200"
                      >
                        {/* Tipo de Publicação */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {publicacao.tipo}
                          </span>
                          {publicacao.doi && (
                            <span className="text-xs text-gray-500">
                              DOI: {publicacao.doi}
                            </span>
                          )}
                        </div>

                        {/* Imagem da Publicação */}
                        {publicacao.imagem && (
                          <div className="mb-4">
                            <img
                              src={publicacao.imagem}
                              alt={publicacao.titulo}
                              className="w-32 h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
                            />
                          </div>
                        )}

                        {/* Título */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                          {publicacao.titulo}
                        </h3>

                        {/* Autores */}
                        {publicacao.autores && (
                          <p className="text-gray-700 font-medium mb-3">
                            <span className="text-sm text-gray-600">
                              Autores:{" "}
                            </span>
                            {publicacao.autores}
                          </p>
                        )}

                        {/* Revista/Periódico */}
                        {publicacao.revista_periodico && (
                          <p className="text-gray-600 mb-3">
                            <span className="text-sm text-gray-700 font-medium">
                              Publicado em:{" "}
                            </span>
                            <em>{publicacao.revista_periodico}</em>
                          </p>
                        )}

                        {/* Resumo */}
                        {publicacao.resumo && (
                          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                            {publicacao.resumo}
                          </p>
                        )}

                        {/* Links */}
                        <div className="flex items-center gap-4">
                          {publicacao.link_externo && (
                            <a
                              href={publicacao.link_externo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                              Acessar publicação
                            </a>
                          )}

                          {publicacao.doi && (
                            <a
                              href={`https://doi.org/${publicacao.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                              </svg>
                              Ver no DOI
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma publicação encontrada
            </h3>
            <p className="text-gray-600">
              Nossas publicações serão disponibilizadas em breve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
