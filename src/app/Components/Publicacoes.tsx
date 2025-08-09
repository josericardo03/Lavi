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
  const [modalAberto, setModalAberto] = useState(false);
  const [publicacaoSelecionada, setPublicacaoSelecionada] =
    useState<Publicacao | null>(null);

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

  const abrirModal = (publicacao: Publicacao) => {
    setPublicacaoSelecionada(publicacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPublicacaoSelecionada(null);
  };

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
    <>
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
                          className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-green-200 cursor-pointer"
                          onClick={() => abrirModal(publicacao)}
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
                              <span className="line-clamp-2">
                                {publicacao.autores}
                              </span>
                            </p>
                          )}

                          {/* Revista/Periódico */}
                          {publicacao.revista_periodico && (
                            <p className="text-gray-600 mb-3">
                              <span className="text-sm text-gray-700 font-medium">
                                Publicado em:{" "}
                              </span>
                              <em className="line-clamp-1">
                                {publicacao.revista_periodico}
                              </em>
                            </p>
                          )}

                          {/* Resumo */}
                          {publicacao.resumo && (
                            <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                              {publicacao.resumo}
                            </p>
                          )}

                          {/* Botão para abrir modal */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Ano: {publicacao.ano}
                            </span>
                            <button className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              Ver detalhes
                            </button>
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

      {/* Modal da Publicação */}
      {modalAberto && publicacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[98vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-4 sm:px-6 py-4 sm:py-5 rounded-t-2xl flex-shrink-0">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 leading-tight break-words">
                    {publicacaoSelecionada.titulo}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                      {publicacaoSelecionada.tipo || "artigo"}
                    </span>
                    <span className="text-green-100 text-sm sm:text-base">
                      Ano: {publicacaoSelecionada.ano}
                    </span>
                  </div>
                </div>
                <button
                  onClick={fecharModal}
                  className="text-white hover:text-green-100 transition-colors flex-shrink-0 p-1"
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Coluna da Esquerda - Imagem */}
                  <div className="lg:col-span-1">
                    {publicacaoSelecionada.imagem && (
                      <div className="sticky top-0 lg:top-4">
                        <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-lg">
                          <img
                            src={publicacaoSelecionada.imagem}
                            alt={publicacaoSelecionada.titulo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Coluna da Direita - Informações */}
                  <div className="lg:col-span-2 space-y-4 sm:space-y-5 min-w-0">
                    {/* Autores */}
                    {publicacaoSelecionada.autores && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-green-600 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Autores
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-7 break-words">
                          {publicacaoSelecionada.autores}
                        </p>
                      </div>
                    )}

                    {/* Revista/Periódico */}
                    {publicacaoSelecionada.revista_periodico && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-green-600 flex-shrink-0"
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
                          Publicado em
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic pl-7 break-words">
                          {publicacaoSelecionada.revista_periodico}
                        </p>
                      </div>
                    )}

                    {/* Resumo Completo */}
                    {publicacaoSelecionada.resumo && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-green-600 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Resumo
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-7 break-words whitespace-normal">
                          {publicacaoSelecionada.resumo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
