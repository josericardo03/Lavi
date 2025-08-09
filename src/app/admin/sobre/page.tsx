"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "../../Components/ImageUpload";

interface SobreData {
  id: string;
  titulo: string;
  descricao?: string;
  conteudo?: string;
  imagem_principal?: string;
  created_at?: Date;
  updated_at?: Date;
}

export default function AdminSobre() {
  const [sobreData, setSobreData] = useState<SobreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    conteudo: "",
    imagem_principal: "",
  });

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/sobre");
      if (response.ok) {
        const data = await response.json();
        setSobreData(data);
      } else {
        console.error("Erro ao buscar dados sobre");
      }
    } catch (error) {
      console.error("Erro ao buscar dados sobre:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Atualizar
        const response = await fetch(`/api/admin/sobre/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setEditingId(null);
          setFormData({
            titulo: "",
            descricao: "",
            conteudo: "",
            imagem_principal: "",
          });
          fetchData();
        }
      } else {
        // Criar novo
        const response = await fetch("/api/admin/sobre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormData({
            titulo: "",
            descricao: "",
            conteudo: "",
            imagem_principal: "",
          });
          fetchData();
        }
      }
    } catch (error) {
      console.error("Erro ao salvar dados sobre:", error);
    }
  };

  const handleEdit = (item: SobreData) => {
    setEditingId(item.id);
    setFormData({
      titulo: item.titulo,
      descricao: item.descricao || "",
      conteudo: item.conteudo || "",
      imagem_principal: item.imagem_principal || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta entrada?")) {
      try {
        const response = await fetch(`/api/admin/sobre/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchData();
        }
      } catch (error) {
        console.error("Erro ao deletar entrada sobre:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      titulo: "",
      descricao: "",
      conteudo: "",
      imagem_principal: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-3">Gerenciar Sobre</h1>
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                Crie e gerencie múltiplas postagens sobre sua organização. A
                primeira postagem será exibida como destaque principal na página
                pública.
              </p>
            </div>
            <Link
              href="/admin"
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
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
              Voltar ao Painel
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Editar Entrada" : "Nova Entrada"}
              </h2>
              <p className="text-gray-600 text-sm">
                {editingId
                  ? "Atualize as informações da entrada"
                  : "Crie uma nova entrada sobre sua organização"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Ex: Nossa História, Missão e Valores"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Breve descrição da entrada"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo
              </label>
              <textarea
                rows={8}
                value={formData.conteudo}
                onChange={(e) =>
                  setFormData({ ...formData, conteudo: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Conteúdo completo da entrada. Você pode usar HTML para formatação."
              />
              <p className="text-xs text-gray-500 mt-2">
                Dica: Use HTML para formatação (ex: &lt;strong&gt;, &lt;em&gt;,
                &lt;br&gt;)
              </p>
            </div>

            <ImageUpload
              onImageUpload={(imageUrl) =>
                setFormData({ ...formData, imagem_principal: imageUrl })
              }
              currentImageUrl={formData.imagem_principal}
              label="Imagem Principal"
            />

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {editingId ? "Atualizar Entrada" : "Criar Entrada"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-300 hover:border-gray-400 flex items-center gap-2 font-medium"
                >
                  <svg
                    className="w-5 h-5"
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
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Entradas */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-900">
              Entradas Existentes
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              A primeira entrada será exibida como postagem principal na página
              pública
            </p>
          </div>

          {sobreData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma entrada encontrada
              </h3>
              <p className="text-gray-600">
                Crie uma nova entrada acima para começar.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sobreData.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 ${
                    index === 0
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.titulo}
                        </h3>
                        {index === 0 && (
                          <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-full">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Principal
                          </span>
                        )}
                      </div>

                      {item.descricao && (
                        <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                          {item.descricao}
                        </p>
                      )}

                      {item.conteudo && (
                        <div className="text-gray-700 text-sm mb-3 p-3 bg-gray-50 rounded-lg">
                          <strong className="text-gray-800">Conteúdo:</strong>{" "}
                          <span className="text-gray-600">
                            {item.conteudo.substring(0, 150)}
                            {item.conteudo.length > 150 && "..."}
                          </span>
                        </div>
                      )}

                      {item.imagem_principal && (
                        <div className="mb-3">
                          <img
                            src={item.imagem_principal}
                            alt={item.titulo}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>
                          Criado em:{" "}
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString(
                                "pt-BR"
                              )
                            : "recentemente"}
                        </span>
                        {item.updated_at && (
                          <span>
                            Atualizado em:{" "}
                            {new Date(item.updated_at).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
