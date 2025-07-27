"use client";
import { useState, useEffect } from "react";
import { Equipe } from "@/types/database";
import Link from "next/link";

export default function AdminEquipe() {
  const [membros, setMembros] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    email: "",
    foto: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Buscar membros da equipe
  const fetchMembros = async () => {
    try {
      const response = await fetch("/api/admin/equipe");
      const data = await response.json();
      setMembros(data);
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembros();
  }, []);

  // Salvar membro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `/api/admin/equipe/${editingId}`
        : "/api/admin/equipe";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ nome: "", descricao: "", tipo: "", email: "", foto: "" });
        setEditingId(null);
        setShowForm(false);
        fetchMembros();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  // Editar membro
  const handleEdit = (membro: Equipe) => {
    setFormData({
      nome: membro.nome,
      descricao: membro.descricao || "",
      tipo: membro.tipo || "",
      email: membro.email || "",
      foto: membro.foto || "",
    });
    setEditingId(membro.id);
    setShowForm(true);
  };

  // Deletar membro
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este membro?")) return;

    try {
      const response = await fetch(`/api/admin/equipe/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchMembros();
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
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Equipe</h1>
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
              setFormData({
                nome: "",
                descricao: "",
                tipo: "",
                email: "",
                foto: "",
              });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {showForm ? "Cancelar" : "Adicionar Membro"}
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Editar Membro" : "Adicionar Novo Membro"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo/Tipo
                </label>
                <input
                  type="text"
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Foto
                </label>
                <input
                  type="url"
                  value={formData.foto}
                  onChange={(e) =>
                    setFormData({ ...formData, foto: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
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
                    setFormData({
                      nome: "",
                      descricao: "",
                      tipo: "",
                      email: "",
                      foto: "",
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de membros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membros.map((membro) => (
            <div key={membro.id} className="bg-white rounded-lg shadow-md p-6">
              {membro.foto && (
                <img
                  src={membro.foto}
                  alt={membro.nome}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{membro.nome}</h3>
              {membro.tipo && (
                <p className="text-gray-600 mb-2">{membro.tipo}</p>
              )}
              {membro.email && (
                <p className="text-blue-500 mb-2">{membro.email}</p>
              )}
              {membro.descricao && (
                <p className="text-gray-700 mb-4">{membro.descricao}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(membro)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(membro.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>

        {membros.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Nenhum membro cadastrado ainda.
          </div>
        )}
      </div>
    </div>
  );
}
