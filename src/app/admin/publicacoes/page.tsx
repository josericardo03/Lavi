"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "../../Components/ImageUpload";

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

export default function AdminPublicacoes() {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    autores: "",
    ano: new Date().getFullYear(),
    revista_periodico: "",
    doi: "",
    link_externo: "",
    resumo: "",
    tipo: "artigo",
    imagem: "",
  });

  const router = useRouter();

  useEffect(() => {
    fetchPublicacoes();
  }, []);

  const fetchPublicacoes = async () => {
    try {
      const response = await fetch("/api/admin/publicacoes");
      if (response.ok) {
        const data = await response.json();
        setPublicacoes(data);
      }
    } catch (error) {
      console.error("Erro ao buscar publicações:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `/api/admin/publicacoes/${editingId}`
        : "/api/admin/publicacoes";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          titulo: "",
          autores: "",
          ano: new Date().getFullYear(),
          revista_periodico: "",
          doi: "",
          link_externo: "",
          resumo: "",
          tipo: "artigo",
          imagem: "",
        });
        setEditingId(null);
        fetchPublicacoes();
      }
    } catch (error) {
      console.error("Erro ao salvar publicação:", error);
    }
  };

  const handleEdit = (publicacao: Publicacao) => {
    setFormData({
      titulo: publicacao.titulo,
      autores: publicacao.autores || "",
      ano: publicacao.ano,
      revista_periodico: publicacao.revista_periodico || "",
      doi: publicacao.doi || "",
      link_externo: publicacao.link_externo || "",
      resumo: publicacao.resumo || "",
      tipo: publicacao.tipo || "artigo",
      imagem: publicacao.imagem || "",
    });
    setEditingId(publicacao.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta publicação?")) {
      try {
        const response = await fetch(`/api/admin/publicacoes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchPublicacoes();
        }
      } catch (error) {
        console.error("Erro ao excluir publicação:", error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      titulo: "",
      autores: "",
      ano: new Date().getFullYear(),
      revista_periodico: "",
      doi: "",
      link_externo: "",
      resumo: "",
      tipo: "artigo",
      imagem: "",
    });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gerenciar Publicações
              </h1>
              <p className="text-gray-600 mt-2">
                Adicione, edite ou remova publicações acadêmicas
              </p>
            </div>
            <Link
              href="/admin"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Voltar ao Admin
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingId ? "Editar Publicação" : "Nova Publicação"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autores
                </label>
                <input
                  type="text"
                  value={formData.autores}
                  onChange={(e) =>
                    setFormData({ ...formData, autores: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome dos autores separados por vírgula"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ano *
                </label>
                <input
                  type="number"
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.ano}
                  onChange={(e) =>
                    setFormData({ ...formData, ano: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Revista/Periódico
                </label>
                <input
                  type="text"
                  value={formData.revista_periodico}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      revista_periodico: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DOI
                </label>
                <input
                  type="text"
                  value={formData.doi}
                  onChange={(e) =>
                    setFormData({ ...formData, doi: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10.1000/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Externo
                </label>
                <input
                  type="url"
                  value={formData.link_externo}
                  onChange={(e) =>
                    setFormData({ ...formData, link_externo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="artigo">Artigo</option>
                  <option value="livro">Livro</option>
                  <option value="capitulo">Capítulo</option>
                  <option value="relatorio">Relatório</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumo
                </label>
                <textarea
                  value={formData.resumo}
                  onChange={(e) =>
                    setFormData({ ...formData, resumo: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Resumo da publicação..."
                />
              </div>

              <ImageUpload
                onImageUpload={(imageUrl) =>
                  setFormData({ ...formData, imagem: imageUrl })
                }
                currentImageUrl={formData.imagem}
                label="Imagem da Publicação"
              />

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {editingId ? "Atualizar" : "Criar"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista de Publicações */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Publicações Existentes ({publicacoes.length})
            </h2>

            {publicacoes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhuma publicação encontrada
              </p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {publicacoes
                  .sort((a, b) => b.ano - a.ano)
                  .map((publicacao) => (
                    <div
                      key={publicacao.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3">
                            {publicacao.imagem && (
                              <img
                                src={publicacao.imagem}
                                alt={publicacao.titulo}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              />
                            )}
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {publicacao.titulo}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {publicacao.autores && (
                                  <span className="block">
                                    Autores: {publicacao.autores}
                                  </span>
                                )}
                                <span className="block">
                                  Ano: {publicacao.ano}
                                </span>
                                {publicacao.revista_periodico && (
                                  <span className="block">
                                    Revista: {publicacao.revista_periodico}
                                  </span>
                                )}
                                {publicacao.tipo && (
                                  <span className="block">
                                    Tipo: {publicacao.tipo}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEdit(publicacao)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(publicacao.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Excluir
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
    </div>
  );
}
