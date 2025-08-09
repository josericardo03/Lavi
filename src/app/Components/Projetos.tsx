"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Projeto {
  id: string;
  nome: string;
  nome_completo?: string;
  ano: number;
  descricao?: string;
  participantes?: string;
  status: string;
  imagem?: string;
  link_externo?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjetosPorAno {
  [ano: number]: Projeto[];
}

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/projetos");
        if (response.ok) {
          const result = await response.json();
          setProjetos(result);
        } else {
          console.error("Erro ao buscar projetos");
        }
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const abrirModal = (projeto: Projeto) => {
    setProjetoSelecionado(projeto);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProjetoSelecionado(null);
  };

  // Agrupar projetos por ano
  const projetosPorAno: ProjetosPorAno = projetos.reduce((acc, projeto) => {
    if (projeto.status === "ativo") {
      if (!acc[projeto.ano]) {
        acc[projeto.ano] = [];
      }
      acc[projeto.ano].push(projeto);
    }
    return acc;
  }, {} as ProjetosPorAno);

  // Ordenar anos em ordem decrescente
  const anosOrdenados = Object.keys(projetosPorAno)
    .map(Number)
    .sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando projetos...</p>
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
              Nossos Projetos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os projetos desenvolvidos pelo Laboratório de Arqueologia
              Virtual e Interativa
            </p>
          </div>

          {/* Projetos por Ano */}
          {anosOrdenados.length > 0 ? (
            <div className="space-y-12">
              {anosOrdenados.map((ano) => (
                <div
                  key={ano}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                    <h2 className="text-3xl font-bold text-white">{ano}</h2>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {projetosPorAno[ano].map((projeto) => (
                        <div
                          key={projeto.id}
                          className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 cursor-pointer"
                          onClick={() => abrirModal(projeto)}
                        >
                          {/* Imagem do Projeto */}
                          {projeto.imagem && (
                            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                              <Image
                                src={projeto.imagem}
                                alt={projeto.nome}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          {/* Nome do Projeto */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {projeto.nome}
                          </h3>

                          {/* Nome Completo */}
                          {projeto.nome_completo && (
                            <p className="text-gray-700 font-medium mb-3">
                              {projeto.nome_completo}
                            </p>
                          )}

                          {/* Descrição */}
                          {projeto.descricao && (
                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                              {projeto.descricao}
                            </p>
                          )}

                          {/* Participantes */}
                          {projeto.participantes && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                  />
                                </svg>
                                Participantes:
                              </h4>
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                {projeto.participantes}
                              </p>
                            </div>
                          )}

                          {/* Botão para abrir modal */}
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {projeto.status}
                            </span>
                            <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-600">
                Nossos projetos serão anunciados em breve.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal do Projeto */}
      {modalAberto && projetoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[98vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4 sm:py-5 rounded-t-2xl flex-shrink-0">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 leading-tight break-words">
                    {projetoSelecionado.nome}
                  </h2>
                  {projetoSelecionado.nome_completo && (
                    <p className="text-blue-100 text-sm sm:text-base">
                      {projetoSelecionado.nome_completo}
                    </p>
                  )}
                </div>
                <button
                  onClick={fecharModal}
                  className="text-white hover:text-blue-100 transition-colors flex-shrink-0 p-1"
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
                {/* Imagem do Projeto */}
                {projetoSelecionado.imagem && (
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 mb-6 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={projetoSelecionado.imagem}
                      alt={projetoSelecionado.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Informações do Projeto */}
                <div className="space-y-4 sm:space-y-5 min-w-0">
                  {/* Ano e Status */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Ano: {projetoSelecionado.ano}
                    </span>
                    <span className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Status: {projetoSelecionado.status}
                    </span>
                  </div>

                  {/* Descrição Completa */}
                  {projetoSelecionado.descricao && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0"
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
                        Descrição
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-7 break-words whitespace-normal">
                        {projetoSelecionado.descricao}
                      </p>
                    </div>
                  )}

                  {/* Participantes */}
                  {projetoSelecionado.participantes && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                          />
                        </svg>
                        Participantes
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-7 break-words whitespace-normal">
                        {projetoSelecionado.participantes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
