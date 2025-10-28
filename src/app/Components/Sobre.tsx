"use client";
import { useEffect, useState } from "react";

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
  const [modalAberto, setModalAberto] = useState(false);
  const [postagemSelecionada, setPostagemSelecionada] = useState<Sobre | null>(
    null
  );

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

  const abrirModal = (postagem: Sobre) => {
    setPostagemSelecionada(postagem);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPostagemSelecionada(null);
  };

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

  if (!sobre || sobre.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma informação disponível
              </h3>
              <p className="text-gray-500">
                Em breve publicaremos informações sobre nossa organização.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pegar apenas as 6 primeiras notícias para o grid 2x3
  const noticiasPrincipais = sobre.slice(0, 6);
  const temMaisNoticias = sobre.length > 6;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da Seção */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Notícias e Atualizações
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fique por dentro das últimas novidades, projetos e atualizações do
              nosso laboratório
            </p>
          </div>

          {/* Grid 2x3 de Notícias Principais */}
          {noticiasPrincipais.length > 0 && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {noticiasPrincipais.map((noticia, index) => (
                  <div
                    key={noticia.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => abrirModal(noticia)}
                  >
                    {/* Imagem da Notícia */}
                    {noticia.imagem_principal && (
                      <div className="relative h-48 overflow-hidden bg-gray-50">
                        <img
                          src={noticia.imagem_principal}
                          alt={noticia.titulo}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Nova
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Conteúdo */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {noticia.titulo}
                      </h3>

                      {noticia.descricao && (
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">
                          {noticia.descricao}
                        </p>
                      )}

                      {/* Data e Botão */}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">
                          {noticia.updated_at
                            ? new Date(noticia.updated_at).toLocaleDateString(
                                "pt-BR"
                              )
                            : "Recente"}
                        </span>
                        <div className="inline-flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                          Ler mais
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                ))}
              </div>

              {/* Botão Mais Notícias */}
              {temMaisNoticias && (
                <div className="text-center">
                  <a
                    href="/todas-noticias"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                    Ver Todas as Notícias
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      +{sobre.length - 6}
                    </span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Mensagem quando não há notícias */}
          {noticiasPrincipais.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma notícia disponível
                </h3>
                <p className="text-gray-500">
                  Em breve publicaremos as últimas novidades.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Melhorado */}
      {modalAberto && postagemSelecionada && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity backdrop-blur-sm"
              onClick={fecharModal}
            ></div>

            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full mx-4 animate-scale-in">
              {/* Header do Modal */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white pr-4">
                    {postagemSelecionada.titulo}
                  </h3>
                  <button
                    onClick={fecharModal}
                    className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    <svg
                      className="w-6 h-6"
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

              {/* Conteúdo do Modal */}
              <div className="px-6 py-8">
                {postagemSelecionada.imagem_principal && (
                  <div className="mb-8">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <img
                        src={postagemSelecionada.imagem_principal}
                        alt={postagemSelecionada.titulo}
                        className="w-full h-auto max-h-96 object-contain object-center rounded-xl shadow-lg mx-auto"
                      />
                    </div>
                  </div>
                )}

                {postagemSelecionada.descricao && (
                  <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                    {postagemSelecionada.descricao}
                  </p>
                )}

                {postagemSelecionada.conteudo && (
                  <div className="prose prose-lg prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed text-base sm:text-lg"
                      dangerouslySetInnerHTML={{
                        __html: postagemSelecionada.conteudo,
                      }}
                    />
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-500 gap-2">
                    <span>
                      Criado em:{" "}
                      {postagemSelecionada.created_at
                        ? new Date(
                            postagemSelecionada.created_at
                          ).toLocaleDateString("pt-BR")
                        : "recentemente"}
                    </span>
                    <span>
                      Atualizado em:{" "}
                      {postagemSelecionada.updated_at
                        ? new Date(
                            postagemSelecionada.updated_at
                          ).toLocaleDateString("pt-BR")
                        : "recentemente"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="bg-gray-50 px-6 py-6 flex justify-end">
                <button
                  onClick={fecharModal}
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
