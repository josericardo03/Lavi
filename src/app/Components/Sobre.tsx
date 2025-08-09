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

  const postagemPrincipal = sobre[0];
  const postagensSecundarias = sobre.slice(1);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Postagem Principal */}
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
                  {/* Botão para expandir */}
                  {postagemPrincipal.conteudo &&
                    postagemPrincipal.conteudo.length > 200 && (
                      <div className="mt-8">
                        <button
                          onClick={() => abrirModal(postagemPrincipal)}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Ler Completo
                        </button>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Outras Informações
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postagensSecundarias.map((postagem) => (
                  <div
                    key={postagem.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => abrirModal(postagem)}
                  >
                    {postagem.imagem_principal && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={postagem.imagem_principal}
                          alt={postagem.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {postagem.titulo}
                      </h3>
                      {postagem.descricao && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {postagem.descricao}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {postagem.updated_at
                            ? new Date(postagem.updated_at).toLocaleDateString(
                                "pt-BR"
                              )
                            : "recentemente"}
                        </span>
                        <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
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
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalAberto && postagemSelecionada && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={fecharModal}
            ></div>

            {/* Modal */}
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              {/* Header do Modal */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    {postagemSelecionada.titulo}
                  </h3>
                  <button
                    onClick={fecharModal}
                    className="text-white hover:text-gray-200 transition-colors"
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
              <div className="px-6 py-6">
                {postagemSelecionada.imagem_principal && (
                  <div className="mb-6">
                    <img
                      src={postagemSelecionada.imagem_principal}
                      alt={postagemSelecionada.titulo}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  </div>
                )}

                {postagemSelecionada.descricao && (
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {postagemSelecionada.descricao}
                  </p>
                )}

                {postagemSelecionada.conteudo && (
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed">
                      {postagemSelecionada.conteudo}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
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
              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                  onClick={fecharModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
