"use client";
import { useEffect, useState } from "react";

interface Noticia {
  id: string;
  titulo: string;
  descricao?: string;
  conteudo?: string;
  imagem_principal?: string;
  created_at?: Date;
  updated_at?: Date;
}

export default function TodasNoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [noticiaSelecionada, setNoticiaSelecionada] = useState<Noticia | null>(
    null
  );
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/sobre");
        if (response.ok) {
          const result = await response.json();
          setNoticias(result);
        } else {
          console.error("Erro ao buscar notícias");
        }
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const abrirModal = (noticia: Noticia) => {
    setNoticiaSelecionada(noticia);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNoticiaSelecionada(null);
  };

  // Calcular paginação
  const totalPaginas = Math.ceil(noticias.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const noticiasPagina = noticias.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando notícias...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Todas as Notícias
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acompanhe todas as atualizações, projetos e novidades do nosso
              laboratório
            </p>
            <div className="mt-6">
              <a
                href="/sobre"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Voltar para página inicial
              </a>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {noticias.length}
                </div>
                <div className="text-gray-600">Total de Notícias</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {totalPaginas}
                </div>
                <div className="text-gray-600">Páginas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {itensPorPagina}
                </div>
                <div className="text-gray-600">Itens por Página</div>
              </div>
            </div>
          </div>

          {/* Grid de Notícias */}
          {noticiasPagina.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {noticiasPagina.map((noticia, index) => (
                  <div
                    key={noticia.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => abrirModal(noticia)}
                  >
                    {/* Imagem */}
                    {noticia.imagem_principal ? (
                      <div className="relative h-48 overflow-hidden bg-gray-50">
                        <img
                          src={noticia.imagem_principal}
                          alt={noticia.titulo}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white text-sm font-medium line-clamp-2">
                            {noticia.titulo}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <svg
                            className="w-12 h-12 mx-auto mb-2 opacity-80"
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
                          <div className="font-bold text-sm line-clamp-2">
                            {noticia.titulo}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Conteúdo */}
                    <div className="p-5">
                      {!noticia.imagem_principal && (
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {noticia.titulo}
                        </h3>
                      )}

                      {noticia.descricao && (
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">
                          {noticia.descricao}
                        </p>
                      )}

                      {/* Data e Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {noticia.updated_at
                            ? new Date(noticia.updated_at).toLocaleDateString(
                                "pt-BR"
                              )
                            : "Recente"}
                        </span>
                        <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Notícia
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginação */}
              {totalPaginas > 1 && (
                <div className="flex justify-center">
                  <nav className="inline-flex items-center space-x-2">
                    {/* Botão Anterior */}
                    <button
                      onClick={() =>
                        setPaginaAtual(Math.max(1, paginaAtual - 1))
                      }
                      disabled={paginaAtual === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>

                    {/* Números das páginas */}
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                      (numeroPagina) => (
                        <button
                          key={numeroPagina}
                          onClick={() => setPaginaAtual(numeroPagina)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            numeroPagina === paginaAtual
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {numeroPagina}
                        </button>
                      )
                    )}

                    {/* Botão Próximo */}
                    <button
                      onClick={() =>
                        setPaginaAtual(Math.min(totalPaginas, paginaAtual + 1))
                      }
                      disabled={paginaAtual === totalPaginas}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próximo
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
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
                  Nenhuma notícia encontrada
                </h3>
                <p className="text-gray-500">
                  Ainda não há notícias publicadas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal da Notícia */}
      {modalAberto && noticiaSelecionada && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity backdrop-blur-sm"
              onClick={fecharModal}
            ></div>

            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full mx-4 animate-scale-in">
              {/* Header do Modal */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white pr-4">
                    {noticiaSelecionada.titulo}
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
              <div className="px-6 py-8 max-h-96 overflow-y-auto">
                {noticiaSelecionada.imagem_principal && (
                  <div className="mb-8">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <img
                        src={noticiaSelecionada.imagem_principal}
                        alt={noticiaSelecionada.titulo}
                        className="w-full h-auto max-h-96 object-contain object-center rounded-xl shadow-lg mx-auto"
                      />
                    </div>
                  </div>
                )}

                {noticiaSelecionada.descricao && (
                  <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                    {noticiaSelecionada.descricao}
                  </p>
                )}

                {noticiaSelecionada.conteudo && (
                  <div className="prose prose-lg prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed text-base sm:text-lg"
                      dangerouslySetInnerHTML={{
                        __html: noticiaSelecionada.conteudo,
                      }}
                    />
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-500 gap-2">
                    <span>
                      Criado em:{" "}
                      {noticiaSelecionada.created_at
                        ? new Date(
                            noticiaSelecionada.created_at
                          ).toLocaleDateString("pt-BR")
                        : "recentemente"}
                    </span>
                    <span>
                      Atualizado em:{" "}
                      {noticiaSelecionada.updated_at
                        ? new Date(
                            noticiaSelecionada.updated_at
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
