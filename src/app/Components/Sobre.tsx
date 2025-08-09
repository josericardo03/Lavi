"use client";
import { useState, useEffect } from "react";

interface Sobre {
  id: string;
  titulo: string;
  descricao?: string;
  conteudo?: string;
  imagem_principal?: string;
  created_at?: Date;
  updated_at?: Date;
}

export default function Sobre() {
  const [sobre, setSobre] = useState<Sobre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/sobre");
        if (response.ok) {
          const result = await response.json();
          setSobre(result);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando informações...</p>
          </div>
        </div>
      </div>
    );
  }

  // Separa a postagem principal (primeira) das secundárias
  const postagemPrincipal = sobre[0];
  const postagensSecundarias = sobre.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Sobre Nós
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conheça nossa história, missão e os valores que nos guiam no
            desenvolvimento de ambientes virtuais interativos e inovadores
          </p>
        </div>

        {/* Postagem Principal - Destaque */}
        {postagemPrincipal && (
          <div className="mb-20">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Hero Section com Imagem */}
              {postagemPrincipal.imagem_principal && (
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={postagemPrincipal.imagem_principal}
                    alt={postagemPrincipal.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">
                      {postagemPrincipal.titulo}
                    </h2>
                    {postagemPrincipal.descricao && (
                      <p className="text-xl text-gray-200 leading-relaxed">
                        {postagemPrincipal.descricao}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Conteúdo Principal */}
              <div className="p-8 lg:p-12">
                {!postagemPrincipal.imagem_principal && (
                  <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {postagemPrincipal.titulo}
                    </h2>
                    {postagemPrincipal.descricao && (
                      <p className="text-xl text-gray-600 leading-relaxed mb-6">
                        {postagemPrincipal.descricao}
                      </p>
                    )}
                  </div>
                )}

                {postagemPrincipal.conteudo && (
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed text-lg">
                      {postagemPrincipal.conteudo}
                    </div>
                  </div>
                )}

                {/* Badge de Postagem Principal */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-full">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Postagem Principal
                  </div>
                  <span className="text-sm text-gray-500">
                    Atualizada em{" "}
                    {postagemPrincipal.updated_at
                      ? new Date(
                          postagemPrincipal.updated_at
                        ).toLocaleDateString("pt-BR")
                      : "recentemente"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Postagens Secundárias */}
        {postagensSecundarias.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Mais Informações
              </h3>
              <p className="text-lg text-gray-600">
                Explore outros aspectos e detalhes sobre nossa organização
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postagensSecundarias.map((postagem) => (
                <div
                  key={postagem.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                >
                  {/* Imagem da Postagem */}
                  {postagem.imagem_principal && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={postagem.imagem_principal}
                        alt={postagem.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {postagem.titulo}
                    </h4>

                    {postagem.descricao && (
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {postagem.descricao}
                      </p>
                    )}

                    {postagem.conteudo && (
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {postagem.conteudo}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {postagem.updated_at
                            ? new Date(postagem.updated_at).toLocaleDateString(
                                "pt-BR"
                              )
                            : "recentemente"}
                        </span>
                        <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700">
                          <span className="font-medium">Ler mais</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado Vazio */}
        {sobre.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-16 h-16 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Nenhuma informação disponível
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              As informações sobre nossa organização serão disponibilizadas em
              breve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
