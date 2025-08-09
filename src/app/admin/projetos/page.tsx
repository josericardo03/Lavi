"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "../../Components/ImageUpload";

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

export default function AdminProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    nome_completo: "",
    ano: new Date().getFullYear(),
    descricao: "",
    participantes: "",
    status: "ativo",
    imagem: "",
    link_externo: "",
  });

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/projetos");
      if (response.ok) {
        const data = await response.json();
        setProjetos(data);
      } else {
        console.error("Erro ao buscar projetos");
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Atualizar
        const response = await fetch(`/api/admin/projetos/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setEditingId(null);
          setFormData({
            nome: "",
            nome_completo: "",
            ano: new Date().getFullYear(),
            descricao: "",
            participantes: "",
            status: "ativo",
            imagem: "",
            link_externo: "",
          });
          fetchData();
        }
      } else {
        // Criar novo
        const response = await fetch("/api/admin/projetos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormData({
            nome: "",
            nome_completo: "",
            ano: new Date().getFullYear(),
            descricao: "",
            participantes: "",
            status: "ativo",
            imagem: "",
            link_externo: "",
          });
          fetchData();
        }
      }
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    }
  };

  const handleEdit = (projeto: Projeto) => {
    setEditingId(projeto.id);
    setFormData({
      nome: projeto.nome,
      nome_completo: projeto.nome_completo || "",
      ano: projeto.ano,
      descricao: projeto.descricao || "",
      participantes: projeto.participantes || "",
      status: projeto.status,
      imagem: projeto.imagem || "",
      link_externo: projeto.link_externo || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este projeto?")) {
      try {
        const response = await fetch(`/api/admin/projetos/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchData();
        }
      } catch (error) {
        console.error("Erro ao deletar projeto:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      nome: "",
      nome_completo: "",
      ano: new Date().getFullYear(),
      descricao: "",
      participantes: "",
      status: "ativo",
      imagem: "",
      link_externo: "",
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciar Projetos
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie os projetos de pesquisa do LAVI
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Voltar ao Painel
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId ? "Editar Projeto" : "Novo Projeto"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Projeto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do projeto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.nome_completo}
                  onChange={(e) =>
                    setFormData({ ...formData, nome_completo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome completo do projeto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano *
                </label>
                <input
                  type="number"
                  required
                  min="2000"
                  max="2030"
                  value={formData.ano}
                  onChange={(e) =>
                    setFormData({ ...formData, ano: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ativo">Ativo</option>
                  <option value="concluido">Concluído</option>
                  <option value="pausado">Pausado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                rows={3}
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descrição do projeto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Participantes
              </label>
              <textarea
                rows={2}
                value={formData.participantes}
                onChange={(e) =>
                  setFormData({ ...formData, participantes: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lista de participantes"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ImageUpload
                  onImageUpload={(imageUrl) =>
                    setFormData({ ...formData, imagem: imageUrl })
                  }
                  currentImageUrl={formData.imagem}
                  label="Imagem do Projeto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Externo
                </label>
                <input
                  type="url"
                  value={formData.link_externo}
                  onChange={(e) =>
                    setFormData({ ...formData, link_externo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://exemplo.com/projeto"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? "Atualizar" : "Criar"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Projetos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Projetos Existentes
            </h2>
          </div>

          {projetos.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nenhum projeto encontrado. Crie um novo projeto acima.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {projetos.map((projeto) => (
                <div key={projeto.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {projeto.nome}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            projeto.status === "ativo"
                              ? "bg-green-100 text-green-800"
                              : projeto.status === "concluido"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {projeto.status}
                        </span>
                      </div>

                      {projeto.nome_completo && (
                        <p className="text-gray-700 mb-2">
                          {projeto.nome_completo}
                        </p>
                      )}

                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Ano:</strong> {projeto.ano}
                      </div>

                      {projeto.descricao && (
                        <p className="text-gray-600 mb-2">
                          {projeto.descricao}
                        </p>
                      )}

                      {projeto.participantes && (
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Participantes:</strong>{" "}
                          {projeto.participantes}
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        Criado em:{" "}
                        {new Date(projeto.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(projeto)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(projeto.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
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
