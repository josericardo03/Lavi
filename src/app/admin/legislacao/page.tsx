"use client";
import { useState, useEffect } from "react";
import { Legislacao } from "@/types/database";
import Link from "next/link";

export default function AdminLegislacao() {
  const [legislacoes, setLegislacoes] = useState<Legislacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    links: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Buscar legislações
  const fetchLegislacoes = async () => {
    try {
      const response = await fetch("/api/admin/legislacao");
      const data = await response.json();
      setLegislacoes(data);
    } catch (error) {
      console.error("Erro ao buscar legislações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLegislacoes();
  }, []);

  // Salvar legislação
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `/api/admin/legislacao/${editingId}`
        : "/api/admin/legislacao";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: "", content: "", links: "" });
        setEditingId(null);
        setShowForm(false);
        fetchLegislacoes();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  // Editar legislação
  const handleEdit = (legislacao: Legislacao) => {
    setFormData({
      title: legislacao.title,
      content: legislacao.content || "",
      links: legislacao.links || "",
    });
    setEditingId(legislacao.id);
    setShowForm(true);
  };

  // Deletar legislação
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta legislação?")) return;

    try {
      const response = await fetch(`/api/admin/legislacao/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchLegislacoes();
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Legislação
          </h1>
          <Link
            href="/admin"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Voltar ao Painel
          </Link>
        </div>

        {/* Botão para adicionar novo */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ title: "", content: "", links: "" });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {showForm ? "Cancelar" : "Adicionar Legislação"}
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Editar Legislação" : "Adicionar Nova Legislação"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conteúdo
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={6}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Descrição ou resumo da legislação..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Links (separados por vírgula)
                </label>
                <textarea
                  value={formData.links}
                  onChange={(e) =>
                    setFormData({ ...formData, links: e.target.value })
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://exemplo.com/lei1, https://exemplo.com/lei2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Insira as URLs separadas por vírgula
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                  {editingId ? "Atualizar" : "Salvar"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ title: "", content: "", links: "" });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de legislações */}
        <div className="space-y-6">
          {legislacoes.map((legislacao) => (
            <div
              key={legislacao.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{legislacao.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(legislacao)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(legislacao.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Deletar
                  </button>
                </div>
              </div>

              {legislacao.content && (
                <p className="text-gray-700 mb-4">{legislacao.content}</p>
              )}

              {legislacao.links && (
                <div>
                  <h4 className="font-semibold mb-2">Links Relacionados:</h4>
                  <div className="space-y-1">
                    {legislacao.links.split(",").map((link, index) => (
                      <a
                        key={index}
                        href={link.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-500 hover:underline text-sm"
                      >
                        {link.trim()}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-4">
                Criado em:{" "}
                {new Date(legislacao.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>

        {legislacoes.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Nenhuma legislação cadastrada ainda.
          </div>
        )}
      </div>
    </div>
  );
}
