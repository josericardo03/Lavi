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
                        className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200"
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
                          <p className="text-gray-600 mb-4 leading-relaxed">
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
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {projeto.participantes}
                            </p>
                          </div>
                        )}

                        {/* Link Externo */}
                        {projeto.link_externo && (
                          <a
                            href={projeto.link_externo}
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Ver mais detalhes
                          </a>
                        )}
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
  );
}
